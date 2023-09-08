const express = require("express");
const cors = require("cors");
const routerApi=require('./routes');
const {checkApiKey}=require('./middlewares/auth.handler');

const {logErrors,errorHandler,boomErrorHandler,ormErrorHandler} =require('./middlewares/error.handler');
const app = express();
const PORT = process.env.PORT|| 3977;

app.use(express.json());

const whiteList=['http://localhost:8080','https://myapp.co'];
const options={
  origin:(origin,callback)=>{
    if(whiteList.includes(origin)){
      callback(null,true);
    }else{
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors());

app.get("/api", checkApiKey,(req, res) =>{
  res.send("Hola mi server en Express");
});

routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () =>{
  console.log("My port: " + PORT);
});
