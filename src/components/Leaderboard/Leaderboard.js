import React from "react";
import Button from "../Button/Button";


function Leaderboard() {
  return (
    <section>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Moves</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Moomin</td>
            <td>8</td>
            <td>2:30</td>
          </tr>
        </tbody>
      </table>
      <Button />
    </section>
  )
}

export default Leaderboard;