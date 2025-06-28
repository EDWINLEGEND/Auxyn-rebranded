# app/services/matching_service.py
from app import db
from app.models.user import User
from app.models.investor_profile import InvestorProfile
from app.models.startup_profile import StartupProfile
from app.models.match import Match
from app.models.match_insight import MatchInsight
from datetime import datetime, timedelta
import logging
import json

logger = logging.getLogger(__name__)

class MatchingService:
    
    @staticmethod
    def generate_matches_for_user(user_id, limit=10):
        """Generate matches for a specific user (investor or startup)"""
        user = User.query.get(user_id)
        if not user:
            raise ValueError("User not found")
        
        if user.user_type == 'investor':
            return MatchingService._generate_matches_for_investor(user_id, limit)
        elif user.user_type == 'startup':
            return MatchingService._generate_matches_for_startup(user_id, limit)
        else:
            raise ValueError("Invalid user type")
    
    @staticmethod
    def _generate_matches_for_investor(investor_id, limit=10):
        """Generate startup matches for an investor"""
        investor_profile = InvestorProfile.query.filter_by(user_id=investor_id).first()
        if not investor_profile:
            raise ValueError("Investor profile not found")
        
        # Get all startup profiles
        startup_profiles = StartupProfile.query.all()
        
        # Filter out existing matches
        existing_matches = Match.query.filter_by(investor_id=investor_id).all()
        existing_startup_ids = {match.startup_id for match in existing_matches}
        
        matches = []
        for startup_profile in startup_profiles:
            if startup_profile.user_id in existing_startup_ids:
                continue
            
            if len(matches) >= limit:
                break  
                
            match_score = MatchingService._calculate_compatibility_score(
                investor_profile, startup_profile
            )
            
            if match_score['overall_score'] > 0.3:  # Only create matches above threshold
                match = MatchingService._create_match_record(
                    investor_id, startup_profile.user_id, match_score
                )
                matches.append(match)
        
        # Sort by compatibility score
        matches.sort(key=lambda x: x.compatibility_score, reverse=True)
        return matches[:limit]
    
    @staticmethod
    def _generate_matches_for_startup(startup_id, limit=10):
        """Generate investor matches for a startup"""
        startup_profile = StartupProfile.query.filter_by(user_id=startup_id).first()
        if not startup_profile:
            raise ValueError("Startup profile not found")
        
        # Get all investor profiles
        investor_profiles = InvestorProfile.query.all()
        
        # Filter out existing matches
        existing_matches = Match.query.filter_by(startup_id=startup_id).all()
        existing_investor_ids = {match.investor_id for match in existing_matches}
        
        matches = []
        for investor_profile in investor_profiles:
            if investor_profile.user_id in existing_investor_ids:
                continue
            
            if len(matches) >= limit:
                break
                
            match_score = MatchingService._calculate_compatibility_score(
                investor_profile, startup_profile
            )
            
            if match_score['overall_score'] > 0.3:  # Only create matches above threshold
                match = MatchingService._create_match_record(
                    investor_profile.user_id, startup_id, match_score
                )
                matches.append(match)
        
        # Sort by compatibility score
        matches.sort(key=lambda x: x.compatibility_score, reverse=True)
        return matches[:limit]
    
    @staticmethod
    def _calculate_compatibility_score(investor_profile, startup_profile):
        """Calculate compatibility score between investor and startup"""
        scores = {
            'industry_score': 0.0,
            'funding_score': 0.0,
            'geographic_score': 0.0,
            'stage_score': 0.0,
            'market_size_score': 0.0
        }
        
        # Industry alignment (30% weight)
        scores['industry_score'] = MatchingService._calculate_industry_score(
            investor_profile, startup_profile
        )
        
        # Funding compatibility (25% weight)
        scores['funding_score'] = MatchingService._calculate_funding_score(
            investor_profile, startup_profile
        )
        
        # Geographic preference (15% weight)
        scores['geographic_score'] = MatchingService._calculate_geographic_score(
            investor_profile, startup_profile
        )
        
        # Investment stage alignment (20% weight)
        scores['stage_score'] = MatchingService._calculate_stage_score(
            investor_profile, startup_profile
        )
        
        # Market size alignment (10% weight)
        scores['market_size_score'] = MatchingService._calculate_market_size_score(
            investor_profile, startup_profile
        )
        
        # Calculate weighted overall score
        weights = {
            'industry_score': 0.30,
            'funding_score': 0.25,
            'geographic_score': 0.15,
            'stage_score': 0.20,
            'market_size_score': 0.10
        }
        
        overall_score = sum(scores[key] * weights[key] for key in scores)
        
        return {
            'overall_score': overall_score,
            **scores
        }
    
    @staticmethod
    def _calculate_industry_score(investor_profile, startup_profile):
        """Calculate industry alignment score"""
        investor_industries = investor_profile.preferred_industries_list
        startup_industry = startup_profile.industry
        
        if not investor_industries or not startup_industry:
            return 0.5  # Neutral score if data missing
        
        # Exact match
        if startup_industry in investor_industries:
            return 1.0
        
        # Related industry matching (simplified)
        tech_industries = ['technology', 'software', 'ai', 'fintech', 'edtech']
        health_industries = ['healthcare', 'biotech', 'medtech', 'pharma']
        
        investor_has_tech = any(ind in tech_industries for ind in investor_industries)
        startup_is_tech = startup_industry.lower() in tech_industries
        
        investor_has_health = any(ind in health_industries for ind in investor_industries)
        startup_is_health = startup_industry.lower() in health_industries
        
        if (investor_has_tech and startup_is_tech) or (investor_has_health and startup_is_health):
            return 0.7
        
        return 0.2  # Low but not zero for different industries
    
    @staticmethod
    def _calculate_funding_score(investor_profile, startup_profile):
        """Calculate funding compatibility score"""
        if not startup_profile.funding_needed:
            return 0.5
        
        funding_needed = startup_profile.funding_needed
        min_investment = investor_profile.min_investment or 0
        max_investment = investor_profile.max_investment or float('inf')
        
        if min_investment <= funding_needed <= max_investment:
            return 1.0
        elif funding_needed < min_investment:
            # Startup needs less than investor minimum
            if funding_needed >= min_investment * 0.5:
                return 0.7  # Close enough
            else:
                return 0.3  # Too small
        else:
            # Startup needs more than investor maximum
            if funding_needed <= max_investment * 1.5:
                return 0.6  # Slightly over budget
            else:
                return 0.2  # Way over budget
    
    @staticmethod
    def _calculate_geographic_score(investor_profile, startup_profile):
        """Calculate geographic compatibility score"""
        investor_locations = investor_profile.geographic_preference_list
        startup_location = startup_profile.headquarters
        
        if not investor_locations or not startup_location:
            return 0.7  # Assume neutral/good if no preference specified
        
        # Exact location match
        if startup_location in investor_locations:
            return 1.0
        
        # Region-based matching (simplified)
        us_states = ['california', 'new york', 'texas', 'florida', 'washington']
        if any(loc.lower() in us_states for loc in investor_locations) and \
           startup_location.lower() in us_states:
            return 0.8  # Same country
        
        return 0.5  # Different regions but not penalized heavily
    
    @staticmethod
    def _calculate_stage_score(investor_profile, startup_profile):
        """Calculate investment stage compatibility"""
        investor_stages = investor_profile.investment_stage_list
        startup_stage = startup_profile.funding_stage
        
        if not investor_stages or not startup_stage:
            return 0.6  # Neutral if no data
        
        if startup_stage in investor_stages:
            return 1.0
        
        # Stage progression logic
        stage_order = ['pre_seed', 'seed', 'series_a', 'series_b', 'series_c']
        
        try:
            startup_idx = stage_order.index(startup_stage)
            investor_indices = [stage_order.index(stage) for stage in investor_stages if stage in stage_order]
            
            if investor_indices:
                min_diff = min(abs(startup_idx - inv_idx) for inv_idx in investor_indices)
                if min_diff <= 1:
                    return 0.8  # Adjacent stages
                elif min_diff <= 2:
                    return 0.5  # Close stages
                else:
                    return 0.2  # Distant stages
        except ValueError:
            pass
        
        return 0.4  # Default for unknown stages
    
    @staticmethod
    def _calculate_market_size_score(investor_profile, startup_profile):
        """Calculate market size alignment score"""
        if not startup_profile.market_size:
            return 0.6  # Neutral if no data
        
        # Simple market size scoring
        market_scores = {
            'small': 0.4,
            'medium': 0.7,
            'large': 0.9,
            'very_large': 1.0
        }
        
        return market_scores.get(startup_profile.market_size, 0.5)
    
    @staticmethod
    def _create_match_record(investor_id, startup_id, match_score):
        """Create and save a match record"""
        match = Match(
            investor_id=investor_id,
            startup_id=startup_id,
            compatibility_score=match_score['overall_score'],
            industry_match_score=match_score['industry_score'],
            funding_stage_score=match_score['funding_score'],
            geographic_score=match_score['geographic_score'],
            experience_score=match_score.get('stage_score', 0),
            market_size_score=match_score['market_size_score'],
            confidence_level=MatchingService._determine_confidence_level(match_score['overall_score']),
            match_reasons=json.dumps(MatchingService._generate_match_reasons(match_score))
        )
        
        db.session.add(match)
        db.session.commit()
        
        # Generate insights for the match
        MatchingService._generate_match_insights(match)
        
        return match
    
    @staticmethod
    def _determine_confidence_level(score):
        """Determine confidence level based on score"""
        if score >= 0.8:
            return 'high'
        elif score >= 0.6:
            return 'medium'
        else:
            return 'low'
    
    @staticmethod
    def _generate_match_reasons(match_score):
        """Generate human-readable match reasons"""
        reasons = []
        
        if match_score['industry_score'] >= 0.8:
            reasons.append("Strong industry alignment")
        elif match_score['industry_score'] >= 0.6:
            reasons.append("Good industry fit")
        
        if match_score['funding_score'] >= 0.8:
            reasons.append("Perfect funding match")
        elif match_score['funding_score'] >= 0.6:
            reasons.append("Compatible funding requirements")
        
        if match_score['geographic_score'] >= 0.8:
            reasons.append("Same geographic region")
        
        if match_score['stage_score'] >= 0.8:
            reasons.append("Ideal investment stage")
        
        if match_score['market_size_score'] >= 0.8:
            reasons.append("Large market opportunity")
        
        if not reasons:
            reasons.append("Potential synergies identified")
        
        return reasons
    
    @staticmethod
    def _generate_match_insights(match):
        """Generate detailed insights for a match"""
        # Get profiles
        investor_profile = InvestorProfile.query.filter_by(user_id=match.investor_id).first()
        startup_profile = StartupProfile.query.filter_by(user_id=match.startup_id).first()
        
        insight = MatchInsight(
            match_id=match.id,
            overall_explanation=f"This match scores {match.compatibility_percentage}% based on industry alignment, funding compatibility, and strategic fit.",
            industry_analysis=MatchingService._generate_industry_analysis(investor_profile, startup_profile),
            industry_score=match.industry_match_score,
            funding_analysis=MatchingService._generate_funding_analysis(investor_profile, startup_profile),
            funding_score=match.funding_stage_score,
            geographic_analysis=MatchingService._generate_geographic_analysis(investor_profile, startup_profile),
            geographic_score=match.geographic_score,
            algorithm_confidence=match.compatibility_score,
            data_completeness=0.8,  # Placeholder
            insight_quality='medium'
        )
        
        db.session.add(insight)
        db.session.commit()
        
        return insight
    
    @staticmethod
    def _generate_industry_analysis(investor_profile, startup_profile):
        """Generate industry-specific analysis"""
        return f"The investor focuses on {', '.join(investor_profile.preferred_industries_list[:3])} while the startup operates in {startup_profile.industry}."
    
    @staticmethod
    def _generate_funding_analysis(investor_profile, startup_profile):
        """Generate funding-specific analysis"""
        return f"The startup seeks ${startup_profile.funding_needed:,} which fits within the investor's ${investor_profile.min_investment:,}-${investor_profile.max_investment:,} range."
    
    @staticmethod
    def _generate_geographic_analysis(investor_profile, startup_profile):
        """Generate geographic-specific analysis"""
        return f"Geographic alignment between investor preferences and startup location in {startup_profile.headquarters}."
    
    @staticmethod
    def get_matches_for_user(user_id, status_filter=None, limit=50):
        """Get existing matches for a user"""
        user = User.query.get(user_id)
        if not user:
            raise ValueError("User not found")
        
        query = Match.query
        
        if user.user_type == 'investor':
            query = query.filter_by(investor_id=user_id)
        else:
            query = query.filter_by(startup_id=user_id)
        
        if status_filter:
            query = query.filter_by(status=status_filter)
        
        return query.order_by(Match.compatibility_score.desc()).limit(limit).all()
    
    @staticmethod
    def update_match_interest(match_id, user_id, interest):
        """Update user interest in a match"""
        match = Match.query.get(match_id)
        if not match:
            raise ValueError("Match not found")
        
        user = User.query.get(user_id)
        if not user:
            raise ValueError("User not found")
        
        if user.user_type == 'investor' and match.investor_id == user_id:
            match.set_investor_interest(interest)
        elif user.user_type == 'startup' and match.startup_id == user_id:
            match.set_startup_interest(interest)
        else:
            raise ValueError("User not authorized for this match")
        
        return match 