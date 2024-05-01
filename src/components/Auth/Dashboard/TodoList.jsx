import React, { useState } from 'react';
import { useDeleteTodoMutation, useEditTodoMutation } from '../../../store/Api';
import toast from 'react-hot-toast';

export default function TodoList({ todo, isLoading }) {
    const [editIndex, setEditIndex] = useState(null);
    const [editedTodo, setEditedTodo] = useState('');
    const [editTodo, { isLoading: loading }] = useEditTodoMutation();
    const [deleteTodo, { isLoading: deleteLoading }] = useDeleteTodoMutation();
    const handleDeleteTodo = (deleteIndex) => {
        deleteTodo(todo[deleteIndex]?._id)
            .unwrap().then(() => toast.success("Todo Deleted"))
            .catch(() => toast.error("delete failed"))
    }
    const handleEditClick = (index) => {
        setEditIndex(index);
        setEditedTodo(todo[index]?.todo || '');
    };

    const handleDoneClick = () => {
        editTodo({ body: { updatedTodo: editedTodo }, params: todo[editIndex]?._id })
            .unwrap()
            .then(() => {
                setEditIndex(null);
                toast.success("edit updated")
            }).catch((err) => toast.error(err?.data?.message));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='mt-6 overflow-auto flex-1 min-h-0 flex flex-col'>
            {todo &&
                todo.map((ele, index) => (
                    <div key={ele._id} className='flex justify-between mx-10 pl-12 mb-2 bg-slate-300 p-4 rounded-xl items-center'>
                        {editIndex === index ? (
                            <input
                                type='text'
                                className='text-xl font-bold outline-none p-2 rounded-xl'
                                value={editedTodo}
                                onChange={(e) => setEditedTodo(e.target.value)}
                            />
                        ) : (
                            <p className='text-xl font-bold'>{ele.todo}</p>
                        )}
                        <div className='flex gap-2'>
                            {editIndex === index ? (
                                <>
                                    <button className='bg-green-500 rounded-lg p-2' onClick={handleDoneClick}>
                                        Done
                                    </button>
                                    <button className='bg-gray-500 rounded-lg p-2' onClick={() => setEditIndex(null)}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button className='bg-blue-500 rounded-lg p-2' onClick={() => handleEditClick(index)}>
                                    Edit
                                </button>
                            )}
                            <button className='bg-red-500 rounded-lg p-2' disabled={deleteLoading} onClick={() => handleDeleteTodo(index)}>{deleteLoading ? <>Loading...</> : <>Delete</>}</button>
                        </div>
                    </div>
                ))}
        </div>
    );
}
