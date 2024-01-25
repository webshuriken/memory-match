import GameDash from "../../components/GameDash/GameDash";
import GameCards from "../../components/GameCards/GameCards";


export default function Play():JSX.Element {
  return (
    <div>
      <aside role="complementary">
        <GameDash />
      </aside>
      <article>
        <GameCards />
      </article>
    </div>
  );
}
