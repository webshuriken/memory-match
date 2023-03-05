import React, {useState, useEffect} from "react";


function SidePanelTimer() {
  // array represents seconds, minutes
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  // tictoc
  const updateTimer = () => setSecs(secs => secs + 1);

  // every 60 seconds, reset the seconds and increase the minutes. Max 20mins.
  if (secs === 60) {
    setMins(mins => mins + 1);
    setSecs(secs => 0);
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      updateTimer();
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <p>Timer</p>
      <p>{`${mins}`.padStart(2, '0')}{`:`}{`${secs}`.padStart(2, '0')}</p>
    </div>
  )
}

export default SidePanelTimer;