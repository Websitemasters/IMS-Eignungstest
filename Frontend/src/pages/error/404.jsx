import React from "react";

export default function NotFound({sendLocation,id}) {
  React.useEffect(()=>{
    sendLocation.sendLocation("/404",id);
  },[]);
  return (
    <div className="centerContent">
      <h1>404 Not Found</h1>
    </div>
  );
}
