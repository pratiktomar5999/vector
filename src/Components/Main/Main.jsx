import React, { useContext, useEffect, useRef } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'

const Main = () => {
    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)
    const searchInput = useRef(null);
    useEffect(() => {
        const inElement = searchInput.current;
        inElement.addEventListener('keypress',(e) => {
            if(e.key === 'Enter'){
                document.getElementById('search').click();
            }
        })
    },[searchInput])
    return (
    <div className='main'>
    <div className="nav">
        <h2><b>VECTOR AI SEARCH</b></h2>
        <img src={assets.user_icon} alt=''/>
    </div>
    <div className="main-container">
        {!showResult ?<>
            <div className="greet">
                <p>
                    <span>
                        Welcome sergeant    
                    </span>
                </p>
                <p>Want to search something?</p>
            </div>
        
        <div className="cards">
            <div className="card" onClick={() => {onSent("Adventure places to go on vacation in europe");
                setInput('Places for vacation in europe')
            }}>
                <p>Places for vacation in europe</p>
            </div>
            <div className="card" onClick={() => onSent("Jobs having high pay scale")}>
                <p>Jobs with high salary</p>
            </div>
            <div className="card" onClick={() => onSent("Top in-demand programming languages")}>
                <p>Most famous programming languages</p>
            </div>
            <div className="card" onClick={() => onSent("Top political new today")}>
                <p>Top political new today</p>
            </div>
        </div>
        </>:
        <div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt=''/>
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt=''/>
                {loading?<div className='loader'>
                        <hr id='loader1'/>
                        <hr id='loader2'/>
                        <hr id='loader3'/>
                    </div>:
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                
            </div>
            </div>}

    
        <div className="main-bottom">
            <div className="search-box">
                <input ref={searchInput} onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Search anything...'/>
                    <img src={assets.gemini_icon} alt=''/>
                    <img src={assets.mic_icon} alt=''/>
                    {input?<img id='search' onClick={() => onSent()} src={assets.send_icon} alt=''/>:null}
            </div>
            <p className='bottom-info'>
                This AI chat bot is using google gemini AI engine API for all the searches 
            </p>
        </div>
        </div>
    </div>
  )
}

export default Main