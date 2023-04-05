import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import Layout from '@/components/layout';
import { Message } from '@/types/chat';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Document } from 'langchain/document';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sourceDocs, setSourceDocs] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
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

    setMessageState((state) => ({
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
    setMessageState((state) => ({ ...state, pending: '' }));

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
            setMessageState((state) => ({
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
              setMessageState((state) => ({
                ...state,
                pendingSourceDocs: data.sourceDocs,
              }));
            } else {
              setMessageState((state) => ({
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
              sourceDocs: pendingSourceDocs,
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
    <main className="bg-gray-800 text-white flex flex-col min-h-screen">
      <div className="flex justify-between items-center bg-gray-900 p-3">
        <h3 className="text-2xl font-serif font-bold">The Auschwitz Project</h3>
      </div>
      <div className="m-10">
        <h1 className="text-8xl font-serif italic">
          Speak with a virtual historian who has studied the primary accounts of
          Auschwitz.
        </h1>
      </div>
      <div ref={messageListRef} className="p-5">
        {chatMessages.map((message, index) => {
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
                          <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger>
                              <h3>Source {index + 1}</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ReactMarkdown linkTarget="_blank">
                                {doc.pageContent}
                              </ReactMarkdown>
                              <p className="mt-2">
                                <b>Source:</b> {doc.metadata.source}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
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
                {message.sourceDocs && (
                  <div className="p-5" key={`sourceDocsAccordion-${index}`}>
                    <Accordion type="single" collapsible className="flex-col">
                      {message.sourceDocs.map((doc, index) => (
                        <div key={`messageSourceDocs-${index}`}>
                          <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger>
                              <h3>Source {index + 1}</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ReactMarkdown linkTarget="_blank">
                                {doc.pageContent}
                              </ReactMarkdown>
                              <p className="mt-2">
                                <b>Source:</b> {doc.metadata.source}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </div>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>
            );
          }
        })}

        {sourceDocs.length > 0 && (
          <div className="p-5">
            <Accordion type="single" collapsible className="flex-col">
              {sourceDocs.map((doc, index) => (
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
    </main>
  );
}
