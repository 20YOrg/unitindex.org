import { fetchPageByPermalink } from '@/lib/fetchPageByPermalink';
import getUnitOfAccountPage from '@/lib/fetchUnitOfAccountPage';
import { fetchTopGallery } from '@/lib/fetchTopGallery';
import { fetchBottomGallery } from '@/lib/fetchBottomGallery';
import UnitOfAccountClient from '@/components/UnitOfAccountClient';
import { UnitOfAccountData } from '@/lib/types'; // Import the type

export default async function UnitOfAccountPage() {
  // Fetch the server-side data
  const pageData = await fetchPageByPermalink('/products/unit-of-account');
  const unitOfAccountData: UnitOfAccountData = await getUnitOfAccountPage(); // Ensure the type matches
  const topGallery = await fetchTopGallery();
  const bottomGallery = await fetchBottomGallery();

  // Check if data is not found or if there are any issues
  if (!pageData || !unitOfAccountData) {
    return <div>Loading...</div>; // Or handle it with proper error state
  }

  // Pre-process URLs for the background image
  const backgroundImageUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/${pageData.background}`;

  // Pass data to the client-side component
  return (
    <UnitOfAccountClient
      pageData={pageData}
      unitOfAccountData={unitOfAccountData}
      topGallery={topGallery}
      bottomGallery={bottomGallery}
      backgroundImageUrl={backgroundImageUrl}
    />
  );
}