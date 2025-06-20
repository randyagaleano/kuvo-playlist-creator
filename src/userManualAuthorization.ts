import axios from "axios";
import express from 'express';
import querystring from 'querystring';
import "dotenv/config";

var app = express();

function generateRandomString(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

app.get('/login', function (req, res) {

    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            client_id: process.env.CLIENT_ID,
            response_type: 'code',
            redirect_uri: process.env.REDIRECT_URI,
            scope: scope,
            state: state,
        }));
});

app.get('/callback', async function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;;

    console.log("Code: ", code)
    console.log("State: ", state)

    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
            },
            json: true
        };
        try {
            const tokenResponse = await axios.post(
                authOptions.url,
                authOptions.form,
                { headers: authOptions.headers }
            );

            if (tokenResponse.status === 200) {
                const { access_token, refresh_token, expires_in } = tokenResponse.data;

                console.log('Access Token:', access_token);
                console.log('Refresh Token:', refresh_token);
                console.log('Expires In:', expires_in);

                res.redirect('/#' + querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token,
                }));

            } else {
                console.error('Spotify token exchange failed with status:', tokenResponse.status);
                console.error('Response data:', tokenResponse.data);
                res.redirect('/#' + querystring.stringify({
                    error: 'token_exchange_failed',
                    details: 'Non-200 status from Spotify'
                }));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error during token exchange:', error.message);
                if (error.response) {
                    const errorData = error.response.data;
                    console.error('Error Response Status:', error.response.status);
                    console.error('Error Response Data:', errorData);
                    res.redirect('/#' + querystring.stringify({
                        error: errorData.error || 'axios_request_failed',
                        error_description: errorData.error_description || error.message
                    }));
                } else if (error.request) {
                    console.error('No response received from Spotify token endpoint:', error.request);
                    res.redirect('/#' + querystring.stringify({
                        error: 'no_response_from_spotify',
                        error_description: 'Network error or server unavailable'
                    }));
                } else {
                    console.error('Error setting up Axios request for token exchange:', error.message);
                    res.redirect('/#' + querystring.stringify({
                        error: 'request_setup_error',
                        error_description: error.message
                    }));
                }
            }
        }
    }
});
        

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Open your browser to http://127.0.0.1:${PORT}/login`);
});
