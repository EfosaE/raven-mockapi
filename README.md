# Raven Mock API

A bank web app simulator built with Express.js and TypeScript that integrates with the Raven Payment API. This project provides endpoints for user authentication, account management, and payment transfers.

## Features

- **User Authentication**
  - Secure registration with password hashing
  - Session-based authentication with MySQL store
  - Automatic account generation through Raven API
  - Login with persistent sessions

- **Account Management**
  - Automatic bank account generation for new users
  - Account details storage and retrieval
  - Profile management

- **Payment Features**
  - Bank transfers with real-time processing
  - Transaction history tracking
  - Transfer status monitoring
  - Webhook integration for payment notifications

## Tech Stack

- **Backend**
  - Express.js with TypeScript
  - MySQL (via Knex.js)
  - Express Session with Knex Session Store

- **Authentication & Security**
  - bcrypt for password hashing
  - HTTP-only cookies
  - Session-based authentication
  - Zod for input validation

- **API Integration**
  - Axios for HTTP requests
  - Raven Payment API integration

## Project Structure

```
src/
├── controllers/         # Request handlers
├── features/           # Core business logic
├── middlewares/        # Custom middleware functions
├── routes/            # API route definitions
├── types/             # TypeScript type definitions
└── utils/             # Helper functions and utilities
```

## Database Schema

The project uses several tables managed through Knex.js migrations:

- **users**: Store user information
- **accounts**: Bank account details
- **sessions**: Session management
- **transactions**: Transaction records

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL
- Raven API credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd raven-mockapi
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
DATABASE_URL=your_mysql_connection_string
RAVEN_URL=your_raven_api_url
LIVE_SECRET_KEY=your_raven_secret_key
SESSION_SECRET=your_session_secret
```

4. Run database migrations:
```bash
npx knex migrate:latest
```

5. Start the development server:
```bash
npm run start:dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - User login

### User Operations
- `GET /api/v1/users/profile` - Get user profile
- `POST /api/v1/users/transfers` - Initiate a transfer
- `GET /api/v1/users/transfers/:trx_ref` - Get transfer details

### Webhooks
- `POST /api/v1/webhook` - Webhook endpoint for payment notifications

## Development

The project includes several npm scripts:

- `npm run start:dev` - Start development server with hot-reload
- `npm run watch-ts` - Watch TypeScript files for changes
- `npm run build` - Build the TypeScript project
- `npm start` - Start the production server

## Error Handling

The application implements a global error handling system with:
- Custom `AppError` class for operational errors
- Development vs Production error responses
- Detailed error logging in development

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- HTTP-only cookies
- Input validation and sanitization with Zod
- Phone number validation (E.164 format)
- Secure session management

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License.

## Author

Efosa
