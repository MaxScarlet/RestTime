import mongoose, { Connection } from "mongoose";

class MongoConfig {
    constructor(private clusterName: string) { }
    public user = "oxymorontech";
    public pass = "1R3mqAOR1gZ545oX";
    public dbName = "RestTime";

    public get connectionString(): string {
        return `mongodb+srv://${this.user}:${this.pass}@${this.clusterName}/?retryWrites=true&w=majority`
    }

    public connect(): Connection {
        mongoose.connect(this.connectionString, {
            dbName: "RestTime"
        });

        const db = mongoose.connection;

        db.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });

        db.once('open', () => {
            console.log(`Connected to MongoDB [${this.clusterName}], DB: [${this.dbName}]`);
        });
        return db;
    }
}

const mongo = new MongoConfig('main.pqd3zvw.mongodb.net');


export default mongo;