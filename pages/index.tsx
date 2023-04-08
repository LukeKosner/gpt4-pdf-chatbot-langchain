import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Document } from 'langchain/document';
import ReactMarkdown from 'react-markdown';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/accordion';

import consolidate from '@/utils/source-consolidate';

import { ChatMessage, Chats } from '@/types/messages';

import Messages from '@/components/messages';

export default function Home() {
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

  // handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    setError(null);

    if (!query) {
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

  // prevent empty submissions
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

  const chats: Chats = useMemo(
    () => [
      ...messages,
      ...(pending
        ? [
            {
              type: 'apiMessage',
              message: pending,
              sourceDocs: pendingSourceDocs || [],
            },
          ]
        : []),
    ],
    [messages, pending, pendingSourceDocs],
  );

  // scroll to bottom of chat
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <main className="bg-gray-800 text-white flex flex-col min-h-screen">
      <div className="flex justify-between items-center bg-gray-900 p-3">
        <h3 className="text-2xl font-serif font-bold">The Auschwitz Project</h3>
      </div>
      <div className="lg:m-10 m-5">
        <h1 className="lg:text-8xl text-3xl font-serif italic">
          Speak with a virtual historian who has studied the primary accounts of
          Auschwitz.
        </h1>
      </div>
      <div className="mt-auto">
        <div>
          <div ref={messageListRef} className="p-8 space-y-3">
            <Messages chats={chats} />
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
              className="bg-gray-900 text-white p-5 rounded-md w-11/12"
              disabled={loading}
              onKeyDown={handleEnter}
              autoFocus={false}
              maxLength={512}
              id="userInput"
              name="userInput"
              placeholder={
                loading
                  ? 'Waiting for response...'
                  : 'What did Rudolf Hoess do?'
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
      </div>
    </main>
  );
}
