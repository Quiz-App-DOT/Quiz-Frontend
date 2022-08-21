import React from "react";
import logo from "../assets/quiz-logo.png"
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { saveMusic } from '../redux/sliceMusic';

function Navbar({music, setMusic, handleOpen}) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.users);

    return (
        <nav className="flex transition ease-in-out duration-200 bg-transparent items-center justify-between p-3 fixed top-0 z-10 w-full">
            <div className="flex items-center gap-4">
                <img alt='logo' src={logo} className="w-10 h-10 object-cover" />
                <p className="text-2xl font-bold text-cyan-300">Queez</p>
            </div>
            <div className="text-xl text-cyan-200 flex items-center gap-4">
                <div className="flex flex-col justify-center items-center border-2 rounded-full w-10 h-10 hover:cursor-pointer" onClick={() => { setMusic(); dispatch(saveMusic()); }}>
                    { music ? <MusicNoteIcon /> : <MusicOffIcon /> }
                </div>
                { user.username ? 
                    <div onClick={() => { } } className="cursor-pointer flex items-center gap-3">
                        <Avatar>{user.username[0]}</Avatar>
                        <p className="text-cyan-200">{user.username}</p> 
                    </div>
                    : 
                    <div onClick={() => { handleOpen() } } className="cursor-pointer">
                        Login
                    </div>
                }

                <div onClick={() => { } } className="cursor-pointer">
                    <MoreVertIcon />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;