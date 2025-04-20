from flask import Flask
from routes import db_bp, auth_bp
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from datetime import timedelta

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure app
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SUPABASE_URL'] = os.getenv('SUPABASE_URL')
app.config['SUPABASE_KEY'] = os.getenv('SUPABASE_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)  # Token expiration
app.config['JWT_ERROR_MESSAGE_KEY'] = 'error'  # Custom error message key

# Initialize extensions
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Configure CORS for all API routes
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(db_bp, url_prefix='/api/db')
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# Health check endpoint
@app.route('/')
def health_check():
    return {'status': 'healthy', 'message': 'Postify 2.0 backend running'}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)