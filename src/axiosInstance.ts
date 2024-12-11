import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Create an Axios base instance
export const axiosInstance = axios.create({
  baseURL: process.env.RAVEN_URL, // Replace with your API base URL
  // timeout: 5000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Default content type
    Accept: 'application/json', // Expected response type
    Authorization: `Bearer ${process.env.LIVE_SECRET_KEY}`,
  },
});
