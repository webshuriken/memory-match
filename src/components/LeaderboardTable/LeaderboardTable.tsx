import { useLeaderboard } from "../../routes/App/App";
import { LastGameStatsType } from "../../custom-types/types";


type Props = {
  lastGameStats: LastGameStatsType | null;
}

export default function LeaderboardTable({ lastGameStats }: Props): JSX.Element {
  const [leaderboard] = useLeaderboard();

  return (
    <table className="leadboard-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Moves</th>
          <th className="leadtable-col__time">Time</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
      { 
        (leaderboard !== undefined)
        ?
        leaderboard.map(data => {
            return (
              <tr key={data.id} className={data.id === lastGameStats?.playerStats.id ? "last-game-stats__row" : "leaderboard-stats__row"}>
                <td>{data.name}</td>
                <td>{data.moves}</td>
                <td className="leadtable-col__time">{data.time}</td>
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