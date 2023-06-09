import { Logger } from '@common/logger';
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
  private readonly logger: Logger;

  constructor(private readonly app: Application) {
    this.logger = app.context.logger;
  }

  public findAll() {
    this.logger.verbose(`findAll`, this.constructor.name);
    return charactersAndQuotes;
  }

  public findRandom() {
    this.logger.verbose(`findRandom`, this.constructor.name);
    return charactersAndQuotes[Math.floor(Math.random() * charactersAndQuotes.length)];
  }
}
