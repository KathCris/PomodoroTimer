import { createContext, useState } from "react"


interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date 
  interruptedDate?: Date 
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[]
  nowActiveCycle: Cycle | undefined
  activeCycle: string | null
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

  const [cycles, setCycles] = useState<Cycle[]>([]) 
  const [activeCycle, setActiveCycle] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const nowActiveCycle = cycles.find(cycle => cycle.id === activeCycle)


  function createNewCycle (data: CreateCycleData) {
    const id = String(new Date().getTime())
 
     const newCycle: Cycle = {
       id,
       task: data.task,
       minutesAmount: data.minutesAmount,
       startDate: new Date(),
     }
 
     setCycles(state => [...state, newCycle])
     setActiveCycle(id)
 
     setAmountSecondsPassed(0)
   }
 
   function interruptedCycle () {
     setCycles(state => state.map((cycle) => {
         if (cycle.id === nowActiveCycle?.id) {
           return { ...cycle, interruptedDate: new Date()}
         } else {
           return cycle
         }
       })
     )
   
     setActiveCycle(null)
   }

  
  function markCurrentCyclesAsFinished() {
      setCycles(state => state.map((cycle) => {
          if (cycle.id === nowActiveCycle?.id) {
            return { ...cycle, finishedDate: new Date()}
          } else {
            return cycle
          }
        })
      ) 
  }

  function setSecondsPassed (seconds: number) {
     setAmountSecondsPassed(seconds)
  }


  return (
    
    <CyclesContext.Provider 
      value={{
        cycles,
        activeCycle, 
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