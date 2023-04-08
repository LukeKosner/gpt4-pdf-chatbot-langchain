import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-screen flex flex-col lg:m-10 lg:mt-10 my-5 p-3 space-y-5 place-items-center text-center">
      <p>Auschwitz was a place of unimaginable suffering.</p>
      <div className="relative md:w-[660px] md:h-[440px] w-[330px] h-[220px]">
        <Image
          src="/karsten-winegeart-JioCsloIYro-unsplash.jpg"
          fill={true}
          alt="The train tracks leading to Auschwitz."
          className="rounded-xl"
        />
        <Link href="https://unsplash.com/photos/JioCsloIYro">
          <p className="absolute bottom-2 left-2 font-tight uppercase bg-white text-black rounded-2xl px-2 ">
            Credit
          </p>
        </Link>
      </div>
      <p>
        There have been innumerable interviews of survivors and Nazi officials.
      </p>
      <div className="relative md:w-[660px] md:h-[440px] w-[330px] h-[220px]">
        <Image
          src="/colin-c-murphy-TbjTy1Q0ULM-unsplash.jpg"
          fill={true}
          alt="Auschwitz interior."
          className="rounded-xl"
        />
        <Link href="https://unsplash.com/photos/TbjTy1Q0ULM">
          <p className="absolute bottom-2 left-2 font-tight uppercase bg-white text-black rounded-2xl px-2 ">
            Credit
          </p>
        </Link>
      </div>
      <p>
        Now, we can use artificial intelligence to learn about the world's
        greatest charnel house from primary sources.
      </p>
      <div className="relative md:w-[660px] md:h-[440px] w-[330px] h-[220px]">
        <Image
          src="/frederick-wallace-_sVnHTFHQDU-unsplash.jpg"
          fill={true}
          alt="Auschwitz interior."
          className="rounded-xl"
        />
        <Link href="https://unsplash.com/photos/_sVnHTFHQDU">
          <p className="absolute bottom-2 left-2 font-tight uppercase bg-white text-black rounded-2xl px-2 ">
            Credit
          </p>
        </Link>
      </div>
      <Link href="/app">
        <button className="bg-gray-900 text-white rounded-md w-36 p-3">
          Start Chatting
        </button>
      </Link>
    </div>
  );
}
