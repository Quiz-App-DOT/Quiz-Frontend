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
import Avatar from '@mui/material/Avatar';
import { deleteUser } from "../redux/sliceUser";
import axios from "axios";

function Menu() {
    const play = useSelector((state) => state.music?.musics);
    const user = useSelector((state) => state.user?.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [music, setMusic] = useState(play);
    const [total, setTotal] = useState(0);
    const [score, setScore] = useState(0);
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
            
        })
        .catch(err => {
            setIsLoading(false);
            dispatch(deleteUser());
            navigate('/');
        })

        axios.get(`${process.env.REACT_APP_API_URL}/api/my/quiz`, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user['token'] }})        
        .then(res => {
            setTotal(res.data?.length ?? 0);
            if (res.data?.length !== 0) {
                setScore(res.data.reduce((a, b) => a + b.score, 0));
            }
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            dispatch(deleteUser());
            navigate('/');
        })
    }, []);
    
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
                <div className="flex justify-center">
                    <div className="notification fixed mt-10">
                        <p>Welcome to Queez, {user.username}</p>
                        <span className="progress"></span>
                    </div>
                </div>
                <div className="flex pt-32 place-content-evenly min-h-screen bg-gradient-to-t from-slate-900 to-black">
                    <div className="flex flex-col gap-4 justify-start">
                        <p className="text-7xl text-cyan-200">Queez</p>
                        <hr className="w-96 my-6" />
                        <button className="bg-cyan-300 border-l-8 border-l-green-600 w-80 text-2xl p-2 hover:w-96 ease-in-out duration-200 hover:border-r-8 hover:border-r-rose-600 hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 hover:shadow-md hover:shadow-cyan-200" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { okPlay(); navigate('/play') } : () => { navigate('/play'); }}>Play</button>
                        <button className="bg-cyan-300 border-l-8 border-l-green-600 w-80 text-2xl p-2 hover:w-96 ease-in-out duration-200 hover:border-r-8 hover:border-r-rose-600 hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 hover:shadow-md hover:shadow-cyan-200" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { okPlay(); navigate('/history') } : () => { navigate('/history'); }}>History</button>
                        <button className="bg-rose-400 border-l-8 border-l-green-600 w-80 text-2xl p-2 hover:w-96 ease-in-out duration-200 hover:border-r-8 hover:border-r-red-600 hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 hover:shadow-md hover:shadow-cyan-200" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { backPlay(); dispatch(deleteUser()); navigate('/') } : () => { dispatch(deleteUser()); navigate('/') } }>Log Out</button>
                    </div>
                    <div className="text-white grid grid-cols-2 grid-rows-3 h-fit w-1/3 border border-cyan-300 p-3 rounded-lg bg-gradient-to-t from-black to-slate-800">
                        <div className="col-span-2 flex items-center justify-center gap-3">
                            <Avatar>{user.username[0]}</Avatar>
                            <p className="text-cyan-200">{`${user.fullName} (${user.username})`}</p> 
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <p className="text-cyan-200">{`${user.email}`}</p>
                        </div>
                        <div className="col-span-1 flex justify-center">
                            <p className="text-cyan-200">Participated: {total}</p>
                        </div>
                        <div className="col-span-1 flex justify-center">
                            <p className="text-cyan-200">Total Score: {score}</p>
                        </div>
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

export default Menu;