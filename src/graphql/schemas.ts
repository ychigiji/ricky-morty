import { gql } from "@apollo/client";

export const CHARACTERS_QUERY = gql`
    query Characters ($page:Int, $filter: FilterCharacter){
       characters(page: $page, filter: $filter) {
          info {
            pages
            next
            prev
          }
          results{
            id
            name
            image
            species
            status
            gender
            origin {
                name
                type
            }
            location {
                name 
                type
            }
            episode {
                name
                air_date
            }
          }
        }
    }
`;
