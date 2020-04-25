import mongoose from "mongoose";

export default  () =>
{
    return mongoose.connect(global.__MONGO_URI__, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}
