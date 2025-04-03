import mongoose from 'mongoose';

/* Below set true to see the db query logs */
mongoose.set('debug', true);

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
//const dbUrl = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ibl4n.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
const dbUrl = process.env.DB_CONNECTION_URL;

mongoose.Promise = global.Promise;
export const dbConnect = async () => {
    try {
        if (!dbUrl) {
            throw new Error('Mongodb url is not defined');
        }
        await mongoose.connect(dbUrl);
        console.log(`Mongodb is successfully connected to database: ${dbName}`);
    }
    catch (error) {
        console.log(error);
    }
};





