import { IoIosSearch } from "react-icons/io";
import './styles.css'

interface SearchInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

  const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
    return(
        <div className='text-container'>
        <input placeholder='Pesquisar' className='input' type='text' value={value}
        onChange={onChange}></input>
        <span className='icon'><IoIosSearch /></span>
        </div>
    )
}

export default SearchInput;