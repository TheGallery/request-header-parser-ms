const express = require('express');
const path = require('path');

const app = express();

app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    language: req.acceptsLanguages()[0],
    software: req.get('User-Agent').match(/\(([^\(\)]+)\)/)[1]
  });
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('Server running.'));
