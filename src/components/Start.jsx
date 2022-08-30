import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatQuestion } from "../utls/format";
import okSound from '../assets/ok.wav';
import useSound from 'use-sound';
import Loading from "./Loading";

function Start() {

    const play = useSelector((state) => state.music?.musics);
    const user = useSelector(state => state.user?.users);
    const navigate = useNavigate();
    const [okPlay] = useSound(okSound);

    const choice = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [startCount, setStartCount] = useState(3);
    const [question, setQuestion] = useState({});
    const [start, setStart] = useState(false);
    const [number, setNumber] = useState(1);
    const [count, setCount] = useState(14);
    const [choices, setChoices] = useState(choice);

    const timer = useRef(null);
    const counter = useRef(null);

    function handleChoice(e) {
        let items = [...choices];
        let item = {...items[number-1]};
        item = e;
        items[number-1] = item;
        setChoices(items);
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex != 0) {
      
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    function handleSubmit() {
        axios.post('http://localhost:8000/api/quiz/add', { question, choices }, {"Authorization": 'Bearer ' + user['token']})
        .then(res => {
            navigate(`/quiz/${res.data.id}`);
        })
        .catch(err => {
            navigate('/');
        })
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/quiz', { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user['token'] } })
        .then(res => {
            let result = res.data.results;

            result.forEach(item => {
                item.answers = [...item.incorrect_answers];
                item.answers.push(item.correct_answer);
                item.answers = shuffle(item.answers);
            });

            setQuestion(res.data.results);
        })
        .catch(err => {
            navigate('/');
        });

        timer.current = setInterval(() => {
            setStartCount(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer.current);
    }, [])

    useEffect(() => {
        if (startCount < 0) { clearInterval(timer.current); setStart(true) };
        if (count <= 0) { 
            setCount(10); 
            if (number < 10) setNumber(prev => prev + 1); 
        };
        if (number >= 10) { clearInterval(counter.current); handleSubmit(); };
    }, [startCount, count, number])

    useEffect(() => {
        counter.current = setInterval(() => {
            setCount(prev => prev - 1);
        }, 1000);
    }, []);

    return (
        <React.Fragment>
            { isLoading ?
                (   
                    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-t from-slate-900 to-black">   
                        <Loading />
                    </div>
                )
            :
                (
                    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-t from-slate-900 to-black">
                        {startCount >= 0 ?
                            (<p className="text-7xl text-white">{startCount}</p>) : (null)
                        }

                        {start ? 
                            (
                                <React.Fragment>
                                    <div className="flex justify-center counter -mt-32 mb-3 w-1/2 ease-in-out duration-200 fade-in">
                                        <div className="my-3">
                                            <p className="text-cyan-400 text-2xl">{count}</p>
                                            <span className="countdown"></span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 grid-rows-4 gap-3 border p-4 w-1/2 rounded bg-gradient-to-t from-slate-900 to-slate-800 ease-in-out duration-200 fade-in">
                                        <div className="col-span-2">
                                            <p className="text-center text-4xl text-cyan-400">{number}</p>
                                            <hr />
                                            <p className="text-cyan-400">{formatQuestion(question[number-1].question)}</p>
                                            <hr />
                                        </div>
                                        <div className="col-span-1">
                                            <button className={`border w-full rounded-lg p-2 bg-black hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 shadow-indigo-400 shadow-md ${choices[number-1] === 'a' ? "bg-gradient-to-b from-orange-400 to-red-600" : null}`} onClick={play ? () => { handleChoice('a'); okPlay(); } : () => handleChoice('a') } >
                                                <p className="text-cyan-400 text-left">A. {formatQuestion(question[number-1].answers[0])}</p>
                                            </button>
                                        </div>
                                        <div className="col-span-1">
                                            <button className={`border w-full rounded-lg p-2 bg-black hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 shadow-indigo-400 shadow-md ${choices[number-1] === 'b' ? "bg-gradient-to-b from-orange-400 to-red-600" : null}`} onClick={play ? () => { handleChoice('b'); okPlay(); } : () => handleChoice('b') } >
                                                <p className="text-cyan-400 text-left">B. {formatQuestion(question[number-1].answers[1])}</p>
                                            </button>
                                        </div>
                                        <div className="col-span-1">
                                            <button className={`border w-full rounded-lg p-2 bg-black hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 shadow-indigo-400 shadow-md ${choices[number-1] === 'c' ? "bg-gradient-to-b from-orange-400 to-red-600" : null}`} onClick={play ? () => { handleChoice('c'); okPlay(); } : () => handleChoice('c') } >
                                                <p className="text-cyan-400 text-left">C. {formatQuestion(question[number-1].answers[2])}</p>
                                            </button>
                                        </div>
                                        <div className="col-span-1">
                                            <button className={`border w-full rounded-lg p-2 bg-black hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 shadow-indigo-400 shadow-md ${choices[number-1] === 'd' ? "bg-gradient-to-b from-orange-400 to-red-600" : null}`} onClick={play ? () => { handleChoice('d'); okPlay(); } : () => handleChoice('d') } >
                                                <p className="text-cyan-400 text-left">D. {formatQuestion(question[number-1].answers[3])}</p>
                                            </button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        :
                            (
                                null
                            )
                        }
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default Start;