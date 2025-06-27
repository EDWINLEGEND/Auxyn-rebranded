# app/routes/rating.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.rating import Rating
from app.models.startup import Startup
from app.utils.logger import handle_errors, log_request_info, logger

rating_bp = Blueprint('rating', __name__)

@rating_bp.before_request
def before_request():
    log_request_info()

@rating_bp.route('/<int:startup_id>/rate', methods=['POST'])
@jwt_required()
@handle_errors
def rate_startup(startup_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Validate rating value
    if 'rating' not in data or not isinstance(data['rating'], int) or not (1 <= data['rating'] <= 5):
        logger.warning(f"Invalid rating value: {data.get('rating')}")
        return jsonify({'error': 'Rating must be an integer between 1 and 5'}), 400
    
    try:
        # Check if startup exists
        startup = Startup.query.get_or_404(startup_id)
        
        # Check if user already rated this startup
        existing_rating = Rating.query.filter_by(
            startup_id=startup_id,
            user_id=user_id
        ).first()
        
        if existing_rating:
            # Update existing rating
            existing_rating.rating = data['rating']
            existing_rating.review_text = data.get('review_text', '')
            logger.info(f"Updated rating for startup {startup_id} by user {user_id}")
        else:
            # Create new rating
            rating = Rating(
                startup_id=startup_id,
                user_id=user_id,
                rating=data['rating'],
                review_text=data.get('review_text', '')
            )
            db.session.add(rating)
            logger.info(f"Created new rating for startup {startup_id} by user {user_id}")
        
        db.session.commit()
        return jsonify({'message': 'Rating submitted successfully'}), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error rating startup {startup_id}: {str(e)}")
        raise

@rating_bp.route('/<int:startup_id>/ratings', methods=['GET'])
@jwt_required()
@handle_errors
def get_startup_ratings(startup_id):
    try:
        # Check if startup exists
        Startup.query.get_or_404(startup_id)
        
        ratings = Rating.query.filter_by(startup_id=startup_id).all()
        
        result = []
        for rating in ratings:
            result.append({
                'id': rating.id,
                'rating': rating.rating,
                'review_text': rating.review_text,
                'user_id': rating.user_id,
                'created_at': rating.created_at.isoformat() if rating.created_at else None
            })
        
        # Calculate average rating
        avg_rating = sum([r.rating for r in ratings]) / len(ratings) if ratings else 0
        
        logger.info(f"Retrieved {len(result)} ratings for startup {startup_id}")
        return jsonify({
            'ratings': result,
            'average_rating': round(avg_rating, 1),
            'total_ratings': len(ratings)
        })
        
    except Exception as e:
        logger.error(f"Error getting ratings for startup {startup_id}: {str(e)}")
        raise 