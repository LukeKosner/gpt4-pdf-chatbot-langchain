import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Document } from 'langchain/document';
import ReactMarkdown from 'react-markdown';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import consolidate, { InterviewType } from '@/utils/sourceConsolidation';
import { SourceDoc } from '@/utils/sourceConsolidation';
import Link from 'next/link';

type Message = {
  type: 'userMessage' | 'apiMessage';
  message: string;
  sourceDocs?: SourceDoc[];
};

type ChatMessage = {
  messages: Message[];
  pending?: string;
  history: [string, string][];
  pendingSourceDocs?: SourceDoc[];
};

export default function Chat() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sourceDocs, setSourceDocs] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [messageState, setMessageState] = useState<ChatMessage>({
    messages: [
      {
        message: 'Hi, what would you like to learn about Auschwitz?',
        type: 'apiMessage',
      },
    ],
    history: [],
    pendingSourceDocs: [],
  });

  const { messages, pending, history, pendingSourceDocs } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  //handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    setError(null);

    if (!query) {
      alert('Please input a question');
      return;
    }

    const question = query.trim();

    setMessageState((state: ChatMessage) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
      pending: undefined,
    }));

    setLoading(true);
    setQuery('');
    setMessageState((state: ChatMessage) => ({ ...state, pending: '' }));

    const ctrl = new AbortController();

    try {
      fetchEventSource('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
        }),
        signal: ctrl.signal,
        onmessage: (event: any) => {
          if (event.data === '[DONE]') {
            setMessageState((state: ChatMessage) => ({
              history: [...state.history, [question, state.pending ?? '']],
              messages: [
                ...state.messages,
                {
                  type: 'apiMessage',
                  message: state.pending ?? '',
                  sourceDocs: state.pendingSourceDocs,
                },
              ],
              pending: undefined,
              pendingSourceDocs: undefined,
            }));
            setLoading(false);
            ctrl.abort();
          } else {
            const data = JSON.parse(event.data);

            if (data.sourceDocs) {
              setMessageState((state: ChatMessage) => ({
                ...state,
                pendingSourceDocs: consolidate(data.sourceDocs),
              }));
            } else {
              setMessageState((state: ChatMessage) => ({
                ...state,
                pending: (state.pending ?? '') + data.data,
              }));
            }
          }
        },
      });
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      console.log('error', error);
    }
  }

  //prevent empty submissions
  const handleEnter = useCallback(
    (e: any) => {
      if (e.key === 'Enter' && query) {
        handleSubmit(e);
      } else if (e.key == 'Enter') {
        e.preventDefault();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query],
  );

  const chatMessages = useMemo(() => {
    return [
      ...messages,
      ...(pending
        ? [
            {
              type: 'apiMessage',
              message: pending,
              sourceDocs: pendingSourceDocs ? pendingSourceDocs : [],
            },
          ]
        : []),
    ];
  }, [messages, pending, pendingSourceDocs]);

  //scroll to bottom of chat
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div>
      <div ref={messageListRef} className="p-8 space-y-3">
        {chatMessages.map(
          (
            message:
              | Message
              | { type: string; message: string; sourceDocs: SourceDoc[] },
            index: number,
          ) => {
            if (message.type === 'apiMessage') {
              return (
                <div key={`chatMessage-${index}`}>
                  <div
                    key={`chatMessage-${index}`}
                    className="flex flex-row items-center justify-between self-center"
                  >
                    <div className="bg-blue-500 p-3 rounded-xl max-w-4xl">
                      <ReactMarkdown linkTarget="_blank">
                        {message.message}
                      </ReactMarkdown>
                    </div>
                    <p className="text-xl font-serif font-bold mr-3">
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
            } else {
              return (
                <div key={`chatMessage-${index}`}>
                  <div
                    key={`chatMessage-${index}`}
                    className="flex flex-row items-center justify-between self-center align-top"
                  >
                    <p className="text-xl font-serif font-bold mr-3">You</p>
                    <div className="bg-blue-500 p-3 rounded-xl max-w-4xl">
                      <ReactMarkdown linkTarget="_blank">
                        {message.message}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            }
          },
        )}
        {sourceDocs.length > 0 && (
          <div className="p-5">
            <Accordion type="single" collapsible className="flex-col">
              {sourceDocs.map((doc: Document, index: number) => (
                <div key={`SourceDocs-${index}`}>
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>
                      <h3>Source {index + 1}</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ReactMarkdown
                        className="max-w-screen-sm"
                        linkTarget="_blank"
                      >
                        {doc.pageContent}
                      </ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>
        )}
      </div>
      <form
        className="items-center w-screen mt-auto bg-gray-900 justify-between flex flex-row"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-gray-900 text-white p-5 rounded-md w-5/6"
          disabled={loading}
          onKeyDown={handleEnter}
          autoFocus={false}
          maxLength={512}
          id="userInput"
          name="userInput"
          placeholder={
            loading ? 'Waiting for response...' : 'What did Rudolf Hoess do?'
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white p-5 rounded-md font-tight font-bold"
        >
          {loading ? 'Loading' : 'Ask'}
        </button>
      </form>
      {error && (
        <div className="border border-red-400 rounded-md p-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
