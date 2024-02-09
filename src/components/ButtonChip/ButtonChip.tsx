import { Link } from "react-router-dom";


// what handle click does will depend on the component that summons it
interface Props {
  handleClick: () => void;
  url?: string;
  value: string;
}

export default function ButtonChip({
  handleClick,
  url = '',
  value = 'Button'
}: Props): JSX.Element {
  // Check to see if space or enter were pressed.
  function handleBtnKeyDown(e: React.KeyboardEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLButtonElement>) {
    // "Spacebar" for IE11 support
    if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
      // Prevent the default action to stop scrolling when space is pressed
      e.preventDefault();
      handleClick();
    }
  }

  return (
    <>
      {value === 'Button' || value.toLowerCase() === 'reset'
      ?
        <button onClick={handleClick}>{value}</button>
      :
        <button onClick={handleClick} onKeyDown={handleBtnKeyDown}>
          <Link to={url}>{value}</Link>
        </button>}
    </>
  );
}
