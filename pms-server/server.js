const express = require("express");
const cors = require("cors");
const { connectDB, add_product, update_product, delete_product, get_products } = require("./db_queries");
const app = express();

app.use(cors());
app.use(express.json());

let collection = null;

app.get("/products", async (req, res) => {
    try {
        console.log("[Server] 'Get products' request received");
        const products = await get_products(collection);
        const msg = "Products fetched successfully";
        console.log(`[Server] ${msg}`);
        res.send({ msg, products });
    } catch (err) {
        res.status(500).send({ msg: "Products could not be fetched", err });
    }
});

app.post("/product/add", async (req, res) => {
    try {
        console.log("[Server] 'Add product' request received");
        const product = req.body.product;
        await add_product(collection, product);
        const msg = "Product added successfully";
        console.log(`[Server] ${msg}`);
        res.send({ msg });
    } catch (err) {
        res.status(500).send({ msg: "Something went wrong" });
    }
});


app.put("/product/update", async (req, res) => {
    try {
        console.log("[Server] 'Update product details' request received");
        const { product } = req.body;
        await update_product(collection, product);
        const msg = "Product details updated successfuly";
        console.log(`[Server] ${msg}`);
        res.send({ msg });
    } catch (err) {
        res.status(500).send({ msg: "Something went wrong" });
    }
});


app.delete("/product/delete", async (req, res) => {
    try {
        console.log("[Server] 'Delete product' request received");
        const id = req.body.id;
        await delete_product(collection, id);
        const msg = "Product deleted successfully";
        console.log(`[Server] ${msg}`);
        res.send({ msg });
    } catch (err) {
        res.status(500).send({ msg: "Something went wrong" });
    }
});


app.listen(8000, async () => {
    console.clear();
    console.log("[Server] Server up and running on Port 8000");
    const client = await connectDB();
    collection = client.db().collection("products");
});