import directus from '@/lib/directus';
import { readSingleton } from '@directus/sdk';
import { notFound } from 'next/navigation';

async function getGlobalMetadata() {
  try {
    const metadata = await directus.request(readSingleton('Global_Metadata'));
    return metadata;
  } catch (error) {
    console.error('Error fetching global metadata:', error);
    notFound();
  }
}

export default async function HomePage() {
  const globalMetadata = await getGlobalMetadata();

  if (!globalMetadata) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{globalMetadata.title}</h1>
      <p className="mt-4">{globalMetadata.description}</p>
    </div>
  );
}