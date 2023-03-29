import { useEffect, useState } from "react";
import SplashScreen from "./Components/SplashScreen";
import Layout from "./Layout";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="app">{showSplash ? <SplashScreen /> : <Layout />}</div>
  );
}

export default App;
