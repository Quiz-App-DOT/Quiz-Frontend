import React, { useEffect, useState } from "react";
import ReactHowler from "react-howler";
import { Loading, Navbar } from "../components";
import GamepadIcon from '@mui/icons-material/Gamepad';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import playMusic from "../assets/play.mp3";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../redux/sliceUser";
import okSound from '../assets/ok.wav';
import chooseSound from '../assets/choose.wav';
import backSound from '../assets/back.wav';
import useSound from 'use-sound';

function Play() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.users);
    const play = useSelector((state) => state.music?.musics);

    const [music, setMusic] = useState(play);
    const [activeUser, setActiveUser] = useState({});
    const [okPlay] = useSound(okSound);
    const [choosePlay] = useSound(chooseSound);
    const [backPlay] = useSound(backSound);

    const [isLoading, setIsLoading] = useState(false);

    function musicHandler() {
        setMusic(!music);
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:8000/api/me", { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user['token'] }})
        .then(res => {
            setIsLoading(false);
            setActiveUser(res.data);
        })
        .catch(err => {
            dispatch(deleteUser());
            navigate('/');
        })
    }, [])

    return (
        <React.Fragment>
            <ReactHowler
                src={playMusic}
                loop={true}
                volume={music ? 0.2 : 0.0}
                playing={true}
            />

            {isLoading ?
                <Loading />
            :
                null
            }
            <Navbar music={music} setMusic={musicHandler} handleOpen={null} />
            
            <div className="flex flex-col pt-24 items-center min-h-screen bg-gradient-to-t from-slate-900 to-black gap-2">
                <p className={`text-3xl text-cyan-400 ${isLoading ? "animate-pulse w-1/2 bg-slate-600 p-4 rounded-lg" : null}`}>{isLoading ? "" : `You Will Be Playing as ${activeUser.username}`}</p>
                <p className={`text-3xl text-cyan-400 ${isLoading ? "animate-pulse w-1/2 bg-slate-600 p-4 rounded-lg" : null}`}>{isLoading ? "" : `Your Connected Email ${activeUser.email}`}</p>
                
                <section className="py-24" />

                <button className="text-cyan-400 hover:text-cyan-600 w-48 text-3xl p-3 border-2 rounded-lg hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { okPlay(); } : () => {  }}>Start</button>
                
                <section className="py-3" />
                
                <button className="text-red-400 hover:text-red-600 w-48 text-3xl p-3 border-2 rounded-lg hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { backPlay(); navigate('/') } : () => { navigate('/') }}>Menu</button>
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
}

export default Play;