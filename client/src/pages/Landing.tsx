import React from "react";
import Hero from "./components/hero.tsx"; // Предполагается, что Hero - это React-компонент
import Header from "./components/ui/header.tsx"; // Предполагается, что Header - это React-компонент

const Landing = () => {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
};

export default Landing;
