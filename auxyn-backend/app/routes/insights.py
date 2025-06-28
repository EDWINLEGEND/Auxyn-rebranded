# app/routes/insights.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.match import Match
from app.models.match_insight import MatchInsight
from app.utils.logger import handle_errors, log_request_info, logger

insights_bp = Blueprint('insights', __name__)

@insights_bp.before_request
def before_request():
    log_request_info()

@insights_bp.route('/<int:match_id>/insights', methods=['GET'])
@jwt_required()
@handle_errors
def get_match_insights(match_id):
    user_id = get_jwt_identity()
    
    try:
        # Get the match and verify authorization
        match = Match.query.get_or_404(match_id)
        user = User.query.get(user_id)
        
        # Check if user is part of this match
        if user.user_type == 'investor' and match.investor_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        elif user.user_type == 'startup' and match.startup_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Get match insights
        insights = MatchInsight.query.filter_by(match_id=match_id).first()
        
        if not insights:
            return jsonify({'error': 'Match insights not found'}), 404
        
        return jsonify(insights.to_dict())
        
    except Exception as e:
        logger.error(f"Error retrieving match insights: {str(e)}")
        raise

@insights_bp.route('/dashboard/match-analytics', methods=['GET'])
@jwt_required()
@handle_errors
def get_match_analytics():
    user_id = get_jwt_identity()
    
    try:
        user = User.query.get(user_id)
        
        # Get analytics based on user type
        if user.user_type == 'investor':
            analytics = _get_investor_analytics(user_id)
        else:
            analytics = _get_startup_analytics(user_id)
        
        return jsonify(analytics)
        
    except Exception as e:
        logger.error(f"Error retrieving match analytics: {str(e)}")
        raise

def _get_investor_analytics(investor_id):
    """Get analytics for an investor"""
    
    # Basic match statistics
    total_matches = Match.query.filter_by(investor_id=investor_id).count()
    pending_matches = Match.query.filter_by(investor_id=investor_id, status='pending').count()
    viewed_matches = Match.query.filter_by(investor_id=investor_id, status='viewed').count()
    interested_matches = Match.query.filter_by(investor_id=investor_id, investor_interest='interested').count()
    mutual_matches = Match.query.filter_by(
        investor_id=investor_id,
        investor_interest='interested',
        startup_interest='interested'
    ).count()
    
    # Match quality metrics
    avg_compatibility = db.session.query(db.func.avg(Match.compatibility_score))\
        .filter_by(investor_id=investor_id).scalar() or 0
    
    high_quality_matches = Match.query.filter_by(investor_id=investor_id)\
        .filter(Match.compatibility_score >= 0.8).count()
    
    # Industry breakdown
    industry_breakdown = db.session.query(
        db.func.json_extract(Match.match_reasons, '$[0]').label('reason'),
        db.func.count().label('count')
    ).filter_by(investor_id=investor_id).group_by('reason').all()
    
    # Response rate
    total_responses = interested_matches + Match.query.filter_by(
        investor_id=investor_id, investor_interest='not_interested'
    ).count()
    response_rate = (total_responses / total_matches * 100) if total_matches > 0 else 0
    
    # Success rate (mutual matches / interested matches)
    success_rate = (mutual_matches / interested_matches * 100) if interested_matches > 0 else 0
    
    return {
        'overview': {
            'total_matches': total_matches,
            'pending_matches': pending_matches,
            'viewed_matches': viewed_matches,
            'interested_matches': interested_matches,
            'mutual_matches': mutual_matches,
            'avg_compatibility': round(avg_compatibility * 100, 1),
            'high_quality_matches': high_quality_matches,
            'response_rate': round(response_rate, 1),
            'success_rate': round(success_rate, 1)
        },
        'trends': {
            'industry_breakdown': [
                {'industry': item[0], 'count': item[1]} 
                for item in industry_breakdown
            ]
        },
        'insights': _generate_investor_insights(investor_id, {
            'total_matches': total_matches,
            'mutual_matches': mutual_matches,
            'avg_compatibility': avg_compatibility,
            'success_rate': success_rate
        })
    }

