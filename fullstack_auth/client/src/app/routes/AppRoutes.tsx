import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from '../../features/auth/pages/RegisterPage'
import LoginPage from '../../features/auth/pages/LoginPage'
import UserDashboardPage from '../../features/userRole/dashboard/pages/UserDashboardPage'
import AdminDashboardPage from '../../features/adminRole/dashboard/pages/AdminDashboardPage'
import MainLayout from '../../staticComponents/MainLayout'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />

                <Route
                    element={
                        <MainLayout />
                    }
                >
                    <Route path='/userdashboard' element={<UserDashboardPage />} />
                    <Route path='/admindashboard' element={<AdminDashboardPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes