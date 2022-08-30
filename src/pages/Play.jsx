import React, { useEffect, useState } from "react";
import { ConfirmModal, Loading, Navbar, ReadyPlay, Start } from "../components";
import GamepadIcon from '@mui/icons-material/Gamepad';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
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
    const [start, setStart] = useState(false);
    const [ready, setReady] = useState(false);

    const [okPlay] = useSound(okSound);
    const [choosePlay] = useSound(chooseSound);
    const [backPlay] = useSound(backSound);

    const [isLoading, setIsLoading] = useState(false);

    function musicHandler() {
        setMusic(!music);
    }

    function handleReady() {
        setReady(!ready);
    }

    function handleStart() {
        handleReady();
        setStart(!start);
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

            {isLoading ?
                <Loading />
            :
                null
            }
            <Navbar music={music} setMusic={musicHandler} handleOpen={null} />
            
            {ready ? <ConfirmModal ok={handleStart} notOk={handleReady} /> : null }

            {start ? 
                (
                    <Start />
                )
            :
                (
                    <ReadyPlay music={music} activeUser={activeUser} isLoading={isLoading} choosePlay={choosePlay} okPlay={okPlay} backPlay={backPlay} handleReady={handleReady} />
                )
            }
            

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