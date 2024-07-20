import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

async function getGlobals() {
  try {
    const response = await directus.request(readItems('global'));
    console.log('Directus response:', response);
    return response.data ? response.data : response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default async function HomePage() {
  console.log('HomePage component loaded');
  const globals = await getGlobals();
  console.log('Globals:', globals);
  if (globals.length === 0) {
    return <div>No data found</div>;
  }
  return (
    <div>
      <h1>Items</h1>
      <ul>
        {globals.map((item) => (
          <li key={item.id}>
            ID: {item.id}, Age: {item.Age}
          </li>
        ))}
      </ul>
    </div>
  );
}