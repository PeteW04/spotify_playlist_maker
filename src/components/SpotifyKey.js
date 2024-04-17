function getSpotifyAccessToken() {
    var client_id = '11199dd25acb45e1a48d8fe9c25db8ad';
    var client_secret = '16aef0d3916d467a96919a8b531f82d8';

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var token = body.access_token;
        }
    });
};

export default getSpotifyAccessToken;