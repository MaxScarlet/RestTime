class UserModel {
  public userId?: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public isAdmin?: boolean;
  public favorites?: string[];
  public _id: string;
}
export default UserModel;
