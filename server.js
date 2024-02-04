import mongoose from 'mongoose';
import config from './environment.js';
import { app } from './app.js';

mongoose.set('strictQuery', true);
mongoose
  .connect(config.HOST_DB)
  .then(() => {
    app.listen(config.PORT, () => {
      console.log('Database connection successful');
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
