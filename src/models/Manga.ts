import mongoose, { Schema } from 'mongoose';

export type MangaDocument = mongoose.Document & {
  title: string;
  author: string;
  genres: [Schema.Types.ObjectId];
  synopsis: string;
  chapters: number;
}

const mangaSchema = new Schema<MangaDocument>({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre'
  }],
  synopsis: {
    type: String
  },
  chapters: {
    type: Number,
    min: 0
  }
});

export const Manga = mongoose.model<MangaDocument>('Manga', mangaSchema);