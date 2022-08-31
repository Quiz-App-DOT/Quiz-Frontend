import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/sliceUser';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

function LoginForm({open, handleOpen, handleOpenSignUp}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initData = { username: "", password: "" };
    const [inputData, setInputData] = useState(initData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setInputData({...inputData, [e.target.name]: e.target.value});        
    }
    
    const handleSubmit = () => {
        setIsLoading(true);
        axios.post(`http://localhost:8000/api/login`, inputData)
        .then(res => {
            dispatch(saveUser({
                fullName: res.data.user.fullName,
                username: res.data.user.username,
                role: res.data.user.role,
                id: res.data.user.id,
                email: res.data.user.email,
                token: res.data.authorization.token
            }));
            setIsLoading(false);
            navigate('/menu')
        })
        .catch(err => {
            setError(true);
            setIsLoading(false);
        })
    }

    return (
        <React.Fragment>
            {open ? 
                <React.Fragment>
                    {isLoading ?
                        <Loading />
                    :
                        null
                    }
                    <div className="justify-center items-center flex fixed inset-0 z-30 fade-in ease-in-out duration-200">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-gray-400 to-gray-300">
                                <div className='absolute right-0 m-2 cursor-pointer' onClick={handleOpen}>
                                    <CloseIcon />
                                </div>
                                <div className="flex flex-col items-center gap-4 justify-between p-5 border-b border-solid border-gray-400 rounded-lg">
                                    <p className="text-2xl font-semibold">Log In</p>
                                    <form method='POST' className='space-y-3 flex flex-col' onSubmit={handleSubmit}>
                                        <TextField label="Username" variant="filled" onChange={handleChange} name="username" type="text" />
                                        <TextField label="Password" variant="filled" onChange={handleChange} name="password" type="password" />

                                        <Button variant="contained" onClick={handleSubmit}>Log In</Button>

                                        { error ? <p onClick={() => setError(false)} className="text-center bg-red-400 p-1 rounded cursor-pointer">UNAUTHENTICATED</p> : null }

                                        <p className='text-sm'>Don't Have an Account? <span className='text-blue-600 hover:text-cyan-500 cursor-pointer' onClick={() => { handleOpen(); handleOpenSignUp() }}>Sign Up</span></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-20 bg-black"></div>
                </React.Fragment>
            : 
                null
            }
        </React.Fragment>
    )
}

export default LoginForm;