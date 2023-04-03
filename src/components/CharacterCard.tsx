import { useEffect, useRef, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { Character } from '../graphql/types'
import { CardContainer, Button, PopupContent, PopupCloseButton, PopupContainer, Image } from './styles';

  const GlobalStyle = createGlobalStyle`
  body.popup-open {
    overflow: hidden;
  }
`;

const CharacterCard = ({ character }: {
    character: Character | null
}) => {

    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
      if (isPopupOpen) {
        document.body.classList.add('popup-open');
      } else {
        document.body.classList.remove('popup-open');
      }
    }, [isPopupOpen]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
        setIsPopupOpen(!isPopupOpen)
      };

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setShowPopup(false);
            setIsPopupOpen(true)
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [popupRef]);

      if (character == null) {
        return <div>Loading...</div>;
      }

    return (<>
    <CardContainer>
        <Image src={character.image || ''} alt="icon" className="avatar" />
        <h2 style={{color:'white'}}>{ character.name }</h2>
        <Button onClick={togglePopup} > Description </Button>    
    </CardContainer> 
    {showPopup && (<>
      <GlobalStyle />
        <PopupContainer show={showPopup} popupOpen={isPopupOpen}>
          <PopupContent ref={popupRef}>
            <Image src={character.image || ""} alt="icon" />
            <PopupCloseButton style={{margin:'5px', color:'purple'}} onClick={togglePopup}><h2>Close</h2></PopupCloseButton>
            <h2>{character.name}</h2>
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
            <p>Gender: {character.gender}</p>
            <p>Last known location: {character.location?.name}</p>
            <p> Origin: {character.origin?.name}</p>
          </PopupContent>
        </PopupContainer>
    </>
      )}
    </>)   
}   
export default CharacterCard

