from supabase import create_client
from flask import jsonify
import os
import requests
from google.oauth2 import id_token 
from google.auth.transport import requests as google_requests 
from dotenv import load_dotenv
load_dotenv()

supabase = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))

def signup_user(name, email, password):
    try:
        # Create the user in Supabase Auth
        response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })
        
        # Debug
        print("Supabase response:", response)
        
        # Just return the auth response
        return response
    except Exception as e:
        print("Error in signup:", str(e))
        return {'error': str(e)}

def login_user(email, password):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        return response
    except Exception as e:
        print("Error in login:", str(e))
        return {'error': str(e)}

def google_signin(token):
    try:
        # First, verify the Google token
        CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
        try:
            idinfo = id_token.verify_oauth2_token(
                token, 
                google_requests.Request(), 
                CLIENT_ID
            )
            
            # Token is valid, get the user info
            email = idinfo['email']
            name = idinfo.get('name', '')
            
            # Try to sign in with Supabase using Google OAuth
            response = supabase.auth.sign_in_with_oauth({
                "provider": "google",
                "id_token": token
            })
            
            return response
        except ValueError as ve:
            # Invalid token
            print("Google token validation error:", str(ve))
            return {'error': 'Invalid Google token'}
        
    except Exception as e:
        print("Error in Google signin:", str(e))
        return {'error': str(e)}