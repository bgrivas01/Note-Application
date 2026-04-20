from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib
import os

app = Flask(__name__)
CORS(app)  # Javascript communicate with Python thingy

DATABASE = "notes_app.db"


# ──────────────────────────────────────────────
# Database helpers
# ──────────────────────────────────────────────

def get_db():
    #Open a connection to the SQLite database.
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row   # lets us access columns by name
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():
    #Create all tables from database.sql if they don't exist yet.
    with open("database.sql", "r") as f:
        schema = f.read()
    conn = get_db()
    conn.executescript(schema)
    conn.commit()
    conn.close()
    print("Database initialised.")


def hash_password(password: str) -> str:
    """SHA-256 hash a password before storing it."""
    return hashlib.sha256(password.encode()).hexdigest()


# ──────────────────────────────────────────────
# Create/Login account
# ──────────────────────────────────────────────

@app.route("/create-account", methods=["POST"])
def create_account():
    """
    Expected JSON body:
    {
        "username": "",
        "name":     "",
        "email":    "",
        "dob":      "",
        "password": ""
    }
    """
    data = request.get_json()

    username = data.get("username", "").strip()
    name     = data.get("name",     "").strip()
    email    = data.get("email",    "").strip()
    dob      = data.get("dob",      "").strip()
    password = data.get("password", "").strip()

    if not all([username, name, email, dob, password]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    hashed_pw = hash_password(password)

    try:
        conn = get_db()
        conn.execute(
            "INSERT INTO users (name, username, email, dob, password) VALUES (?, ?, ?, ?, ?)",
            (name, username, email, dob, hashed_pw)
        )
        conn.commit()
        conn.close()
        return jsonify({"status": "success"}), 201

    except sqlite3.IntegrityError as e:
        # username or email already taken
        if "username" in str(e):
            message = "Username already taken"
        elif "email" in str(e):
            message = "Email already registered"
        else:
            message = "Account already exists"
        return jsonify({"status": "error", "message": message}), 409


@app.route("/login", methods=["POST"])
def login():
    """
    Expected JSON body:
    {
        "username": "",   (optional if email is provided)
        "email":    "",
        "password": ""
    }
    """
    data = request.get_json()

    username = data.get("username", "").strip()
    email    = data.get("email",    "").strip()
    password = data.get("password", "").strip()

    if not password or not (username or email):
        return jsonify({"status": "error", "message": "Missing credentials"}), 400

    hashed_pw = hash_password(password)

    conn = get_db()

    # Allow login by username OR email
    if email:
        user = conn.execute(
            "SELECT * FROM users WHERE email = ? AND password = ?",
            (email, hashed_pw)
        ).fetchone()
    else:
        user = conn.execute(
            "SELECT * FROM users WHERE username = ? AND password = ?",
            (username, hashed_pw)
        ).fetchone()

    conn.close()

    if user:
        return jsonify({"status": "success", "user_id": user["user_id"], "username": user["username"]}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401





# ──────────────────────────────────────────────
# Leg
# ──────────────────────────────────────────────

if __name__ == "__main__":
    #  try to create the database
    if not os.path.exists(DATABASE):
        init_db()
    else:
        # dunno why it dont work without it, just dont delete i guess
        init_db()

    app.run(debug=True, port=5000)