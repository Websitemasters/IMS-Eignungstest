import React from 'react'

function Progressionbar({ progress, style }) {
    return (
        <div className="progressBar">
            <div className={style} style={{ width: progress + "%" }} >
            </div>
        </div>
    )
}

export default Progressionbar