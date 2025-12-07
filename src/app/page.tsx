"use client";

import { useEffect, useState } from "react";
import { CssRush } from "./components/CssRush";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  // Initialize
  useEffect(() => {
    const interval = setInterval(() => {
      setIsClient(true);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <main>
      <CssRush />
    </main>
  );
}
