# Auxyn - AI-Powered Startup Platform

Auxyn is a modern platform that connects startups with investors, powered by AI-driven insights and smart matching algorithms. The platform provides comprehensive tools for startup development, investor matchmaking, and market research.

## 🌟 Features

### For Startups
- **AI Development Assistant**: Get guidance on your startup journey
- **Pitch Deck Builder**: Create compelling pitch decks
- **Progress Tracking**: Monitor your startup's growth
- **Market Research Tools**: Access comprehensive market analysis
- **Resource Library**: Access startup development resources

### For Investors
- **Smart Matching**: Find startups that match your investment criteria
- **Analytics Dashboard**: Track investment opportunities
- **Returns Analysis**: Monitor portfolio performance
- **Market Research**: Access industry insights
- **Startup Progress Tracking**: Monitor invested startups

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: React Query
- **AI Integration**: Google's Gemini API
- **Styling**: TailwindCSS + CSS Modules
- **3D Visualization**: Three.js

### Backend
- **Framework**: Flask
- **Database**: SQLAlchemy
- **Authentication**: JWT
- **API**: RESTful
- **AI Services**: Gemini, ChatGPT, Botpress

## 📦 Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- PostgreSQL (for production)

## 🛠️ Installation

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Auxyn-rebranded.git
   cd Auxyn-rebranded
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory:
   ```env
   GEMINI_API_KEY=your-gemini-api-key
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd auxyn-backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a .env file in the backend directory:
   ```env
   SECRET_KEY=your-secret-key
   JWT_SECRET_KEY=your-jwt-secret
   DATABASE_URL=sqlite:///instance/app.db
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

5. Initialize the database:
   ```bash
   flask db upgrade
   ```

6. Run the backend server:
   ```bash
   python run.py
   ```

## 🌐 Project Structure

```
Auxyn-rebranded/
├── app/                    # Next.js frontend application
│   ├── ai/                # AI-related pages
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   └── lib/              # Utility functions and services
├── auxyn-backend/         # Flask backend application
│   ├── app/              # Main application code
│   │   ├── models/       # Database models
│   │   ├── routes/       # API endpoints
│   │   └── services/     # Business logic
│   └── migrations/       # Database migrations
└── public/               # Static assets
```

## 🔑 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify-token` - Verify JWT token

### Profile Endpoints
- `POST /api/users/startup` - Create startup profile
- `POST /api/users/investor` - Create investor profile
- `GET /api/users/preferences` - Get user preferences

### Matching Endpoints
- `POST /api/matches/generate` - Generate new matches
- `GET /api/matches/{user_id}` - Get user matches
- `GET /api/matches/{match_id}/insights` - Get match insights

## 🚀 Deployment

### Frontend Deployment
```bash
# Build the application
npm run build

# Deploy to Vercel
npm run deploy:vercel

# Deploy to Netlify
npm run deploy:netlify
```

### Backend Deployment
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with gunicorn
gunicorn run:app
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [Radix UI](https://www.radix-ui.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Google Gemini](https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini)
