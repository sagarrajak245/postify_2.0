# backend/services/database_service.py
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

def get_db_connection():
    try:
        connection = psycopg2.connect(
            user=os.getenv("user"),
            password=os.getenv("password"),
            host=os.getenv("host"),
            port=os.getenv("port"),
            dbname=os.getenv("dbname"),
            
        )
        print("✅ Connected to Supabase PostgreSQL!")
        return connection
        
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        raise  # Re-raise for error handling

# Example usage
if __name__ == "__main__":
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT NOW();")
    print("Database time:", cursor.fetchone())
    cursor.close()
    conn.close()