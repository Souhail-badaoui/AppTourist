import { useState, useEffect } from 'react';
import SplashScreen from "../components/SplashScreen";
import MapScreen from "../components/MapScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <SplashScreen /> : <MapScreen />;
}