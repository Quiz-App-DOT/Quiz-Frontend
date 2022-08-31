import React from "react";

function ConfirmModal({ok, notOk}) {
    return (
        <React.Fragment>
            <div className="justify-center items-center flex fixed inset-0 z-30 fade-in ease-in-out duration-200">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-gray-400 to-gray-300">
                        <div className="flex flex-col items-center gap-4 justify-between p-5 border-b border-solid border-gray-400 rounded-lg">
                            <p className="text-2xl font-semibold">Are You Sure?</p>
                            <button className="text-black hover:text-cyan-600 w-48 p-3 border-2 rounded-lg hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onClick={notOk}>No, Bring me back</button>
                            <button className="text-black hover:text-cyan-600 w-48 p-3 border-2 rounded-lg hover:bg-gradient-to-b hover:from-fuchsia-400 hover:to-orange-400 ease-in-out duration-200 hover:-translate-y-1 hover:scale-110 shadow-indigo-400 shadow-md" onClick={ok}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-20 bg-black"></div>
        </React.Fragment>
    )
}

export default ConfirmModal;