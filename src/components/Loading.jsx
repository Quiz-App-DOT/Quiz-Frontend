import React from "react";

export default function Loading() {
    return (
        <React.Fragment>
            <div className="justify-center items-center flex fixed inset-0 z-50">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                        <div className="flex items-center gap-4 justify-between p-5 border-b border-solid border-slate-200 rounded-lg">
                            <div className="h-11 w-11">
                                <div className="loader">
                                    <div className="loader loader-inner"></div>
                                </div>
                            </div>
                            <p className="text-2xl font-semibold">
                                Loading...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </React.Fragment>
    )
}