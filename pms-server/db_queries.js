const { MongoClient, ObjectId } = require("mongodb");

const connectDB = async (uri = "mongodb://127.0.0.1:27017/pms") => {
    const client = new MongoClient(uri);
    try {
        console.log("[DB] Connecting to databse...");
        await client.connect();
        console.log("[DB] Connected to database successfully");
        return client;
    } catch (e) {
        console.error("[DB] Failed to connect to databse.");
        console.error(e);
        process.exit(0);
    }
}

const add_product = async (collection, product_data) => {
    try {
        await collection.insertOne(product_data);
        console.log("[DB] Product added to the database");
    } catch (e) {
        console.error("[DB] Failed to add product");
        console.error(e);
    }
}

const update_product = async (collection, product) => {
    try {
        const _id = new ObjectId(product._id);
        delete product._id;
        await collection.updateOne({ _id }, { $set: product });
        console.log("[DB] Product details updated");
    } catch (e) {
        console.error("[DB] Failed to update product details");
        console.error(e);
    }
}

const delete_product = async(collection, id) => {
    try {
        const _id = new ObjectId(id);
        await collection.deleteOne({ _id });
        console.log("[DB] Product deleted from the database");
    } catch (e) {
        console.error("[DB] Failed to delete product");
        console.error(e);
    }
}

const get_products = async (collection) => {
    let products = [];
    try {
        const res = await collection.find();
        products = res.toArray();
        console.log("[DB] Store data fetched successfully");
    } catch (e) {
        console.error("[DB] Store data could not be fetched");
        console.log(e);
    }
    return products;
}

module.exports = {
    connectDB,
    add_product,
    update_product,
    delete_product,
    get_products
};