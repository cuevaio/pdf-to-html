# PDF to HTML Converter

A modern web application that converts PDF documents into clean, semantic HTML. Built with Next.js 15 and powered by AI for intelligent content extraction and formatting.

## ✨ Features

- **Dual Input Methods**: Upload PDF files or provide URLs to publicly accessible PDFs
- **AI-Powered Conversion**: Uses advanced AI models to extract and structure content intelligently
- **Background Processing**: Leverages Trigger.dev for reliable, scalable PDF processing jobs
- **Modern UI**: Clean, responsive interface with dark/light theme support
- **Real-time Updates**: Live processing status and seamless user experience
- **Multiple Output Formats**: Generates screenshots, markdown, and clean HTML from PDFs
- **Large File Support**: Handles PDFs up to 32MB in size

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Background Jobs**: Trigger.dev for reliable PDF processing
- **File Storage**: UploadThing for secure file uploads
- **Database**: Upstash Redis for caching and session management
- **AI Integration**: OpenAI and Mistral AI for content processing
- **PDF Processing**: pdf-to-img for screenshot generation
- **Styling**: Tailwind CSS with custom theming and animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Redis instance (Upstash recommended)
- Trigger.dev account
- UploadThing account
- OpenAI or Mistral AI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pdf-to-html
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
- `UPSTASH_REDIS_REST_URL` - Your Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN` - Your Upstash Redis token
- `TRIGGER_SECRET_KEY` - Your Trigger.dev secret key
- `UPLOADTHING_SECRET` - Your UploadThing secret
- `UPLOADTHING_APP_ID` - Your UploadThing app ID
- `OPENAI_API_KEY` - Your OpenAI API key (optional)
- `MISTRAL_API_KEY` - Your Mistral AI API key (optional)

4. Run the development server:
```bash
bun dev
# or
npm run dev
```

5. Start the Trigger.dev development server (in a separate terminal):
```bash
bunx trigger.dev@latest dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📖 Usage

1. **Choose Input Method**: Select either "PDF URL" or "Upload File"
2. **Provide PDF**: Enter a public PDF URL or upload a file (max 32MB)
3. **Convert**: Click "Convert PDF" to start the processing
4. **View Results**: The app will process your PDF and display the converted HTML

## 🏗 Project Structure

```
src/
├── actions/          # Server actions
├── app/             # Next.js app router pages
├── components/      # React components
├── lib/            # Utility functions and configurations
├── prompts/        # AI prompts for content processing
└── trigger/        # Background job definitions
```

## 🔧 Development

### Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun biome` - Run Biome formatter and linter

### Code Quality

This project uses:
- **Biome** for code formatting and linting
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint** for additional linting

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on every push

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing React framework
- [Trigger.dev](https://trigger.dev) for reliable background job processing
- [UploadThing](https://uploadthing.com) for seamless file uploads
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
