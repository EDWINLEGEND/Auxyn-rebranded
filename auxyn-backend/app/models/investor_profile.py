from app import db
from datetime import datetime
import json

class InvestorProfile(db.Model):
    __tablename__ = 'investor_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Basic info
    name = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100))
    company = db.Column(db.String(100))
    bio = db.Column(db.Text)
    location = db.Column(db.String(100))
    
    # Investment preferences
    min_investment = db.Column(db.Integer, default=0)  # in USD
    max_investment = db.Column(db.Integer, default=1000000)  # in USD
    preferred_industries = db.Column(db.Text)  # JSON array of industries
    investment_stage = db.Column(db.Text)  # JSON array: seed, series_a, series_b, etc.
    
    # Investment criteria
    risk_tolerance = db.Column(db.String(20), default='medium')  # low, medium, high
    geographic_preference = db.Column(db.Text)  # JSON array of regions
    team_size_preference = db.Column(db.String(20))  # startup, small, medium, large
    
    # Experience and expertise
    years_experience = db.Column(db.Integer)
    previous_investments = db.Column(db.Integer, default=0)
    expertise_areas = db.Column(db.Text)  # JSON array of expertise areas
    mentoring_available = db.Column(db.Boolean, default=False)
    
    # Deal preferences
    follow_on_investment = db.Column(db.Boolean, default=True)
    co_investment_preferred = db.Column(db.Boolean, default=False)
    board_participation = db.Column(db.Boolean, default=False)
    
    # Contact info
    linkedin_url = db.Column(db.String(200))
    website_url = db.Column(db.String(200))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('investor_profile', uselist=False))
    
    @property
    def preferred_industries_list(self):
        return json.loads(self.preferred_industries) if self.preferred_industries else []
    
    @preferred_industries_list.setter
    def preferred_industries_list(self, value):
        self.preferred_industries = json.dumps(value) if value else None
    
    @property
    def investment_stage_list(self):
        return json.loads(self.investment_stage) if self.investment_stage else []
    
    @investment_stage_list.setter
    def investment_stage_list(self, value):
        self.investment_stage = json.dumps(value) if value else None
    
    @property
    def geographic_preference_list(self):
        return json.loads(self.geographic_preference) if self.geographic_preference else []
    
    @geographic_preference_list.setter
    def geographic_preference_list(self, value):
        self.geographic_preference = json.dumps(value) if value else None
    
    @property
    def expertise_areas_list(self):
        return json.loads(self.expertise_areas) if self.expertise_areas else []
    
    @expertise_areas_list.setter
    def expertise_areas_list(self, value):
        self.expertise_areas = json.dumps(value) if value else None
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'title': self.title,
            'company': self.company,
            'bio': self.bio,
            'location': self.location,
            'min_investment': self.min_investment,
            'max_investment': self.max_investment,
            'preferred_industries': self.preferred_industries_list,
            'investment_stage': self.investment_stage_list,
            'risk_tolerance': self.risk_tolerance,
            'geographic_preference': self.geographic_preference_list,
            'team_size_preference': self.team_size_preference,
            'years_experience': self.years_experience,
            'previous_investments': self.previous_investments,
            'expertise_areas': self.expertise_areas_list,
            'mentoring_available': self.mentoring_available,
            'follow_on_investment': self.follow_on_investment,
            'co_investment_preferred': self.co_investment_preferred,
            'board_participation': self.board_participation,
            'linkedin_url': self.linkedin_url,
            'website_url': self.website_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        } 