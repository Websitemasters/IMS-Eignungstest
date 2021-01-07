import React from 'react'

function Cookie({ setCookieAccept, setCookieMessage }) {
    const accept = () => {
        setCookieAccept(true);
        setCookieMessage(null);
    }
    return (
        <div className="cookie">
            <h1>Cookies</h1>
            <p>Wir benutzen Cookies um ihren aufenthalt zu verbessern, verkehr aufzuzeichnen und zu anayliseren. Bitte akzeptieren sie diese um die Webseite zu benutzen.</p>
            <button onClick={accept}>Ich akzeptiere</button>
        </div>
    )
}

export default Cookie
