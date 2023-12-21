import { FormContainer, MinuteAmountInput, TaskInput } from "./style";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import * as zod from 'zod';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no minimo 5 minutos').max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
})

type neyCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function NewCycleForm () {

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })


    return (
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
    )
}