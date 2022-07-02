import React from 'react';
import '../../static/CSS/Loading.css'
const Loading = () => {
    return (
        <div className="loading">
            <div className='uil-ring-css' style={{transform:"scale(0.79)"}}>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;