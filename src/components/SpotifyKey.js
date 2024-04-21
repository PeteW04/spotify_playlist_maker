// function getSpotifyAccessToken() {
//     const client_id = '11199dd25acb45e1a48d8fe9c25db8ad';
//     const client_secret = '16aef0d3916d467a96919a8b531f82d8';
//     const authOptions = {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: 'grant_type=client_credentials'
//     };
//     return fetch('https://accounts.spotify.com/api/token', authOptions)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to retrieve access token, status: ' + response.status);
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.access_token) {
//                 console.log(data.access_token);
//                 return data.access_token;
//             }
//             throw new Error('Access token is missing in the response');
//         })
//         .catch(error => {
//             console.error('Error fetching access token:', error);
//             throw error;
//         });
// }
// export default getSpotifyAccessToken;

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const codeVerifier = generateRandomString(64);

const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

const clientId = '11199dd25acb45e1a48d8fe9c25db8ad';
const redirectUri = 'http://localhost:8080';
const scope = 'user-read-private user-read-email';

async function setupAuth() {
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        redirect_uri: redirectUri,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
    };
    authUrl.search = new URLSearchParams(params).toString();

    // Store the verifier in localStorage to use later during token exchange
    window.localStorage.setItem('code_verifier', codeVerifier);

    // Redirect the user to Spotify's authorization page
    window.location.href = authUrl.toString();
}

const getToken = async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier');
    const url = 'https://accounts.spotify.com/api/token';

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch access token: ' + data.error_description);
    }

    localStorage.setItem('access_token', data.access_token);
};

// Call setupAuth when you need to initiate the OAuth flow
// setupAuth();
