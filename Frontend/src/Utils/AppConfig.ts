class AppConfig {
  public baseURL =
    process.env.NODE_ENV === "production"
      ? "http://max.oxymoron-technique.com/rest-time/"
      : "http://localhost:4040/";
  public userUrl = `${this.baseURL}api/user/`;
  public vacationUrl = `${this.baseURL}api/vacations/`;
  public reportsUrl = `${this.baseURL}api/reports/`;
  public WebSiteName = "RestTime";
}

const appConfig = new AppConfig();

export default appConfig;
