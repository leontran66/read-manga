import mongoose, { Schema } from 'mongoose';

export type MangaDocument = mongoose.Document & {
  title: string;
  author: string;
  synopsis: string;
  chapters: number;
  thumbnail: string;
}

const mangaSchema = new Schema<MangaDocument>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: { type: String },
  chapters: { type: Number, min: 0 },
  thumbnail: { type: String },
});

mangaSchema.index({ title: 'text' });

export const Manga = mongoose.model<MangaDocument>('Manga', mangaSchema);
