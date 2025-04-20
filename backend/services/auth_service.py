from supabase import create_client
from flask import jsonify
import os
import requests
from google.oauth2 import id_token 
from google.auth.transport import requests as google_requests

supabase = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))

def signup_user(name, email, password):
    try:
        # Create the user in Supabase Auth
        response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })
        
        # If successful, add additional user info to profiles table
        if hasattr(response, 'user') and response.user:
            user_id = response.user.id
            # Insert into a profiles table with the name
            data = supabase.table('profiles').insert({
                "id": user_id,
                "name": name,
                "email": email
            }).execute()
            
            # Merge the profile data with the response
            return response
        return response
    except Exception as e:
        return {'error': str(e)}

def login_user(email, password):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        # Get additional user data from profiles if available
        if hasattr(response, 'user') and response.user:
            user_id = response.user.id
            profile_data = supabase.table('profiles').select('*').eq('id', user_id).execute()
            
            # Add profile data to the response if available
            if profile_data.data and len(profile_data.data) > 0:
                response.user.profile = profile_data.data[0]
                
        return response
    except Exception as e:
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
            
            # If this is a new user, we might need to add profile data
            if hasattr(response, 'user') and response.user:
                user_id = response.user.id
                
                # Check if profile exists
                profile_check = supabase.table('profiles').select('*').eq('id', user_id).execute()
                
                if not profile_check.data or len(profile_check.data) == 0:
                    # Create new profile
                    supabase.table('profiles').insert({
                        "id": user_id,
                        "name": name,
                        "email": email
                    }).execute()
            
            return response
        except ValueError:
            # Invalid token
            return {'error': 'Invalid Google token'}
            
    except Exception as e:
        return {'error': str(e)}

def get_user_profile(user_id):
    try:
        profile_data = supabase.table('profiles').select('*').eq('id', user_id).execute()
        if profile_data.data and len(profile_data.data) > 0:
            return profile_data.data[0]
        return None
    except Exception as e:
        return {'error': str(e)}