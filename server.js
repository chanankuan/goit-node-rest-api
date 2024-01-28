import mongoose from 'mongoose';
import { app } from './app.js';

const { HOST_DB, PORT = 4000 } = process.env;

mongoose.set('strictQuery', true);
mongoose
  .connect(HOST_DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
