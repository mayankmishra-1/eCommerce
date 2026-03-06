import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const res = await API.get("/product");
        setProducts(res.data);
    };

    const addToCart = async (productId) => {
        await API.post("/cart/add", {
            productId,
            quantity: 1
        });
        alert("Added to cart");
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>

            {/* Navigation buttons */}
            <div style={{ marginBottom: "20px" }}>
                <button onClick={() => navigate("/cart")} style={{ marginRight: "10px" }}>
                    Go to Cart
                </button>
                <button onClick={() => navigate("/orders")} style={{ marginRight: "10px" }}>
                    Order History
                </button>
                <button onClick={() => navigate("/admin")}>
                    Admin Panel
                </button>
            </div>

            {/* Product Listing */}
            {products.map(p => (
                <div key={p._id} style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
                    <h3>{p.name}</h3>
                    <p>Price: {p.price}</p>
                    <p>Available: {p.stock - p.reservedStock}</p>

                    <button onClick={() => addToCart(p._id)}>
                        Add To Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductListing;