import NavigationBar from "./components/Navigation";
import ProductList from "./components/ProductList";
import { useCallback, useEffect, useState } from "react";
import ActionHeader from "./components/ActionHeader";
import axios from "axios";
import ProductDetailPopup from "./components/ProductDetailPopup";

const App = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8000/products");
      setProducts(res.data.products);
    } catch (e) {
      console.error(e);
    }
  }, [setProducts]);


  const saveProduct = useCallback(async (product) => {
    console.log(product);
    try {
      if (product._id) {
        await axios.put("http://localhost:8000/product/update/", {
          product: product
        });
      } else {
        await axios.post("http://localhost:8000/product/add/", { product });
      }
      fetchProducts();
    } catch (err) {
      console.error({ msg: "Something went wrong!", err });
    }
  }, [fetchProducts]);

  const deleteItem = useCallback(async (id) => {
    try {
      await axios.delete("http://localhost:8000/product/delete", { data: { id } });
      fetchProducts();
    } catch(e) {
      console.error(e);
    }
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="App">
      <NavigationBar />
      <ActionHeader setShowModal={setShowModal} />
      <ProductList
        products={products}
        setActiveProduct={setActiveProduct}
        setShowModal={setShowModal}
        deleteItem={deleteItem}
      />
      <ProductDetailPopup
        showModal={showModal}
        setShowModal={setShowModal}
        saveProduct={saveProduct}
        activeProduct={activeProduct}
        setActiveProduct={setActiveProduct}
      />
    </div>
  );
}

export default App;
