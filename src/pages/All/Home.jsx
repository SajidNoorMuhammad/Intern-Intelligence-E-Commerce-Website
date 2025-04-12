import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div className=' text-2xl'>
            Hello {user?.fullname}
            <img className='w-50 h-50' src={user?.yourImage} alt="" />
        </div>
    )
}

export default Home;
