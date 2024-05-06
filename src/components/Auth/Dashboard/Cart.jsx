import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useGetCartQuery } from '../../../store/Api'
import toast from 'react-hot-toast';
import ProductList from './ProductList';
import useDebounce from '../../../hooks/_debounce';

export default function Cart() {
    const [search, setSearch] = useState('');
    const debouncedValue = useDebounce({ inputValue: search, delay: 300 });
    const { data, isLoading: loading, isError } = useGetCartQuery({
        search: debouncedValue || undefined,
    })
    return (
        <div className='flex flex-col justify-between h-full w-full'>
            <div>
                <Navbar />
                <div className='text-4xl font-bold m-4 mb-0'>Cart</div>
                <div className='mx-10'>
                    <div className='flex mt-10 gap-4'>
                        <input type='text' className='border p-2 bg-slate-200 rounded-xl w-96' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                    </div>
                </div>
            </div>
            <ProductList product={data?.products} isLoading={loading} />
        </div>
    )
}
