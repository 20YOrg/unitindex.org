// app/devs/page.tsx
import { fetchPageByPermalink } from '@/lib/fetchPageByPermalink';
import { fetchDocumentationCards } from '@/lib/fetchDocumentation';
import { fetchMilestones } from '@/lib/fetchMilestones';
import DocumentationCards from '@/components/DocumentationCards';
import MilestoneTimeline from '@/components/MilestoneTimeline';

export default async function DevsPage() {
  const pageData = await fetchPageByPermalink('/devs');
  const documentationCards = await fetchDocumentationCards();
  const milestones = await fetchMilestones();

  if (!pageData) {
    return <div>No page data found</div>;
  }

  return (
    <div>
      <h1>{pageData.title}</h1>
      <p>{pageData.description}</p>
      <DocumentationCards cards={documentationCards} />
      <MilestoneTimeline milestones={milestones} />
    </div>
  );
}