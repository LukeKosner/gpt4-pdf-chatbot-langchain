import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

import consolidate from '@/utils/source-consolidate';

import { type ChatMessage, type Chats } from '@/types/messages';

import Messages from '@/components/messages';

export default function App(): JSX.Element {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
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
  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();

    setError(null);

    if (query.length === 0) {
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
      void fetchEventSource('/api/chat', {
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

            if (data.sourceDocs != null) {
              setMessageState((state: ChatMessage) => ({
                ...state,
                pendingSourceDocs: consolidate(data.sourceDocs),
              }));
            } else {
              setMessageState((state: ChatMessage) => ({
                ...state,
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                pending: ((state.pending ?? '') as any) + data.data,
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
      if (e.key === 'Enter' && query.length > 0) {
        void handleSubmit(e);
      } else if (e.key === 'Enter') {
        e.preventDefault();
      }
    },
    [query],
  );

  const chats: Chats = useMemo(
    () => [
      ...messages,
      ...(pending != null
        ? [
            {
              type: 'apiMessage',
              message: pending,
              sourceDocs: pendingSourceDocs != null ? pendingSourceDocs : [],
            },
          ]
        : []),
    ],
    [messages, pending, pendingSourceDocs],
  );

  // scroll to bottom of chat
  useEffect(() => {
    if (messageListRef.current != null) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <main className="bg-gray-800 text-white flex flex-col min-h-screen">
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
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white p-5 rounded-md font-tight font-bold"
            >
              {loading ? 'Loading' : 'Ask'}
            </button>
          </form>
          {error != null && (
            <div className="border border-red-400 rounded-md p-4">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
