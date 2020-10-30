import React from "react";

export default function NotFound({sendLocation}) {
  React.useEffect(()=>{
    sendLocation.sendLocation("/404");
  },[]);
  return (
    <div className="centerContent">
      <h1>404 Not Found</h1>
    </div>
  );
}
