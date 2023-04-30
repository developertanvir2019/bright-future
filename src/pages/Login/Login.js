import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Others/Context/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {
    const styles = {
        backgroundImage: "url('https://raw.githubusercontent.com/developertanvir2019/learnWithGame/main/public/images/logIng.png')",
    };

    const { signin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signin(email, password)
            .then(res => {
                if (res?.user?.emailVerified) {
                    toast.success('Log in successFully..')
                    navigate(from, { replace: true })
                }
                else {
                    toast.error('Your email is not verified. please verify it')
                }
            })
            .catch(err => {
                toast.error(err.message)
            })

    }
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100 bg-cover bg-no-repeat" style={styles}>
            <div className="rounded-xl bg-gray-400 bg-opacity-20 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <h1 className="mb-2 text-3xl text-white font-semibold">Login</h1>
                    </div>
                    <form onSubmit={handleSubmit} action="#">
                        <div className="mb-4 text-lg text-start">
                            <label htmlFor="email"> Email</label>
                            <input
                                className="rounded-sm border-none bg-opacity-50 px-8 py-2 text-center text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md w-full text-black"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="mb-4 text-lg text-start">
                            <label htmlFor="password">Password</label>
                            <input
                                className="rounded-sm border-none bg-opacity-50 px-8 py-2 text-center text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md w-full"
                                type="password"
                                name="password"
                                placeholder="*********"
                            />
                        </div>
                        <div className="mt-4 flex justify-center text-lg text-white font-semibold">
                            <button
                                type="submit"
                                className="rounded-sm w-full btn btn-secondary mt-2"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p className='mt-2'>Don't have account? <Link className='text-green-400 font-semibold' to={'/signup'}>Create new account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;