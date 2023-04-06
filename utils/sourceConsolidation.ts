import findSource from '@/sources/sources';

enum InterviewType {
  USHMM = 'USHMM',
  IIT = 'IIT',
  Hoess = 'Hoess',
  Pending = 'Pending',
}

type Interview = {
  name: string;
  url: string;
  type?: InterviewType;
};

type SourceDoc = {
  pageContent: string;
  metadata: {
    source: string;
    interview?: Interview;
  };
};

export default function consolidate(sourceDocs: SourceDoc[]) {
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

    if (existingDoc) {
      existingDoc.pageContent += newDoc.pageContent;
    } else {
      combinedDocs.push(newDoc);
    }
  });

  console.log('combinedDocs', combinedDocs);
  return combinedDocs;
}

export type { SourceDoc, Interview };
export { InterviewType };
