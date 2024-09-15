import { useLeaderboard } from "../App/App";
import { useLocation } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader"
import LeaderboardTable from "../../components/LeaderboardTable/LeaderboardTable";
import { useEffect, useState } from "react";
import { LeaderboardType, LastGameStatsType } from "../../custom-types/types";
// npm packages
import ShortUniqueId from 'short-unique-id';


export default function Leaderboard(): JSX.Element {
  const [leaderboard, setLeaderboard] = useLeaderboard();
  const location = useLocation();
  // TODO: the project says that it is TS compatible but TS is type throwing errors
  const uuid: any = new ShortUniqueId();
  // remember the last game stats, used locally and by LeaderboardTable
  const [lastGameStats, setLastGameStats] = useState<LastGameStatsType | null>(null);
  
  useEffect(() => {
    if (location?.state?.time && leaderboard != null) {
      // extract last game stats
      const { time, moves, name } = location.state;
      
      // store so we can show player their last game stats
      // even if they dont make the leaderboard
      const latestPlayerStats: LeaderboardType = {
        id: uuid.rnd(),
        name,
        time,
        moves,
        position: 0,
      }
      
      // calculate current player score
      const latestScore = Number(time.substring(0,2) + time.substring(3)) + Number(moves);
      
      // lets add the new score and also trim the list to a max of 100
      let updatedLeaderboard: LeaderboardType[] = [];
      // search switch
      let addingLatestScore = true;
      // dynamically tracks the players position on the leaderboard
      let position = 1;

      // lets try to add latest player to current leaderboard
      leaderboard.forEach(player => {
        let score = Number(player.time.substring(0,2) + player.time.substring(3)) + Number(player.moves);
        // here we separate the loosers from the winners
        if (addingLatestScore && score >= latestScore) {
          latestPlayerStats.position = position++;
          updatedLeaderboard.push(latestPlayerStats);
          addingLatestScore = false;
        }
        updatedLeaderboard.push({
          ...player,
          position: position++,
        });
      });
  
      // are we still looking to add latest player stats to leaderboard?
      // and does the leaderboard still have room for another?
      if (addingLatestScore && updatedLeaderboard.length < 50) {
        // add to last place
        latestPlayerStats.position = updatedLeaderboard.length + 1;
        updatedLeaderboard.push(latestPlayerStats);
        addingLatestScore = false;
      }
  
      // lets make sure the updated leaderboard only has 100 items
      if (updatedLeaderboard.length > 50) {
        updatedLeaderboard = updatedLeaderboard.slice(0,50);
      }
  
      setLastGameStats(() => {
        return {
          playerStats: latestPlayerStats,
          inLeaderboard: latestPlayerStats.position <= 50,
        }
      })
      // update game context
      setLeaderboard(() => updatedLeaderboard);
    }
  }, []);

  const msgs = {
    good: "weldone! you made it into the leaderboard",
    bad: "well played, unfortunately you didnt make it into the leaderboard",
    default: "We only store the last 50 game entries. Can you find yours??"
  }

  return (
    <article>
      <PageHeader 
        title="Leaderboard" 
        msg={lastGameStats == null ? msgs.default : lastGameStats.inLeaderboard ? msgs.good : msgs.bad }
      />
      <LeaderboardTable lastGameStats={lastGameStats} />
      {
        lastGameStats?.inLeaderboard ? <span></span> : (
          <table className="looser-table">
            <tbody>
              <tr>
                <td>{lastGameStats?.playerStats.name}</td>
                <td>{lastGameStats?.playerStats.moves}</td>
                <td>{lastGameStats?.playerStats.time}</td>
              </tr>
            </tbody>
          </table>
        )
      }
    </article>
  )
}