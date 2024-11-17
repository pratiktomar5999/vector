import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();



const ContextProvider =(props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("")
    const [prePrompt,setPrePrompt] = useState([]);
    const [showResult,setShowResult] = useState(false)
    const [loading,setLoading] = useState(false)
    const [resultData,setResultData] = useState("")

    const delayPara = (index,nextWord) =>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },50*index)
    
    } 

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async(prompt) =>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        
        let response;
        if(prompt == undefined){
            setRecentPrompt(input)
            setPrePrompt(prev =>[input,...prev])
            response = await  runChat(input)
        }else{
            setRecentPrompt(prompt)
            setPrePrompt(prev =>[prompt,...prev])
            setResultData(prompt)
            response = await  runChat(prompt)
        }
        
        let responseArray = response.split("**");
        let finalRes1 ="";
        let finalRes2 ="";
        for(let i=0;i<responseArray.length;i++){
            if(i==0 || i%2 !==1){
                finalRes1 += responseArray[i];
            }else{
                finalRes1 += "<b>" +responseArray[i] + "</b>"
            }
        }
        finalRes2 = finalRes1.split("*").join("</br>") 
        let typing = finalRes2.split(" ");
        for(let i=0;i<typing.length;i++){
            const nextWord = typing[i]
            delayPara(i,nextWord+" ")
        }
        //setResultData(finalRes2)
        setLoading(false)
        setInput("")
    }

    

    const contextValue = {
        prePrompt,
        setPrePrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        setShowResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}



export default ContextProvider

