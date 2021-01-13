import React from 'react'

//Die Cookei Meldung
export default function Cookie({ setCookieAccept, setCookieMessage }) {
    //Methode welche Cooki1es akzeptiert
    const accept = () => {
        setCookieAccept(true);
        setCookieMessage(null);
    }
    return (
        <div className="cookie">
            <h1>Cookies</h1>
            <p>Wir benutzen Cookies um ihren Aufenthalt zu verbessern, Verkehr aufzuzeichnen und zu analysieren. Bitte akzeptieren sie diese um die Webseite zu benutzen.</p>
            <button onClick={accept}>Ich akzeptiere</button>
        </div>
    )
}
