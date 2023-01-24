import React, { useEffect } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const CLIENT_ID = process.env.CLIENT_ID;

const UserPage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleGoogleLoginSuccess = (response) => {
    localStorage.setItem('token', response.tokenId);
    fetchUser();
  };

  const handleGoogleLoginFailure = (response) => {
    console.error(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={CLIENT_ID}
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
      />

      {user.name ? (
        <div>
          <h1>{user.name}</h1>
          <img src={user.profilePicture} alt={`${user.name}'s profile picture`} />
          <p>{user.bio}</p>
        </div>
      ) : (
        <p>Log in to view your page.</p>
      )}
    </div>
  );
};

export default UserPage;
