import React from "react";

const BackgroundWallpaper = ({ children, isDark }) => {
  const baseColor = isDark ? "rgb(24, 24, 27)" : "rgb(243, 244, 246)";
  const gridColor = isDark ? "rgb(39, 39, 42)" : "rgb(229, 231, 235)";

  return (
    <div
      className={`relative min-h-screen ${
        isDark ? "bg-zinc-900" : "bg-gray-100"
      }`}
      style={{
        backgroundImage: `
             linear-gradient(to right, ${gridColor} 1px, transparent 1px),
             linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
           `,
        backgroundSize: "40px 40px",
        backgroundPosition: "0 0",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundWallpaper;
