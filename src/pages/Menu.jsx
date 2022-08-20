import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import homeMusic from "../assets/home.mp3";
import ReactHowler from "react-howler";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Menu() {
    const user = useSelector((state) => state.user?.users);
    const navigate = useNavigate();
    
    const [music, setMusic] = useState(true);

    function musicHandler() {
        setMusic(!music);
    }

    useEffect(() => {
        if (user.username === "") navigate('/');
    }, []);
    
    return (
        <React.Fragment>
            <ReactHowler
                src={homeMusic}
                loop={true}
                volume={music ? 0.2 : 0.0}
                playing={true}
            />

            <Navbar music={music} setMusic={musicHandler} handleOpen={null} />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-slate-900 to-black">
                <p className="text-white">WELCOME</p>
            </div>
        </React.Fragment>
    )
}

export default Menu;