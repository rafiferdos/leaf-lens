/**
 * Application Configuration
 * 
 * This file centralizes all environment-based configuration.
 * For local development, create a .env.local file with:
 * 
 * NEXT_PUBLIC_API_URL=http://localhost:8000
 * NEWSDATA_API_KEY=your_api_key_here
 */

export const config = {
    // Backend API URL for plant disease detection
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",

    // NewsData.io API configuration
    newsApiKey: process.env.NEWSDATA_API_KEY || "pub_0b8bbc25434548d8a777ec2b7bf60273",
    newsApiUrl: "https://newsdata.io/api/1/latest",

    // App metadata
    appName: "LeafLens",
    appDescription: "AI-powered plant disease detection",
} as const;

export type Config = typeof config;
