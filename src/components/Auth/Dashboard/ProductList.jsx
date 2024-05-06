import React, { useState } from 'react';
import { useEditCartMutation } from '../../../store/Api';
import toast from 'react-hot-toast';

export default function ProductList({ product, isLoading }) {
    const [editCart, { isLoading: deleteLoading }] = useEditCartMutation();
    const handleEditCart = (index) => {
        editCart(index)
            .unwrap().then(() => toast.success("Cart Added"))
            .catch(() => toast.error("Cart failed"))
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 m-4'>
            {product &&
                product?.map((ele, index) => (
                    <div key={ele._id} className='flex justify-between flex-col gap-4 bg-slate-300 p-2 mb-2 rounded-xl items-center'>
                        {console.log(ele)}
                        <img src={ele?.image}></img>
                        <p>{ele?.title}</p>
                        <p className='font-bold'>Rs: {ele?.price}</p>
                        <button className={`${ele?.cart ? "bg-red-500" : "bg-green-500"} rounded-lg p-2 w-full`} disabled={deleteLoading} onClick={() => handleEditCart(ele?._id)}>{ele?.cart ? <>Add Cart</> : <>Remove Cart</>}</button>
                    </div>
                ))}
        </div>
    );
}
