# app/routes/matching.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.match import Match
from app.services.matching_service import MatchingService
from app.utils.logger import handle_errors, log_request_info, logger

matching_bp = Blueprint('matching', __name__)

@matching_bp.before_request
def before_request():
    log_request_info()

@matching_bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
@handle_errors
def get_matches(user_id):
    current_user_id = get_jwt_identity()
    
    # Users can only see their own matches
    if current_user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    try:
        # Get query parameters
        status_filter = request.args.get('status')
        limit = int(request.args.get('limit', 50))
        
        matches = MatchingService.get_matches_for_user(
            user_id, 
            status_filter=status_filter, 
            limit=limit
        )
        
        # Include additional profile data for each match
        matches_data = []
        for match in matches:
            match_dict = match.to_dict()
            
            # Add partner profile info (basic details only)
            user = User.query.get(current_user_id)
            if user.user_type == 'investor':
                # Get startup info
                partner_user = User.query.get(match.startup_id)
                if partner_user and hasattr(partner_user, 'startup_profile'):
                    startup_profile = partner_user.startup_profile
                    if startup_profile:
                        match_dict['partner_profile'] = {
                            'company_name': startup_profile.company_name,
                            'tagline': startup_profile.tagline,
                            'industry': startup_profile.industry,
                            'company_stage': startup_profile.company_stage,
                            'funding_needed': startup_profile.funding_needed,
                            'funding_stage': startup_profile.funding_stage,
                            'headquarters': startup_profile.headquarters,
                            'logo_url': startup_profile.logo_url
                        }
            else:
                # Get investor info
                partner_user = User.query.get(match.investor_id)
                if partner_user and hasattr(partner_user, 'investor_profile'):
                    investor_profile = partner_user.investor_profile
                    if investor_profile:
                        match_dict['partner_profile'] = {
                            'name': investor_profile.name,
                            'title': investor_profile.title,
                            'company': investor_profile.company,
                            'bio': investor_profile.bio,
                            'location': investor_profile.location,
                            'preferred_industries': investor_profile.preferred_industries_list,
                            'min_investment': investor_profile.min_investment,
                            'max_investment': investor_profile.max_investment
                        }
            
            matches_data.append(match_dict)
        
        logger.info(f"Retrieved {len(matches_data)} matches for user {user_id}")
        
        return jsonify({
            'matches': matches_data,
            'count': len(matches_data)
        })
        
    except Exception as e:
        logger.error(f"Error retrieving matches for user {user_id}: {str(e)}")
        raise

@matching_bp.route('/generate', methods=['POST'])
@jwt_required()
@handle_errors
def generate_matches():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    
    try:
        # Get optional parameters
        limit = data.get('limit', 10)
        force_regenerate = data.get('force_regenerate', False)
        
        # Check if user has recent matches (unless force regenerate)
        if not force_regenerate:
            recent_matches = Match.query.filter(
                db.or_(
                    Match.investor_id == user_id,
                    Match.startup_id == user_id
                )
            ).filter(
                Match.created_at >= db.func.datetime('now', '-1 day')
            ).count()
            
            if recent_matches > 0:
                return jsonify({
                    'message': 'Recent matches already exist. Use force_regenerate=true to generate new ones.',
                    'recent_matches_count': recent_matches
                }), 400
        
        # Generate new matches
        matches = MatchingService.generate_matches_for_user(user_id, limit)
        
        matches_data = [match.to_dict() for match in matches]
        
        logger.info(f"Generated {len(matches)} new matches for user {user_id}")
        
        return jsonify({
            'message': f'Generated {len(matches)} new matches',
            'matches': matches_data,
            'count': len(matches)
        }), 201
        
    except ValueError as e:
        logger.warning(f"Invalid request for match generation: {str(e)}")
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error generating matches for user {user_id}: {str(e)}")
        raise

