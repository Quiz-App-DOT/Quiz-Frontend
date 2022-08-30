import React from "react";
import ReactHowler from "react-howler";
import { useNavigate } from "react-router-dom";
import playMusic from "../assets/play.mp3";

function ReadyPlay({music, activeUser, isLoading, choosePlay, okPlay, backPlay, handleReady}) {
    
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <ReactHowler
                src={playMusic}
                loop={true}
                volume={music ? 0.2 : 0.0}
                playing={true}
            />
            <div className="flex flex-col pt-24 items-center min-h-screen bg-gradient-to-t from-slate-900 to-black gap-2">
                <p className={`text-3xl text-cyan-400 ${isLoading ? "animate-pulse w-1/2 bg-slate-600 p-4 rounded-lg" : null}`}>{isLoading ? "" : `You Will Be Playing as ${activeUser.username}`}</p>
                <p className={`text-3xl text-cyan-400 ${isLoading ? "animate-pulse w-1/2 bg-slate-600 p-4 rounded-lg" : null}`}>{isLoading ? "" : `Your Connected Email ${activeUser.email}`}</p>
                
                <section className="py-24" />

                <button className="text-cyan-400 hover:text-cyan-600 w-48 text-3xl p-3 border-2 rounded-lg hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { okPlay(); handleReady() } : () => { handleReady() }}>Start</button>
                
                <section className="py-3" />
                
                <button className="text-red-400 hover:text-red-600 w-48 text-3xl p-3 border-2 rounded-lg hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { backPlay(); navigate('/') } : () => { navigate('/') }}>Menu</button>
            </div>
        </React.Fragment>
    )
}

export default ReadyPlay;