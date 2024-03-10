import { Schema } from "mongoose";

interface FavoriteModel {
  userId: string;
  id: string;
  vacationId: string;
}
export default FavoriteModel;

export interface FavoriteDoc extends FavoriteModel, Document {}

export const FavoriteSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  vacationId: {
    type: String,
    required: true,
  },
});
