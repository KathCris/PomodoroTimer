import { CountdowmContainer, Separator } from "./style";



export function CountDown () {
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