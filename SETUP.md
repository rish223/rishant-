# Setup Guide

## Quick Setup

### Prerequisites
- Node.js v14 or higher
- npm (comes with Node.js)

### Installation Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   ```

3. **Open in browser**
   Navigate to: `http://localhost:3000`

## Project Structure

```
rishant-/
├── public/              # Frontend assets
│   ├── index.html      # Main HTML page
│   ├── styles.css      # Stylesheet with responsive design
│   └── script.js       # Client-side JavaScript with API calls
├── server.js           # Express server with API endpoints
├── package.json        # Project configuration and dependencies
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## Available API Endpoints

### GET /api/health
Returns server health status
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### GET /api/data
Returns sample data
```json
{
  "message": "Sample API endpoint",
  "timestamp": "2024-12-15T12:00:00.000Z",
  "data": {
    "features": ["Web Apps", "Prototypes", "AI Integration"],
    "version": "1.0.0"
  }
}
```

### POST /api/submit
Accepts form data with validation
```json
Request:
{
  "name": "Your Name",
  "email": "your@email.com",
  "message": "Your message"
}

Response:
{
  "success": true,
  "message": "Data received successfully",
  "received": { ... }
}
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:
```
PORT=3000
NODE_ENV=development
```

### Rate Limiting
Default configuration: 100 requests per 15 minutes per IP
Modify in `server.js`:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
```

## Development

### Running in Development Mode
```bash
npm run dev
```

### Testing the API
```bash
# Health check
curl http://localhost:3000/api/health

# Get data
curl http://localhost:3000/api/data

# Submit data
curl -X POST http://localhost:3000/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

## Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
heroku open
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Railway
```bash
npm i -g railway
railway login
railway up
```

## Customization

### Adding New API Endpoints
Edit `server.js`:
```javascript
app.get('/api/your-endpoint', (req, res) => {
  res.json({ your: 'data' });
});
```

### Modifying the Frontend
- **Structure**: Edit `public/index.html`
- **Styling**: Edit `public/styles.css`
- **Functionality**: Edit `public/script.js`

### Changing the Theme
In `public/styles.css`, modify the gradient colors:
```css
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

## Troubleshooting

### Port Already in Use
Change the port in `server.js` or set PORT environment variable:
```bash
PORT=3001 npm start
```

### Dependencies Not Installing
Clear npm cache and reinstall:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues
CORS is enabled by default. To restrict origins, modify in `server.js`:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

## Security Notes

- Rate limiting is enabled (100 req/15min per IP)
- Input validation is implemented on all form submissions
- Email format validation using regex
- Input sanitization and length limits
- All dependencies are checked for vulnerabilities

## Next Steps

1. **Add Database**: Integrate MongoDB, PostgreSQL, or Firebase
2. **Add Authentication**: Implement JWT or OAuth
3. **Add AI Features**: Integrate OpenAI, TensorFlow, or other AI APIs
4. **Add Tests**: Use Jest, Mocha, or Cypress
5. **Add CI/CD**: Set up GitHub Actions or CircleCI

## Support

For issues or questions:
- GitHub: [rish223/rishant-](https://github.com/rish223/rishant-)
- Create an issue in the repository

---

Built with ❤️ using Express.js and modern web technologies
