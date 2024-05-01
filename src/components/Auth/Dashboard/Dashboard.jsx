import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useAddTodoMutation, useGetTodoQuery } from '../../../store/Api'
import toast from 'react-hot-toast';
import TodoList from './TodoList';
import useDebounce from '../../../hooks/_debounce';

export default function Dashboard() {
    const [addTodo, { isLoading }] = useAddTodoMutation();
    const [todo, setTodo] = useState('');
    const [search, setSearch] = useState('');
    const debouncedValue = useDebounce({ inputValue: search, delay: 300 });
    const { data, isLoading: loading, isError } = useGetTodoQuery({
        search: debouncedValue || undefined,
    })
    const handleAddTodo = () => {
        addTodo({ todo })
            .then(() => {
                toast.success("Todo Added")
                setTodo('')
            })
            .catch(() => toast.error("Todo Failed"));
    }

    return (
        <div className='flex flex-col justify-between h-full w-full'>
            <div>
                <Navbar />
                <div className='flex justify-between mx-10'>
                    <div className='flex mt-10 gap-4'>
                        <input type='text' className='border p-2 bg-slate-200 rounded-xl w-96' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                    </div>
                    <div className='flex mt-10 gap-4'>
                        <input type='text' className='border p-2 bg-slate-200 rounded-xl w-96' placeholder='Add Todo' value={todo} onChange={(e) => setTodo(e.target.value)}></input>
                        <button className='bg-red-500 p-2 px-4 rounded-lg' onClick={handleAddTodo} disabled={isLoading}>{isLoading ? <>Loading...</> : <>+Add</>}</button>
                    </div>
                </div>
            </div>
            <TodoList todo={data?.todos} isLoading={loading} />
        </div>
    )
}
