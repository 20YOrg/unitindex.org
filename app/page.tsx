import { fetchItems } from '../lib/directus';

interface DirectusItem {
  id: number;
  name: string;
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
            <li key={item.id}>{item.name}</li>
          ))
        ) : (
          <li>No items found</li>
        )}
      </ul>
    </div>
  );
};

export default Home;