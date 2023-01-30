import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = React.useState([]);
  function deleted(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => fetcher())
  }
  function handleChange(e,id) {
    // console.log(e.target.value+" : question "+id);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "correctIndex": parseInt(e.target.value)
      })
    })
  }
  function fetcher() {
    fetch("http://localhost:4000/questions")
      .then(resp => resp.json())
      .then(result => {
        setQuestions(result.map(que => 
        <QuestionItem key={que.id} 
        handleChange={handleChange}
        question={que} 
        deleted={deleted} />))
      })
  }
  React.useEffect(() => fetcher(), []);
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {questions}
      </ul>
    </section>
  );
}

export default QuestionList;