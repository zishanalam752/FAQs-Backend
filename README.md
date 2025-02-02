# Multilingual FAQ Management System

A full-stack application for managing Frequently Asked Questions (FAQ) with automatic translation capabilities using Google Cloud Translation API.

## Features

- Create, read, update, and delete FAQ entries
- Automatic translation to multiple languages
- MongoDB database integration
- RESTful API backend
- React-based frontend interface
- Real-time language switching

## Prerequisites

Before running the application, ensure you have:
- Node.js (v14 or higher)
- MongoDB Atlas account
- Google Cloud Platform account
- npm (Node Package Manager)

## Setup and Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/zishanalam752/FAQs-Backend.git
   cd faq
   ```

2. **Set Up Environment Variables**
   Create a `.env` file in the backend directory with the following:
   ```env
   MONGODB_URI="your-mongodb-connection-string"
   PORT=3000
   GOOGLE_CLOUD_PROJECT_ID=your-project-id
   GOOGLE_APPLICATION_CREDENTIALS="../faq-credential.json"
   ```

3. **Google Cloud Setup**
   - Go to Google Cloud Console
   - Create a new project or select existing one
   - Enable the Cloud Translation API
   - Create a service account and download credentials
   - Save the credentials file as `faq-credential.json` in the project root directory

4. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

5. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The server will start on port 3000 (or the port specified in your .env file)

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The React development server will start on port 3001

3. **Access the Application**
   - Backend API: http://localhost:3000
   - Frontend Interface: http://localhost:3001

## Using the Application

1. **Creating FAQ**
   - Click on "Add New FAQ" button
   - Fill in the question and answer
   - Select target language for translation
   - Click Submit

2. **Viewing FAQs**
   - All FAQs are displayed on the main page
   - Use the language dropdown to view translations
   - Search box available to filter FAQs

3. **Managing FAQs**
   - Edit: Click the edit icon next to any FAQ
   - Delete: Click the delete icon to remove an FAQ
   - Translate: Select different language from the dropdown

## Troubleshooting

If you encounter any issues:

1. **Backend Connection Issues**
   - Verify MongoDB connection string in .env
   - Check if backend server is running
   - Ensure port 3000 is not in use

2. **Translation Issues**
   - Verify Google Cloud credentials are correct
   - Check if Translation API is enabled
   - Ensure faq-credential.json is in the correct location

3. **Frontend Issues**
   - Clear browser cache
   - Check console for error messages
   - Verify API endpoint configuration

## Error Handling

The application includes comprehensive error handling for:
- API request failures
- Translation service issues
- Database connection problems
- Invalid input validation

## Security

- Environment variables for sensitive data
- Google Cloud credentials protection
- Input sanitization
- API rate limiting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, email [zishanalam752@gmail.com](mailto:your-email@example.com)

## Acknowledgments

- Google Cloud Platform
- MongoDB Atlas
- React.js community
- Node.js community