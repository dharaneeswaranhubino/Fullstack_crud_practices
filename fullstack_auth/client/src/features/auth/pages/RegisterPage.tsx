import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../app/store/store';
import { registerUser } from '../authSlices/authSliceThunks';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        phone: "",
    })

    // const [data, setData] = useState<typeof user[]>([]);
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user.fname || !user.lname || !user.email || !user.password || !user.phone) {
            return setError("Pls fill all these field in this form")
        }
        // setData((prev) => [...prev, user]);

        const result = await dispatch(registerUser({
            firstName: user.fname,
            lastName: user.lname,
            email: user.email,
            password: user.password,
            phone: user.phone,
        }))

        if (registerUser.fulfilled.match(result)) {
            navigate("/login")
        } else {
            return;
        }

        setUser({
            fname: "",
            lname: "",
            email: "",
            password: "",
            phone: "",
        })
        alert("registered successfully!!!");

    }

    // useEffect(() => {
    //     console.log("Data :", data);
    // }, [data])

    return (
        <>
            <div className='my-4'>
                <h2>Sign Up</h2>
                <form action="" onSubmit={handleSubmit} className='flex flex-col text-left w-100 p-4 m-auto gap-3 border border-gray-300 rounded-xl'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="fname">First Name</label>
                        <input type="text" id='fname' value={user.fname} name='fname' onChange={handleChange} className='border border-gray-100 rounded-md p-1' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="lname">last Name</label>
                        <input type="text" id='lname' value={user.lname} name='lname' onChange={handleChange} className='border border-gray-100 rounded-md p-1' />
                    </div>
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
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id='phone' maxLength={10} value={user.phone} name='phone' onChange={handleChange} className='border border-gray-100 rounded-md p-1' />
                    </div>

                    {(fieldError || error) && (
                        <span className='text-red-400'>{fieldError || error}</span>
                    )}

                    <div className='mt-2'>
                        <button type='submit' className='m-auto py-1 w-full border-2 border-gray-400 rounded-md bg-lime-900 hover:text-gray-200 hover:bg-lime-800 cursor-pointer'>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterPage;