import React, { useEffect, useState } from "react";
import { LoginForm, Navbar, SignUpForm } from "../components";
import ReactHowler from "react-howler";
import homeMusic from "../assets/home.mp3";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Home() {
    const user = useSelector((state) => state.user?.users);
    const navigate = useNavigate();

    const [music, setMusic] = useState(true);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);

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
            <SignUpForm open={openSignUp} handleOpen={handleOpenSignUp} />
            <Navbar music={music} setMusic={musicHandler} handleOpen={handleOpenSignIn} />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-slate-900 to-black">
                <p className="text-orange-100 text-6xl">Welcome to Queez</p>
                <div className="w-fit">
                    <p className="typer text-lg text-cyan-100">Aplikasi Quiz yang "bisa jadi" menyediakan pertanyaan sentolop</p>
                </div>

                <section className="p-5" />

                <div className="flex justify-evenly w-1/2">
                    <button className="text-cyan-200 border-2 rounded-lg border-cyan-200 p-5 w-52 hover:bg-cyan-500 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md">
                        <span className="text-2xl">Instant Quiz</span> <hr />
                        <span className="text-sm">You can take a kuis but your quiz history won't be add.</span>
                    </button>
                    <button className="text-green-200 border-2 rounded-lg border-green-200 p-5 w-52 hover:bg-green-500 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-emerald-400 shadow-md" onClick={handleOpenSignIn}>
                        <span className="text-2xl">Log In</span> <hr />
                        <span className="text-sm">You can view your quiz history.</span>
                    </button>            
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;