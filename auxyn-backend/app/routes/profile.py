# app/routes/profile.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.user_preferences import UserPreferences
from app.models.investor_profile import InvestorProfile
from app.models.startup_profile import StartupProfile
from app.utils.logger import handle_errors, log_request_info, logger
from datetime import datetime

profile_bp = Blueprint('profile', __name__)

@profile_bp.before_request
def before_request():
    log_request_info()

# User Preferences Routes
@profile_bp.route('/preferences', methods=['GET'])
@jwt_required()
@handle_errors
def get_user_preferences():
    user_id = get_jwt_identity()
    preferences = UserPreferences.query.filter_by(user_id=user_id).first()
    
    if not preferences:
        # Create default preferences
        preferences = UserPreferences(user_id=user_id)
        db.session.add(preferences)
        db.session.commit()
    
    return jsonify(preferences.to_dict())

@profile_bp.route('/preferences', methods=['POST', 'PUT'])
@jwt_required()
@handle_errors
def update_user_preferences():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    preferences = UserPreferences.query.filter_by(user_id=user_id).first()
    
    if not preferences:
        preferences = UserPreferences(user_id=user_id)
        db.session.add(preferences)
    
    # Update preferences
    if 'email_notifications' in data:
        preferences.email_notifications = data['email_notifications']
    if 'match_notifications' in data:
        preferences.match_notifications = data['match_notifications']
    if 'weekly_digest' in data:
        preferences.weekly_digest = data['weekly_digest']
    if 'profile_visibility' in data:
        preferences.profile_visibility = data['profile_visibility']
    if 'contact_sharing' in data:
        preferences.contact_sharing = data['contact_sharing']
    if 'auto_matching' in data:
        preferences.auto_matching = data['auto_matching']
    if 'match_frequency' in data:
        preferences.match_frequency = data['match_frequency']
    
    db.session.commit()
    logger.info(f"Updated preferences for user {user_id}")
    
    return jsonify({
        'message': 'Preferences updated successfully',
        'preferences': preferences.to_dict()
    })

# Investor Profile Routes
@profile_bp.route('/investor', methods=['GET'])
@jwt_required()
@handle_errors
def get_investor_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.user_type != 'investor':
        return jsonify({'error': 'User is not an investor'}), 403
    
    profile = InvestorProfile.query.filter_by(user_id=user_id).first()
    
    if not profile:
        return jsonify({'error': 'Investor profile not found'}), 404
    
    return jsonify(profile.to_dict())

