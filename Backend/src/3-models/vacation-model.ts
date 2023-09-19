import { Schema } from "mongoose";

interface VacationModel {
  vacationId: string;
  id: string;
  place: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;

  //Check URI module/package
  picturePath: string;
}

export default VacationModel;

export interface VacationDoc extends VacationModel, Document {}

// Define the User schema
export const VacationSchema: Schema = new Schema({
  vacationId: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
  place: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  picturePath: {
    type: String,
    required: false,
  },
});
