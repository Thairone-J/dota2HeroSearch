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
      return { success: true, message: 'Success' };
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
      // Retorno de sucesso
      return { success: true, message: 'Successfully registered user' };
    } else {
      let errorMessage = 'Registration failed: ';
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorMessage += errorData.error || 'Unknown error';
          // Retorno de erro para resposta JSON
          return { success: false, message: errorMessage };
        } catch (err) {
          errorMessage += 'Failed to parse error response';
          // Retorno de erro ao falhar ao parsear resposta JSON
          return { success: false, message: errorMessage };
        }
      } else {
        // Adicionado o retorno faltante
        errorMessage += await response.text();
        console.error(errorMessage);
        return { success: false, message: errorMessage };
      }
    }
  } catch (err) {
    console.error(`Registration failed: ${err.message}`);
    // Retorno de erro para exceção capturada
    return { success: false, message: err.message };
  }
}
