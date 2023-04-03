import { useEffect, useState } from 'react';
import AppWrapper from './components/App'
import { Character } from './graphql/types';
import AttributeDropDown from './components/UniqueAttributes';
import CharacterCard from './components/CharacterCard';
import { CharacterAttribute, fetchAllCharacters, FilterOptions } from './graphql/data';
import { Button, Header, Section, Selection, Title } from './components/styles';

const App = () => {
  const [filter, setFilter] = useState<FilterOptions>({});
  const [isFiltered, setIsFiltered] = useState(false)
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>([]);
  const [numToDisplay, setNumToDisplay] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');

const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value);
};
useEffect(() => {
  setNumToDisplay(50);
}, [searchTerm]);

useEffect(() => {
    const fetchData = async () => {
      const fetchedCharacters = await fetchAllCharacters(1, filter, []);
      setCharacters(fetchedCharacters);
    };

    fetchData();
}, [filter]);

useEffect(() => {
    if (characters) {
      const filteredCharacters = filterCharacters(characters, filter, searchTerm);
      const charactersToDisplay = isFiltered ? filteredCharacters : characters;
      setDisplayedCharacters(charactersToDisplay.slice(0, numToDisplay));
    }
  }, [characters, filter, isFiltered, numToDisplay, searchTerm]);

const filterCharacters = (characters: Character[], filter: FilterOptions, searchTerm: string) =>
    characters.filter((character) =>
      (filter.species ? character?.species === filter.species : true) &&
      (filter.status ? character?.status === filter.status : true) &&
      (filter.gender ? character?.gender === filter.gender : true) &&
      (searchTerm ? character?.name?.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
  if (!characters) return null

  const loadMore = () => {
    setNumToDisplay(numToDisplay + 20);
  };

  const handleSpeciesFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecies = event.target.value;
    setFilter({ ...filter, species: selectedSpecies });
    setIsFiltered(true)
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;
    setFilter({ ...filter, status: selectedStatus });
    setIsFiltered(true);
  };

  const handleGenderFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGender = event.target.value;
    setFilter({ ...filter, gender: selectedGender });
    setIsFiltered(true);
  };

 const dataObject = isFiltered || searchTerm
    ? filterCharacters(characters as Character[], filter, searchTerm)
    : characters as Character[];

const noCharacters = `Sorry there are no characters 
  ${filter.species ? 'of the ' + filter.species + ' Species,' : ''} 
  ${filter.gender ? ' whose gender is ' + filter.gender : ''} 
  ${filter.status? ' whose status is ' + filter.status : ''}   
  ${searchTerm ? ' that  have a name that contains these letters: ' + searchTerm : ''}. Try searching again using a different filter or criteria.`

  return (
    <AppWrapper>
      <Header>
        <Title> Rick and Morty </Title>
          <AttributeDropDown attribute={CharacterAttribute.Species} value={filter.species} onChange={handleSpeciesFilterChange}/>
          <AttributeDropDown attribute={CharacterAttribute.Gender} value={filter.gender} onChange={handleGenderFilterChange}/>
         <AttributeDropDown attribute={CharacterAttribute.Status} value={filter.status} onChange={handleStatusFilterChange}/>
         <Selection>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
        </Selection>
       
      </Header>
      <Section>
            {!displayedCharacters.length ? <h1 style={{color:'yellow', display: 'flex', alignItems: 'center',fontSize: '50px', justifyContent: 'center', textAlign:'center', margin: '1rem',}}> { noCharacters } </h1>:(displayedCharacters?.map((character) => (
                <CharacterCard character={character as Character} /> 
            )))}
      </Section>

      <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem'}}>
      {numToDisplay < dataObject?.length && (
        <Button onClick={loadMore}>
          Load More
        </Button>
      )}
      </div>
      
    </AppWrapper>
  );
}
export default App;

