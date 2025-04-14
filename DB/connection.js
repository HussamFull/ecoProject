import mongoose from 'mongoose';


const connectDb = async () => {
    return await mongoose.connect(process.env.DB).
    then(() => {
    console.log('DB connected successfully');
    }   )
    .catch((err) => {
        console.log(`DB connection error: ${err} `);
    });
}
export default connectDb;