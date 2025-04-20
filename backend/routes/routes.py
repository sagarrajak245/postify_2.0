from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from services.auth_service import signup_user, login_user, google_signin, supabase
from services.db_service import get_db_connection

db_bp = Blueprint('database', __name__)

@db_bp.route('/test-db')
def test_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        return jsonify({"status": "success", "db_version": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    
#auth routes
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()  
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Get name or use email as default
    name = data.get('name', data['email'].split('@')[0])
    
    response = signup_user(name, data['email'], data['password'])
    if 'error' in response:
        return jsonify({'error': response['error']}), 400
    
    # Create JWT token
    access_token = create_access_token(identity=data['email'])
    
    return jsonify({
        'message': 'User created successfully',
        'access_token': access_token,
        'user': response.user.dict() if hasattr(response, 'user') else {}
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing email or password'}), 400
    
    response = login_user(data['email'], data['password'])
    if 'error' in response:
        return jsonify({'error': response['error']}), 401
    
    access_token = create_access_token(identity=data['email'])
    
    return jsonify({
        'access_token': access_token,
        'user': response.user.dict() if hasattr(response, 'user') else {}
    }), 200

@auth_bp.route('/google', methods=['POST'])
def google_auth():
    data = request.get_json()
    if not data or 'token' not in data:
        return jsonify({'error': 'Missing Google token'}), 400
    
    response = google_signin(data['token'])
    if 'error' in response:
        return jsonify({'error': response['error']}), 401
    
    # Extract email from response
    user_email = response.user.email if hasattr(response, 'user') else None
    if not user_email:
        return jsonify({'error': 'Could not extract user email from Google login'}), 500
    
    access_token = create_access_token(identity=user_email)
    
    return jsonify({
        'access_token': access_token,
        'user': response.user.dict() if hasattr(response, 'user') else {}
    }), 200