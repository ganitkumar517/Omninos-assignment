import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../store/Api';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Login() {
    const navigate = useNavigate();
    const [logIn, { isLoading }] = useLoginMutation();

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await logIn({ email: values.email, password: values.password }).unwrap();
            toast.success('Login Successfully!');
            navigate('/dashboard');
            localStorage.setItem('token', res?.token);
        } catch (error) {
            toast.error(error?.data?.message);
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
                                <label className='font-semibold'>Password</label>
                                <Field type='password' name='password' className='rounded-lg p-2' placeholder='Enter your Password' />
                                <ErrorMessage name='password' component='div' className='text-red-500 text-sm' />
                            </div>
                            <button type='submit' className='bg-blue-500 p-2 rounded-xl hover:bg-blue-300 w-full' disabled={isSubmitting}>
                                {isSubmitting ? 'Loading' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>
                <div onClick={() => navigate('/signup')} className='text-blue-500 cursor-pointer'>
                    Sign up
                </div>
            </div>
        </div>
    );
}
