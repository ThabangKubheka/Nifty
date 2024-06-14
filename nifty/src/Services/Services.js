const createUser = async (username, password) => {
  
  const response = await fetch('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    const data = await response.json();
    console.log('User created successfully:', data);
  } else {
    console.error('Failed to create user:', response.statusText);
  }
};

const login = async (username,password) => {
  
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
` `
  if (response.ok) {
    const data = await response.json();
    console.log('Login successful:', data);
    localStorage.setItem('accessToken', data.accessToken);
  } else {
    console.error('Login failed:', response.statusText);
  }
};

const registerUser = async (userInfo) => {
  
  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(userInfo)
  });

  if (response.ok) {
    console.log('User registered successfully');
  } else {
    console.error('Failed to register user:', response.statusText);
  }
};


const checkEligibility = async (username) => {

  const response = await fetch(`/user/${username}/eligibility`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    console.log('User eligibility:', data);
  } else {
    console.error('Failed to check eligibility:', response.statusText);
  }
};

const getUserInfo = async (username) => {
  const response = await fetch(`/user/${username}/info`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    console.log('User info:', data);
  } else {
    console.error('Failed to get user info:', response.statusText);
  }
};

const updateUser = async (username, updatedUserInfo) => {
  const response = await fetch(`/users/update/${username}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(updatedUserInfo)
  });

  if (response.ok) {
    console.log('User information updated successfully');
  } else {
    console.error('Failed to update user information:', response.statusText);
  }
};

const deleteUser = async (username, password) => {
  const response = await fetch(`/users/delete/${username}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({ password })
  });

  if (response.ok) {
    console.log('User deleted successfully');
  } else {
    console.error('Failed to delete user:', response.statusText);
  }
};

const updatePassword = async (username, currentPassword, newPassword) => {
  const response = await fetch(`/users/update/${username}/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({ password: currentPassword, newPassword })
  });

  if (response.ok) {
    console.log('Password updated successfully');
  } else {
    console.error('Failed to update password:', response.statusText);
  }
};

export {
  createUser,
  login,
  registerUser,
  checkEligibility,
  getUserInfo,
  updateUser,
  deleteUser,
  updatePassword
};

