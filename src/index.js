export const fetchPlayers = async () => {
  try {
    const response = await fetch('https://api.example.com/players'); // Use URL from .env for flexibility

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Ensure data has the expected structure
    return data.players || []; // Assuming the API returns an object with a 'players' array

  } catch (error) {
    console.error('Error fetching players:', error);
    return []; // Return an empty array in case of error
  }
};
