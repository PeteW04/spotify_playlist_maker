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
const redirectUri = 'http://localhost:3000';
const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';

async function setupAuth() {
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        redirect_uri: "http://localhost:3000",
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
    console.log(response);
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
        throw new Error('Failed to fetch access token: ' + data.error_description);
    }

    localStorage.setItem('access_token', data.access_token);
    return data.access_token;
};

export { setupAuth, getToken };