import React from 'react'
import styled from 'styled-components'
import { Character } from '../graphql/types'

type CharacterCardProps = {
    character: Character
}


const Wrapper = styled.div`
    display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  margin: 0.5rem;
  background-color: white;
  border: solid grey 1px;
  width: 200px;
  height: 200px;
`

const Image = styled.img`
 height: 150px;
  width: 150px;
`

const CharacterCard = ({ character }: CharacterCardProps) => {
    return <Wrapper>
        <Image src={character.image || ''} alt="icon" className="avatar" />
        {character.name}
    </Wrapper>
}

export default CharacterCard