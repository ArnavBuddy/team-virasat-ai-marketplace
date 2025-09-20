# ArtisanAI - AI-Powered Marketplace Assistant

An AI-driven platform that empowers Indian artisans to digitally showcase their crafts, tell their stories, and reach global audiences through intelligent marketing tools and personalized assistance.

## Features

### 🤖 AI-Powered Tools
- **Story Generator**: Create compelling craft narratives with cultural context
- **Smart Photography Assistant**: AI-powered photo analysis and enhancement suggestions
- **Social Media Content Generator**: Generate platform-specific posts, captions, and hashtags
- **Market Intelligence System**: Trend analysis, pricing suggestions, and competitive insights

### 📊 Dashboard & Analytics
- Comprehensive artisan dashboard with engagement analytics
- Performance tracking across multiple platforms
- Profile completion guidance and recommendations

### 🎨 Design & User Experience
- Culturally appropriate design with warm, authentic aesthetics
- Mobile-first responsive design
- Intuitive navigation and user-friendly interfaces

## Technology Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **AI Integration**: Groq (Llama 3.1), AI SDK v5
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel Platform

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm or yarn package manager
- Groq API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd artisan-ai-marketplace
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
# Copy the example environment file
cp .env.example .env.local

# Add your Groq API key
GROQ_API_KEY=your_groq_api_key_here
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── story-generator/   # Story generator page
│   ├── photo-assistant/   # Photo assistant page
│   ├── social-content/    # Social content generator
│   └── market-intelligence/ # Market intelligence page
├── components/            # Reusable React components
├── lib/                   # Utility functions
└── public/               # Static assets
\`\`\`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/generate-story` - Generate artisan stories
- `POST /api/analyze-photo` - Analyze product photos
- `POST /api/enhance-photo` - Get photo enhancement suggestions
- `POST /api/generate-social-content` - Generate social media content
- `POST /api/content-calendar` - Generate content calendars
- `POST /api/market-trends` - Market trend analysis
- `POST /api/pricing-suggestions` - Pricing recommendations

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker

1. Build the Docker image:
\`\`\`bash
docker build -t artisan-ai .
\`\`\`

2. Run the container:
\`\`\`bash
docker run -p 3000:3000 -e GROQ_API_KEY=your_key artisan-ai
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Cultural Sensitivity

This platform is designed with deep respect for Indian artisan traditions and cultural heritage. All AI-generated content is crafted to:
- Preserve authentic cultural narratives
- Respect traditional knowledge
- Support artisan communities
- Maintain cultural accuracy

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Indian artisan communities for their inspiration
- Open source contributors
- Cultural consultants and advisors
