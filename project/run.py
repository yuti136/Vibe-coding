#!/usr/bin/env python3
"""
FoodBridge Application Runner
This script helps you run both frontend and backend simultaneously
"""

import subprocess
import sys
import os
import time
import signal
from threading import Thread

def run_backend():
    """Run the Flask backend server"""
    print("🚀 Starting Flask backend server...")
    try:
        subprocess.run([sys.executable, "app.py"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Backend server stopped")
    except subprocess.CalledProcessError as e:
        print(f"❌ Backend server failed: {e}")

def run_frontend():
    """Run the React frontend development server"""
    print("🚀 Starting React frontend server...")
    try:
        subprocess.run(["npm", "run", "dev"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Frontend server stopped")
    except subprocess.CalledProcessError as e:
        print(f"❌ Frontend server failed: {e}")

def check_dependencies():
    """Check if all dependencies are installed"""
    print("🔍 Checking dependencies...")
    
    # Check Python dependencies
    try:
        import flask
        import flask_sqlalchemy
        import flask_cors
        import flask_jwt_extended
        import pymysql
        print("✅ Python dependencies found")
    except ImportError as e:
        print(f"❌ Missing Python dependency: {e}")
        print("💡 Run: pip install -r requirements.txt")
        return False
    
    # Check Node dependencies
    if not os.path.exists("node_modules"):
        print("❌ Node modules not found")
        print("💡 Run: npm install")
        return False
    
    print("✅ Node dependencies found")
    return True

def main():
    """Main function to run both servers"""
    print("🍽️  FoodBridge - Zero Hunger Recipe App")
    print("=" * 50)
    
    if not check_dependencies():
        print("\n❌ Please install missing dependencies first")
        return
    
    print("\n🚀 Starting both servers...")
    print("📱 Frontend will be available at: http://localhost:5173")
    print("🔧 Backend API will be available at: http://localhost:5000")
    print("\n⚠️  Make sure MySQL is running and database is set up!")
    print("💡 Press Ctrl+C to stop both servers\n")
    
    # Start backend in a separate thread
    backend_thread = Thread(target=run_backend, daemon=True)
    backend_thread.start()
    
    # Give backend time to start
    time.sleep(2)
    
    try:
        # Run frontend in main thread
        run_frontend()
    except KeyboardInterrupt:
        print("\n🛑 Shutting down servers...")
        print("👋 Goodbye!")

if __name__ == "__main__":
    main()