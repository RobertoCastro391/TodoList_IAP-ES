from fastapi import APIRouter, Response, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from urllib.parse import urlencode
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.encoders import jsonable_encoder
from app.database import get_db
from app.services import auth_service
import os

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
)

# Get Environment Variables
CLIENT_ID = os.getenv("COGNITO_APP_CLIENT_ID")
REDIRECT_URI = os.getenv("REDIRECT_URI")
COGNITO_DOMAIN = os.getenv("COGNITO_DOMAIN")
LOGOUT_URI = os.getenv("LOGOUT_URI")
REDIRECT_URI_WEB = os.getenv("REDIRECT_URI_WEB")

# Redirect to Cognito Login
@router.get("/login", status_code=302)
async def login_redirect():
    query_params = {
        "client_id": CLIENT_ID,
        "response_type": "code",
        "scope": "openid email profile",
        "redirect_uri": REDIRECT_URI
    }
    cognito_url = f"https://{COGNITO_DOMAIN}/oauth2/authorize?{urlencode(query_params)}"
  
    return RedirectResponse(url=cognito_url)

# Redirect to Cognito Signup
@router.get("/signup", status_code=302)
async def signup_redirect():
    # Construct the URL manually with a different approach
    query_params = {
        "client_id": CLIENT_ID,
        "response_type": "code",
        "scope": "openid email profile",
        "redirect_uri": REDIRECT_URI,
        "login_hint": "",  # Often forces Cognito to consider sign-up if not registered
    }
    cognito_url = f"https://{COGNITO_DOMAIN}/signup?{urlencode(query_params)}"

    return RedirectResponse(url=cognito_url)

# Redirect to Cognito Logout
@router.get("/logout")
async def logout():
    cognito_logout_url = (
        f"https://{COGNITO_DOMAIN}/logout?"
        f"client_id={CLIENT_ID}&logout_uri={REDIRECT_URI_WEB}"  # REDIRECT_URI deve estar registrado no Cognito
    )
    response = RedirectResponse(url=cognito_logout_url)
    response.delete_cookie(key="access_token")
    return response

# Callback URL
@router.get("/callback")
async def callback(request: Request, response: Response, db: Session = Depends(get_db)):

    code = request.query_params.get("code")

    if not code:    
        return JSONResponse(status_code=400, content={"message": "Code not found"})
    
    # Get Tokens
    tokens = auth_service.exchange_code_for_token(code)
    id_token = tokens.get("id_token")
    access_token = tokens.get("access_token")

    if not id_token or not access_token:
        return JSONResponse(status_code=400, content={"message": "Error getting tokens"})

    # Decode the id_token, passing access_token for at_hash validation
    user_info = auth_service.decode_jwt(id_token, access_token)

    created_user = auth_service.get_or_create_user(user_info, db)

    # Set the access_token in a cookie
    redirect_response = RedirectResponse(url=REDIRECT_URI_WEB)
    redirect_response.set_cookie(key="access_token", value=access_token, httponly=True, max_age=3600, secure=True, samesite="strict")

    message = "User created" if created_user else "User already exists"
    redirect_response.message = message
    return redirect_response
     
@router.get("/verify")
async def verify_authentication(user = Depends(auth_service.get_current_user)):
    if user:
        user_data = jsonable_encoder(user)  # Convert the user object to a JSON-serializable format
        return JSONResponse({"isAuthenticated": True, "user": user_data})
    return JSONResponse({"isAuthenticated": False}, status_code=401)