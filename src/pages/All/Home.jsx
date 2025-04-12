import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/User/Header';
import MainSilder from '../../components/Home/MainSilder';
import HotCategories from '../../components/Home/HotCategories';
import FourImage from '../../components/Home/FourImage';

const Home = () => {
    const { user } = useContext(AuthContext);
    console.log(user);

    return (
        <div className='w-full'>
            <MainSilder />
            <HotCategories />
            <FourImage />
        </div>
    )
}

export default Home;