def _get_startup_analytics(startup_id):
    """Get analytics for a startup"""
    
    # Basic match statistics
    total_matches = Match.query.filter_by(startup_id=startup_id).count()
    pending_matches = Match.query.filter_by(startup_id=startup_id, status='pending').count()
    viewed_matches = Match.query.filter_by(startup_id=startup_id, status='viewed').count()
    interested_matches = Match.query.filter_by(startup_id=startup_id, startup_interest='interested').count()
    mutual_matches = Match.query.filter_by(
        startup_id=startup_id,
        investor_interest='interested',
        startup_interest='interested'
    ).count()
    
    # Match quality metrics
    avg_compatibility = db.session.query(db.func.avg(Match.compatibility_score))\
        .filter_by(startup_id=startup_id).scalar() or 0
    
    high_quality_matches = Match.query.filter_by(startup_id=startup_id)\
        .filter(Match.compatibility_score >= 0.8).count()
    
    # Investor interest analysis
    investor_interest_count = Match.query.filter_by(
        startup_id=startup_id, investor_interest='interested'
    ).count()
    
    # Response rate
    total_responses = interested_matches + Match.query.filter_by(
        startup_id=startup_id, startup_interest='not_interested'
    ).count()
    response_rate = (total_responses / total_matches * 100) if total_matches > 0 else 0
    
    # Attraction rate (investor interest / total matches)
    attraction_rate = (investor_interest_count / total_matches * 100) if total_matches > 0 else 0
    
    return {
        'overview': {
            'total_matches': total_matches,
            'pending_matches': pending_matches,
            'viewed_matches': viewed_matches,
            'interested_matches': interested_matches,
            'mutual_matches': mutual_matches,
            'investor_interest_count': investor_interest_count,
            'avg_compatibility': round(avg_compatibility * 100, 1),
            'high_quality_matches': high_quality_matches,
            'response_rate': round(response_rate, 1),
            'attraction_rate': round(attraction_rate, 1)
        },
        'insights': _generate_startup_insights(startup_id, {
            'total_matches': total_matches,
            'mutual_matches': mutual_matches,
            'investor_interest_count': investor_interest_count,
            'attraction_rate': attraction_rate
        })
    }

def _generate_investor_insights(investor_id, stats):
    """Generate personalized insights for investors"""
    insights = []
    
    if stats['total_matches'] == 0:
        insights.append({
            'type': 'action_needed',
            'title': 'Complete Your Profile',
            'message': 'Complete your investor profile to start receiving startup matches.',
            'priority': 'high'
        })
    elif stats['total_matches'] < 5:
        insights.append({
            'type': 'info',
            'title': 'Building Your Match Pipeline',  
            'message': f'You have {stats["total_matches"]} matches. More will be generated as startups join the platform.',
            'priority': 'medium'
        })
    
    if stats['success_rate'] > 50:
        insights.append({
            'type': 'positive',
            'title': 'High Success Rate',
            'message': f'Your {stats["success_rate"]:.1f}% success rate is excellent! You\'re good at identifying promising opportunities.',
            'priority': 'low'
        })
    elif stats['success_rate'] < 20 and stats['total_matches'] > 10:
        insights.append({
            'type': 'suggestion',
            'title': 'Improve Match Success',
            'message': 'Consider broadening your criteria or engaging more actively with matches.',
            'priority': 'medium'
        })
    
    if stats['avg_compatibility'] > 0.8:
        insights.append({
            'type': 'positive',
            'title': 'High-Quality Matches',
            'message': f'Your average match compatibility of {stats["avg_compatibility"]*100:.1f}% indicates very targeted matching.',
            'priority': 'low'
        })
    
    return insights

