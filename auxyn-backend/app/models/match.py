# app/models/match.py
from app import db
from datetime import datetime
import json

class Match(db.Model):
    __tablename__ = 'matches'
    
    id = db.Column(db.Integer, primary_key=True)
    
    # Match participants
    investor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    startup_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Match scoring
    compatibility_score = db.Column(db.Float, nullable=False)  # 0.0 to 1.0
    confidence_level = db.Column(db.String(20), default='medium')  # low, medium, high
    
    # Match status
    status = db.Column(db.String(20), default='pending')  # pending, viewed, interested, passed, matched
    investor_interest = db.Column(db.String(20))  # interested, not_interested, pending
    startup_interest = db.Column(db.String(20))  # interested, not_interested, pending
    
    # Match details (JSON fields for flexibility)
    match_reasons = db.Column(db.Text)  # JSON array of match reasons
    risk_factors = db.Column(db.Text)  # JSON array of potential concerns
    
    # Scoring breakdown
    industry_match_score = db.Column(db.Float)  # 0.0 to 1.0
    funding_stage_score = db.Column(db.Float)  # 0.0 to 1.0
    geographic_score = db.Column(db.Float)  # 0.0 to 1.0
    experience_score = db.Column(db.Float)  # 0.0 to 1.0
    market_size_score = db.Column(db.Float)  # 0.0 to 1.0
    
    # Interaction tracking
    investor_viewed_at = db.Column(db.DateTime)
    startup_viewed_at = db.Column(db.DateTime)
    last_interaction_at = db.Column(db.DateTime)
    
    # Algorithm metadata
    algorithm_version = db.Column(db.String(10), default='1.0')
    generated_by = db.Column(db.String(50), default='auto')  # auto, manual, suggested
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    expires_at = db.Column(db.DateTime)  # Optional expiration for matches
    
    # Relationships
    investor = db.relationship('User', foreign_keys=[investor_id], backref='investor_matches')
    startup = db.relationship('User', foreign_keys=[startup_id], backref='startup_matches')
    
    # Property methods for JSON fields
    @property
    def match_reasons_list(self):
        return json.loads(self.match_reasons) if self.match_reasons else []
    
    @match_reasons_list.setter
    def match_reasons_list(self, value):
        self.match_reasons = json.dumps(value) if value else None
    
    @property
    def risk_factors_list(self):
        return json.loads(self.risk_factors) if self.risk_factors else []
    
    @risk_factors_list.setter
    def risk_factors_list(self, value):
        self.risk_factors = json.dumps(value) if value else None
    
    @property
    def is_mutual_match(self):
        return (self.investor_interest == 'interested' and 
                self.startup_interest == 'interested')
    
    @property
    def compatibility_percentage(self):
        return round(self.compatibility_score * 100, 1)
    
    def mark_viewed_by_investor(self):
        self.investor_viewed_at = datetime.utcnow()
        self.last_interaction_at = datetime.utcnow()
        if self.status == 'pending':
            self.status = 'viewed'
        db.session.commit()
    
    def mark_viewed_by_startup(self):
        self.startup_viewed_at = datetime.utcnow()
        self.last_interaction_at = datetime.utcnow()
        if self.status == 'pending':
            self.status = 'viewed'
        db.session.commit()
    
    def set_investor_interest(self, interest):
        self.investor_interest = interest
        self.last_interaction_at = datetime.utcnow()
        self._update_match_status()
        db.session.commit()
    
    def set_startup_interest(self, interest):
        self.startup_interest = interest
        self.last_interaction_at = datetime.utcnow()
        self._update_match_status()
        db.session.commit()
    
    def _update_match_status(self):
        if self.is_mutual_match:
            self.status = 'matched'
        elif (self.investor_interest == 'not_interested' or 
              self.startup_interest == 'not_interested'):
            self.status = 'passed'
        elif (self.investor_interest == 'interested' or 
              self.startup_interest == 'interested'):
            self.status = 'interested'
    
    def to_dict(self, include_sensitive=False):
        base_dict = {
            'id': self.id,
            'investor_id': self.investor_id,
            'startup_id': self.startup_id,
            'compatibility_score': self.compatibility_score,
            'compatibility_percentage': self.compatibility_percentage,
            'confidence_level': self.confidence_level,
            'status': self.status,
            'match_reasons': self.match_reasons_list,
            'is_mutual_match': self.is_mutual_match,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_sensitive:
            base_dict.update({
                'investor_interest': self.investor_interest,
                'startup_interest': self.startup_interest,
                'risk_factors': self.risk_factors_list,
                'industry_match_score': self.industry_match_score,
                'funding_stage_score': self.funding_stage_score,
                'geographic_score': self.geographic_score,
                'experience_score': self.experience_score,
                'market_size_score': self.market_size_score,
                'investor_viewed_at': self.investor_viewed_at.isoformat() if self.investor_viewed_at else None,
                'startup_viewed_at': self.startup_viewed_at.isoformat() if self.startup_viewed_at else None,
                'last_interaction_at': self.last_interaction_at.isoformat() if self.last_interaction_at else None,
                'algorithm_version': self.algorithm_version,
                'generated_by': self.generated_by
            })
        
        return base_dict 