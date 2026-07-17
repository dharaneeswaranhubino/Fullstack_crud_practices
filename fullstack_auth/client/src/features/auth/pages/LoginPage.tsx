import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../authSlices/authSliceThunks';

const LoginPage = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [fieldError, setError] = useState("");
    const [isPassView, setIsPassView] = useState(false)

    const dispatch = useDispatch<AppDispatch>();
    const { error } = useSelector((state: RootState) => state.auth);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setUser((prev) => ({
            ...prev, [name]: value
        }))
        setError("")
    }

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            return setError("Pls fill all these field in this form");
        }

        const result = await dispatch(loginUser({
            email: user.email,
            password: user.password
        }))
        // console.log("result :", result);

        if (loginUser.fulfilled.match(result)) {
            navigate("/dashboard")
            alert("login successfully!!!")
            setUser({
                email: "",
                password: ""
            })
        }

    }
    return (
        <>
            <div className='my-4'>
                <h3>Sign In</h3>
                <form onSubmit={handleLogin} className='flex flex-col m-auto text-left w-100 p-4 m-auto gap-3 border border-gray-300 rounded-xl'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={user.email} name='email' onChange={handleChange} className='border border-gray-100 rounded-md p-1' />
                    </div>
                    <div className='flex flex-col gap-1 relative'>
                        <label htmlFor="password">Password</label>
                        <input type={isPassView ? "text" : "password"} id='password' value={user.password} name='password' onChange={handleChange} className='border border-gray-100 rounded-md p-1' />
                        <span className='absolute bottom-1 right-2' onClick={() => setIsPassView(!isPassView)}>
                            {isPassView
                                ? <i className="fa-solid fa-eye-slash"></i>
                                : <i className="fa-solid fa-eye"></i>
                            }
                        </span>
                    </div>

                    {(fieldError || error) && (
                        <span className='text-red-400'>{fieldError || error}</span>
                    )}

                    <div className='mt-2'>
                        <button type='submit' className='m-auto py-1 w-full border-2 border-gray-400 rounded-md bg-lime-900 hover:text-gray-200 hover:bg-lime-800 cursor-pointer'>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginPage