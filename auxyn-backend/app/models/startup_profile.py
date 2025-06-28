# app/models/startup_profile.py
from app import db
from datetime import datetime
import json

class StartupProfile(db.Model):
    __tablename__ = 'startup_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    startup_id = db.Column(db.Integer, db.ForeignKey('startup.id'), nullable=True)
    
    # Basic company info
    company_name = db.Column(db.String(100), nullable=False)
    tagline = db.Column(db.String(200))
    description = db.Column(db.Text)
    website_url = db.Column(db.String(200))
    logo_url = db.Column(db.String(200))
    
    # Business details
    industry = db.Column(db.String(50))
    business_model = db.Column(db.String(50))  # B2B, B2C, B2B2C, marketplace, etc.
    target_market = db.Column(db.Text)  # JSON array
    value_proposition = db.Column(db.Text)
    
    # Company stage and metrics
    company_stage = db.Column(db.String(20))  # idea, mvp, early_revenue, growth, scale
    founded_date = db.Column(db.Date)
    team_size = db.Column(db.Integer)
    
    # Financial info
    funding_needed = db.Column(db.Integer)  # in USD
    funding_stage = db.Column(db.String(20))  # pre_seed, seed, series_a, etc.
    current_valuation = db.Column(db.Integer)  # in USD
    monthly_revenue = db.Column(db.Integer)  # in USD
    monthly_burn_rate = db.Column(db.Integer)  # in USD
    runway_months = db.Column(db.Integer)
    
    # Previous funding
    total_raised = db.Column(db.Integer, default=0)  # in USD
    previous_investors = db.Column(db.Text)  # JSON array
    
    # Market and traction
    market_size = db.Column(db.String(20))  # small, medium, large, very_large
    customer_count = db.Column(db.Integer, default=0)
    monthly_growth_rate = db.Column(db.Float)  # percentage
    
    # Team info
    founder_names = db.Column(db.Text)  # JSON array
    key_team_members = db.Column(db.Text)  # JSON array with roles
    advisors = db.Column(db.Text)  # JSON array
    
    # Location and legal
    headquarters = db.Column(db.String(100))
    legal_structure = db.Column(db.String(50))  # LLC, Corp, etc.
    intellectual_property = db.Column(db.Text)  # patents, trademarks, etc.
    
    # Use of funds
    fund_usage_plan = db.Column(db.Text)  # JSON object with categories and amounts
    
    # Social proof
    awards_recognition = db.Column(db.Text)  # JSON array
    press_coverage = db.Column(db.Text)  # JSON array of URLs
    
    # Contact and social
    linkedin_url = db.Column(db.String(200))
    twitter_url = db.Column(db.String(200))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('startup_profile', uselist=False))
    startup = db.relationship('Startup', backref=db.backref('profile', uselist=False))
    
    # Property methods for JSON fields
    @property
    def target_market_list(self):
        return json.loads(self.target_market) if self.target_market else []
    
    @target_market_list.setter
    def target_market_list(self, value):
        self.target_market = json.dumps(value) if value else None
    
    @property
    def previous_investors_list(self):
        return json.loads(self.previous_investors) if self.previous_investors else []
    
    @previous_investors_list.setter
    def previous_investors_list(self, value):
        self.previous_investors = json.dumps(value) if value else None
    
    @property
    def founder_names_list(self):
        return json.loads(self.founder_names) if self.founder_names else []
    
    @founder_names_list.setter
    def founder_names_list(self, value):
        self.founder_names = json.dumps(value) if value else None
    
    @property
    def key_team_members_list(self):
        return json.loads(self.key_team_members) if self.key_team_members else []
    
    @key_team_members_list.setter
    def key_team_members_list(self, value):
        self.key_team_members = json.dumps(value) if value else None
    
    @property
    def advisors_list(self):
        return json.loads(self.advisors) if self.advisors else []
    
    @advisors_list.setter
    def advisors_list(self, value):
        self.advisors = json.dumps(value) if value else None
    
    @property
    def fund_usage_plan_dict(self):
        return json.loads(self.fund_usage_plan) if self.fund_usage_plan else {}
    
    @fund_usage_plan_dict.setter
    def fund_usage_plan_dict(self, value):
        self.fund_usage_plan = json.dumps(value) if value else None
    
    @property
    def awards_recognition_list(self):
        return json.loads(self.awards_recognition) if self.awards_recognition else []
    
    @awards_recognition_list.setter
    def awards_recognition_list(self, value):
        self.awards_recognition = json.dumps(value) if value else None
    
    @property
    def press_coverage_list(self):
        return json.loads(self.press_coverage) if self.press_coverage else []
    
    @press_coverage_list.setter
    def press_coverage_list(self, value):
        self.press_coverage = json.dumps(value) if value else None
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'startup_id': self.startup_id,
            'company_name': self.company_name,
            'tagline': self.tagline,
            'description': self.description,
            'website_url': self.website_url,
            'logo_url': self.logo_url,
            'industry': self.industry,
            'business_model': self.business_model,
            'target_market': self.target_market_list,
            'value_proposition': self.value_proposition,
            'company_stage': self.company_stage,
            'founded_date': self.founded_date.isoformat() if self.founded_date else None,
            'team_size': self.team_size,
            'funding_needed': self.funding_needed,
            'funding_stage': self.funding_stage,
            'current_valuation': self.current_valuation,
            'monthly_revenue': self.monthly_revenue,
            'monthly_burn_rate': self.monthly_burn_rate,
            'runway_months': self.runway_months,
            'total_raised': self.total_raised,
            'previous_investors': self.previous_investors_list,
            'market_size': self.market_size,
            'customer_count': self.customer_count,
            'monthly_growth_rate': self.monthly_growth_rate,
            'founder_names': self.founder_names_list,
            'key_team_members': self.key_team_members_list,
            'advisors': self.advisors_list,
            'headquarters': self.headquarters,
            'legal_structure': self.legal_structure,
            'intellectual_property': self.intellectual_property,
            'fund_usage_plan': self.fund_usage_plan_dict,
            'awards_recognition': self.awards_recognition_list,
            'press_coverage': self.press_coverage_list,
            'linkedin_url': self.linkedin_url,
            'twitter_url': self.twitter_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        } 