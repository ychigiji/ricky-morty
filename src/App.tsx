import React from 'react';

import AppWrapper from './components/App'
import Header from './components/Header'
import Section from './components/Section';
import Footer from './components/Footer';
import CharacterCard from './components/CharacterCard';
import { useCharacterQuery } from './graphql/types';

const App = () => {

  // 3) REPLACE THIS HOOK WITH A `useCharactersQuery` HOOK

  const { data } = useCharacterQuery({variables: {
    id: "1"
  }})

  if (!data || !data.character) return null

  return (
    <AppWrapper>
      <Header>
        <span>Rick and Morty Character Card Info</span>
      </Header>
      <Section>
        {/* 4) ITERATE THROUGH THE NEW CHARACTERS DATA AND DISPLAY CARDS FOR EACH CHARACTER */}
        <CharacterCard character={data.character} />
      </Section>
      <Footer />
    </AppWrapper>
  );
}

export default App;
