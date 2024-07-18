import { fetchItems } from '../lib/directus';

// Define the type for a Directus item
interface DirectusItem {
  id: number;
  name: string;
}

const Home = async () => {
  // Fetch data from Directus
  const items: DirectusItem[] = await fetchItems('your_collection'); // Replace 'your_collection' with your actual collection name

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;