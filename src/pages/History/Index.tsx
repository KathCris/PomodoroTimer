import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./style";
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from 'date-fns'
import ptBR from "date-fns/locale/pt-BR"

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meus historico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.length === 0 ? (
              <tr>
                <td>
                  <p>Nenhum ciclo registrado</p>
                </td>
                {/* TD'S empty to complete the line  */}
                <td>
                  <p></p>
                </td>
                <td>
                  <p></p>
                </td>
                <td>
                  <p></p>
                </td>
              </tr>
            ) : (
              cycles.map(cycle => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount}</td>
                    <td>
                        {formatDistanceToNow(new Date(cycle.startDate), {
                            addSuffix: true,
                            locale: ptBR
                        })}
                    </td>
                    <td>
                      {cycle.finishedDate && (<Status statusColor='green'>Concluído</Status>)}
                      {cycle.interruptedDate && (<Status statusColor='red'>Interrompido</Status>)}
                      {(!cycle.finishedDate && !cycle.interruptedDate) && (
                      <Status statusColor='yellow'>Em andamento</Status>
                      )}
                    </td>
                  </tr>
                )
              }) 
            )
            }
          </tbody>
        </table>

      </HistoryList>
    </HistoryContainer>
  )
}