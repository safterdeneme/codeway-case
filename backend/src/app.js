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

app.use(cors({
  origin: '*',
}));


const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction,"isProductinı")
const connectSrcUrls = isProduction
  ? ["'self'", "https://*.firebaseio.com", "https://*.googleapis.com"]
  : ["'self'", `http://localhost:${port}`, "https://*.firebaseio.com", "https://*.googleapis.com"];

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; font-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; frame-src 'self'; connect-src ${connectSrcUrls.join(' ')}`
  );
  next();
});


// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "'unsafe-eval'"],
//     styleSrc: ["'self'", "'unsafe-inline'"],
//     imgSrc: ["'self'", "data:"],
//     connectSrc: ["'self'", `http://localhost:${port}`, "https://*.firebaseio.com", "https://*.googleapis.com"],
//     fontSrc: ["'self'", "https:"],
//     objectSrc: ["'none'"],
//     upgradeInsecureRequests: [],
//   },
// }));

const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

app.use('/api', FirebaseRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
