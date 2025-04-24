
import cors from 'cors';
import connectDb from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import categoryRouter from './modules/category/category.router.js';
import productRouter from './modules/product/product.router.js';
import couponRouter from './modules/coupon/coupon.router.js';
import cartRouter from './modules/cart/cart.router.js';


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


    // import productRoutes
    app.use('/products', productRouter);

    // import couponRoutes
    app.use('/coupons', couponRouter);

    // import orderRoutes
    //app.use('/orders', orderRouter);

    // import userRoutes
    //app.use('/users', userRouter);

    // import cartRoutes
    app.use('/carts', cartRouter);

    // import paymentRoutes
    //app.use('/payment', paymentRouter);
  
   
  
  };
  
export default initApp;