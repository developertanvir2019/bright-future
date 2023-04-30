import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Others/Context/AuthProvider';

const Home = () => {
    const [allUser, setUser] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('https://server-wine-three.vercel.app/allUsers')
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
    }, [])

    const currentUser = allUser.find(us => us.email === user?.email);

    return (
        <div className='flex justify-center my-5'>
            <div className='w-96 py-5 bg-slate-200 shadow-xl rounded-sm'>
                <h2 className="text-4xl text-secondary font-semibold mb-6">My profile</h2>

                <div className="avatar">
                    <div className="w-24 mt-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={currentUser?.image} alt="" />
                    </div>
                </div>
                <h2 className='py-2 text-2xl'>{currentUser?.name}</h2>
                <h2 className='py-2 text-2xl'>{currentUser?.email}</h2>
                <h2 className='py-2 text-2xl'>{currentUser?.phone}</h2>
            </div>
        </div>
    );
};

export default Home;