const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter); // Apply rate limiting to all routes
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
  const { name, email, message } = req.body;
  
  // Input validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, email, and message are required'
    });
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }
  
  // Sanitize and limit input lengths
  const sanitizedData = {
    name: String(name).substring(0, 100),
    email: String(email).substring(0, 100),
    message: String(message).substring(0, 1000)
  };
  
  console.log('Received data:', sanitizedData);
  res.json({
    success: true,
    message: 'Data received successfully',
    received: sanitizedData
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: ['/api/health', '/api/data', '/api/submit']
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API health check: http://localhost:${PORT}/api/health`);
});
