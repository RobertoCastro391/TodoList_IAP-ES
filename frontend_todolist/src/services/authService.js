const API_URL = process.env.REACT_APP_API_URL;

export const login = async () => {
  window.location.href = `${API_URL}/api/auth/login`;
}

export const signUp = async () => {
  window.location.href = `${API_URL}/api/auth/signup`;
}

export const logout = async () => {
  window.location.href = `${API_URL}/api/auth/logout`;
}