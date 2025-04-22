import express from 'express';
import initApp from './scr/app.router.js';
import 'dotenv/config';
//import dotenv from 'dotenv';
//dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


initApp(app,express);

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});