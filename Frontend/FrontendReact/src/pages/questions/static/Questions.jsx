import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Questions() {
  useEffect(() => {
    fetchData();
    console.log("Hello");
  }, []);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const fetchData = await fetch("http://localhost:8080/getAllQuestion");
    const questions = await fetchData.json();
    setData(questions);
  };
  return (
    <div className="staticQuestions">
      {data.map((question) => (
        <p key={question.id}>
          <Link to={`/QuestionStatic/${question.id}`}>{question.question}</Link>
        </p>
      ))}
    </div>
  );
}
export default Questions;
