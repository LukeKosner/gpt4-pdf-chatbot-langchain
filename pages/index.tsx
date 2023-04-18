import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <div className="bg-gray-800 text-white max-w-screen">
      <div className="flex flex-col lg:p-10 lg:pt-10 py-5 px-5 space-y-5 place-items-center text-center ">
        <p className="md:text-lg text-md">
          Auschwitz was a place of unimaginable terror.
        </p>
        <div className="relative md:w-[660px] md:h-[440px] w-[330px] h-[220px]">
          <Image
            src={
              'https://i.ibb.co/MR8mhRy/karsten-winegeart-Jio-Cslo-IYro-unsplash.jpg'
            }
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
            src={
              'https://i.ibb.co/sjq8x0z/colin-c-murphy-Tbj-Ty1-Q0-ULM-unsplash.jpg'
            }
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
          Rudolf Hoess was behind it all as the Nazi commandant of Auschwitz,
          and his 1946 testimony at The Nuremberg Trials revealed the
          systematized murder and tragedy at the death camp.
        </p>
        <div className="relative md:w-[460.5px] md:h-[604.5px] w-[307px] h-[403px]">
          <Image
            src={
              'https://upload.wikimedia.org/wikipedia/commons/1/1c/Rudolf_H%C3%B6%C3%9F_crop.jpg'
            }
            fill={true}
            alt="Rudolf Hoess."
            className="rounded-xl"
          />
          <Link href="https://en.wikipedia.org/wiki/Rudolf_H%C3%B6ss?useskin=vector#/media/File:Rudolf_H%C3%B6%C3%9F_crop.jpg">
            <p className="absolute bottom-2 left-2 font-tight uppercase bg-gray-900 rounded-2xl px-2 ">
              Credit
            </p>
          </Link>
        </div>

        <p className="md:text-lg text-md">
          Now, we can use artificial intelligence to learn about the world&apos;s
          greatest death camp solely from primary accounts.
        </p>
        <div className="relative md:w-[660px] md:h-[440px] w-[330px] h-[220px]">
          <Image
            src={
              'https://i.ibb.co/ThsJKgs/frederick-wallace-s-Vn-HTFHQDU-unsplash.jpg'
            }
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

        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-3">
          <Link href="/about">
            <button className="bg-gray-900 text-white rounded-md w-36 p-3">
              How it Works
            </button>
          </Link>
          <Link href="/app">
            <button className="bg-gray-900 text-white rounded-md w-72 p-3">
              Speak with the Virtual Historian
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
