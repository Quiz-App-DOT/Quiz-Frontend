import React, { useEffect, useState } from "react";
import { Loading, Navbar } from "../components";
import menuMusic from "../assets/menu.mp3";
import ReactHowler from "react-howler";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import GamepadIcon from '@mui/icons-material/Gamepad';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import okSound from '../assets/ok.wav';
import chooseSound from '../assets/choose.wav';
import backSound from '../assets/back.wav';
import useSound from 'use-sound';
import { deleteUser, saveUser } from "../redux/sliceUser";
import axios from "axios";
import { TextField } from "@mui/material";

function EditUser() {
    const play = useSelector((state) => state.music?.musics);
    const user = useSelector((state) => state.user?.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState({});
    const [music, setMusic] = useState(play);
    const [error, setError] = useState([]);
    const [editPass, setEditPass] = useState();
    const [okPlay] = useSound(okSound);
    const [choosePlay] = useSound(chooseSound);
    const [backPlay] = useSound(backSound);

    function musicHandler() {
        setMusic(!music);
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/api/me`, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user['token'] }})
        .then(res => {
            setInput(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            dispatch(deleteUser());
            navigate('/');
        })
    }, []);

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});        
    }
    
    const handleSubmit = () => {
        setIsLoading(true);
        axios.put(`${process.env.REACT_APP_API_URL}/api/me`, input, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user['token'] } })
        .then(res => {
            dispatch(saveUser({
                fullName: res.data.fullName,
                username: res.data.username,
                role: res.data.role,
                id: res.data.id,
                email: res.data.email,
                token: user.token
            }));
            setIsLoading(false);
            navigate('/menu')
        })
        .catch(err => {
            setError(err.response.data);
            setIsLoading(false);
        })
    }

    return (
        isLoading ? (
            <div className="flex pt-32 place-content-evenly min-h-screen bg-gradient-to-t from-slate-900 to-black">
                <Loading />
            </div>
        ) : (
            <React.Fragment>
                <ReactHowler
                    src={menuMusic}
                    loop={true}
                    volume={music ? 0.2 : 0.0}
                    playing={true}
                />

                <Navbar music={music} setMusic={musicHandler} handleOpen={null} />
                <div className="flex flex-col pt-32 place-content-start gap-6 items-center min-h-screen bg-gradient-to-t from-slate-900 to-black">
                    <div className="z-10 bg-gradient-to-t gap-2 rounded from-slate-300 to-slate-400 h-fit flex flex-col px-32 py-5">
                        {error.length !== 0 ? 
                            <div className="absolute bg-red-500 p-4 rounded mt-16 z-20 hover:bg-cyan-500 ease-in-out duration-100 w-64 cursor-pointer" onClick={() => setError([])}>{error.errors}<br />Click to Dismiss</div> 
                            : 
                            null
                        }
                        <p className="text-xl">Edit Profile</p>
                        <hr className="mb-4 border-black" />
                        <TextField label="Full Name" variant="filled" onChange={handleChange} name="fullName" type="text" value={input.fullName} />
                        <TextField label="Username" variant="filled" onChange={handleChange} name="username" type="text" value={input.username} />
                        <TextField label="Email" variant="filled" onChange={handleChange} name="email" type="email" value={input.email} />
                        {editPass ? 
                        (
                            <>
                                <TextField label="Changed Password" variant="filled" onChange={handleChange} name="password" type="password" />
                                <TextField label="Previous Password" variant="filled" onChange={handleChange} name="password_confirmation" type="password" />
                            </>
                            
                        ) : null}
                        
                        <button className="text-black hover:text-yellow-600 w-full text-xl p-3 border-2 rounded-lg hover:bg-gradient-to-b hover:from-indigo-400 hover:to-green-400 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { okPlay(); setEditPass(!editPass) } : () => { setEditPass(!editPass) }}>Edit Password</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-red-400 hover:text-red-600 w-48 text-3xl p-3 border-2 rounded-lg hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { backPlay(); navigate('/') } : () => { navigate('/') }}>Menu</button>
                        <button className="text-cyan-400 hover:text-yellow-600 w-48 text-3xl p-3 border-2 rounded-lg hover:bg-gradient-to-b hover:from-indigo-400 hover:to-green-400 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { okPlay(); handleSubmit() } : () => { handleSubmit() }}>Submit</button>
                    </div>
                </div>

                <GamepadIcon fontSize="large" className="absolute bounce bottom-5 left-40 text-cyan-300" />
                <GamepadIcon fontSize="large" className="absolute bounce bottom-11 right-20 text-cyan-300" />
                <SportsEsportsIcon fontSize="large" className="absolute loader bottom-16 right-64 text-cyan-300" />
                <SportsEsportsIcon fontSize="large" className="absolute loader bottom-32 left-64 text-cyan-300" />
                <VideogameAssetIcon fontSize="large" className="absolute loader loader-inner bottom-40 left-28 text-cyan-300" />
                <VideogameAssetIcon fontSize="large" className="absolute loader loader-inner bottom-40 right-28 text-cyan-300" />
                <GamepadIcon fontSize="large" className="absolute bounce bottom-5 left-96 text-cyan-300" />
                <GamepadIcon fontSize="large" className="absolute bounce bottom-11 right-96 text-cyan-300" />
                <SportsEsportsIcon fontSize="large" className="absolute loader bottom-24 left-96 text-cyan-300" />
                <VideogameAssetIcon fontSize="large" className="absolute loader loader-inner bottom-40 right-96 text-cyan-300" />
            </React.Fragment>
        )
    )
}

export default EditUser;