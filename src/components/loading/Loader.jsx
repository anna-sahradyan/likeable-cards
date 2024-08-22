import React from 'react';
import * as Loader from "react-loader-spinner";

const Loading = () => {
    return (
        <>
            <div className={" wrapper_loader"}>
                <div className="loader">
                    <Loader.Watch
                        height={100}
                        width={100}
                    />
                </div>
            </div>
        </>
    );
};

export default Loading;