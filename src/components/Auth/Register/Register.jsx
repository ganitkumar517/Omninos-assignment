import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../store/Api';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Register() {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const initialValues = {
        email: '',
        name: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        name: Yup.string().required('Name is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await register({ email: values.email, name: values.name, password: values.password }).unwrap();
            toast.success('Registration Successful');
            navigate('/login');
        } catch (error) {
            toast.error(error?.data?.message || 'Registration failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-72 bg-slate-300 shadow-2xl border border-black-1 text-center p-4 gap-6 flex flex-col rounded-2xl justify-center'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-1'>
                                <label className='font-semibold'>Email</label>
                                <Field type='email' name='email' className='rounded-lg p-2' placeholder='Enter your Email' />
                                <ErrorMessage name='email' component='div' className='text-red-500 text-sm' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='font-semibold'>Name</label>
                                <Field type='text' name='name' className='rounded-lg p-2' placeholder='Enter your Name' />
                                <ErrorMessage name='name' component='div' className='text-red-500 text-sm' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='font-semibold'>Password</label>
                                <Field type='password' name='password' className='rounded-lg p-2' placeholder='Enter New Password' />
                                <ErrorMessage name='password' component='div' className='text-red-500 text-sm' />
                            </div>
                            <button type='submit' className='bg-blue-500 p-2 rounded-xl hover:bg-blue-300 w-full' disabled={isSubmitting}>
                                {isSubmitting ? 'Loading...' : 'Sign Up'}
                            </button>
                        </Form>
                    )}
                </Formik>
                <div onClick={() => navigate('/login')} className='text-blue-500 cursor-pointer'>
                    Log In
                </div>
            </div>
        </div>
    );
}
