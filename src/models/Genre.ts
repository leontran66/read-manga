import mongoose, { Schema } from 'mongoose';

/*
  TODO: change document model to reference manga
*/

export type GenreDocument = mongoose.Document & {
  name: string;
}

const genreSchema = new Schema<GenreDocument>({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export const Genre = mongoose.model<GenreDocument>('Genre', genreSchema);