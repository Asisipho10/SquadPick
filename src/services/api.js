export const fetchPlayers = async () => {
  try {
    const response = await fetch('https://api.example.com/players');
    const data = await response.json();
    return data.players;
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

