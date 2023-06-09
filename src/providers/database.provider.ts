import mongoose from 'mongoose';

export const DATABASE_PROVIDER = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/nest'),
  },
];
