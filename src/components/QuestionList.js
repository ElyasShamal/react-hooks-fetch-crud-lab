import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:4000/questions");
    const data = await response.json();
    setQuestions(data);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updateQuestions = questions.filter(
          (question) => question.id !== id
        );
        setQuestions(updateQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updateQuestion) => {
        const updateQuestions = questions.map((question) => {
          if (question.id === updateQuestion.id) return updateQuestion;
          return question;
        });
        setQuestions(updateQuestions);
      });
  }

  const questionItems = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDelete={handleDelete}
      onAnswerChange={handleAnswerChange}
    />
  ));
  return (
    <section>
      <h1>Quiz Questions</h1>

      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
