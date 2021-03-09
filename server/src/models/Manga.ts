import mongoose, { Schema } from 'mongoose';

export type MangaDocument = mongoose.Document & {
  title: string;
  author: string;
  synopsis: string;
  chapters: number;
}

const mangaSchema = new Schema<MangaDocument>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: { type: String },
  chapters: { type: Number, min: 0 }
});

export const Manga = mongoose.model<MangaDocument>('Manga', mangaSchema);