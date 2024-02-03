import { User } from 'src/schemas/User.schema';

export type SavePassword = Omit<User, 'password'> & { token: string };
