from services.auth_service import supabase

def get_profile_by_user_id(user_id):
    """
    Get a user's profile by their user_id
    """
    try:
        profile_data = supabase.table('profiles').select('*').eq('user_id', user_id).execute()
        if profile_data.data and len(profile_data.data) > 0:
            return profile_data.data[0]
        return None
    except Exception as e:
        print("Error getting profile by user_id:", str(e))
        return {'error': str(e)}

def get_profile_by_email(email):
    """
    Get a user's profile by their email
    """
    try:
        profile_data = supabase.table('profiles').select('*').eq('email', email).execute()
        if profile_data.data and len(profile_data.data) > 0:
            return profile_data.data[0]
        return None
    except Exception as e:
        print("Error getting profile by email:", str(e))
        return {'error': str(e)}

def create_profile(user_id, email, name=None, avatar_url=None, bio=None):
    """
    Create a new user profile
    """
    try:
        profile_data = {
            "user_id": user_id,
            "email": email
        }
        
        # Add optional fields if provided
        if name:
            profile_data["name"] = name
        if avatar_url:
            profile_data["avatar_url"] = avatar_url
        if bio:
            profile_data["bio"] = bio
            
        result = supabase.table('profiles').insert(profile_data).execute()
        if result.data and len(result.data) > 0:
            return result.data[0]
        return None
    except Exception as e:
        print("Error creating profile:", str(e))
        return {'error': str(e)}

def update_profile(user_id, data):
    """
    Update an existing user profile
    """
    try:
        # Ensure we're only updating allowed fields
        allowed_fields = ['name', 'email', 'avatar_url', 'bio']
        update_data = {k: v for k, v in data.items() if k in allowed_fields}
        
        result = supabase.table('profiles').update(update_data).eq('user_id', user_id).execute()
        if result.data and len(result.data) > 0:
            return result.data[0]
        return None
    except Exception as e:
        print("Error updating profile:", str(e))
        return {'error': str(e)}

def delete_profile(user_id):
    """
    Delete a user's profile
    """
    try:
        result = supabase.table('profiles').delete().eq('user_id', user_id).execute()
        return result
    except Exception as e:
        print("Error deleting profile:", str(e))
        return {'error': str(e)}