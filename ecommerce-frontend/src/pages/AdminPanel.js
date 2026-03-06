import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: ""
  });

  const [stockInputs, setStockInputs] = useState({});
  const navigate = useNavigate(); 

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product");
      setProducts(res.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Admins Only");
        navigate(-1);
      } else {
        console.error(error);
        alert("Something went wrong while fetching products");
      }
    }
  };

  const createProduct = async () => {
    try {
      await API.post("/product", form);
      fetchProducts();
      setForm({ name: "", price: "", stock: "" });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Admins Only, Please Use Admin Token");
        navigate(-1);
      } else {
        console.error(error);
        alert("Something went wrong while creating product");
      }
    }
  };

  const updateStock = async (id, stock) => {
    try {
      await API.put("/product/stock", { productId: id, stock });
      fetchProducts();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Admins Only");
        navigate(-1);
      } else {
        console.error(error);
        alert("Something went wrong while updating stock");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Admin Product Panel</h1>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      <button onClick={createProduct}>Create Product</button>

      <hr />

      {products.map((p) => (
        <div key={p._id} style={{ marginBottom: 15 }}>
          <p>
            <strong>{p.name}</strong>
          </p>
          <p>Stock: {p.stock}</p>

          <input
            type="number"
            placeholder="New Stock"
            value={stockInputs[p._id] || ""}
            onChange={(e) =>
              setStockInputs({ ...stockInputs, [p._id]: e.target.value })
            }
            style={{ marginRight: 5 }}
          />

          <button
            onClick={() => {
              updateStock(p._id, stockInputs[p._id]);
              setStockInputs({ ...stockInputs, [p._id]: "" });
            }}
          >
            Update Stock
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;