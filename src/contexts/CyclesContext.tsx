import { createContext, useState, useReducer, useEffect } from "react"
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { addNewCycleAction, interruptedCycleAction, markCurrentCyclesAsFinishedAction } from "../reducers/cycles/actions"
import { differenceInSeconds } from "date-fns"

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CycleContextType {
  cycles: Cycle[]
  nowActiveCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCyclesAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptedCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)


interface CyclesContextProviderProps {
  children: React.ReactNode
}


export function CyclesContextProvider ({ children }: CyclesContextProviderProps) {

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    nowActiveCycle: null,
  }, (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-1.0.0'
      )
      
      if(storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    }
  )


  const { cycles, activeCycleId } = cyclesState
  const nowActiveCycle = cycles.find(cycle => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if(nowActiveCycle) {
      return differenceInSeconds(new Date(), new Date(nowActiveCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const statesJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-1.0.0', statesJSON)
  }, [cyclesState])

  

  function createNewCycle (data: CreateCycleData) {
    const id = String(new Date().getTime())
 
     const newCycle: Cycle = {
       id,
       task: data.task,
       minutesAmount: data.minutesAmount,
       startDate: new Date(),
     }
 
     dispatch(addNewCycleAction(newCycle))
     setAmountSecondsPassed(0)
   }
 
   function interruptedCycle () {
    dispatch(interruptedCycleAction())
   }

  
  function markCurrentCyclesAsFinished() {
      dispatch(markCurrentCyclesAsFinishedAction())
  }

  function setSecondsPassed (seconds: number) {
     setAmountSecondsPassed(seconds)
  }

  return (
    
    <CyclesContext.Provider 
      value={{
        cycles,
        activeCycleId, 
        nowActiveCycle, 
        amountSecondsPassed, 
        markCurrentCyclesAsFinished, 
        setSecondsPassed,
        createNewCycle,
        interruptedCycle
      }}
     >
      {children}
     </CyclesContext.Provider>
  )
}