import React, { useState } from 'react';
import { useBookCartMutation, useEditCartMutation } from '../../../store/Api';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

export default function ProductList({ product, isLoading }) {
    const { pathname } = useLocation();
    const [editCart, { isLoading: deleteLoading }] = useEditCartMutation();
    const [bookCart, { isLoading: bookLoading }] = useBookCartMutation();
    const handleEditCart = (index) => {
        editCart(index)
            .unwrap().then(() => toast.success("Changes Added"))
            .catch(() => toast.error("Cart failed"))
    }

    const handleBookCart = (index) => {
        bookCart(index)
            .unwrap().then(() => toast.success("Changes Added"))
            .catch(() => toast.error("Cart failed"))
    }
    const [quantities, setQuantities] = useState({});

    const handleIncreaseQuantity = (productId) => {
        const currentQuantity = quantities[productId] || 0;
        const newQuantity = currentQuantity + 1;
        setQuantities({ ...quantities, [productId]: newQuantity });
    };

    const handleDecreaseQuantity = (productId) => {
        const currentQuantity = quantities[productId] || 0;
        const newQuantity = Math.max(0, currentQuantity - 1);
        setQuantities({ ...quantities, [productId]: newQuantity });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 m-4'>
            {product &&
                product?.map((ele, index) => (
                    <div key={ele._id} className='flex justify-between flex-col gap-4 bg-slate-300 p-2 mb-2 rounded-xl items-center'>
                        <img src={ele?.image}></img>
                        <p>{ele?.title}</p>
                        <p className='font-bold'>Rs: {ele?.price}</p>
                        {pathname === '/cart' && (
                            <>
                                <div className='flex gap-2'>
                                    <button
                                        className='bg-blue-500 rounded-lg p-2'
                                        onClick={() => handleDecreaseQuantity(ele._id)}
                                    >
                                        -
                                    </button>
                                    <span>{quantities[ele._id] || 0}</span>
                                    <button
                                        className='bg-blue-500 rounded-lg p-2'
                                        onClick={() => handleIncreaseQuantity(ele._id)}
                                    >
                                        +
                                    </button>
                                </div>
                            </>
                        )
                        }
                        <div className='flex items-center justify-between'>
                            {pathname === '/cart' && !ele?.book && (
                                <button className={`${!ele?.cart ? "bg-red-500" : "bg-green-500"} rounded-lg p-2 w-full mr-6 py-4`} disabled={deleteLoading} onClick={() => handleBookCart(ele?._id)}>{<>Book</>}</button>
                            )}
                            {ele?.book ? <button disabled className='bg-gray-200'>
                                Booked
                            </button> :
                                <button className={`${ele?.cart ? "bg-red-500" : "bg-green-500"} rounded-lg p-2 w-full`} disabled={deleteLoading} onClick={() => handleEditCart(ele?._id)}>{!ele?.cart ? <>Add Cart</> : <>Remove Cart</>}</button>
                            }
                        </div>
                    </div>
                ))}
        </div>
    );
}
