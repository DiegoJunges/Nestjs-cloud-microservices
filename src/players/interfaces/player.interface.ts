import { Document } from 'mongoose';

export interface Player extends Document {
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  ranking: string;
  rankPosition: number;
  urlPlayerAvatar: string;
}
