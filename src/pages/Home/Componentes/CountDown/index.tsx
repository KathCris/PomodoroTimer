import { useContext } from "react";
import { CountdowmContainer, Separator } from "./style";
import { CyclesContext } from "../..";


export function CountDown () {

  const { cycles, nowActiveCycle } = useContext(CyclesContext)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const totalSeconds = nowActiveCycle ? nowActiveCycle.minutesAmount * 60 : 0


  useEffect(() => {
    let interval: number

    if (nowActiveCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), nowActiveCycle.startDate)
        
        if (secondsDifference >= totalSeconds) {
          setCycles(state => state.map((cycle) => {
              if (cycle.id === nowActiveCycle?.id) {
                return { ...cycle, finishedDate: new Date()}
              } else {
                return cycle
              }
            })
          ) 
          
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)

        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [nowActiveCycle, totalSeconds])


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