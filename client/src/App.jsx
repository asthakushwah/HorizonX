import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import SolarSystem from "./pages/SolarSystem";
import MarsRover from "./pages/MarsRover";
import EarthPage from "./pages/EarthPage";
import Asteroids from "./pages/Asteroids";
import Timeline from "./pages/Timeline";
import Missions from "./pages/Missions";
import MissionDetail from "./pages/MissionDetail";
import Constellation from "./pages/Constellation";
import AIAssistant from "./pages/AIAssistant";
import Collections from "./pages/Collections";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/solar-system" element={<SolarSystem />} />
        <Route path="/mars-rover" element={<MarsRover />} />
        <Route path="/earth" element={<EarthPage />} />
        <Route path="/asteroids" element={<Asteroids />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/missions/:id" element={<MissionDetail />} />
        <Route path="/constellation" element={<Constellation />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/collections" element={<Collections />} />
      
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<AuthLayout />}>
       <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
    
      </Route>
    </Routes>
  );
}
