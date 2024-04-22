import React from 'react';
import { setupAuth } from '../auth';  // Import your auth setup function

const Login = () => {
    return (
        <div>
            <h1 className="text-5xl flex-grow text-slate-100 font-bold leading-snug truncate mb-1 sm:mb-0">Welcome to the Spotify Playlist Builder</h1>
            <button onClick={setupAuth} className="bg-green-900 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8 mr-3 rounded">Login with Spotify</button>
        </div>
    );
};

export default Login;