from flask import Flask, request, jsonify
from config import Config
from models import db, bcrypt, User
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from flask_cors import CORS
from flask import render_template

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)
CORS(app)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template("index.html")

# ------------------ SIGNUP ------------------

@app.route('/login')
def login_page():
    return render_template("login.html")

@app.route('/signup')
def signup_page():
    return render_template("signup.html")

@app.route('/dashboard')
def dashboard_page():
    return render_template("dashboard.html")

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already exists"}), 400

    new_user = User(
        name=data['name'],
        email=data['email']
    )
    new_user.set_password(data['password'])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


# ------------------ LOGIN ------------------

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(email=data['email']).first()

    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            "access_token": access_token,
            "name": user.name
        }), 200

    return jsonify({"message": "Invalid credentials"}), 401


# ------------------ PROTECTED ROUTE ------------------

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard_api():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    return jsonify({
        "message": f"Welcome {user.name}"
    }), 200


if __name__ == "__main__":
    app.run(debug=True)
