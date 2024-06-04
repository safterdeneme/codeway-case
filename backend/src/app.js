const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const { FirebaseRoutes } = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

app.use(cors());
app.options('*', cors());

// Custom CSP to allow 'unsafe-eval'
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-eval'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'", "https://*.firebaseio.com", "https://*.googleapis.com"],
    fontSrc: ["'self'", "https:"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  },
}));

// Serve static files from the frontend build directory
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

// API routes
app.use('/api', FirebaseRoutes);

// Catch-all route to serve the frontend's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
