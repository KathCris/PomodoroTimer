import { Play } from "phosphor-react";
import { CountdowmContainer, FormContainer, HomeContainer, MinuteAmountInput, Separator, StartCountdownButton, TaskInput } from "./style";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no minimo 5 minutos').max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
})

type neyCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  function handleCreateNewCycle (data: neyCycleFormData) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">For trabalhar em</label>
          <TaskInput 
          id="task" 
          placeholder="Dê um nome para o seu projeto" 
          {...register('task')}
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
          />

          <span>Minutos.</span>
        </FormContainer>

        <CountdowmContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdowmContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>

      </form>
    </HomeContainer>
  )
}