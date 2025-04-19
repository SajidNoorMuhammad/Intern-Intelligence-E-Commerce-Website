import React from 'react'
import { Outlet } from 'react-router'
import AdminHeader from '../Admin/MainHeader/Header'

const AdminLayout = () => {
    return (
        <div>
            <AdminHeader />
            <Outlet />
        </div>
    )
}

export default AdminLayout;