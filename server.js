import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is running ${PORT}`);
  } else {
    console.log(err);
  }
});
