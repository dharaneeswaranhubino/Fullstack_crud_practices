import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

const MainLayout = () => {
    return (
        <>
            <div className='min-h-screen'>
                <Topbar />
                {/* <Sidebar />
                <main className="lg:ml-64 pt-[72px] h-screen border-2 border-gray-100">
                    <div className="h-[calc(100vh-72px)] overflow-y-auto scrollbar-none p-4">
                        <Outlet/>
                    </div>
                </main> */}
                <div className="grid grid-cols-12 pt-14">
                    <div className="col-span-2">
                        <Sidebar />
                    </div>
                    <div className="col-span-10 h-[100vh] p-2 overflow-y-auto scrollbar-none p-4 border-2 border-gray-400">
                        <Outlet />
                    </div>
                </div>

            </div>
        </>
    )
}

export default MainLayout