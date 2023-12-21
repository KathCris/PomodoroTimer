import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./style";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { CountDown } from "./Componentes/CountDown";
import { NewCycleForm } from "./Componentes/NewCycleForm";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no minimo 5 minutos').max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {
  
  const { nowActiveCycle, createNewCycle, interruptedCycle } = useContext(CyclesContext)
  
  const newCycleFormUseForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })
  const { handleSubmit, watch, reset } = newCycleFormUseForm


  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle (data: newCycleFormData) {
    createNewCycle(data)
    reset()
  }
  

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
          <FormProvider {...newCycleFormUseForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />

        {nowActiveCycle ? (
          <StopCountdownButton onClick={() => interruptedCycle()} type='button'>
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