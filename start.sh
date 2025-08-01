#!/bin/bash
set -e

# 🌐 Activate virtual environment
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
else
    echo "❌ Virtual environment not found. Please run: python -m venv venv"
    exit 1
fi

# 📦 Set environment variable (optional)
export FLASK_ENV=production

# 🚀 Start the Flask app with Gunicorn
gunicorn app:app \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --threads 2 \
    --log-level info \
    --access-logfile logs/access.log