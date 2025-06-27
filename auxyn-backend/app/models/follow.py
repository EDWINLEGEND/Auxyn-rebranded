from app import db

class Follow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    startup_id = db.Column(db.Integer, db.ForeignKey('startup.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    # Ensure unique combination of user_id and startup_id
    __table_args__ = (db.UniqueConstraint('user_id', 'startup_id', name='unique_user_startup_follow'),) 