import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

// Define the type for a Directus item
interface DirectusItem {
  id: number;
  name: string;
}

// Function to fetch items from a specified collection
export const fetchItems = async (collection: string): Promise<DirectusItem[]> => {
  try {
    const response = await axios.get(`${API_URL}/items/${collection}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching items from Directus:', error);
    return [];
  }
};