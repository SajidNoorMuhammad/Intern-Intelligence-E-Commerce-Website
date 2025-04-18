import React from 'react'
import { Outlet } from 'react-router'
import Header from '../User/Header'
import SubHeader from '../User/SubHeader'

const UserLayout = () => {
    return (
        <div>
            <Header />
            <SubHeader />
            <Outlet />
        </div>
    )
}

export default UserLayout