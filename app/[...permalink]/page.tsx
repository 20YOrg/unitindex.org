import { fetchPageByPermalink } from '@/lib/fetchPageByPermalink';

interface PageProps {
  params: { permalink: string[] };
}

export default async function Page({ params }: PageProps) {
  const permalink = `/${params.permalink.join('/')}`;
  console.log('Fetching page with permalink:', permalink);

  const page = await fetchPageByPermalink(permalink);
  console.log('Fetched page data:', page);

  if (!page) {
    console.log('Page not found for permalink:', permalink);
    return <div>Page not found</div>;
  }

  return (
    <div>
      <h1>{page.title}</h1>
    </div>
  );
}