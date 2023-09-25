class AppConfig {
  public baseURL = "http://localhost:4040/";
  public userUrl = `${this.baseURL}api/user/`;
  public vacationUrl = `${this.baseURL}api/vacations/`;
  public WebSiteName = "RestTime";
}

const appConfig = new AppConfig();

export default appConfig;
