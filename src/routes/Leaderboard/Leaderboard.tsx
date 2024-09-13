import { useLeaderboard } from "../App/App";
import { useLocation } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader"
import LeaderboardTable from "../../components/LeaderboardTable/LeaderboardTable";
import { useEffect } from "react";
import { LeaderboardType } from "../../custom-types/types";
// npm packages
import ShortUniqueId from 'short-unique-id';


export default function Leaderboard(): JSX.Element {
  // TODO 1: Need to load up the leaderboard as it is.
  const leaderboard = useLeaderboard();
  const location = useLocation();

  // TODO: the project says that it is TS compatible but TS is type throwing errors
  const uuid: any = new ShortUniqueId();

  console.log("LEADERBOARD/: ", leaderboard)

  
  // TODO 2: Check if we have a incoming results
  if (location.state) {
    // extra only properties we need
    const { time, moves } = location.state;
    // calculate current player score
    const latestScore = Number(time.substring(0,2) + time.substring(3)) + Number(moves);
    // calculate scores for current leaderboard
    
    // lets add the new score and also trim the list to a max of 12
    let updatedLeaderboard: LeaderboardType[] = [];
    // search switch
    let addingLatestScore = true;
    let position = 0;
    leaderboard.forEach(player => {
      let score = Number(player.time.substring(0,2) + player.time.substring(3)) + Number(player.moves);
      // here we separate the loosers from the winners
      if (addingLatestScore && score >= latestScore) {
        updatedLeaderboard.push({
          ...location.state,
          id: uuid.rnd(),
          position: position + 1,
        });
        addingLatestScore = false;
      }
      updatedLeaderboard.push({
        ...player,
        position: position + 1,
      });
    });
    console.log(`LATEST SCORE: ${latestScore}`);
    console.log("UPDATED SCORES: ", updatedLeaderboard)
  }
  // 2. Add results to current leaderboard..
  //    2.1 if was not enough to be in leaderboard place at the very end.. style to show out of bounds
  //    2.2 if good, add to leaderboard but highlight the result so it stands out, making it easily visible
  //    2.2.1 in the background send an update to DATABASE with updated leaderboard
  useEffect(() => {
    console.log("USE EFFECT IN ACTION?")
    // TODO: IN HERE WE CHECK location for any state pass in and update the leaderboard accodingly
    // This will be the quick implementation for local storage.
    // I need to see how i can implement MondoDB with this
  }, []);

  return (
    <article>
      <PageHeader 
        title="Leaderboard" 
        msg="Your place is based on the number of moves and time taken to complete."
      />
      <LeaderboardTable />
    </article>
  )
}