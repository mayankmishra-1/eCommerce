// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api";

// const OrderHistory = () => {

//     const [orders, setOrders] = useState([]);
//     const navigate = useNavigate();

//     const fetchOrders = async () => {
//     try {
//       const res = await API.get("/orders");
//       setOrders(res.data);
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         alert("Admins Only, Please Use Admin Token");
//         navigate(-1);
//       } else {
//         console.error(error);
//         alert("Something went wrong while fetching orders");
//       }
//     }
//   };

//     const cancelOrder = async (orderId) => {

//         await API.put("/orders/cancel", { orderId });

//         fetchOrders();
//     };

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     return (
//         <div>

//             <h1>Orders</h1>

//             {orders.map(o => (

//                 <div key={o._id}>

//                     <p>Status: {o.status}</p>

//                     <p>Total: {o.totalAmount}</p>

//                     {o.status === "CONFIRMED" && (

//                         <button onClick={() => cancelOrder(o._id)}>
//                             Cancel Order
//                         </button>

//                     )}

//                 </div>

//             ))}

//         </div>
//     );
// };

// export default OrderHistory;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../css/OrderHistory.css"; // import CSS

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [statusSelections, setStatusSelections] = useState({}); // track dropdown values
  const navigate = useNavigate();

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Admins Only, Please Use Admin Token");
        navigate(-1);
      } else {
        console.error(error);
        alert("Something went wrong while fetching orders");
      }
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      await API.put("/orders/cancel", { orderId });
      fetchOrders();
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Users Only, Please Use USER Token");
        navigate(-1);
      } else {
        console.error(error);
        alert("Something went wrong while cancelling order");
      }
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId) => {
    const status = statusSelections[orderId];
    if (!status) {
      alert("Please select a status before updating");
      return;
    }
    try {
      await API.put("/orders/status", { orderId, status });
      fetchOrders();
      alert(`Order status updated to ${status}`);
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Admins Only, Please Use Admin Token");
        navigate(-1);
      } else {
        console.error(error);
        alert("Something went wrong while updating order status");
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // All possible statuses
  const statuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "FAILED"];

  return (
    <div className="order-history">
      <h1>Orders</h1>

      {orders.map((o) => (
        <div key={o._id} className="order-card">
          <div className="order-info">
            <p><strong>Order ID:</strong> {o._id}</p>
            <p><strong>Status:</strong> {o.status}</p>
            <p><strong>Total:</strong> {o.totalAmount}</p>
          </div>

          <div className="order-actions">
            {/* Cancel button only for CONFIRMED orders */}
            {o.status === "CONFIRMED" && (
              <button className="cancel-btn" onClick={() => cancelOrder(o._id)}>
                Cancel Order
              </button>
            )}

            {/* Status dropdown always visible */}
            <div className="status-update">
              <select
                value={statusSelections[o._id] || o.status} // default to current status
                onChange={(e) =>
                  setStatusSelections({
                    ...statusSelections,
                    [o._id]: e.target.value
                  })
                }
              >
                <option value="">Select Status</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                className="update-status-btn"
                onClick={() => updateOrderStatus(o._id)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;