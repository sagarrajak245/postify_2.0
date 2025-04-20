from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.profile_service import (
    get_profile_by_email, 
    create_profile,   
    update_profile, 
    delete_profile
)
from services.auth_service import supabase

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """
    Get the current user's profile
    """
    try:
        current_user_email = get_jwt_identity()
        
        # Get profile by email
        profile = get_profile_by_email(current_user_email)
        
        if profile and 'error' not in profile:
            return jsonify({'profile': profile}), 200
        
        # If profile not found
        return jsonify({'error': 'Profile not found'}), 404
    except Exception as e:
        print("Error retrieving profile:", str(e))
        return jsonify({'error': str(e)}), 500

@profile_bp.route('/profile', methods=['POST'])
@jwt_required()
def create_or_update_profile():
    """
    Create or update the current user's profile
    """
    try:
        current_user_email = get_jwt_identity()
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No profile data provided'}), 400
        
        # Get user ID from email
        try:
            current_user = supabase.auth.get_user()
            user_id = current_user.user.id
        except Exception as user_error:
            return jsonify({'error': f'Could not get current user: {str(user_error)}'}), 500
        
        # Check if profile exists
        existing_profile = get_profile_by_email(current_user_email)
        
        if existing_profile and 'error' not in existing_profile:
            # Update existing profile
            updated_profile = update_profile(user_id, data)
            if 'error' in updated_profile:
                return jsonify({'error': updated_profile['error']}), 500
                
            return jsonify({
                'message': 'Profile updated successfully',
                'profile': updated_profile
            }), 200
        else:
            # Create new profile
            # Extract fields from request data
            name = data.get('name', None)
            avatar_url = data.get('avatar_url', None)
            bio = data.get('bio', None)
            
            new_profile = create_profile(
                user_id=user_id,
                email=current_user_email,
                name=name,
                avatar_url=avatar_url,
                bio=bio
            )
            
            if 'error' in new_profile:
                return jsonify({'error': new_profile['error']}), 500
                
            return jsonify({
                'message': 'Profile created successfully',
                'profile': new_profile
            }), 201
            
    except Exception as e:
        print("Error creating/updating profile:", str(e))
        return jsonify({'error': str(e)}), 500

@profile_bp.route('/profile', methods=['DELETE'])
@jwt_required()
def remove_profile():
    """
    Delete the current user's profile
    """
    try:
        # Get user ID from token
        try:
            current_user = supabase.auth.get_user()
            user_id = current_user.user.id
        except Exception as user_error:
            return jsonify({'error': f'Could not get current user: {str(user_error)}'}), 500
        
        # Delete profile
        result = delete_profile(user_id)
        if 'error' in result:
            return jsonify({'error': result['error']}), 500
            
        return jsonify({'message': 'Profile deleted successfully'}), 200
    except Exception as e:
        print("Error deleting profile:", str(e))
        return jsonify({'error': str(e)}), 500