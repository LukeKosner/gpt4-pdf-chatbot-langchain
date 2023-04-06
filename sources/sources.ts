import { Interview, InterviewType } from '@/utils/sourceConsolidation';

type Interviews = {
  [key: string]: Interview;
};

const sources: Interviews = {
  'bassfreund.txt': {
    name: 'David P. Boder Interviews Jürgen Bassfreund, September 20, 1946, Munich, Germany',
    url: 'https://iit.aviaryplatform.com/embed/media/73038?embed=true&media_player=true',
  },
  'behar.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Maurice Behar',
    url: 'https://collections.ushmm.org/search/catalog/irn712877',
  },
  'benmayor.txt': {
    name: 'David P. Boder Interviews Rita Benmayor, August 5, 1946, Paris, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73039?embed=true&media_player=true',
  },
  'bondy.txt': {
    name: 'David P. Boder Interviews Nelly Bondy, August 22, 1946, Paris, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73045?embed=true&media_player=true',
  },
  'braun.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Shony Alex Braun ',
    url: 'https://collections.ushmm.org/search/catalog/irn504540',
  },
  'davis.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Francis Davis',
    url: 'https://collections.ushmm.org/search/catalog/irn504842',
  },
  'dunst.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Maurice H',
    url: 'https://collections.ushmm.org/search/catalog/irn509382',
  },
  'eichengreen.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Lucille Eichengreen',
    url: 'https://collections.ushmm.org/search/catalog/irn515846',
  },
  'eisenberg.txt': {
    name: 'David P. Boder Interviews Kalman Eisenberg, July 31, 1946, Fontenay-aux-Roses, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73055?embed=true&media_player=true',
  },
  'freilich.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Dora Freilich',
    url: 'https://collections.ushmm.org/search/catalog/irn508628',
  },
  'frim.txt': {
    name: 'David P. Boder Interviews Leon Frim, September 25, 1946, Wiesbaden, Germany',
    url: 'https://iit.aviaryplatform.com/embed/media/73066?embed=true&media_player=true',
  },
  'frydman.txt': {
    name: 'David P. Boder Interviews Henja Frydman, August 7, 1946, Paris, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73067?embed=true&media_player=true',
  },
  'galant.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with David Galant',
    url: 'https://collections.ushmm.org/search/catalog/irn512340',
  },
  'gertner.txt': {
    name: 'David P. Boder Interviews Alexander Gertner, August 26, 1946, Geneva, Switzerland',
    url: 'https://iit.aviaryplatform.com/embed/media/73068?embed=true&media_player=true',
  },
  'gross.txt': {
    name: 'David P. Boder Interviews Jola Gross, August 3, 1946, Paris, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73071?embed=true&media_player=true',
  },
  'hamburger.txt': {
    name: 'David P. Boder Interviews Ludwig Hamburger, August 26, 1946, Geneva, Switzerland',
    url: 'https://iit.aviaryplatform.com/embed/media/73074?embed=true&media_player=true',
  },
  'heisler.txt': {
    name: 'David P. Boder Interviews Adolph Heisler, August 27, 1946, Geneva, Switzerland',
    url: 'https://iit.aviaryplatform.com/embed/media/73075?embed=true&media_player=true',
  },
  'hoess.txt': {
    name: 'Rudolf Hoess, Commandant of Auschwitz: Testimony at Nuremburg, 1946',
    url: 'https://sourcebooks.fordham.edu/mod/1946hoess.asp',
  },
  'isakovitch.txt': {
    name: 'David P. Boder Interviews Samuel Isakovitch, July 30, 1946, Paris, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73079?embed=true&media_player=true',
  },
  'jaffe.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Hela Jaffe',
    url: 'https://collections.ushmm.org/search/catalog/irn511008',
  },
  'kaletska.txt': {
    name: 'David P. Boder Interviews Anna Kaletska, September 26, 1946, Wiesbaden, Germany',
    url: 'https://iit.aviaryplatform.com/embed/media/73088?embed=true&media_player=true',
  },
  'kozlowski.txt': {
    name: 'David P. Boder Interviews Nechama Epstein-Kozlowski, August 31, 1946, Tradate, Italy',
    url: 'https://iit.aviaryplatform.com/embed/media/73056?embed=true&media_player=true',
  },
  'lea.txt': {
    name: 'David P. Boder Interviews David Lea, August 12, 1946, Paris, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73097?embed=true&media_player=true',
  },
  'levis.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Henry Levis',
    url: 'https://collections.ushmm.org/search/catalog/irn504808',
  },
  'marcus.txt': {
    name: 'David P. Boder Interviews Hadassah Marcus, September 13, 1946, Hénonville, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73101?embed=true&media_player=true',
  },
  'minski.txt': {
    name: 'David P. Boder Interviews Jacob Minski, August 23, 1946, Paris, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73107?embed=true&media_player=true',
  },
  'moskovitz.txt': {
    name: 'David P. Boder Interviews Marko Moskovitz, July 30, 1946, Paris, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73111?embed=true&media_player=true',
  },
  'munzer.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Emanuel Munzer',
    url: 'https://collections.ushmm.org/search/catalog/irn509178',
  },
  'nehrich.txt': {
    name: 'David P. Boder Interviews Wolf Nehrich, August 26, 1946, Geneva, Switzerland',
    url: 'https://iit.aviaryplatform.com/embed/media/73112?embed=true&media_player=true',
  },
  'nemko.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Seva Nemko',
    url: 'https://collections.ushmm.org/search/catalog/irn45982',
  },
  'offen.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Bernard Offen',
    url: 'https://collections.ushmm.org/search/catalog/irn507709',
  },
  'pasternak.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Abraham Pasternak',
    url: 'https://collections.ushmm.org/search/catalog/irn504418',
  },
  'petipa.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Solomon Petipa',
    url: 'https://collections.ushmm.org/search/catalog/irn518363',
  },
  'piskorz.txt': {
    name: 'David P. Boder Interviews Benjamin Piskorz, September 1, 1946, Tradate, Italy',
    url: 'https://iit.aviaryplatform.com/embed/media/73121?embed=true&media_player=true',
  },
  'rosenfeld.txt': {
    name: 'David P. Boder Interviews Pinkhus Rosenfeld, September 13, 1946, Hénonville, France',
    url: 'ttps://iit.aviaryplatform.com/embed/media/73125?embed=true&media_player=tru',
  },
  'rosenwasser.txt': {
    name: 'David P. Boder Interviews Irena Rosenwasser, August 22, 1946, Paris, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73126?embed=true&media_player=true',
  },
  'samuel.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Leo Samuel',
    url: 'https://collections.ushmm.org/search/catalog/irn507694',
  },
  'schiver.txt': {
    name: 'David P. Boder Interviews Toba Schiver, September 2, 1946, Tradate, Italy',
    url: 'https://iit.aviaryplatform.com/embed/media/73130?embed=true&media_player=true',
  },
  'silberbard.txt': {
    name: 'David P. Boder Interviews Gert Silberbard, August 27, 1946, Geneva, Switzerland',
    url: 'https://iit.aviaryplatform.com/embed/media/73137?embed=true&media_player=true',
  },
  'sochami.txt': {
    name: 'David P. Boder Interviews Henry Sochami, August 12, 1946, Paris, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73139?embed=true&media_player=true',
  },
  'sprecher.txt': {
    name: 'David P. Boder Interviews Max Meyer Sprecher, September 23, 1946, Feldafing, Germany',
    url: 'https://iit.aviaryplatform.com/embed/media/73140?embed=true&media_player=true',
  },
  'stopnitsky.txt': {
    name: 'David P. Boder Interviews Udel Stopnitsky, September 12, 1946, Hénonville, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73141?embed=true&media_player=true',
  },
  'stumachin.txt': {
    name: 'David P. Boder Interviews Lina Stumachin, September 8, 1946, Bellevue, France',
    url: 'https://iit.aviaryplatform.com/embed/media/73142?embed=true&media_player=true',
  },
  'tichauer.txt': {
    name: 'David P. Boder Interviews Helen Tichauer, September 23, 1946, Feldafing, Germany',
    url: 'https://iit.aviaryplatform.com/embed/media/73145?embed=true&media_player=true',
  },
  'warschau.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Fela Warschau',
    url: 'https://collections.ushmm.org/search/catalog/irn506723',
  },
  'webber.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Ruth Webber',
    url: 'https://collections.ushmm.org/search/catalog/irn504422',
  },
  'wolheim.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Norbert Wolhelm',
    url: 'https://collections.ushmm.org/search/catalog/irn506769',
  },
  'zancyck.pdf': {
    name: 'United States Holocaust Memorial Museum - Interview with Michael Zancyck',
    url: 'https://collections.ushmm.org/search/catalog/irn47768',
  },
};

export default function findSource(path: string) {
  let type: InterviewType = InterviewType.Pending;
  const fileName = path.split('/').pop();

  if (!fileName) {
    return undefined;
  }

  if (fileName in sources) {
    if (fileName == 'hoess.txt') {
      type = InterviewType.Hoess;
    }

    const file = sources[fileName];

    if (file.url.startsWith('https://iit.aviaryplatform.com/embed/media/')) {
      type = InterviewType.IIT;
    }

    if (file.url.startsWith('https://collections.ushmm.org/search/catalog/')) {
      type = InterviewType.USHMM;
    }

    const name = file.name;
    const url = file.url;

    return { name, url, type };
  }
}
