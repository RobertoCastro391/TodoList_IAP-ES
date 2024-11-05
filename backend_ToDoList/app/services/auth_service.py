import requests
import os
from jose import jwt, JWTError
from fastapi import HTTPException, status, Depends, Request
from sqlalchemy.orm import Session
import base64
from app.database import get_db
from app.models.user import User

# Get Environment Variables
CLIENT_ID = os.getenv("COGNITO_APP_CLIENT_ID")
AWS_REGION = os.getenv("AWS_REGION")
COGNITO_USERPOOL_ID = os.getenv("COGNITO_USERPOOL_ID")
TOKEN_URL = f"https://{os.getenv('COGNITO_DOMAIN')}/oauth2/token"
COGNITO_KEYS_URL = f"https://cognito-idp.{AWS_REGION}.amazonaws.com/{COGNITO_USERPOOL_ID}/.well-known/jwks.json"
CLIENT_SECRET = os.getenv("COGNITO_APP_CLIENT_SECRET")

def exchange_code_for_token(code: str) -> dict:
    
    client_auth = f"{CLIENT_ID}:{CLIENT_SECRET}"
    encoded_auth = base64.b64encode(client_auth.encode()).decode()
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Basic {encoded_auth}"
    }
    
    response = requests.post(
        TOKEN_URL,
        data={
            "grant_type": "authorization_code",
            "client_id": CLIENT_ID,
            "redirect_uri": os.getenv("REDIRECT_URI"),
            "code": code
        },
        headers=headers
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Token exchange failed")

    return response.json()

def decode_jwt(token: str, access_token: str) -> dict:
    keys = requests.get(COGNITO_KEYS_URL).json().get("keys", [])

    headers = jwt.get_unverified_headers(token)
    kid = headers["kid"]
    key = next((key for key in keys if key["kid"] == kid), None)
    
    if key is None:
        raise ValueError("Public key not found")

    issuer = f"https://cognito-idp.{AWS_REGION}.amazonaws.com/{COGNITO_USERPOOL_ID}"

    try:
        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            audience=CLIENT_ID,
            issuer=issuer,
            access_token = access_token
        )

    except JWTError:
        raise HTTPException(status_code=401, detail="Token is invalid")

    return payload

def get_or_create_user(user_info: dict, db: Session) -> User:
    """
    Retrieve user from the database or create a new one based on Cognito ID.
    """
    
    print(user_info)

    user = db.query(User).filter(User.cognito_id == user_info["sub"]).first()
    
    if not user:
        user = User(
            cognito_id=user_info["sub"],
            email=user_info.get("email"),
            username=user_info.get("given_name")
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user