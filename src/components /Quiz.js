import React,{useState, useEffect} from "react"

export default function Quiz(props){
    const [selectedId, setSelectedId] = useState(); // id for selected/isHeld option

    //sets "score"(a state defined in App component) to the total number of correct answer
    // reloads when checkResult state is true
    useEffect(()=>{
        if(props.checkResult){
            props.options.map((item)=> {
                if(item.isHeld && item.correctAnswer){
                    props.setScore(prevScore => prevScore+1)
                }
            }) 
            console.log(props.options)
        }
    },[props.checkResult])
    
    return(
        <div className="quiz">
            <h2 className="questions">{props.question}</h2> 

            {/* Quiz page: conditionaly rendered when user starts new quiz*/}
           {!props.checkResult && <div >
            {props.options.map(item => 
                <button
                    key={item.id}
                    onClick={()=> {
                        setSelectedId(item.id)
                    }}
                    className={selectedId === item.id ? "choice" : "options"}  
                >
                    {selectedId === item.id ? item.isHeld = true : item.isHeld }
                    {selectedId !== item.id && item.isHeld ? item.isHeld = false : item.isHeld}
                    {item.value}
                </button>)
            }
            </div>}
            {/* Ends here: Quiz Page */}

            {/*Result Page: conditionally rendered when user submits test */}
            {props.checkResult && <div>
                {props.options.map((item)=>
                    <button 
                        style={item.correctAnswer ?
                                {
                                backgroundColor: '#94D7A2',
                                color: '#293264',
                                borderRadius: '7.94239px',
                                marginRight: '12px',
                                marginTop: '4px'
                        } : null}
                        key={item.id}
                        className ={item.isHeld && !item.correctAnswer? "wrong": "options"}
                    >
                        {item.value}
                    </button>
                )}
             </div>}
             {/* Ends here: Result Page*/}
             <hr />
        </div>
    )
} 
