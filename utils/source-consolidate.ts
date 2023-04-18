import findSource from '@/utils/source-finder';
import { type SourceDoc } from '@/types/messages';

export default function consolidate(sourceDocs: SourceDoc[]): SourceDoc[] {
  const combinedDocs: SourceDoc[] = [];

  // get rid of duplicates and add interview metadata
  sourceDocs.forEach((doc) => {
    const { metadata } = doc;
    const { source } = metadata;
    const interview = findSource(source);

    const newDoc = {
      ...doc,
      metadata: {
        ...metadata,
        interview,
      },
    };

    // combine doc contents if they have the same source
    const existingDoc = combinedDocs.find(
      (doc) => doc.metadata.source === newDoc.metadata.source,
    );

    if (existingDoc != null) {
      existingDoc.pageContent += newDoc.pageContent;
    } else {
      combinedDocs.push(newDoc);
    }
  });

  console.log('combinedDocs', combinedDocs);
  return combinedDocs;
}
