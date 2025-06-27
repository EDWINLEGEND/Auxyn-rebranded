import logging
from logging.handlers import RotatingFileHandler
import os
import traceback
from functools import wraps
from flask import request, jsonify

# Create logs directory if it doesn't exist
if not os.path.exists('logs'):
    os.makedirs('logs')

# Configure logger
logger = logging.getLogger('auxyn')
logger.setLevel(logging.INFO)

# Create file handler
file_handler = RotatingFileHandler('logs/auxyn.log', maxBytes=10240, backupCount=10)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
))
file_handler.setLevel(logging.INFO)
logger.addHandler(file_handler)

# Create console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
console_handler.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))
logger.addHandler(console_handler)

def log_error(e: Exception, context: str = None) -> None:
    """Log an exception with traceback and optional context"""
    error_msg = f"Error: {str(e)}"
    if context:
        error_msg = f"{context} - {error_msg}"
    logger.error(f"{error_msg}\nTraceback: {traceback.format_exc()}")

def handle_errors(f):
    """Decorator to handle errors in routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            log_error(e, f"Error in {f.__name__}")
            return jsonify({
                'error': str(e),
                'message': 'An unexpected error occurred'
            }), 500
    return decorated_function

def log_request_info():
    """Log incoming request information"""
    logger.info(f"Request: {request.method} {request.url}")
    logger.info(f"Headers: {dict(request.headers)}")
    if request.is_json:
        logger.info(f"Body: {request.get_json()}") 