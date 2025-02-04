import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const lever = new Audio("./sounds/lever.mp3");
lever.volume = 0.5;
const lose = new Audio("./sounds/lose.mp3");
lose.volume = 0.5;
const win = new Audio("./sounds/win.mp3");
win.volume = 0.5;
const spin = new Audio("./sounds/spin.mp3");
spin.volume = 0.5;
const synth = new Audio("./sounds/synth.mp3");
synth.volume = 0.5;

function App() {

  const [num1, setNum1] = useState(9);
  const [num2, setNum2] = useState(8);
  const [num3, setNum3] = useState(7);

  const [pulled, setPulled] = useState(false);
  const [ready1, setReady1] = useState(false);
  const [ready2, setReady2] = useState(false);
  const [ready3, setReady3] = useState(false);
  
  const getLucky = () => {
    setPulled(true);

    lever.play();
    spin.play();


    const interval1 = setInterval(() => {
      let final1 = Math.floor(Math.random() * 9) + 1;
      setNum1(final1);
    }, 100);

    const interval2 = setInterval(() => {
      let final2 = Math.floor(Math.random() * 9) + 1;
      setNum2(final2);
    }, 100);

    const interval3 = setInterval(() => {
      let final3 = Math.floor(Math.random() * 9) + 1;
      setNum3(final3);
    }, 100);

    setTimeout(() => {
      clearInterval(interval1);
      setReady1(true);
      synth.play();

      const finalNum1 = Math.floor(Math.random() * 9) + 1;
      setNum1(finalNum1);

      setTimeout(() => {
        clearInterval(interval2);
        setReady2(true);
        synth.currentTime = 0;

        const finalNum2 = Math.random() < .6 ? finalNum1 : Math.floor(Math.random() * 9) + 1;
        setNum2(finalNum2);

        setTimeout(() => {
          clearInterval(interval3);
          setReady3(true);
          synth.currentTime = 0;

          const finalNum3 = Math.random() < .1 ? finalNum1 : Math.floor(Math.random() * 9) + 1;
          setNum3(finalNum3);

          if (finalNum1 == finalNum2 && finalNum1 == finalNum3) {
            win.play();
          } else {
            lose.play();
          }

        }, 1000);
      }, 1000);
    }, 3000);

    setTimeout(() => {
      setPulled(false);
    }, 1000);
  }

  return (
    <> 
    <div className='app'>
      <div className='machine'>
        <div className='screen'>
          <div className='digits'>
            <div className={`digit ${ready1 ? 'ready' : ''}`}>{num1}</div>
            <div className={`digit ${ready2 ? 'ready' : ''}`}>{num2}</div>
            <div className={`digit ${ready3 ? 'ready' : ''}`}>{num3}</div>
          </div>
        </div>
        <div className='leverBase'>
          <div className={`lever ${pulled ? 'pull' : ''}`}></div>
          <div onClick={() => getLucky()} className={`btn ${pulled ? 'pull2' : ''}`}></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
