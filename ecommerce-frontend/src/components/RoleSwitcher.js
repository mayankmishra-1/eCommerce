// import { setAdmin, setUser } from "../api/api";

// const RoleSwitcher = () => {

//     return (
//         <div style={{marginBottom:20}}>
//             <button onClick={() => setUser()}>
//                 Use USER Token
//             </button>

//             <button onClick={() => setAdmin()}>
//                 Use ADMIN Token
//             </button>
//         </div>
//     );
// };

// export default RoleSwitcher;

import { useNavigate } from "react-router-dom";
import { setAdmin, setUser } from "../api/api";

const RoleSwitcher = () => {
    const navigate = useNavigate();

    const handleUser = () => {
        setUser();
        alert("Switched to USER role!");
    };

    const handleAdmin = () => {
        setAdmin();
        alert("Switched to ADMIN role!");
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <button onClick={() => navigate("/")}>
                Home
            </button>

            <button onClick={handleUser}>
                Use USER Token
            </button>

            <button onClick={handleAdmin}>
                Use ADMIN Token
            </button>
        </div>
    );
};

export default RoleSwitcher;