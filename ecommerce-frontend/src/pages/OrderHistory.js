import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const OrderHistory = () => {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Admins Only, Please Use Admin Token");
        navigate(-1);
      } else {
        console.error(error);
        alert("Something went wrong while fetching orders");
      }
    }
  };

    const cancelOrder = async (orderId) => {

        await API.put("/orders/cancel", { orderId });

        fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>

            <h1>Orders</h1>

            {orders.map(o => (

                <div key={o._id}>

                    <p>Status: {o.status}</p>

                    <p>Total: {o.totalAmount}</p>

                    {o.status === "CONFIRMED" && (

                        <button onClick={() => cancelOrder(o._id)}>
                            Cancel Order
                        </button>

                    )}

                </div>

            ))}

        </div>
    );
};

export default OrderHistory;