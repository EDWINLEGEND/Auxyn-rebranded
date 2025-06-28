# app/__init__.py
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
import os

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Ensure secret key is set
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'dev-jwt-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # Tokens don't expire for testing
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    # Import models
    from app.models import user, startup, rating, follow
    from app.models import user_preferences, investor_profile, startup_profile
    from app.models import match, match_insight

    # Register routes
    from app.routes.auth import auth_bp
    from app.routes.startup import startup_bp
    from app.routes.rating import rating_bp
    from app.routes.follow import follow_bp
    from app.routes.profile import profile_bp
    from app.routes.matching import matching_bp
    from app.routes.insights import insights_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(startup_bp, url_prefix='/api/startups')
    app.register_blueprint(rating_bp, url_prefix='/api/startups')
    app.register_blueprint(follow_bp, url_prefix='/api/startups')
    app.register_blueprint(profile_bp, url_prefix='/api/users')
    app.register_blueprint(matching_bp, url_prefix='/api/matches')
    app.register_blueprint(insights_bp, url_prefix='/api/matches')

    # JWT error handlers
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            'message': 'The token has expired',
            'error': 'token_expired'
        }), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({
            'message': 'Signature verification failed',
            'error': 'invalid_token'
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            'message': 'Request does not contain an access token',
            'error': 'authorization_required'
        }), 401

    return app