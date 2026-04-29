import React, { useEffect, useState } from "react";
import loaderImg from "../../assets/logo.svg";

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Функція зникає після повного завантаження всіх ресурсів
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      // якщо сторінка вже завантажена
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center transition-opacity duration-500">
      <div className="relative flex items-center justify-center">
        {/* Крутяче коло */}
        {/* <div className="w-20 h-20 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div> */}

        {/* Лого поверх */}
        <div className="absolute">
          <img src={loaderImg} alt="Loading..." className="w-16 h-16" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;