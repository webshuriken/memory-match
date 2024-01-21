import Button from "../../components/Button/Button";


export default function Play():JSX.Element {
  return (
    <div>
      <p data-testid="welcomeMsg">Are you ready to test your memory?</p>
      <Button value="Play" />
    </div>
  );
}
