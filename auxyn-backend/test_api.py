#!/usr/bin/env python3
"""
Quick test script for the Flask API
Run this after starting the Flask server to test endpoints
"""

import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_api():
    print("🚀 Testing Flask API...")
    
    # Test 1: Register a user
    print("\n1. Testing Registration...")
    register_data = {
        "email": "investor@test.com",
        "password": "password123",
        "user_type": "investor"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
    print(f"Registration Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    # Test 2: Login
    print("\n2. Testing Login...")
    login_data = {
        "email": "investor@test.com",
        "password": "password123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"Login Status: {response.status_code}")
    
    if response.status_code == 200:
        token = response.json()['token']
        print(f"✅ Got token: {token[:50]}...")
        
        headers = {"Authorization": f"Bearer {token}"}
        
        # Test 3: Create a startup
        print("\n3. Testing Create Startup...")
        startup_data = {
            "name": "TechCorp AI",
            "description": "Revolutionary AI solutions for businesses",
            "category": "Technology"
        }
        
        response = requests.post(f"{BASE_URL}/startups", json=startup_data, headers=headers)
        print(f"Create Startup Status: {response.status_code}")
        print(f"Response: {response.json()}")
        
        # Test 4: Get startups
        print("\n4. Testing Get Startups...")
        response = requests.get(f"{BASE_URL}/startups", headers=headers)
        print(f"Get Startups Status: {response.status_code}")
        
        if response.status_code == 200:
            startups = response.json()
            print(f"✅ Found {len(startups)} startups")
            
            if startups:
                startup_id = startups[0]['id']
                
                # Test 5: Rate a startup
                print(f"\n5. Testing Rate Startup {startup_id}...")
                rating_data = {
                    "rating": 5,
                    "review_text": "Amazing startup with great potential!"
                }
                
                response = requests.post(f"{BASE_URL}/startups/{startup_id}/rate", 
                                       json=rating_data, headers=headers)
                print(f"Rate Startup Status: {response.status_code}")
                print(f"Response: {response.json()}")
                
                # Test 6: Follow a startup
                print(f"\n6. Testing Follow Startup {startup_id}...")
                response = requests.post(f"{BASE_URL}/startups/{startup_id}/follow", 
                                       headers=headers)
                print(f"Follow Status: {response.status_code}")
                print(f"Response: {response.json()}")
                
                # Test 7: Get startup ratings
                print(f"\n7. Testing Get Ratings for Startup {startup_id}...")
                response = requests.get(f"{BASE_URL}/startups/{startup_id}/ratings", 
                                      headers=headers)
                print(f"Get Ratings Status: {response.status_code}")
                print(f"Response: {response.json()}")
        
    else:
        print("❌ Login failed!")

if __name__ == "__main__":
    try:
        test_api()
        print("\n✅ API testing completed!")
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to Flask server. Make sure it's running on localhost:5000")
    except Exception as e:
        print(f"❌ Error: {e}") 