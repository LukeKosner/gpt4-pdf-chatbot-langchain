import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-800 text-white max-w-screen">
      <div className="flex flex-col lg:p-10 lg:pt-10 py-5 px-5 space-y-5 place-items-center text-center ">
        <p className="md:text-lg text-md">
          Auschwitz was a place of unimaginable terror.
        </p>
        <div className="relative md:w-[660px] md:h-[440px] w-[330px] h-[220px]">
          <Image
            src={
              'https://images.unsplash.com/photo-1600356604120-a282718b29b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80'
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
              'https://images.unsplash.com/photo-1638288826688-f0efcb9da93a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80'
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
          Now, we can use artificial intelligence to learn about the world's
          greatest death camp solely from primary accounts.
        </p>
        <div className="relative md:w-[660px] md:h-[440px] w-[330px] h-[220px]">
          <Image
            src={
              'https://images.unsplash.com/photo-1610336875937-dcea9a658408?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
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
