import React,{useState, useEffect} from "react";
import Home from './Home';
import Quiz from './Quiz';
import {shuffle} from "lodash";
import { nanoid } from 'nanoid';
const he = require('he');

export default function App() {
const [game, setGame] = useState(false)
const [quiz, setQuiz] = useState([])
const [checkResult, setCheckResult] = useState(false)
const [displayScore, setDisplayScore] =useState(false) 
const [reset, setReset] = useState(false)
const [score, setScore] = React.useState(0)

// Fetches 5 sports quiz from API, shuffles the options, assigns an Id to each option, isHeld prop to determine when option is selected
// Then returns same questions with shuffles options
useEffect(()=>{
  fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=hard&type=multiple')
  .then(response => response.json())
  .then(data => {
    const apiQuiz = data.results
    if(apiQuiz && apiQuiz.length > 0){
        const formatedQuiz = apiQuiz.map((q)=>{
        const arrayOfOptions = [q.correct_answer, ...q.incorrect_answers]
        const shuffledArray = shuffle(arrayOfOptions)
        const newOptions = shuffledArray.map((item)=>{
          return {
          value: item,
          id: nanoid(),
          isHeld: false,
          correctAnswer: item === q.correct_answer ? true : false 
          }
        })
        const question = {
          question: q.question,
          options: newOptions
        }
        return question
      })
      setQuiz(formatedQuiz)
    }
  });
  },[reset])

  // Starts a New Game
  function startQuiz(){
    setGame(true)
  }
  
  //Checks result
  function checkAnswer(){
    setCheckResult(true)
    setDisplayScore(true)
  }

  //Resets the game
  function playAgain(){
    setGame(false)
    setCheckResult(false)
    setDisplayScore(false)
    setReset(!reset)
    setScore(0)
  }
  
  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

  return (
    <div className="card">
      {!game && <Home startQuiz={startQuiz} />}
      {game && quiz && quiz.length > 0 && quiz.map((q) => <Quiz 
        question={q.question} 
        options={q.options} 
        checkResult={checkResult}
        setScore={setScore}
        />)}

      {game && !displayScore && <button className="check--answer" onClick={checkAnswer}>Check Answer</button>}
      
      {displayScore && <div className="display--score"><h3>You scored {score}/5 correct answers</h3> <button onClick={playAgain} className="replay--button">Play Again</button></div>}
    </div>
  );
}
