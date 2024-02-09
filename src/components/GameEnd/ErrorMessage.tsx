type Props = {
  isTooShort: boolean;
  isProfanity: boolean;
}

export default function ErrorMessage({ isProfanity, isTooShort }: Props): JSX.Element {
  // Prep error messages
  const shortError:string = 'minimum of 4 characters';
  const profanityError:string = 'please, no profanity';

  return (
    <>
      {
        isProfanity && isTooShort
        ?
          (<>
            <p>{shortError}</p>
            <p>{profanityError}</p>
          </>)
        :
          isProfanity
          ?
            <p>{profanityError}</p>
          :
            isTooShort
            ?
              <p>{shortError}</p>
            :
              <></>
      }
    </>
  )
}