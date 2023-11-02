const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;
const CLIENT_SECRET = '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'; 

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Routes for the pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'login.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'profile.html'));
});

app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'privacy.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: '734678762544-l8vi0tmg9bouf85n1025ij0v3movk7q0.apps.googleusercontent.com',
            client_secret: CLIENT_SECRET,
            redirect_uri: 'http://localhost:3000/auth/google/callback',
            grant_type: 'authorization_code',
            code: code
        });

        const { access_token } = response.data;

        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        res.redirect('/profile');

    } catch (error) {
        console.error('Error exchanging code for token:', error.response.data);
        res.status(500).send('Authentication failed');
    }
});