import React, { useEffect, useState } from "react";
import { LoginForm, Navbar, SignUpForm } from "../components";
import ReactHowler from "react-howler";
import homeMusic from "../assets/home.mp3";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import GamepadIcon from '@mui/icons-material/Gamepad';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import okSound from '../assets/ok.wav';
import chooseSound from '../assets/choose.wav';
import useSound from 'use-sound';

function Home() {
    const user = useSelector((state) => state.user?.users);
    const navigate = useNavigate();

    const [music, setMusic] = useState(useSelector((state) => state.music?.musics));
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [okPlay] = useSound(okSound);
    const [choosePlay] = useSound(chooseSound);

    function musicHandler() {
        setMusic(!music);
    }

    function handleOpenSignIn() {
        setOpenSignIn(!openSignIn);
    }

    function handleOpenSignUp() {
        setOpenSignUp(!openSignUp);
    }

    useEffect(() => {
        if (user.username) navigate('/menu');
    }, []);

    return (
        <React.Fragment>
            
            <ReactHowler
                src={homeMusic}
                loop={true}
                volume={music ? 0.2 : 0.0}
                playing={true}
            />

            <LoginForm open={openSignIn} handleOpen={handleOpenSignIn} handleOpenSignUp={handleOpenSignUp} />
            <SignUpForm open={openSignUp} handleOpen={handleOpenSignUp} handleOpenSignIn={handleOpenSignIn} />
            <Navbar music={music} setMusic={musicHandler} handleOpen={handleOpenSignIn} />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-slate-900 to-black">
                <p className="text-orange-100 text-6xl">Welcome to Queez</p>
                <div className="w-fit">
                    <p className="typer text-lg text-cyan-100">Aplikasi Quiz yang "bisa jadi" menyediakan pertanyaan sentolop</p>
                </div>

                <section className="p-5" />

                <div className="flex justify-evenly w-1/2">
                    <button className="text-cyan-200 border-2 rounded-lg border-cyan-200 p-5 w-52 hover:bg-cyan-500 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onMouseEnter={music ? choosePlay : null} onClick={music ? okPlay : null}>
                        <span className="text-2xl">Instant Quiz</span> <hr />
                        <span className="text-sm">You can take a kuis but your quiz history won't be add.</span>
                    </button>
                    <button className="text-green-200 border-2 rounded-lg border-green-200 p-5 w-52 hover:bg-green-500 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-emerald-400 shadow-md" onClick={music ? () => {handleOpenSignIn(); okPlay()} : () => {handleOpenSignIn(); }} onMouseEnter={music ? choosePlay : null}>
                        <span className="text-2xl">Log In</span> <hr />
                        <span className="text-sm">You can view your quiz history.</span>
                    </button>            
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

            </div>
        </React.Fragment>
    )
}

export default Home;