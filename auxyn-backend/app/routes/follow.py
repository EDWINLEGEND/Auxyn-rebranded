# app/routes/follow.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.follow import Follow
from app.models.startup import Startup
from app.utils.logger import handle_errors, log_request_info, logger

follow_bp = Blueprint('follow', __name__)

@follow_bp.before_request
def before_request():
    log_request_info()

@follow_bp.route('/<int:startup_id>/follow', methods=['POST'])
@jwt_required()
@handle_errors
def follow_startup(startup_id):
    user_id = get_jwt_identity()
    
    try:
        # Check if startup exists
        startup = Startup.query.get_or_404(startup_id)
        
        # Check if already following
        existing_follow = Follow.query.filter_by(
            user_id=user_id,
            startup_id=startup_id
        ).first()
        
        if existing_follow:
            logger.warning(f"User {user_id} already follows startup {startup_id}")
            return jsonify({'message': 'Already following this startup'}), 400
        
        follow = Follow(user_id=user_id, startup_id=startup_id)
        db.session.add(follow)
        db.session.commit()
        
        logger.info(f"User {user_id} followed startup {startup_id}")
        return jsonify({'message': 'Successfully followed startup'}), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error following startup {startup_id}: {str(e)}")
        raise

@follow_bp.route('/<int:startup_id>/follow', methods=['DELETE'])
@jwt_required()
@handle_errors
def unfollow_startup(startup_id):
    user_id = get_jwt_identity()
    
    try:
        follow = Follow.query.filter_by(
            user_id=user_id,
            startup_id=startup_id
        ).first()
        
        if not follow:
            logger.warning(f"User {user_id} not following startup {startup_id}")
            return jsonify({'message': 'Not following this startup'}), 400
        
        db.session.delete(follow)
        db.session.commit()
        
        logger.info(f"User {user_id} unfollowed startup {startup_id}")
        return jsonify({'message': 'Successfully unfollowed startup'}), 200
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error unfollowing startup {startup_id}: {str(e)}")
        raise

@follow_bp.route('/<int:startup_id>/followers', methods=['GET'])
@jwt_required()
@handle_errors
def get_followers(startup_id):
    try:
        # Check if startup exists
        startup = Startup.query.get_or_404(startup_id)
        
        follower_count = Follow.query.filter_by(startup_id=startup_id).count()
        
        logger.info(f"Retrieved follower count for startup {startup_id}: {follower_count}")
        return jsonify({
            'startup_id': startup_id,
            'follower_count': follower_count
        })
        
    except Exception as e:
        logger.error(f"Error getting followers for startup {startup_id}: {str(e)}")
        raise 