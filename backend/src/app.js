const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const { configRoute } = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

app.use(cors({
  origin: '*',
}));

app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  next();
});

const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

app.use('/api', configRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
