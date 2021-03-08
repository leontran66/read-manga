import mongoose, { Schema } from 'mongoose';

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  accessLevel: string;
  reading: [Schema.Types.ObjectId]
}

const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessLevel: {
    type: String,
    required: true
  },
  reading: [{
    type: Schema.Types.ObjectId,
    ref: 'Reading'
  }]
});

export const User = mongoose.model<UserDocument>('User', userSchema);