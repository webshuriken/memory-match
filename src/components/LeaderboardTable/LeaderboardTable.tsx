import { LeaderboardType } from "../../custom-types/types";
import { useLeaderboard } from "../../routes/App/App";


// TODO: CREATE THE TYPE FOR THE PROP BUT I THINK WE CAN USE THE Leaderboard type..
// TODO: THIS NEEDS TO TAKE IN A TABLE SO WE CAN DISPLAY
export default function LeaderboardTable(): JSX.Element {
  const leaderboard = useLeaderboard();

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
          <tr><td>Loading leaderboard</td></tr>
        }
      </tbody>
    </table>
  );
}