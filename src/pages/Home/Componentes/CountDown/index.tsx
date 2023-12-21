import { useContext, useEffect } from "react";
import { CountdowmContainer, Separator } from "./style";
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from "../../../../contexts/CyclesContext";


export function CountDown () {

  const { 
    nowActiveCycle, 
    amountSecondsPassed, 
    markCurrentCyclesAsFinished, 
    setSecondsPassed 
  } = useContext(CyclesContext)
  
  // Start count seconds and minutes for timer
  const totalSeconds = nowActiveCycle ? nowActiveCycle.minutesAmount * 60 : 0
  const currentSeconds = nowActiveCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount =  Math.floor(currentSeconds/ 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  // End count seconds and minutes for timer


  useEffect(() => {
    let interval: number

    if (nowActiveCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), nowActiveCycle.startDate)
        
        if (secondsDifference >= totalSeconds) {
          markCurrentCyclesAsFinished()
          
          setSecondsPassed(totalSeconds)
          clearInterval(interval)

        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [nowActiveCycle, totalSeconds, markCurrentCyclesAsFinished, setSecondsPassed])


  useEffect(() => {
    if(nowActiveCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, nowActiveCycle])


    return (
        <CountdowmContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdowmContainer>
    )
}