@profile_bp.route('/investor', methods=['POST'])
@jwt_required()
@handle_errors
def create_investor_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.user_type != 'investor':
        return jsonify({'error': 'User is not an investor'}), 403
    
    # Check if profile already exists
    existing_profile = InvestorProfile.query.filter_by(user_id=user_id).first()
    if existing_profile:
        return jsonify({'error': 'Investor profile already exists'}), 400
    
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    try:
        profile = InvestorProfile(
            user_id=user_id,
            name=data['name'],
            title=data.get('title'),
            company=data.get('company'),
            bio=data.get('bio'),
            location=data.get('location'),
            min_investment=data.get('min_investment', 0),
            max_investment=data.get('max_investment', 1000000),
            risk_tolerance=data.get('risk_tolerance', 'medium'),
            geographic_preference=data.get('geographic_preference'),
            team_size_preference=data.get('team_size_preference'),
            years_experience=data.get('years_experience'),
            previous_investments=data.get('previous_investments', 0),
            mentoring_available=data.get('mentoring_available', False),
            follow_on_investment=data.get('follow_on_investment', True),
            co_investment_preferred=data.get('co_investment_preferred', False),
            board_participation=data.get('board_participation', False),
            linkedin_url=data.get('linkedin_url'),
            website_url=data.get('website_url')
        )
        
        # Set list fields
        if 'preferred_industries' in data:
            profile.preferred_industries_list = data['preferred_industries']
        if 'investment_stage' in data:
            profile.investment_stage_list = data['investment_stage']
        if 'geographic_preference' in data:
            profile.geographic_preference_list = data['geographic_preference']
        if 'expertise_areas' in data:
            profile.expertise_areas_list = data['expertise_areas']
        
        db.session.add(profile)
        db.session.commit()
        
        logger.info(f"Created investor profile for user {user_id}")
        
        return jsonify({
            'message': 'Investor profile created successfully',
            'profile': profile.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error creating investor profile: {str(e)}")
        raise

@profile_bp.route('/investor', methods=['PUT'])
@jwt_required()
@handle_errors
def update_investor_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.user_type != 'investor':
        return jsonify({'error': 'User is not an investor'}), 403
    
    profile = InvestorProfile.query.filter_by(user_id=user_id).first()
    if not profile:
        return jsonify({'error': 'Investor profile not found'}), 404
    
    data = request.get_json()
    
    try:
        # Update scalar fields
        scalar_fields = [
            'name', 'title', 'company', 'bio', 'location', 'min_investment', 
            'max_investment', 'risk_tolerance', 'team_size_preference', 
            'years_experience', 'previous_investments', 'mentoring_available',
            'follow_on_investment', 'co_investment_preferred', 'board_participation',
            'linkedin_url', 'website_url'
        ]
        
        for field in scalar_fields:
            if field in data:
                setattr(profile, field, data[field])
        
        # Update list fields
        if 'preferred_industries' in data:
            profile.preferred_industries_list = data['preferred_industries']
        if 'investment_stage' in data:
            profile.investment_stage_list = data['investment_stage']
        if 'geographic_preference' in data:
            profile.geographic_preference_list = data['geographic_preference']
        if 'expertise_areas' in data:
            profile.expertise_areas_list = data['expertise_areas']
        
        db.session.commit()
        
        logger.info(f"Updated investor profile for user {user_id}")
        
        return jsonify({
            'message': 'Investor profile updated successfully',
            'profile': profile.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error updating investor profile: {str(e)}")
        raise

# Startup Profile Routes
@profile_bp.route('/startup', methods=['GET'])
@jwt_required()
@handle_errors
def get_startup_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.user_type != 'startup':
        return jsonify({'error': 'User is not a startup'}), 403
    
    profile = StartupProfile.query.filter_by(user_id=user_id).first()
    
    if not profile:
        return jsonify({'error': 'Startup profile not found'}), 404
    
    return jsonify(profile.to_dict())

@profile_bp.route('/startup', methods=['POST'])
@jwt_required()
@handle_errors
def create_startup_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.user_type != 'startup':
        return jsonify({'error': 'User is not a startup'}), 403
    
    # Check if profile already exists
    existing_profile = StartupProfile.query.filter_by(user_id=user_id).first()
    if existing_profile:
        return jsonify({'error': 'Startup profile already exists'}), 400
    
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['company_name']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    try:
        profile = StartupProfile(
            user_id=user_id,
            company_name=data['company_name'],
            tagline=data.get('tagline'),
            description=data.get('description'),
            website_url=data.get('website_url'),
            logo_url=data.get('logo_url'),
            industry=data.get('industry'),
            business_model=data.get('business_model'),
            value_proposition=data.get('value_proposition'),
            company_stage=data.get('company_stage'),
            team_size=data.get('team_size'),
            funding_needed=data.get('funding_needed'),
            funding_stage=data.get('funding_stage'),
            current_valuation=data.get('current_valuation'),
            monthly_revenue=data.get('monthly_revenue'),
            monthly_burn_rate=data.get('monthly_burn_rate'),
            runway_months=data.get('runway_months'),
            total_raised=data.get('total_raised', 0),
            market_size=data.get('market_size'),
            customer_count=data.get('customer_count', 0),
            monthly_growth_rate=data.get('monthly_growth_rate'),
            headquarters=data.get('headquarters'),
            legal_structure=data.get('legal_structure'),
            intellectual_property=data.get('intellectual_property'),
            linkedin_url=data.get('linkedin_url'),
            twitter_url=data.get('twitter_url')
        )
        
        # Handle date fields
        if 'founded_date' in data and data['founded_date']:
            profile.founded_date = datetime.strptime(data['founded_date'], '%Y-%m-%d').date()
        
        # Set list/dict fields
        if 'target_market' in data:
            profile.target_market_list = data['target_market']
        if 'previous_investors' in data:
            profile.previous_investors_list = data['previous_investors']
        if 'founder_names' in data:
            profile.founder_names_list = data['founder_names']
        if 'key_team_members' in data:
            profile.key_team_members_list = data['key_team_members']
        if 'advisors' in data:
            profile.advisors_list = data['advisors']
        if 'fund_usage_plan' in data:
            profile.fund_usage_plan_dict = data['fund_usage_plan']
        if 'awards_recognition' in data:
            profile.awards_recognition_list = data['awards_recognition']
        if 'press_coverage' in data:
            profile.press_coverage_list = data['press_coverage']
        
        db.session.add(profile)
        db.session.commit()
        
        logger.info(f"Created startup profile for user {user_id}")
        
        return jsonify({
            'message': 'Startup profile created successfully',
            'profile': profile.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error creating startup profile: {str(e)}")
        raise

@profile_bp.route('/startup', methods=['PUT'])
@jwt_required()
@handle_errors
def update_startup_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.user_type != 'startup':
        return jsonify({'error': 'User is not a startup'}), 403
    
    profile = StartupProfile.query.filter_by(user_id=user_id).first()
    if not profile:
        return jsonify({'error': 'Startup profile not found'}), 404
    
    data = request.get_json()
    
    try:
        # Update scalar fields
        scalar_fields = [
            'company_name', 'tagline', 'description', 'website_url', 'logo_url',
            'industry', 'business_model', 'value_proposition', 'company_stage',
            'team_size', 'funding_needed', 'funding_stage', 'current_valuation',
            'monthly_revenue', 'monthly_burn_rate', 'runway_months', 'total_raised',
            'market_size', 'customer_count', 'monthly_growth_rate', 'headquarters',
            'legal_structure', 'intellectual_property', 'linkedin_url', 'twitter_url'
        ]
        
        for field in scalar_fields:
            if field in data:
                setattr(profile, field, data[field])
        
        # Handle date fields
        if 'founded_date' in data and data['founded_date']:
            profile.founded_date = datetime.strptime(data['founded_date'], '%Y-%m-%d').date()
        
        # Update list/dict fields
        if 'target_market' in data:
            profile.target_market_list = data['target_market']
        if 'previous_investors' in data:
            profile.previous_investors_list = data['previous_investors']
        if 'founder_names' in data:
            profile.founder_names_list = data['founder_names']
        if 'key_team_members' in data:
            profile.key_team_members_list = data['key_team_members']
        if 'advisors' in data:
            profile.advisors_list = data['advisors']
        if 'fund_usage_plan' in data:
            profile.fund_usage_plan_dict = data['fund_usage_plan']
        if 'awards_recognition' in data:
            profile.awards_recognition_list = data['awards_recognition']
        if 'press_coverage' in data:
            profile.press_coverage_list = data['press_coverage']
        
        db.session.commit()
        
        logger.info(f"Updated startup profile for user {user_id}")
        
        return jsonify({
            'message': 'Startup profile updated successfully',
            'profile': profile.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error updating startup profile: {str(e)}")
        raise 