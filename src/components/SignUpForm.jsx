import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveUser } from '../redux/sliceUser';

function SignUpForm({open, handleOpen, handleOpenSignIn}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initData = { fullName: "", username: "", password: "", email: "", password_confirmation: "" };
    const [error, setError] = useState([]);
    const [inputData, setInputData] = useState(initData);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setInputData({...inputData, [e.target.name]: e.target.value});        
    }
    
    const handleSubmit = () => {
        setIsLoading(true);
        axios.post(`http://localhost:8000/api/signup`, inputData)
        .then(res => {
            dispatch(saveUser({
                fullName: res.data.user.fullName,
                username: res.data.user.username,
                role: res.data.user.role,
                id: res.data.user.id,
                email: res.data.user.email,
                token: res.data.authorisation.token
            }));
            setIsLoading(false);
            navigate('/menu')
        })
        .catch(err => {
            setError(err.response.data.errors);
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
                                    <p className="text-2xl font-semibold">Sign Up</p>
                                    <div className='space-y-3 flex flex-col' onSubmit={handleSubmit}>
                                        <TextField label="Full Name" variant="filled" onChange={handleChange} name="fullName" type="text" />
                                        <TextField label="Email" variant="filled" onChange={handleChange} name="email" type="email" />
                                        <TextField label="Username" variant="filled" onChange={handleChange} name="username" type="text" />
                                        <TextField label="Password" variant="filled" onChange={handleChange} name="password" type="password" />
                                        <TextField label="Password Confirmation" variant="filled" onChange={handleChange} name="password_confirmation" type="password" />

                                        { error.length !== 0 ? 
                                            <ol className='text-center bg-red-400 p-1 rounded cursor-pointer'>
                                                {error.map((item, id) => (
                                                    <li onClick={() => setError([])} key={id} >
                                                        {item}
                                                    </li>
                                                ))}
                                            </ol>
                                         : null }

                                        <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>      
                                        <div className='flex items-center text-blue-400 hover:text-cyan-400 cursor-pointer w-fit' onClick={() => { handleOpenSignIn(); handleOpen(); } }>
                                            <KeyboardBackspaceIcon />
                                            <p>Back to Login</p>                              
                                        </div>
                                    </div>
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

export default SignUpForm;