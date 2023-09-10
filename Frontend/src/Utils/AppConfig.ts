class AppConfig {
    public userUrl = "http://localhost:4000/api/user/";
    //public userUrl = "https://voudez7zo6.execute-api.eu-west-1.amazonaws.com/dev/user/"; // STUB-OXY
    public vacationUrl = "http://localhost:4000/api/vacations/";
}

const appConfig = new AppConfig();

export default appConfig;
