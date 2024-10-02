import directus from './directus';

async function fetchSpinner() {
    try {
      // You already know the disk filename, so use it directly
      const spinnerFileName = '7742b7e6-a4a9-44b2-aa16-10ffa10bfa41.png';
      const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;
  
      // Construct the full URL to the spinner image
      const spinnerUrl = `${baseUrl}/assets/${spinnerFileName}`;
      return spinnerUrl;
    } catch (error) {
      console.error('Error fetching spinner logo:', error);
      return null; // Return null if fetching fails
    }
  }
  
  export default fetchSpinner;  
