import { fetchItems } from '../lib/directus';

interface DirectusItem {
  id: number;
  Age: string; // Age is a string and capitalized
}

const Home = async () => {
  const items: DirectusItem[] = await fetchItems('global'); // Use 'global' collection name

  console.log('Fetched items:', items); // Log the fetched items

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>ID: {item.id}, Age: {item.Age}</li>
          ))
        ) : (
          <li>No items found</li>
        )}
      </ul>
    </div>
  );
};

export default Home;