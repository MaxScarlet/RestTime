import { Schema } from "mongoose";

interface VacationModel {
  vacationId: string;
  id: string;
  place: string;
  desc: string;
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
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
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
