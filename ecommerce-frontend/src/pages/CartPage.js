import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const CartPage = () => {

    const [cart, setCart] = useState({ items: [] });
    const navigate = useNavigate();

    const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Users Only, Please Use User Token");
        navigate(-1);
      } else {
        console.error(error);
        alert("Something went wrong while fetching cart");
      }
    }
  };

    const updateQty = async (productId, qty) => {

        await API.put("/cart/update", {
            productId,
            quantity: qty
        });

        fetchCart();
    };

    const removeItem = async (productId) => {

        await API.delete("/cart/remove", {
            data: { productId }
        });

        fetchCart();
    };

    const checkout = async () => {

        await API.post("/checkout", {
            idempotencyKey: Date.now().toString()
        });

        alert("Order placed");

        fetchCart();
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div>

            <h1>Cart</h1>

            {cart.items.map(item => (

                <div key={item.productId._id}>

                    <p>{item.productId.name}</p>

                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                            updateQty(item.productId._id, e.target.value)
                        }
                    />

                    <button onClick={() => removeItem(item.productId._id)}>
                        Remove
                    </button>

                </div>

            ))}

            <button onClick={checkout}>
                Checkout
            </button>

        </div>
    );
};

export default CartPage;