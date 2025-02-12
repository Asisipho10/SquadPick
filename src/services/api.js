const API_KEY = import.meta.env.VITE_API_KEY; // Load API key from .env
const API_URL = "https://api.football-data.org/v4/players/";

export const fetchPlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}${playerId}`, {
      headers: { 'X-Auth-Token': API_KEY },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch player data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching player:", error);
  }
}; 
