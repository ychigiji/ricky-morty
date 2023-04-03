import { client } from '.';
import { CHARACTERS_QUERY } from './schemas';
import { Character} from './types';

export interface FilterOptions {
    name?: string;
    species?: string;
    status?: string;
    gender?: string;
  }

  export enum CharacterAttribute {
    Gender,
    Species,
    Status,
  }
  
  //Function to get the characters from the endpoint
  export async function fetchAllCharacters(page:number|null, filter:FilterOptions | undefined, allCharacters: Character[]|[]): Promise<Character[]> {
   
    try {
      const { data } = await client.query({
        query: CHARACTERS_QUERY,
        variables: { page, filter },
      });
      const newCharacters = data.characters.results;
      const combinedCharacters: Character [] | null = [...allCharacters, ...newCharacters];
  
      if (data.characters.info.next) {
        return fetchAllCharacters(data.characters.info.next, filter, combinedCharacters);
      } else {
        return combinedCharacters;
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
      return []
    }
  }

  export const uniqueAttributes = async (
    attribute: CharacterAttribute,
    page: number
  ): Promise<string[]> => {
    const filter: FilterOptions = {}; // Define an empty filter object to fetch all characters
  
    const allCharacters = await fetchAllCharacters(page, filter, []);
  
    let attributeName: keyof Character;
  
    switch (attribute) {
      case CharacterAttribute.Gender:
        attributeName = 'gender';
        break;
      case CharacterAttribute.Species:
        attributeName = 'species';
        break;
        case CharacterAttribute.Status:
          attributeName = 'status';
          break;
      default:
        throw new Error('Invalid attribute');
    }
  
    const uniqueAttributes = allCharacters
      .map((character) => character[attributeName])
      .filter((attr): attr is string => !!attr) // Filter out null and undefined values
      .filter((attr, index, self) => self.indexOf(attr) === index);
  
    console.log(`List of unique ${attributeName}s:`, uniqueAttributes);
    return uniqueAttributes;
  };

  
  
  