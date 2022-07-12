import React from "react"

function Home(props){
    return(
        <div>
           <h1 className="title">Sportiz</h1> 
           <h2 className="subtitle">How well do you know sports?</h2>
           <button className="start--button" onClick={props.startQuiz}><span className="start--button--text">Start Quiz</span></button>
        </div>
    )
} 

export default Home;
