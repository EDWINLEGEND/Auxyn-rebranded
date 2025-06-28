from app import db
from datetime import datetime

class UserPreferences(db.Model):
    __tablename__ = 'user_preferences'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Communication preferences
    email_notifications = db.Column(db.Boolean, default=True)
    match_notifications = db.Column(db.Boolean, default=True)
    weekly_digest = db.Column(db.Boolean, default=True)
    
    # Privacy settings
    profile_visibility = db.Column(db.String(20), default='public')  # public, private, investors_only
    contact_sharing = db.Column(db.Boolean, default=False)
    
    # Activity preferences
    auto_matching = db.Column(db.Boolean, default=True)
    match_frequency = db.Column(db.String(20), default='daily')  # daily, weekly, monthly
    
    # Created/Updated timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('preferences', uselist=False))
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'email_notifications': self.email_notifications,
            'match_notifications': self.match_notifications,
            'weekly_digest': self.weekly_digest,
            'profile_visibility': self.profile_visibility,
            'contact_sharing': self.contact_sharing,
            'auto_matching': self.auto_matching,
            'match_frequency': self.match_frequency,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        } 