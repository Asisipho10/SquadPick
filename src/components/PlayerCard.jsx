const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <h3>{player.name}</h3>
      <p>{player.position}</p>
      <p>Club: {player.club}</p>
    </div>
  );
};

export default PlayerCard;

