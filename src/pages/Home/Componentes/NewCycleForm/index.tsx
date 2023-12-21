import { FormContainer, MinuteAmountInput, TaskInput } from "./style";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";


export function NewCycleForm () {
  const { nowActiveCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

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