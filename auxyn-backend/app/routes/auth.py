# app/routes/auth.py
from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from app import db
from app.models.user import User
from app.utils.logger import handle_errors, log_request_info, logger
from datetime import datetime, timedelta

auth_bp = Blueprint('auth', __name__)

@auth_bp.before_request
def before_request():
    log_request_info()

@auth_bp.route('/register', methods=['POST'])
@handle_errors
def register():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['email', 'password']
    for field in required_fields:
        if field not in data:
            logger.warning(f"Registration failed: Missing {field}")
            return jsonify({'error': f'Missing {field}'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        logger.warning(f"Registration failed: Email {data['email']} already exists")
        return jsonify({'error': 'Email already exists'}), 400
    
    try:
        user = User(
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            user_type=data.get('user_type', 'investor')
        )
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token after successful registration
        access_token = create_access_token(
            identity=str(user.id),  # Convert to string to ensure serialization
            additional_claims={
                'email': user.email,
                'user_type': user.user_type
            }
        )
        
        logger.info(f"User registered successfully: {data['email']}")
        return jsonify({
            'message': 'User created successfully',
            'token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'user_type': user.user_type
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Registration error for {data['email']}: {str(e)}")
        raise

@auth_bp.route('/login', methods=['POST'])
@handle_errors
def login():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['email', 'password']
    for field in required_fields:
        if field not in data:
            logger.warning(f"Login failed: Missing {field}")
            return jsonify({'error': f'Missing {field}'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        # Create access token with additional claims
        access_token = create_access_token(
            identity=str(user.id),  # Convert to string to ensure serialization
            additional_claims={
                'email': user.email,
                'user_type': user.user_type
            }
        )
        
        logger.info(f"User logged in successfully: {data['email']}")
        return jsonify({
            'token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'user_type': user.user_type
            }
        })
    
    logger.warning(f"Login failed: Invalid credentials for {data.get('email')}")
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/verify-token', methods=['GET'])
@jwt_required()
@handle_errors
def verify_token():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    return jsonify({
        'user': {
            'id': user.id,
            'email': user.email,
            'user_type': user.user_type
        }
    }) 