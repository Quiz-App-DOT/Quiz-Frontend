import React, { useEffect, useState } from "react";
import { Loading, Navbar } from "../components";
import historyMusic from "../assets/history.mp3";
import ReactHowler from "react-howler";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import GamepadIcon from '@mui/icons-material/Gamepad';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import okSound from '../assets/ok.wav';
import chooseSound from '../assets/choose.wav';
import backSound from '../assets/back.wav';
import useSound from 'use-sound';
import axios from "axios";
import { formatQuestion } from "../utls/format";

function Quiz() {
    const { id } = useParams();

    const play = useSelector((state) => state.music?.musics);
    const user = useSelector((state) => state.user?.users);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [music, setMusic] = useState(play);
    const [quiz, setQuiz] = useState([]);
    const [ans, setAns] = useState([]);
    const [okPlay] = useSound(okSound);
    const [choosePlay] = useSound(chooseSound);
    const [backPlay] = useSound(backSound);

    function musicHandler() {
        setMusic(!music);
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/quiz/${id}`, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user['token'] }})
        .then(res => {
            setQuiz(res.data);
        })
        .catch(err => {
            navigate('/');
        });

        axios.get(`http://localhost:8000/api/ans/quiz/${id}`, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user['token'] }})
        .then(res => {
            setAns(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            navigate('/');
        });
    }, []);

    return (
        isLoading ? (
            <div className="flex pt-32 place-content-evenly min-h-screen bg-gradient-to-t from-slate-900 to-black">
                <Loading />
            </div>
        ) : (
            <React.Fragment>
                <ReactHowler
                    src={historyMusic}
                    loop={true}
                    volume={music ? 0.2 : 0.0}
                    playing={true}
                />

                <Navbar music={music} setMusic={musicHandler} handleOpen={null} />
                <div className="flex flex-col pt-10 place-content-start items-center min-h-screen gap-4 bg-gradient-to-t from-slate-900 to-black">
                    <div className="bg-slate-800 px-32 py-8 rounded">
                        <div className="flex items-center h-fit gap-3">
                            <p className="text-cyan-400 text-2xl">{user['username']}</p>
                            <p className="text-cyan-400 text-2xl">({user['fullName']})</p>
                        </div>
                        <p className="text-cyan-400 text-2xl">{user['email']}</p>
                        <div className="flex items-center h-fit gap-3">
                            <p className="">
                                ID: {quiz.id}
                            </p>
                            <p className="text-cyan-500 font-semibold">
                                {quiz.start}
                            </p>
                            <p className="text-green-500 font-bold">
                                Correct {quiz.correct}
                            </p>
                            <p className="text-red-500 font-bold">
                                Wrong {quiz.wrong}
                            </p>
                            <p className="text-yellow-500 font-bold">
                                Score {quiz.score}
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="font-semibold text-orange-500">YOUR ANSWER</p>
                        <p className="font-semibold text-green-500">CORRECT ANSWER</p>
                    </div>
                    
                    <div className="sticky grid gap-4 grid-cols-1 p-4 overflow-y-scroll rounded-lg z-10 bg-slate-900 border-2 border-black h-96 w-8/12 history">                            
                        { 
                            ans.map((item, key) => (
                                <div className="col-span-1 px-4 py-2 flex items-center place-content-between border rounded hover:bg-gradient-to-b from-green-400 to-violet-900 cursor-pointer w-full text-center text-white text-lg">
                                    <p className="" key={key}>
                                        No. {key+1}
                                    </p>
                                    <p className="text-cyan-500 font-semibold w-1/2" key={key}>
                                        {formatQuestion(item.description)}
                                    </p>
                                    <p className="font-bold text-left w-56" key={key}>
                                        <ol style={{ listStyleType: "upper-alpha" }}>
                                            {item.choices.split(',').map((item2, key2) => (
                                                <li key={key2} className={`${item2 === item.userChoice && item2 !== item.correct_answer ? "text-orange-500" : null} ${item2 === item.correct_answer ? "text-green-500" : null}`}>{formatQuestion(item2)}</li>
                                            ))}
                                        </ol>
                                    </p>
                                    <p className="font-bold" key={key}>
                                        {item.status ? <p className="text-green-400">CORRECT</p> : <p className="text-red-400">WRONG</p>}
                                    </p>
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-cyan-400 hover:text-yellow-600 w-48 text-3xl p-3 border-2 rounded-lg hover:bg-gradient-to-b hover:from-indigo-400 hover:to-green-400 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { backPlay(); navigate('/history') } : () => { navigate('/history') }}>Back</button>
                        <button className="text-red-400 hover:text-red-600 w-48 text-3xl p-3 border-2 rounded-lg hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onMouseEnter={music ? choosePlay : null} onClick={music ? () => { backPlay(); navigate('/') } : () => { navigate('/') }}>Menu</button>
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
    );
}

export default Quiz;