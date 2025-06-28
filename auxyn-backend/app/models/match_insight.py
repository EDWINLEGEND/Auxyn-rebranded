# app/models/match_insight.py
from app import db
from datetime import datetime
import json

class MatchInsight(db.Model):
    __tablename__ = 'match_insights'
    
    id = db.Column(db.Integer, primary_key=True)
    match_id = db.Column(db.Integer, db.ForeignKey('matches.id'), nullable=False)
    
    # Detailed scoring explanation
    overall_explanation = db.Column(db.Text)  # High-level explanation of the match
    
    # Industry alignment insights
    industry_analysis = db.Column(db.Text)
    industry_score = db.Column(db.Float)
    industry_reasons = db.Column(db.Text)  # JSON array
    
    # Funding compatibility
    funding_analysis = db.Column(db.Text)
    funding_score = db.Column(db.Float)
    funding_reasons = db.Column(db.Text)  # JSON array
    
    # Geographic considerations
    geographic_analysis = db.Column(db.Text)
    geographic_score = db.Column(db.Float)
    geographic_reasons = db.Column(db.Text)  # JSON array
    
    # Experience and expertise match
    experience_analysis = db.Column(db.Text)
    experience_score = db.Column(db.Float)
    experience_reasons = db.Column(db.Text)  # JSON array
    
    # Market and opportunity assessment
    market_analysis = db.Column(db.Text)
    market_score = db.Column(db.Float)
    market_reasons = db.Column(db.Text)  # JSON array
    
    # Risk assessment
    risk_analysis = db.Column(db.Text)
    risk_level = db.Column(db.String(20))  # low, medium, high
    risk_factors = db.Column(db.Text)  # JSON array
    mitigation_suggestions = db.Column(db.Text)  # JSON array
    
    # Synergy opportunities
    synergy_analysis = db.Column(db.Text)
    synergy_opportunities = db.Column(db.Text)  # JSON array
    value_add_potential = db.Column(db.Text)  # JSON array
    
    # Success probability
    success_probability = db.Column(db.Float)  # 0.0 to 1.0
    success_factors = db.Column(db.Text)  # JSON array
    success_timeline = db.Column(db.String(50))  # 6_months, 1_year, 2_years, etc.
    
    # Comparable deals/matches
    similar_successful_matches = db.Column(db.Text)  # JSON array
    market_precedents = db.Column(db.Text)  # JSON array
    
    # Next steps recommendations
    recommended_actions = db.Column(db.Text)  # JSON array
    conversation_starters = db.Column(db.Text)  # JSON array
    due_diligence_focus = db.Column(db.Text)  # JSON array
    
    # AI/Algorithm insights
    algorithm_confidence = db.Column(db.Float)  # 0.0 to 1.0
    data_completeness = db.Column(db.Float)  # 0.0 to 1.0
    insight_quality = db.Column(db.String(20))  # low, medium, high
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    match = db.relationship('Match', backref=db.backref('insights', uselist=False))
    
    # Property methods for JSON fields
    @property
    def industry_reasons_list(self):
        return json.loads(self.industry_reasons) if self.industry_reasons else []
    
    @industry_reasons_list.setter
    def industry_reasons_list(self, value):
        self.industry_reasons = json.dumps(value) if value else None
    
    @property
    def funding_reasons_list(self):
        return json.loads(self.funding_reasons) if self.funding_reasons else []
    
    @funding_reasons_list.setter
    def funding_reasons_list(self, value):
        self.funding_reasons = json.dumps(value) if value else None
    
    @property
    def geographic_reasons_list(self):
        return json.loads(self.geographic_reasons) if self.geographic_reasons else []
    
    @geographic_reasons_list.setter
    def geographic_reasons_list(self, value):
        self.geographic_reasons = json.dumps(value) if value else None
    
    @property
    def experience_reasons_list(self):
        return json.loads(self.experience_reasons) if self.experience_reasons else []
    
    @experience_reasons_list.setter
    def experience_reasons_list(self, value):
        self.experience_reasons = json.dumps(value) if value else None
    
    @property
    def market_reasons_list(self):
        return json.loads(self.market_reasons) if self.market_reasons else []
    
    @market_reasons_list.setter
    def market_reasons_list(self, value):
        self.market_reasons = json.dumps(value) if value else None
    
    @property
    def risk_factors_list(self):
        return json.loads(self.risk_factors) if self.risk_factors else []
    
    @risk_factors_list.setter
    def risk_factors_list(self, value):
        self.risk_factors = json.dumps(value) if value else None
    
    @property
    def mitigation_suggestions_list(self):
        return json.loads(self.mitigation_suggestions) if self.mitigation_suggestions else []
    
    @mitigation_suggestions_list.setter
    def mitigation_suggestions_list(self, value):
        self.mitigation_suggestions = json.dumps(value) if value else None
    
    @property
    def synergy_opportunities_list(self):
        return json.loads(self.synergy_opportunities) if self.synergy_opportunities else []
    
    @synergy_opportunities_list.setter
    def synergy_opportunities_list(self, value):
        self.synergy_opportunities = json.dumps(value) if value else None
    
    @property
    def value_add_potential_list(self):
        return json.loads(self.value_add_potential) if self.value_add_potential else []
    
    @value_add_potential_list.setter
    def value_add_potential_list(self, value):
        self.value_add_potential = json.dumps(value) if value else None
    
    @property
    def success_factors_list(self):
        return json.loads(self.success_factors) if self.success_factors else []
    
    @success_factors_list.setter
    def success_factors_list(self, value):
        self.success_factors = json.dumps(value) if value else None
    
    @property
    def similar_successful_matches_list(self):
        return json.loads(self.similar_successful_matches) if self.similar_successful_matches else []
    
    @similar_successful_matches_list.setter
    def similar_successful_matches_list(self, value):
        self.similar_successful_matches = json.dumps(value) if value else None
    
    @property
    def market_precedents_list(self):
        return json.loads(self.market_precedents) if self.market_precedents else []
    
    @market_precedents_list.setter
    def market_precedents_list(self, value):
        self.market_precedents = json.dumps(value) if value else None
    
    @property
    def recommended_actions_list(self):
        return json.loads(self.recommended_actions) if self.recommended_actions else []
    
    @recommended_actions_list.setter
    def recommended_actions_list(self, value):
        self.recommended_actions = json.dumps(value) if value else None
    
    @property
    def conversation_starters_list(self):
        return json.loads(self.conversation_starters) if self.conversation_starters else []
    
    @conversation_starters_list.setter
    def conversation_starters_list(self, value):
        self.conversation_starters = json.dumps(value) if value else None
    
    @property
    def due_diligence_focus_list(self):
        return json.loads(self.due_diligence_focus) if self.due_diligence_focus else []
    
    @due_diligence_focus_list.setter
    def due_diligence_focus_list(self, value):
        self.due_diligence_focus = json.dumps(value) if value else None
    
    def to_dict(self):
        return {
            'id': self.id,
            'match_id': self.match_id,
            'overall_explanation': self.overall_explanation,
            'industry_analysis': self.industry_analysis,
            'industry_score': self.industry_score,
            'industry_reasons': self.industry_reasons_list,
            'funding_analysis': self.funding_analysis,
            'funding_score': self.funding_score,
            'funding_reasons': self.funding_reasons_list,
            'geographic_analysis': self.geographic_analysis,
            'geographic_score': self.geographic_score,
            'geographic_reasons': self.geographic_reasons_list,
            'experience_analysis': self.experience_analysis,
            'experience_score': self.experience_score,
            'experience_reasons': self.experience_reasons_list,
            'market_analysis': self.market_analysis,
            'market_score': self.market_score,
            'market_reasons': self.market_reasons_list,
            'risk_analysis': self.risk_analysis,
            'risk_level': self.risk_level,
            'risk_factors': self.risk_factors_list,
            'mitigation_suggestions': self.mitigation_suggestions_list,
            'synergy_analysis': self.synergy_analysis,
            'synergy_opportunities': self.synergy_opportunities_list,
            'value_add_potential': self.value_add_potential_list,
            'success_probability': self.success_probability,
            'success_factors': self.success_factors_list,
            'success_timeline': self.success_timeline,
            'similar_successful_matches': self.similar_successful_matches_list,
            'market_precedents': self.market_precedents_list,
            'recommended_actions': self.recommended_actions_list,
            'conversation_starters': self.conversation_starters_list,
            'due_diligence_focus': self.due_diligence_focus_list,
            'algorithm_confidence': self.algorithm_confidence,
            'data_completeness': self.data_completeness,
            'insight_quality': self.insight_quality,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        } 