import axios from "axios";

// Placeholder API client for NASA's public APIs (APOD, Mars Rover Photos,
// NEO, EPIC, etc). No live backend is wired up — swap BASE_URL / API_KEY
// with real values and these calls will work as-is.
const BASE_URL = "https://api.nasa.gov";
const API_KEY = "DEMO_KEY";

const nasaClient = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

export const getAstronomyPictureOfDay = () => nasaClient.get("/planetary/apod");

export const getMarsRoverPhotos = ({ rover = "curiosity", camera, sol = 1000 } = {}) =>
  nasaClient.get(`/mars-photos/api/v1/rovers/${rover}/photos`, {
    params: { sol, camera },
  });

export const getNearEarthAsteroids = ({ startDate, endDate } = {}) =>
  nasaClient.get("/neo/rest/v1/feed", {
    params: { start_date: startDate, end_date: endDate },
  });

export const getEarthImagery = ({ date } = {}) =>
  nasaClient.get("/EPIC/api/natural/date", { params: { date } });

export default nasaClient;
