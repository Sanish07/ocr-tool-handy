import React, {useState} from 'react';
import Tesseract from 'tesseract.js';

const Main = () => {
    const [imagePath, setImagePath] = useState("");
    const [imageText, setText] = useState("");
    const [analytics, setAnalytics] = useState({
            wordCount : 0,
            symbolCount : 0,
            confidenceScore : 0
        }
    );

     const handleFileChange = (e) => {
        setImagePath(URL.createObjectURL(e.target.files[0]));
     }

     const handleExtract = () => {
        Tesseract.recognize(
            imagePath, 'eng', {
                logger : m => console.log(m)
            }
        ).then(result => {
            let { text, confidence, words, symbols } = result.data;
            setText(text);
            setAnalytics({...analytics, wordCount : words.length, symbolCount : symbols.length, confidenceScore : confidence});
        })
    
}

  return (
      <div>
        <div id="img-area">
            <img alt='input-img' src={imagePath} style={{maxHeight : "60vh", maxWidth : "60vw"}}/> <br/>
            <input type='file' onChange={handleFileChange}/> <br/>
            <button onClick={handleExtract}>Extract Text</button>
         </div>

        <div id="text-area">
            <h3>Extracted Text : </h3>
            <textarea rows={4} cols={50} value={imageText}></textarea> 
            <div>
                <p>Confidence Score : {analytics.confidenceScore}</p>
                <p>Word Count : {analytics.wordCount}</p>
                <p>Unique Character Count : {analytics.symbolCount}</p>
            </div>
        </div>
      </div>
    
  )
}

export default Main