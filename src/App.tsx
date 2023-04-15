import React, {useState} from 'react';
import twitterButton from './twitter-share-button.svg'
import './App.css';

function App() {

  let [adviceState, setAdviceState] = useState("")

  //how to get a random number in a range beetween 0 and the limit
const getRandomNumber = (limit:number) => {
  return Math.floor(Math.random() * limit);
};

//getting a random color for a HSL color 
const getRandomColor = () => {
  const h = getRandomNumber(360);
  const s = getRandomNumber(100);
  const l = getRandomNumber(100);

  return `hsl(${h}deg, ${s}%, ${l}%)`;
};

//setting the rando background color
const setBackgroundColor = () => {
  const randomColor = getRandomColor();
  const bgStyle = {
    backgroundColor: randomColor
  };
  return bgStyle
};

const backgroundStyle = setBackgroundColor();

//getting data to show in our page
function getAdvice() {
  fetch('https://api.adviceslip.com/advice')
  .then(response => response.json())
  .then(data => {
      setAdviceState(data.slip.advice)
      setBackgroundColor();
  })
  .catch(error => {
      console.error(error);
      setAdviceState(`Something failed because ${error.message}`)
  })
}

getAdvice();

//how the twittter button works
function shareOnTwitter() {
  const navUrl =
    `https://twitter.com/intent/tweet?text=${adviceState}`;
  window.open(navUrl, '_blank');
}

  return (
    <div className="background" style={backgroundStyle}>
      <h1>Advice App</h1>
      <div className="container">
        <div className="advice">{adviceState}</div>
        <div className="btns">
          <button className="new" onClick={getAdvice}>Another one please</button>
        </div>
        <div className="social">
          <img
            src={twitterButton}
            alt="Share button"
            className="sharebtn"
            onClick={shareOnTwitter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
