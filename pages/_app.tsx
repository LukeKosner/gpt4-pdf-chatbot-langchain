import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { Cormorant_Garamond, Inter_Tight } from 'next/font/google';

export const metadata = {
  title: 'The Auschwitz Project',
  description: 'Generated by create next app',
};

const cormorant_garamond = Cormorant_Garamond({
  variable: '--font-cormorant-garamond',
  weight: ['300', '400', '500', '600', '700'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
});

const inter_tight = Inter_Tight({
  variable: '--font-inter-tight',
  weight: ['300', '400', '500', '600', '700'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main
        className={`${inter_tight.variable} ${cormorant_garamond.variable}`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
