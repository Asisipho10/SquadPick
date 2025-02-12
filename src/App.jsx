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
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    fetchPlayers()
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching players:', err);
        setError('Failed to load players.');
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handlePositionFilterChange = (e) => setPositionFilter(e.target.value);

  const filteredPlayers = players.filter(player => {
    const matchesName = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter ? player.position === positionFilter : true;
    return matchesName && matchesPosition;
  });

  if (loading) {
    return <div>Loading players...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <div className="app">
      <h1>Fantasy Soccer Team Builder</h1>
      <SearchFilter
        searchTerm={searchTerm}
        positionFilter={positionFilter}
        onSearchChange={handleSearchChange}
        onPositionFilterChange={handlePositionFilterChange}
      />
      <TeamBuilder players={filteredPlayers} />
      <SocialShare />
    </div>
  );
};

export default App;
