import { useDispatch } from "react-redux"
import type { AppDispatch } from "../app/store/store"
import { logoutUser } from "../features/auth/authSlices/authSliceThunks";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    }

    return (
        <>
            <div className="flex justify-between items-center px-2 h-14 fixed border w-full">
                <h4>Top Bar</h4>
                <button onClick={handleLogout} className="hover:text-xl cursor-pointer">Logout</button>
            </div>
        </>
    )
}

export default Topbar