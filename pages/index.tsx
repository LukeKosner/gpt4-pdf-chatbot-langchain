import Image from 'next/image';
import Link from 'next/link';

import winegeart from '../public/karsten-winegeart-JioCsloIYro-unsplash.jpg';
import murphy from '../public/colin-c-murphy-TbjTy1Q0ULM-unsplash.jpg';
import wallace from '../public/frederick-wallace-_sVnHTFHQDU-unsplash.jpg';

export default function Home() {
  return (
    <div className="bg-gray-800 text-white max-w-screen">
      <div className="flex flex-col lg:p-10 lg:pt-10 py-5 px-5 space-y-5 place-items-center text-center ">
        <p className="md:text-lg text-md">
          Auschwitz was a place of unimaginable terror.
        </p>
        <div className="relative md:w-[660px] md:h-[440px] w-[330px] h-[220px]">
          <Image
            src={winegeart}
            fill={true}
            alt="The train tracks leading to Auschwitz."
            className="rounded-xl"
          />
          <Link href="https://unsplash.com/photos/JioCsloIYro">
            <p className="absolute bottom-2 left-2 font-tight uppercase bg-gray-900 rounded-2xl px-2 ">
              Credit
            </p>
          </Link>
        </div>
        <p className="md:text-lg text-md">
          There have been innumerable interviews of survivors and Nazi
          officials.
        </p>
        <div className="relative md:w-[660px] md:h-[440px] w-[330px] h-[220px]">
          <Image
            src={murphy}
            fill={true}
            alt="Auschwitz interior."
            className="rounded-xl"
          />
          <Link href="https://unsplash.com/photos/TbjTy1Q0ULM">
            <p className="absolute bottom-2 left-2 font-tight uppercase bg-gray-900 rounded-2xl px-2 ">
              Credit
            </p>
          </Link>
        </div>
        <p className="md:text-lg text-md">
          Now, we can use artificial intelligence to learn about the world's
          greatest death camp solely from primary accounts.
        </p>
        <div className="relative md:w-[660px] md:h-[440px] w-[330px] h-[220px]">
          <Image
            src={wallace}
            fill={true}
            alt="Auschwitz gates."
            className="rounded-xl"
          />
          <Link href="https://unsplash.com/photos/_sVnHTFHQDU">
            <p className="absolute bottom-2 left-2 font-tight uppercase bg-gray-900 rounded-2xl px-2 ">
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
    </div>
  );
}
