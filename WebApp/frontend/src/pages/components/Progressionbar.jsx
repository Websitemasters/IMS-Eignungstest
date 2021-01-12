import React from 'react'

//Erfüllungsanzeige
export default function Progressionbar({ progress, style }) {
    return (
        <div className="progressBar">
            <div className={style} style={{ width: progress + "%" }} >
            </div>
        </div>
    )
}
