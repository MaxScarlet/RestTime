import { Query } from "mongoose";
import UserModel, { UserDoc } from "../../src/3-models/user-model";
import UserService from "../../src/5-services/user-service";
import { rejects } from "assert";

class MockUserModel implements UserModel {
  // Implement the properties and methods of the UserModel interface here
  userId: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  favorites: string[];

  constructor(name: string, rndNumber: number) {
    this.firstName = "fn" + name + " " + rndNumber;
    this.lastName = "ln" + name + " " + rndNumber;
  }
}
const newEntity = { name: "User", id: 1 };
const userService = new UserService();
const testUser = new MockUserModel(newEntity.name, newEntity.id);

describe("User Service", () => {
  afterEach(() => jest.resetAllMocks());

  //   describe("Create M2M", () => {
  //     const newMachine = newEntity as MockUserModel;
  //     test("M2M created successfully", async () => {
  //       testUser.name = newEntity.name;
  //       mongoMock.CreateClient.mockReturnValue(Promise.resolve(testUser));
  //       mongoMock.CreateClientGrant.mockReturnValue(Promise.resolve(true));
  //       const machine: Machine = await userService.Create(newMachine);
  //       expect(machine.name).toEqual(testUser.name);
  //       expect(machine.clientId).toBeDefined();
  //       expect(machine.clientId).toEqual(testUser.clientId);
  //     });

  //     test("Failed to create M2M", async () => {
  //       mongoMock.CreateClient.mockReturnValue(
  //         Promise.resolve({ name: newEntity.name })
  //       );
  //       mongoMock.CreateClientGrant.mockReturnValue(Promise.resolve(false));
  //       await expect(userService.Create(newMachine)).rejects.toThrow("Empty");
  //     });
  //   });

  //   describe("Delete M2M", () => {
  //     test("M2M deleted successfully", async () => {
  //       let machinesList: Machine[] = [
  //         new Machine({ client_id: "clid1", name: "m2m-1" }),
  //         new Machine({ client_id: "clid2", name: "m2m-2" }),
  //         new Machine({ client_id: "clid3", name: "m2m-3" }),
  //       ];
  //       const idToRemove = machinesList[0].clientId;
  //       mongoMock.DeleteClient.mockReturnValue(
  //         Promise.resolve(
  //           (machinesList = machinesList.filter((m) => m.clientId !== idToRemove))
  //         )
  //       );
  //       const result: Machine = await userService.Delete(idToRemove);

  //       expect(machinesList.length).toBe(2);
  //     });
  //   });

  describe("List Users", () => {
    test("Users returned successfully", async () => {
      const userList = [
        new MockUserModel("clid1", 1),
        new MockUserModel("clid2", 2),
        new MockUserModel("clid3", 3),
      ];
      const findMock = jest
        .spyOn(userService.modelMongo, "find")
        .mockResolvedValue(userList);
      const result: MockUserModel[] = await userService.getAllUsers();
      expect(result.length).toBe(3);
    });
  });

  describe("Get User by Id", () => {
    test("User returned successfully", async () => {
      const findMock = jest
        .spyOn(userService.modelMongo, "findById")
        .mockResolvedValue(testUser);
      const result: MockUserModel = await userService.getUserById(testUser.id);
      //   expect(result.id).toBeDefined();
      expect(result.id).toEqual(testUser.id);
    });
    test("[NEGATIVE] User doesn`t exist", async () => {
      const findMock = jest
        .spyOn(userService.modelMongo, "findById")
        .mockResolvedValue(undefined);
      const result: MockUserModel = await userService.getUserById(testUser.id);
      //   expect(result.id).toBeDefined();
      expect(result).toBeUndefined();
    });
  });
  describe("User Log in", () => {
    test("User Logged in successfully", async () => {
      testUser.email = "test@gmail.com";
      testUser.password = "123123";
      const findMock = jest
        .spyOn(userService.modelMongo, "findOne")
        .mockResolvedValue(testUser);
      const result = await userService.login({
        email: testUser.email,
        password: testUser.password,
      });
      //   expect(result.id).toBeDefined();
      expect(result).toBeDefined();
      expect(result.email).toEqual(testUser.email);
    });
    test("[NEGATIVE] User Failed to Log in", async () => {
      testUser.email = "test@gmail.com";
      testUser.password = "123123";
      const findMock = jest
        .spyOn(userService.modelMongo, "findOne")
        .mockReturnValue(undefined);
      const result = await userService.login({
        email: testUser.email,
        password: "invalidpassword",
      });
      //   expect(result.id).toBeDefined();
      expect(result).toBeUndefined();
    });
  });
  //     test("M2M not found", async () => {
  //       mongoMock.GetClient.mockReturnValue(
  //         Promise.reject(new NotFoundError("Mock Error"))
  //       );
  //       await expect(userService.Get(testUser.clientId)).rejects.toThrow(
  //         NotFoundError
  //       );
  //     });
});
