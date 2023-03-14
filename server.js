const app = require('./app');
require("dotenv").config();
const connectDB = require('./config/DbConnection');

// configuring the port
// database connection
connectDB()
const port = process.env.PORT || 5000 ;

// if(process.env.NODE_ENV == "production"){
//     app.use(express.static("client/build"));
// }
app.listen(port, ()=>{
    console.log(`server is running on port  ${port}`);
});




