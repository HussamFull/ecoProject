
import cors from 'cors';
import connectDb from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import categoryRouter from './modules/category/category.router.js';

const initApp = async(app,express) => {
    app.use(express.json());
    app.use(cors());
    connectDb();

  

    
    app.get('/', (req, res) => {
      return res.status(200).json({ message: "Welcome to the API Eco!" });
    });


      // Importing routes
    // import authRoutes 
    app.use('/auth', authRouter);

    // import categoryRoutes
   app.use('/categories', categoryRouter);
  
   
  
  };
  
export default initApp;