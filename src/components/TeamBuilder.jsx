import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PlayerCard from "../components/PlayerCard";
import "../styles/TeamBuilder.css";

const MAX_TEAM_SIZE = 11;

const TeamBuilder = ({ players }) => {
  const [team, setTeam] = useState([]);
  const [availablePlayers, setAvailablePlayers] = useState(players);

  useEffect(() => {
    setAvailablePlayers(players);
  }, [players]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Move player from available to team
    if (source.droppableId === "availablePlayers" && destination.droppableId === "team") {
      if (team.length >= MAX_TEAM_SIZE) return;

      const newPlayer = availablePlayers[source.index];
      setTeam((prevTeam) => [...prevTeam, newPlayer]);
      setAvailablePlayers((prevAvailablePlayers) =>
        prevAvailablePlayers.filter((_, idx) => idx !== source.index)
      );
    } 
    
    // Move player from team back to available
    else if (source.droppableId === "team" && destination.droppableId === "availablePlayers") {
      const returningPlayer = team[source.index];
      setAvailablePlayers((prevAvailablePlayers) => [...prevAvailablePlayers, returningPlayer]);
      setTeam((prevTeam) => prevTeam.filter((_, idx) => idx !== source.index));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="team-builder">
        {/* Available Players */}
        <Droppable droppableId="availablePlayers">
          {(provided) => (
            <div className="players-list" ref={provided.innerRef} {...provided.droppableProps}>
              <h3>Available Players</h3>
              {availablePlayers.map((player, index) => (
                <Draggable key={player.id} draggableId={player.id.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <PlayerCard player={player} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Team Section */}
        <Droppable droppableId="team">
          {(provided) => (
            <div className="team-list" ref={provided.innerRef} {...provided.droppableProps}>
              <h3>Your Team ({team.length}/{MAX_TEAM_SIZE})</h3>
              {team.map((player, index) => (
                <Draggable key={player.id} draggableId={player.id.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <PlayerCard player={player} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {team.length >= MAX_TEAM_SIZE && <p className="team-full">Team is full</p>}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TeamBuilder;
