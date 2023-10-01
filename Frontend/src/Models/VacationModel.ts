class VacationModel {
  public vacationId: number;
  public place: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public price: number;
  public _id: string;
  public isDisabled: boolean;

  public picturePath: string;

  constructor() {
    this.startDate = new Date();
    this.endDate = new Date();
  }
}
export default VacationModel;
