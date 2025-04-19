#!/bin/bash

# Create folder structure
mkdir -p backend/{services,templates,static}

# Create main backend files
touch backend/app.py backend/config.py backend/models.py backend/routes.py backend/requirements.txt backend/wsgi.py

# Create services files
touch backend/services/auth_service.py backend/services/__init__.py

echo "Folder structure created successfully"