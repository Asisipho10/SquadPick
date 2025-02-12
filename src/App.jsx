import React, { useState, useEffect } from 'react';
import PlayerCard from './components/PlayerCard';
import SearchFilter from './components/SearchFilter';
import SocialShare from './components/SocialShare';
import { fetchPlayers } from './services/api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const updatedPlayers = [...players];
    const [removed] = updatedPlayers.splice(source.index, 1);
    updatedPlayers.splice(destination.index, 0, removed);
    setPlayers(updatedPlayers);
  };

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

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="players" direction="horizontal">
          {(provided) => (
            <div
              className="players-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredPlayers.map((player, index) => (
                <Draggable key={player.id} draggableId={player.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      className="player-card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PlayerCard player={player} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <SocialShare />
    </div>
  );
};

export default App;

