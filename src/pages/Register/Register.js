import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Others/Context/AuthProvider';

const Register = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const handlePhoneNumberChange = (event) => {
        const inputPhoneNumber = event.target.value;
        const isValid = /^01\d{9}$/.test(inputPhoneNumber);
        setIsValidPhoneNumber(isValid);
        setPhoneNumber(inputPhoneNumber);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidPhoneNumber) {
            const form = event.target;
            const name = form.name.value;
            const image = form.image.files[0];
            const password = form.password.value;
            const email = form.email.value;
            const number = form.phone.value;

            // for upload image in imgBb and save firebase user...
            const formData = new FormData()
            formData.append('image', image)
            const url = `https://api.imgbb.com/1/upload?key=8361c702450c4d4223bcf02628cc126f`;
            fetch(url, {
                method: 'POST',
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.data.url);
                    createUser(email, password)
                        .then(result => {
                            saveUser(name, email, result?.user?.photoURL, number);
                            toast.success('login successfully ..')
                            navigate(from, { replace: true });
                        })
                })
                .catch(err => {
                    toast.error(err.message)
                })
        } else {
            toast.error('Invalid phone number!');
        }
    };


    const saveUser = (name, email, image, phone,) => {
        const user = { name, email, image, phone, };
        fetch('https://server-wine-three.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    const styles = {
        backgroundImage: "url('https://raw.githubusercontent.com/developertanvir2019/learnWithGame/main/public/images/logIng.png')",
    };
    return (
        <div className="flex w-full items-center justify-center bg-gray-100 bg-cover bg-no-repeat" style={styles}>
            <div className="rounded-xl bg-gray-400 bg-opacity-20 px-16 py-4 shadow-lg backdrop-blur-md max-sm:px-8">
                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <h1 className=" text-3xl text-white font-semibold">Signup</h1>
                    </div>
                    <form onSubmit={handleSubmit} action="#">
                        <div className="mb-2 text-lg text-start">
                            <label htmlFor="name"> Name</label>
                            <input
                                id='name'
                                className="rounded-sm border-none bg-opacity-50 px-8 py-2 text-center text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md w-full text-black"
                                type="text"
                                name="name"
                                placeholder="your name"
                            />
                        </div>
                        <div className="mb-2 text-lg text-start">
                            <label htmlFor="phone"> Phone number</label>
                            <input
                                id='phone'
                                className="rounded-sm border-none bg-opacity-50 px-8 py-2 text-center text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md w-full text-black"
                                type="text"
                                name="phone"
                                placeholder="mobile number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                            />
                            {
                                !isValidPhoneNumber && <p className='text-red-700 font-semibold text-center'>please provide a valid phone number</p>
                            }
                        </div>
                        <div className="mb-2 text-lg text-start">
                            <label htmlFor="email"> Email</label>
                            <input
                                id='email'
                                className="rounded-sm border-none bg-opacity-50 px-8 py-2 text-center text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md w-full text-black"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="mb-2 text-lg text-start">
                            <input
                                id='image'
                                className="bg-opacity-50 file-input file-input-bordered file-input-primary w-full"
                                type='file'
                                name='image'
                                accept='image/*'
                                required
                            />
                        </div>

                        <div className="mb-2 text-lg text-start">
                            <label htmlFor="password">Password</label>
                            <input
                                id='password'
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
                                SignUp
                            </button>
                        </div>
                    </form>
                    <p className='mt-2'>Already have account? <Link className='text-green-400 font-semibold' to={'/login'}>Log in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;