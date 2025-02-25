import { Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!) // Appwrite endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);        // Your project ID

export const databases = new Databases(client);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!; 