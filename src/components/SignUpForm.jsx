import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

function SignUpForm({open, handleOpen}) {

    const initData = { fullName: "", username: "", password: "", email: "", password_confirmation: "" };
    const [inputData, setInputData] = useState(initData);

    const handleChange = (e) => {
        setInputData({...inputData, [e.target.name]: e.target.value});        
    }
    
    const handleSubmit = () => {
        console.log(inputData);
    }

    return (
        <React.Fragment>
            {open ? 
                <React.Fragment>
                    <div className="justify-center items-center flex fixed inset-0 z-50">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-gray-400 to-gray-300">
                                <div className='absolute right-0 m-2 cursor-pointer' onClick={handleOpen}>
                                    <CloseIcon />
                                </div>
                                <div className="flex flex-col items-center gap-4 justify-between p-5 border-b border-solid border-gray-400 rounded-lg">
                                    <p className="text-2xl font-semibold">Sign Up</p>
                                    <div className='space-y-3 flex flex-col' onSubmit={handleSubmit}>
                                        <TextField id="filled-basic" label="Full Name" variant="filled" onChange={handleChange} name="fullName" type="text" />
                                        <TextField id="filled-basic" label="Email" variant="filled" onChange={handleChange} name="email" type="email" />
                                        <TextField id="filled-basic" label="Username" variant="filled" onChange={handleChange} name="username" type="text" />
                                        <TextField id="filled-basic" label="Password" variant="filled" onChange={handleChange} name="password" type="password" />

                                        <Button variant="contained">Sign Up</Button>                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </React.Fragment>
            : 
                null
            }
        </React.Fragment>
    )
}

export default SignUpForm;