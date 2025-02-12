
export const fetchPlayers = async () => {
  try {
    const response = await fetch('https://api.example.com/players');
    const data = await response.json();
    return data.players; // Assuming the API returns an array of player objects
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

