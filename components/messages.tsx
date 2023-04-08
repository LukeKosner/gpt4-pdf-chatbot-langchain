import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/accordion';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Chats } from '@/types/messages';
import { PropsWithChildren } from 'react';
import { InterviewType } from '@/types/interviews';

export interface Props {
  chats: Chats;
}

export default function Messages(props: PropsWithChildren<Props>) {
  const { chats } = props;

  return (
    <div>
      {chats.map((message, index) => {
        if (message.type === 'apiMessage') {
          return (
            <div key={`chatMessage-${index}`}>
              <div
                key={`chatMessage-${index}`}
                className="flex flex-row items-center justify-between self-center"
              >
                <div className="flex-col md:flex-none">
                  <p className="text-lg md:text-xl visible md:invisible font-tight mr-3">
                    Virtual Historian
                  </p>
                  <div className="bg-blue-500 p-3 rounded-xl max-w-4xl">
                    <ReactMarkdown linkTarget="_blank">
                      {message.message}
                    </ReactMarkdown>
                  </div>
                </div>

                <p className="text-xl invisible  md:visible font-tight mr-3">
                  Virtual Historian
                </p>
              </div>
              {message.sourceDocs && (
                <div className="p-5" key={`sourceDocsAccordion-${index}`}>
                  <Accordion type="single" collapsible className="flex-col">
                    {message.sourceDocs.map((doc, index) => (
                      <div key={`messageSourceDocs-${index}`}>
                        {doc.metadata.interview && (
                          <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger>
                              <h3>
                                Source {index + 1}:{' '}
                                {doc.metadata.interview.name}
                              </h3>
                            </AccordionTrigger>
                            <AccordionContent>
                              {doc.metadata.interview?.type ==
                                InterviewType.IIT && (
                                <iframe
                                  title={doc.metadata.interview.name}
                                  src={doc.metadata.interview.url}
                                  allow="fullscreen"
                                  className="w-full h-96"
                                />
                              )}
                              <div>
                                <ReactMarkdown linkTarget="_blank">
                                  {doc.pageContent}
                                </ReactMarkdown>
                              </div>
                              <Link href={doc.metadata.interview.url}>
                                <button className="mt-2 h-12 w-1/2 bg-white rounded-xl text-gray-800">
                                  <b>View Source</b>
                                </button>
                              </Link>
                            </AccordionContent>
                          </AccordionItem>
                        )}
                      </div>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          );
        }
        return (
          <div key={`chatMessage-${index}`}>
            <div
              key={`chatMessage-${index}`}
              className="flex flex-row items-center justify-between self-center"
            >
              <p className="text-xl invisible md:visible font-tight mr-3">
                You
              </p>
              <div className="flex-col md:flex-none">
                <div className="flex flex-row">
                  <p className="text-lg md:text-xl visible md:invisible font-tight ml-auto">
                    You
                  </p>
                </div>
                <div className="bg-blue-500 p-3 rounded-xl max-w-4xl">
                  <ReactMarkdown linkTarget="_blank">
                    {message.message}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
            {message.sourceDocs && (
              <div className="p-5" key={`sourceDocsAccordion-${index}`}>
                <Accordion type="single" collapsible className="flex-col">
                  {message.sourceDocs.map((doc, index) => (
                    <div key={`messageSourceDocs-${index}`}>
                      {doc.metadata.interview && (
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger>
                            <h3>
                              Source {index + 1}: {doc.metadata.interview.name}
                            </h3>
                          </AccordionTrigger>
                          <AccordionContent>
                            {doc.metadata.interview?.type ==
                              InterviewType.IIT && (
                              <iframe
                                title={doc.metadata.interview.name}
                                src={doc.metadata.interview.url}
                                allow="fullscreen"
                                className="w-full h-96"
                              />
                            )}
                            <div>
                              <ReactMarkdown linkTarget="_blank">
                                {doc.pageContent}
                              </ReactMarkdown>
                            </div>
                            <Link href={doc.metadata.interview.url}>
                              <button className="mt-2 h-12 w-1/2 bg-white rounded-xl text-gray-800">
                                <b>View Source</b>
                              </button>
                            </Link>
                          </AccordionContent>
                        </AccordionItem>
                      )}
                    </div>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
