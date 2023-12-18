import { HandPalm, Play } from "phosphor-react";
import { CountdowmContainer, FormContainer, HomeContainer, MinuteAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./style";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no minimo 5 minutos').max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
})

type neyCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date 
  dateInterrupt?: Date 
  finishedDate?: Date
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([]) 
  const [activeCycle, setActiveCycle] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })
  
  const task = watch('task')
  const isSubmitDisabled = !task
  
  const nowActiveCycle = cycles.find(cycle => cycle.id === activeCycle)

  // Start count seconds and minutes for timer
  const totalSeconds = nowActiveCycle ? nowActiveCycle.minutesAmount * 60 : 0
  const currentSeconds = nowActiveCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount =  Math.floor(currentSeconds/ 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  // End count seconds and minutes for timer

  function handleCreateNewCycle (data: neyCycleFormData) {
    const id = String(new Date().getTime())
 
     const newCycle: Cycle = {
       id,
       task: data.task,
       minutesAmount: data.minutesAmount,
       startDate: new Date(),
     }
 
     setCycles(state => [...state, newCycle])
     setActiveCycle(id)
 
     reset()
     setAmountSecondsPassed(0)
   }
 
   function handleInterruptedCycle () {
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


  //UseEffect to show counter in the tab title
  useEffect(() => {
    if(nowActiveCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, nowActiveCycle])


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">For trabalhar em</label>
          <TaskInput 
          id="task" 
          placeholder="Dê um nome para o seu projeto" 
          {...register('task')}
          disabled={!!nowActiveCycle}
          />

          <label htmlFor="minuteAmount"> Durante </label>
          <MinuteAmountInput 
          type="number" 
          id="minuteAmount" 
          placeholder="00"
          step={5}
          min={5}
          max={60} 
          {...register('minutesAmount', {valueAsNumber: true})} 
          disabled={!!nowActiveCycle}
          />

          <span>Minutos.</span>
        </FormContainer>

        <CountdowmContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdowmContainer>

        {nowActiveCycle ? (
          <StopCountdownButton onClick={() => handleInterruptedCycle()} type='button'>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton> 
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}

      </form>
    </HomeContainer>
  )
}