def _generate_startup_insights(startup_id, stats):
    """Generate personalized insights for startups"""
    insights = []
    
    if stats['total_matches'] == 0:
        insights.append({
            'type': 'action_needed',
            'title': 'Complete Your Profile',
            'message': 'Complete your startup profile to start receiving investor matches.',
            'priority': 'high'
        })
    
    if stats['attraction_rate'] > 40:
        insights.append({
            'type': 'positive',
            'title': 'High Investor Interest',
            'message': f'{stats["attraction_rate"]:.1f}% of investors are interested in your startup. Great traction!',
            'priority': 'low'
        })
    elif stats['attraction_rate'] < 15 and stats['total_matches'] > 10:
        insights.append({
            'type': 'suggestion',
            'title': 'Improve Investor Appeal',
            'message': 'Consider updating your pitch deck or highlighting key metrics to attract more investor interest.',
            'priority': 'medium'
        })
    
    if stats['mutual_matches'] > 3:
        insights.append({
            'type': 'positive',
            'title': 'Multiple Mutual Matches',
            'message': f'You have {stats["mutual_matches"]} mutual matches. Time to start conversations!',
            'priority': 'high'
        })
    
    return insights

@insights_bp.route('/dashboard/recommendations', methods=['GET'])
@jwt_required()
@handle_errors
def get_recommendations():
    user_id = get_jwt_identity()
    
    try:
        user = User.query.get(user_id)
        
        # Get personalized recommendations
        if user.user_type == 'investor':
            recommendations = _get_investor_recommendations(user_id)
        else:
            recommendations = _get_startup_recommendations(user_id)
        
        return jsonify({
            'recommendations': recommendations,
            'generated_at': db.func.now()
        })
        
    except Exception as e:
        logger.error(f"Error generating recommendations: {str(e)}")
        raise

def _get_investor_recommendations(investor_id):
    """Get personalized recommendations for investors"""
    recommendations = []
    
    # Get recent high-scoring matches that haven't been acted on
    pending_high_quality = Match.query.filter_by(
        investor_id=investor_id, 
        status='pending'
    ).filter(Match.compatibility_score >= 0.7).limit(3).all()
    
    for match in pending_high_quality:
        recommendations.append({
            'type': 'review_match',
            'title': 'High-Quality Match Available',
            'message': f'Review this {match.compatibility_percentage}% compatibility match',
            'action_url': f'/matches/{match.id}',
            'priority': 'high',
            'match_id': match.id
        })
    
    # Suggest profile improvements
    from app.models.investor_profile import InvestorProfile
    profile = InvestorProfile.query.filter_by(user_id=investor_id).first()
    if profile:
        if not profile.preferred_industries:
            recommendations.append({
                'type': 'profile_improvement',
                'title': 'Specify Industry Preferences',
                'message': 'Add your preferred industries to get better matches',
                'action_url': '/profile/investor',
                'priority': 'medium'
            })
        
        if not profile.expertise_areas:
            recommendations.append({
                'type': 'profile_improvement',
                'title': 'Add Your Expertise',
                'message': 'Highlight your expertise areas to attract relevant startups',
                'action_url': '/profile/investor',
                'priority': 'medium'
            })
    
    return recommendations

def _get_startup_recommendations(startup_id):
    """Get personalized recommendations for startups"""
    recommendations = []
    
    # Get interested investors that haven't been responded to
    investor_interested = Match.query.filter_by(
        startup_id=startup_id,
        investor_interest='interested',
        startup_interest='pending'
    ).limit(3).all()
    
    for match in investor_interested:
        recommendations.append({
            'type': 'respond_to_interest',
            'title': 'Investor Interested in Your Startup',
            'message': f'An investor has shown interest - respond to move forward',
            'action_url': f'/matches/{match.id}',
            'priority': 'high',
            'match_id': match.id
        })
    
    # Suggest profile improvements
    from app.models.startup_profile import StartupProfile
    profile = StartupProfile.query.filter_by(user_id=startup_id).first()
    if profile:
        if not profile.monthly_revenue and not profile.customer_count:
            recommendations.append({
                'type': 'profile_improvement',
                'title': 'Add Traction Metrics',
                'message': 'Add revenue or customer metrics to strengthen your profile',
                'action_url': '/profile/startup',
                'priority': 'medium'
            })
        
        if not profile.fund_usage_plan:
            recommendations.append({
                'type': 'profile_improvement',
                'title': 'Detail Fund Usage',
                'message': 'Explain how you plan to use the funding to attract investors',
                'action_url': '/profile/startup',
                'priority': 'medium'
            })
    
    return recommendations 