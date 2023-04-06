import Chat from '@/components/Chat';

export default function Home() {
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
      <div className="mt-auto">
        <Chat />
      </div>
    </main>
  );
}
