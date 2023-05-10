import express from "express";
import {productsRouter} from "./routes/products.router.js";
import {cartsRouter} from "./routes/carts.router.js"

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.get("*",(req,res) => {
    return res.status(404).json({
        status:"error",
        message:"the route is not implemented!!!",
        data:{},
    });
});




