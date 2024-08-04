const BASE_URL = 'http://localhost:3000';

export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem('token', token);
    alert('User logged in');
    renderLoginContainer();
  } else {
    alert('Login failed');
  }
}

export async function register(username, password) {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (response.ok) {
    alert('User registered successfully');
    renderLoginContainer();
  } else {
    alert('Registration failed');
  }
}
