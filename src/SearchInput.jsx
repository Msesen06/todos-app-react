import { FaSearch } from "react-icons/fa";
import "./SearchInput.css";

function SearchInput({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Görev ara..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
