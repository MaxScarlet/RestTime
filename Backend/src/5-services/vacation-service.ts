import mongoose from "mongoose";
import VacationModel, { VacationDoc, VacationSchema } from "../3-models/vacation-model";
import imageHelper from "../2-utils/image-handle";

/**
 * A service class to handle operations related to vacations.
 */
export default class VacationService {
	private modelMongo;

	constructor() {
		this.modelMongo = mongoose.model<VacationDoc>("Vacation", VacationSchema, "Vacations");
	}

	/**
	 * Get all vacations.
	 * @param {boolean} isAdmin - Indicates whether the user is an admin.
	 * @returns {Promise<VacationModel[]>} - A promise that resolves to an array of vacation objects.
	 */
	public getAllVacations = async (isAdmin: boolean = false): Promise<VacationModel[]> => {
		const filter = { isDisabled: { $in: [null, false] } };

		return await this.modelMongo.find(isAdmin ? null : filter);
	};

	/**
	 * Get favorites by ids.
	 * @param {string[]} ids - The IDs of the favorite vacations.
	 * @returns {Promise<VacationModel[]>} - A promise that resolves to an array of favorite vacation objects.
	 */
	public async getFavorites(ids: string[]): Promise<VacationModel[]> {
		const objIds = [];
		ids.forEach((id) => {
			objIds.push(new mongoose.Types.ObjectId(id));
		});
		return await this.modelMongo.find().where("_id").in(objIds).exec();
	}

	/**
	 * Add a new vacation.
	 * @param {VacationModel} vacation - The vacation object to add.
	 * @returns {Promise<any>} - A promise that resolves with the response from the database.
	 */
	public async addVacation(vacation: VacationModel): Promise<any> {
		const response = await this.modelMongo.insertMany(vacation);
		const imageName = vacation.picture
			? await imageHelper.saveImage(vacation.picture, response[0]._id.toString())
			: "";
		return response;
	}

	/**
	 * Update a vacation by ID with image handle.
	 * @param {string} vacationId - The ID of the vacation to update.
	 * @param {VacationModel} vacation - The updated vacation object.
	 * @returns {Promise<VacationModel>} - A promise that resolves to the updated vacation object.
	 */
	public updateVacationById = async (vacationId: string, vacation: VacationModel): Promise<VacationModel> => {
		const imageName = vacation.picture
			? await imageHelper.saveImage(vacation.picture, vacationId)
			: "";
		vacation.picturePath = "";
		return await this.modelMongo.findByIdAndUpdate(vacationId, vacation, {
			new: true,
		});
	};

	/**
	 * Get a vacation by ID.
	 * @param {string} vacationId - The ID of the vacation to retrieve.
	 * @returns {Promise<VacationModel>} - A promise that resolves to the vacation object.
	 */
	public getVacationById = async (vacationId: string): Promise<VacationModel> => {
		return await this.modelMongo.findById(vacationId);
	};

	/**
	 * Delete a vacation by ID.
	 * @param {string} vacationId - The ID of the vacation to delete.
	 * @returns {Promise<any>} - A promise that resolves with the deletion result.
	 */
	public deleteVacationById = async (vacationId: string): Promise<any> => {
		const vacation = await this.modelMongo.findById(vacationId);
		vacation.isDisabled = !vacation.isDisabled;
		return await this.modelMongo.findByIdAndUpdate(vacationId, vacation);
	};
}