@matching_bp.route('/<int:match_id>/interest', methods=['PUT'])
@jwt_required()
@handle_errors
def update_match_interest(match_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if 'interest' not in data:
        return jsonify({'error': 'Missing interest field'}), 400
    
    interest = data['interest']
    if interest not in ['interested', 'not_interested', 'pending']:
        return jsonify({'error': 'Invalid interest value'}), 400
    
    try:
        match = MatchingService.update_match_interest(match_id, user_id, interest)
        
        logger.info(f"Updated match {match_id} interest to {interest} for user {user_id}")
        
        return jsonify({
            'message': 'Match interest updated successfully',
            'match': match.to_dict(include_sensitive=True)
        })
        
    except ValueError as e:
        logger.warning(f"Invalid match interest update: {str(e)}")
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error updating match interest: {str(e)}")
        raise

@matching_bp.route('/<int:match_id>/view', methods=['POST'])
@jwt_required()
@handle_errors
def mark_match_viewed(match_id):
    user_id = get_jwt_identity()
    
    try:
        match = Match.query.get_or_404(match_id)
        user = User.query.get(user_id)
        
        # Check authorization
        if user.user_type == 'investor' and match.investor_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        elif user.user_type == 'startup' and match.startup_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Mark as viewed
        if user.user_type == 'investor':
            match.mark_viewed_by_investor()
        else:
            match.mark_viewed_by_startup()
        
        logger.info(f"Match {match_id} marked as viewed by user {user_id}")
        
        return jsonify({
            'message': 'Match marked as viewed',
            'match': match.to_dict()
        })
        
    except Exception as e:
        logger.error(f"Error marking match as viewed: {str(e)}")
        raise

@matching_bp.route('/<int:match_id>', methods=['GET'])
@jwt_required()
@handle_errors
def get_match_details(match_id):
    user_id = get_jwt_identity()
    
    try:
        match = Match.query.get_or_404(match_id)
        user = User.query.get(user_id)
        
        # Check authorization
        if user.user_type == 'investor' and match.investor_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        elif user.user_type == 'startup' and match.startup_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Get detailed match info including partner profile
        match_dict = match.to_dict(include_sensitive=True)
        
        # Add partner profile details
        if user.user_type == 'investor':
            partner_user = User.query.get(match.startup_id)
            if partner_user and hasattr(partner_user, 'startup_profile'):
                startup_profile = partner_user.startup_profile
                if startup_profile:
                    match_dict['partner_profile'] = startup_profile.to_dict()
        else:
            partner_user = User.query.get(match.investor_id)
            if partner_user and hasattr(partner_user, 'investor_profile'):
                investor_profile = partner_user.investor_profile
                if investor_profile:
                    match_dict['partner_profile'] = investor_profile.to_dict()
        
        return jsonify(match_dict)
        
    except Exception as e:
        logger.error(f"Error retrieving match details: {str(e)}")
        raise

@matching_bp.route('/stats', methods=['GET'])
@jwt_required()
@handle_errors
def get_matching_stats():
    user_id = get_jwt_identity()
    
    try:
        user = User.query.get(user_id)
        
        # Get match statistics
        if user.user_type == 'investor':
            total_matches = Match.query.filter_by(investor_id=user_id).count()
            pending_matches = Match.query.filter_by(investor_id=user_id, status='pending').count()
            interested_matches = Match.query.filter_by(investor_id=user_id, investor_interest='interested').count()
            mutual_matches = Match.query.filter_by(
                investor_id=user_id, 
                investor_interest='interested',
                startup_interest='interested'
            ).count()
        else:
            total_matches = Match.query.filter_by(startup_id=user_id).count()
            pending_matches = Match.query.filter_by(startup_id=user_id, status='pending').count()
            interested_matches = Match.query.filter_by(startup_id=user_id, startup_interest='interested').count()
            mutual_matches = Match.query.filter_by(
                startup_id=user_id,
                investor_interest='interested',
                startup_interest='interested'
            ).count()
        
        # Calculate match rate
        match_rate = (mutual_matches / total_matches * 100) if total_matches > 0 else 0
        
        stats = {
            'total_matches': total_matches,
            'pending_matches': pending_matches,
            'interested_matches': interested_matches,
            'mutual_matches': mutual_matches,
            'match_rate': round(match_rate, 1)
        }
        
        return jsonify(stats)
        
    except Exception as e:
        logger.error(f"Error retrieving matching stats: {str(e)}")
        raise 