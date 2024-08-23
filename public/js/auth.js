const BASE_URL = 'http://localhost:3000';

export async function login(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token, userProfilePicture } = await response.json();
      localStorage.setItem('token', token);
      localStorage.setItem('userProfilePicture', userProfilePicture);
      console.log('User logged in successfully');
    } else {
      let errorMessage = 'Login failed: ';
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorMessage += errorData.error || 'Unknown error';
        } catch (err) {
          errorMessage += 'Failed to parse error response';
        }
      } else {
        errorMessage += await response.text();
      }

      console.error(errorMessage);
    }
  } catch (err) {
    console.error(`Login failed: ${err.message}`);
  }
}

export async function register(username, password, profilePicture) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, profilePicture }),
    });

    if (response.ok) {
      return { success: true, message: 'Successfully registered user' };
    } else {
      let errorMessage = 'Registration failed: ';
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorMessage += errorData.error || 'Unknown error';
        } catch (err) {
          errorMessage += 'Failed to parse error response';
          return { success: false, message: errorMessage };
        }
      } else {
        errorMessage += await response.text();
        return { success: false, message: errorMessage };
      }

      console.error(errorMessage);
    }
  } catch (err) {
    console.error(`Registration failed: ${err.message}`);
    return { success: false, message: err.message };
  }
}
