import React from 'react'
import { useParams } from 'react-router'

const OrderDetail = () => {
    const { id } = useParams();
    return (
        <div>
            hello {id}
        </div>
    )
}

export default OrderDetail
