import React, { useEffect, useState } from 'react';
import { getToken } from '../auth';  // Ensure this is correctly exported and imported

const AuthHandler = () => {
    const [error, setError] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            getToken(code)
                .then(() => {
                    console.log('Authentication successful');
                })
                .catch(err => {
                    console.error('Error during authentication:', err);
                    setError('Failed to authenticate. Please try again.');
                });
        }
    }, []);

    return (
        <div>
            {error ? <p>{error}</p> : <p>Authenticating...</p>}
        </div>
    );
};

export default AuthHandler;
