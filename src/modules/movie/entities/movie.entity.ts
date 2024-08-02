import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define the schema
export const MovieSchema = new Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: String,
  overview: String,
  popularity: Number,
  voteAverage: Number,
  voteCount: Number,
  releaseDate: Date,
  genres: [{
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  }],
});

// Define the TypeScript interface
export interface Movie extends Document {
  id: string;
  name: string;
  overview: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  releaseDate: Date;
  genres: { id: number; name: string }[];
}

// Define and export the Mongoose model
export const MovieModel = mongoose.model<Movie>('Movie', MovieSchema, 'netflix.movie');
