import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useAddTodoMutation } from '../../../store/Api'
import toast from 'react-hot-toast';

export default function Dashboard() {
    const [addTodo, { isLoading }] = useAddTodoMutation();
    const [todo, setTodo] = useState('');
    const handleAddTodo = () => {
        addTodo({ todo })
            .then(() => {
                toast.success("Todo Added")
                setTodo('')
            })
            .catch(() => toast.error("Todo Failed"));
    }
    return (
        <div>
            <div>
                <Navbar />
                <div className='flex justify-between mx-10'>
                    <div className='flex mt-10 gap-4'>
                        <input type='text' className='border p-2 bg-slate-200 rounded-xl w-96' placeholder='Add Todo' value={todo} onChange={(e) => setTodo(e.target.value)}></input>
                        <button className='bg-red-500 p-2 px-4 rounded-lg' onClick={handleAddTodo} disabled={isLoading}>{isLoading ? <>Loading...</> : <>+Add</>}</button>
                    </div>
                    <div className='flex mt-10 gap-4'>
                        <input type='text' className='border p-2 bg-slate-200 rounded-xl w-96' placeholder='Search'></input>
                        <button className='bg-blue-500 p-2 px-4 rounded-lg'>Search</button>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
