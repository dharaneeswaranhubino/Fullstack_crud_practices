import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from '../../features/auth/pages/RegisterPage'
import LoginPage from '../../features/auth/pages/LoginPage'
import DashboardPage from '../../features/userRole/dashboard/pages/DashboardPage'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/dashboard' element={<DashboardPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes