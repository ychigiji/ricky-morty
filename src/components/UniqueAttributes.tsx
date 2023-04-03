import { useEffect, useState } from "react";
import { CharacterAttribute, uniqueAttributes } from "../graphql/data";
import { Selection } from "./styles";


interface FilterProps {
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    attribute: CharacterAttribute ;
  }

const AttributeDropDown = ({ value, onChange, attribute }: FilterProps) => {
  
const [options, setOptions] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const uniqueValues = await uniqueAttributes(attribute, 1);
      setOptions(uniqueValues);
    };
    fetchData();
  }, [attribute]);
      return <Selection>
          <label htmlFor="attribute-filter">{`Filter by ${CharacterAttribute[attribute]}:`}</label>
          <select id="attribute-filter" value={value || ''} onChange={onChange}>
            <option value="">Select an option </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Selection>;
}
export default AttributeDropDown;

