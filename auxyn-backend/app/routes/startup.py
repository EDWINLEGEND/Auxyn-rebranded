# app/routes/startup.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.startup import Startup
from app.models.rating import Rating
from app.models.follow import Follow
from app.utils.logger import handle_errors, log_request_info, logger

startup_bp = Blueprint('startup', __name__)

@startup_bp.before_request
def before_request():
    log_request_info()

@startup_bp.route('', methods=['GET'])
@jwt_required()
@handle_errors
def get_startups():
    try:
        startups = Startup.query.all()
        result = []
        
        for startup in startups:
            # Calculate average rating
            ratings = Rating.query.filter_by(startup_id=startup.id).all()
            avg_rating = sum([r.rating for r in ratings]) / len(ratings) if ratings else 0
            
            # Get follower count
            follower_count = Follow.query.filter_by(startup_id=startup.id).count()
            
            result.append({
                'id': startup.id,
                'name': startup.name,
                'description': startup.description,
                'category': startup.category,
                'rating': round(avg_rating, 1),
                'followers': follower_count
            })
        
        logger.info(f"Retrieved {len(result)} startups")
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error retrieving startups: {str(e)}")
        raise

@startup_bp.route('/<int:startup_id>', methods=['GET'])
@jwt_required()
@handle_errors
def get_startup(startup_id):
    startup = Startup.query.get_or_404(startup_id)
    
    try:
        # Calculate average rating
        ratings = Rating.query.filter_by(startup_id=startup.id).all()
        avg_rating = sum([r.rating for r in ratings]) / len(ratings) if ratings else 0
        
        # Get follower count
        follower_count = Follow.query.filter_by(startup_id=startup.id).count()
        
        logger.info(f"Retrieved startup details for ID: {startup_id}")
        return jsonify({
            'id': startup.id,
            'name': startup.name,
            'description': startup.description,
            'category': startup.category,
            'rating': round(avg_rating, 1),
            'followers': follower_count
        })
        
    except Exception as e:
        logger.error(f"Error retrieving startup {startup_id}: {str(e)}")
        raise

@startup_bp.route('', methods=['POST'])
@jwt_required()
@handle_errors
def create_startup():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name', 'description', 'category']
    for field in required_fields:
        if field not in data:
            logger.warning(f"Startup creation failed: Missing {field}")
            return jsonify({'error': f'Missing {field}'}), 400
    
    try:
        startup = Startup(
            name=data['name'],
            description=data['description'],
            category=data['category']
        )
        
        db.session.add(startup)
        db.session.commit()
        
        logger.info(f"Created new startup: {data['name']}")
        return jsonify({
            'message': 'Startup created successfully',
            'id': startup.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error creating startup: {str(e)}")
        raise 