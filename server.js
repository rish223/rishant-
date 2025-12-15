const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/api/data', (req, res) => {
  res.json({
    message: 'Sample API endpoint',
    timestamp: new Date().toISOString(),
    data: {
      features: ['Web Apps', 'Prototypes', 'AI Integration'],
      version: '1.0.0'
    }
  });
});

app.post('/api/submit', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  res.json({
    success: true,
    message: 'Data received successfully',
    received: data
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API health check: http://localhost:${PORT}/api/health`);
});
