import "../styles/SearchFilter.css";

const SearchFilter = ({ searchTerm, positionFilter, onSearchChange, onPositionFilterChange }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={onSearchChange}
      />
      <select onChange={onPositionFilterChange} value={positionFilter}>
        <option value="">All Positions</option>
        <option value="Forward">Forward</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Defender">Defender</option>
        <option value="Goalkeeper">Goalkeeper</option>
      </select>
    </div>
  );
};

export default SearchFilter;

