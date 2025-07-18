import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/User/Header';
import MainSilder from '../../components/Home/MainSilder';
import HotCategories from '../../components/Home/HotCategories';
import FourImage from '../../components/Home/FourImage';
import NewArrivals from '../../components/Home/NewArrivals';
import Collection from '../../components/Home/Collection';
import Footer from '../../components/Home/Footer';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <MainSilder />
            <div className=' ml-4 mr-4 max-sm:w-[95%] w-[98%]'>
                <HotCategories />
                <FourImage />
                <NewArrivals />
                <Collection />
            </div>
            <Footer />
        </div>
    )
}

export default Home;
