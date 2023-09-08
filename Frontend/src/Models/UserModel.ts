class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public isAdmin: boolean;

  //   public static userIdValidation = {
  //     required: { value: true, message: "No id has been chosen" },
  //   };
  //   public static nameValidation = {
  //     required: { value: true, message: "No name in input" },
  //     maxLength: { value: 50, message: "Name is too long" },
  //   };
  //   public static descriptionValidation = {
  //     required: { value: true, message: "No description in input" },
  //     minLength: { value: 5, message: "Description is too short" },
  //     maxLength: { value: 1000, message: "Description is too long" },
  //   };
  //   public static priceValidation = {
  //     required: { value: true, message: "No price in input" },
  //     min: { value: 0, message: "Price cannot be negative" },
  //     max: { value: 9999, message: "Price cannot exceed 9999" },
  //   };
  //   public static discountValidation = {
  //     required: { value: true, message: "No name in input" },
  //     min: { value: 0, message: "Discount cannot be less than 0" },
  //     max: { value: 100, message: "Discount cannot be more than 100" },
  //   };
}
export default UserModel;
