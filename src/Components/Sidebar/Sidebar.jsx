import React, { useState, useContext } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../Context/Context'
const Sidebar = () => {
    const [extended,setExtended] = useState(false)
    const {onSent,prePrompt,setRecentPrompt,setShowResult,setPrePrompt} = useContext(Context)

    const  loadPrompt = async (prompt) =>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt=''/>
            <div className="new-chat" onClick={() => {setShowResult(false); setPrePrompt([]),setRecentPrompt('')}}>
            <img src={assets.plus_icon} alt=''/>
            {extended?<p>New Chat</p>:null}
            </div>
            {extended?
            <div className="recent">
                <p className='recent-title'>Recent</p>
                {prePrompt.map((item,index) => {
                    return (
                    <div className="recent-entry" onClick={()=> loadPrompt(item)}>
                        <img src={assets.message_icon} alt=''/>            
                        <p>{item.slice(0,18)} ...</p>
                        </div>
                    )
                })}
                
            </div>:null}
            
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt=''/>
                {extended?<p>Help</p>: null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt=''/>
                {extended?<p>Activity</p>: null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt=''/>
                {extended?<p>Settings</p>: null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar