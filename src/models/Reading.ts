import mongoose, { Schema } from 'mongoose';

export type ReadingDocument = mongoose.Document & {
  user: string;
  manga: Schema.Types.ObjectId;
  chapter: number;
}

const readingSchema = new Schema<ReadingDocument>({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  manga: {
    type: Schema.Types.ObjectId,
    required: true
  },
  chapter: {
    type: Number,
    min: 0
  }
});

export const Reading = mongoose.model<ReadingDocument>('Reading', readingSchema);