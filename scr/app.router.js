
import cors from 'cors';
import connectDb from '../DB/connection.js';

const initApp = async(app,express) => {
    app.use(express.json());
    app.use(cors());
    connectDb();

    
    app.get('/', (req, res) => {
      return res.status(200).json({ message: "Welcome to the API Eco!" });
    });
  
   
  
  };
  
export default initApp;