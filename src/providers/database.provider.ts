import mongoose from 'mongoose';

export const DATABASE_PROVIDER = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://blendbridge:blendbridge123@localhost:27017/blendbridge'
      ),
  },
];
