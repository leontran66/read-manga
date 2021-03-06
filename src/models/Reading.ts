import mongoose, { Schema } from 'mongoose';

export type ReadingDocument = mongoose.Document & {
  user: string;
  manga: string;
  chapter: number;
}

const readingSchema = new Schema<ReadingDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  manga: { type: Schema.Types.ObjectId, ref: 'Manga', required: true },
  chapter: { type: Number, min: 0 }
});

export const Reading = mongoose.model<ReadingDocument>('Reading', readingSchema);
