import styled from "styled-components";

export const Section = styled.section`
  flex: 1 1 auto;
  display: grid;
  padding: 2%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
 
`
export const Selection = styled.section`
display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  select,  input {
    padding: 5px;
    margin:5px
    border: none;
    border-radius: 5px;
    font-size: 16px;
    color: blue;
  }
`

export const Button = styled.button`

  padding: 0.5rem 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: #84CC16;
  color: #fff;
  width:200px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem
  display: flex;
  align-items: center;
  justify-content: center
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: yellow;
  }

  &:focus {
    outline: none;
  };
`;
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center; 
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap; 
  margin: 0 auto;
  padding:3%
`;
export const Image = styled.img`
  border-radius: 25px;
  text-align: center;
  height: 200px;
  box-shadow: 0px 0px 10px rgba(0.9, 0.9, 0.9, 0.9);
  width: 200px;
  `

  export const PopupContainer = styled.div<{ show: boolean, popupOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  body {
    overflow: ${({ popupOpen }) => (popupOpen ? 'hidden' : 'auto')};
  }
  justify-content: center;
  align-items: center;
`;

export const PopupContent = styled.div`
  position: relative;
  background-color: white;
  width: 400px;
  padding: 24px;
  border-radius: 10px;
  overflow: hidden;
  color:#7209B7;
  box-shadow: 0px 0px 10px rgba(0.9, 0.9, 0.9, 0.9);
`;

export const PopupCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #84CC16;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-left: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0.9, 0.1);
  overflow: hidden;
  &:hover {
    background-color: yellow;
  }
  &:focus {
    outline: none;
  }
`;

export const Header = styled.header`
  background-color: #0A1931;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: left;
  color: white;
  padding: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 1;
`
export const Title = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

export const Subtitle = styled.span`
  font-size: 1rem;
  color: white;
`;