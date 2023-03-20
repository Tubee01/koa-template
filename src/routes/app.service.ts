import Application from 'koa';

type StarWarsCharacterQuote = {
  quote: string;
  movie?: string;
};

type StarWarsCharacter = {
  name: string;
  quotes: StarWarsCharacterQuote[];
};

const charactersAndQuotes: StarWarsCharacter[] = [
  {
    name: 'Darth Vader',
    quotes: [
      {
        quote: 'Do. Or do not. There is no try.',
        movie: 'The Empire Strikes Back',
      },
      {
        quote: 'I find your lack of faith disturbing.',
        movie: 'The Empire Strikes Back',
      },
      {
        quote: 'In my experience, there is no such thing as luck.',
      },
      {
        quote: 'May the Force be with you.',
      },
      {
        quote: 'Never tell me the odds!',
        movie: 'The Empire Strikes Back',
      },
      {
        quote: 'No. I am your father.',
        movie: 'The Empire Strikes Back',
      },
    ],
  },
  {
    name: 'Han Solo',
    quotes: [
      {
        quote: 'Great shot, kid. That was one in a million.',
        movie: 'The Empire Strikes Back',
      },
      {
        quote: 'I know.',
        movie: 'The Empire Strikes Back',
      },

      {
        quote: 'Never tell me the odds!',
        movie: 'The Empire Strikes Back',
      },
    ],
  },
];

export class AppService {
  constructor(private readonly app: Application) {}

  public findAll() {
    this.app.context.logger.verbose(`[${this.constructor.name}]: findAll`);
    return this.delayData(charactersAndQuotes, this.randomIntForDelay());
  }

  public findRandom() {
    this.app.context.logger.verbose(`[${this.constructor.name}]: findRandom`);
    return this.delayData(
      charactersAndQuotes[Math.floor(Math.random() * charactersAndQuotes.length)],
      this.randomIntForDelay(),
    );
  }

  private delayData<T>(data: T, delay: number): Promise<T> {
    this.app.context.logger.verbose(`[${this.constructor.name}]: delayData`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }

  private randomIntForDelay(min = 0, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
