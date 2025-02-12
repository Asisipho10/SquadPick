import "../styles/PlayerCard.css";

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <h3>{player?.name || "Unknown Player"}</h3>
      <p>{player?.position || player?.role || "Position Not Available"}</p>
      <p>Club: {player?.club || player?.team?.name || "Unknown Club"}</p>
    </div>
  );
};

export default PlayerCard;
