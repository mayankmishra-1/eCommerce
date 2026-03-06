import { setAdmin, setUser } from "../api/api";

const RoleSwitcher = () => {

    return (
        <div style={{marginBottom:20}}>
            <button onClick={() => setUser()}>
                Use USER Token
            </button>

            <button onClick={() => setAdmin()}>
                Use ADMIN Token
            </button>
        </div>
    );
};

export default RoleSwitcher;