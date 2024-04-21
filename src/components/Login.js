import React from 'react';
import { setupAuth } from '../auth';  // Import your auth setup function

const Login = () => {
    return (
        <div>
            <h1>Welcome to My Spotify App</h1>
            <button onClick={setupAuth}>Login with Spotify</button>
        </div>
    );
};

export default Login;