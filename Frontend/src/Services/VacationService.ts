/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import vacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import { useAuth } from "../../src/Components/LayoutArea/AuthProvider";

const mainUrl = appConfig.vacationUrl;

/**
 * A service class to handle operations related to vacations.
 */
class VacationService {
	/**
	 * Get all vacations.
	 * @param {boolean} isAdmin - Indicates whether the user is an admin or not.
	 * @returns {Promise<vacationModel[]>} - A promise that resolves to an array of vacation objects.
	 */
	public async getAll(isAdmin: boolean) {
		const response = await axios.get<vacationModel[]>(mainUrl, {
			headers: {
				"x-resttime-isadmin": `${isAdmin}`,
			},
		});
		const item = response.data;
		return item;
	}

	/**
	 * Get vacation information by ID.
	 * @param {string} id - The ID of the vacation to retrieve information for.
	 * @returns {Promise<any>} - A promise that resolves to the vacation information.
	 */
	public async getInfo(id: string) {
		const response = await axios.get<any>(mainUrl + id);
		const item = response.data;
		return item;
	}

	/**
	 * Toggle a vacation's status.
	 * @param {string} id - The ID of the vacation to toggle status for.
	 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating success.
	 */
	public async toggleVacation(id: string) {
		const response = await axios.delete<any>(mainUrl + id);
		return true;
	}

	/**
	 * Get favorite vacations by IDs.
	 * @param {string[]} ids - An array of vacation IDs to retrieve favorites for.
	 * @returns {Promise<any>} - A promise that resolves to an array of favorite vacations.
	 */
	public async getFavs(ids: string[]) {
		const response = await axios.post<any>(mainUrl + "favorites", ids);
		const items = response.data;
		return items;
	}

	/**
	 * Edit a vacation.
	 * @param {vacationModel} vacation - The vacation object containing updated information.
	 * @param {string} id - The ID of the vacation to edit.
	 * @returns {Promise<any>} - A promise that resolves to the edited vacation.
	 */
	public async editVacation(vacation: vacationModel, id: string) {
		const response = await axios.put<any>(mainUrl + id, vacation, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		const items = response.data;
		return items;
	}

	/**
	 * Add a new vacation.
	 * @param {vacationModel} vacation - The vacation object to add.
	 * @returns {Promise<any>} - A promise that resolves to the added vacation.
	 */
	public async addVacation(vacation: vacationModel) {
		const response = await axios.post<any>(mainUrl, vacation, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		const items = response.data;
		return items;
	}
}

const vacationService = new VacationService();

export default vacationService;
