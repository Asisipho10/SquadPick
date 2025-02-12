import React, { useState, useEffect } from 'react';
import PlayerCard from './components/PlayerCard';
import SearchFilter from './components/SearchFilter';
import SocialShare from './components/SocialShare';
import TeamBuilder from './components/TeamBuilder';
import { fetchPlayers } from './services/api';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

  useEffect(() => {
    fetchPlayers()
      .then(data => setPlayers(data))
      .catch(err => console.error('Error fetching players:', err));
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handlePositionFilterChange = (e) => setPositionFilter(e.target.value);

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (positionFilter ? player.position === positionFilter : true)
  );

  return (
    <div className="app">
      <h1>Fantasy Soccer Team Builder</h1>
      <SearchFilter
        searchTerm={searchTerm}
        positionFilter={positionFilter}
        onSearchChange={handleSearchChange}
        onPositionFilterChange={handlePositionFilterChange}
      />
      <TeamBuilder players={filteredPlayers} setPlayers={setPlayers} />
      <SocialShare />
    </div>
  );
};

export default App;
