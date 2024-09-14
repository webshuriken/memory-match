import { useLeaderboard } from "../../routes/App/App";


export default function LeaderboardTable(): JSX.Element {
  const [leaderboard] = useLeaderboard();

  // organise in ASC order
  if (leaderboard !== undefined) {
    leaderboard.sort((a,b) => a.position - b.position);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Moves</th>
          <th>Time</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
      { 
        (leaderboard !== undefined)
        ?
        leaderboard.map(data => {
            return (
              <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.moves}</td>
                <td>{data.time}</td>
                <td>{data.position}</td>
              </tr>
            )
          })
        :
          <tr><td colSpan={5}>Loading leaderboard</td></tr>
        }
      </tbody>
    </table>
  );
}