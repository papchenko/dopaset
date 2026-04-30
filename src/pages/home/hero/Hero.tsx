import React, { useState } from "react";
import heroImg from "../../../assets/logo.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

import "swiper/css";

const slides = [
  {
    title: "Focus starts with control.",
    subtitle: "Dopaset",
    text: "A next-generation platform built to help you break free from digital overstimulation. Track your habits, control your dopamine triggers, and eliminate distractions — so you can focus, think clearly, and perform at your best.",
    img: heroImg,
    btn: "Get Started"
  },
  {
    title: "Upgrade discipline.",
    subtitle: "Dopaset Premium",
    text: "Premium access to the most powerful features of Dopaset. Build strict routines, track real progress, and use AI to optimize your daily behavior. Less distraction. More execution. Real results.",
    img: heroImg,
    btn: "Get Premium"
  },
];

const Home: React.FC = () => {
  const [domain, setDomain] = useState("");
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleClick = (index: number) => {
  if (loading) return;

  if (!user) {
    toast.info("Please log in to start.");
    return;
  }

  if (index === 0) {
    navigate("/dopaset");
  } else if (index === 1) {
    navigate("/premium");
  }
};

  return (
    <main className="pt-[80px]">
      <section className="relative overflow-hidden text-white bg-[#070A12] min-h-[calc(100vh-140px)] md:min-h-[calc(100vh-80px)] flex items-center">
          <div className="absolute top-[-160px] md:top-[-260px] left-[-150px] w-[650px] md:w-[1500px] h-[500px] bg-[#586ba4]/50 blur-[140px] md:blur-[440px] rounded-full animate-pulse [animation-duration:5s]" />
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 15000 }}
              loop
              onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
              className="relative z-10"
            >
              {slides.map((slide, i) => (
                <SwiperSlide key={i}>
                  <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                      <span className="text-white tracking-widest">
                        {slide.subtitle}
                      </span>
                      <h1 className="text-5xl lg:text-8xl font-bold leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-gray-300 lg:text-xl">
                        {slide.text}
                      </p>
                      <button
                        onClick={() => handleClick(i)}
                        className="px-6 py-3 bg-[#586ba4] rounded-xl"
                      >
                        {slide.btn}
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute z-20 left-1/2 -translate-x-1/2 top-6 lg:top-auto lg:bottom-6 lg:left-auto lg:right-10">
              <div className="w-[200px] h-[7px] bg-white/10 rounded-full overflow-hidden backdrop-blur">
                <div
                  key={current}
                  className="h-full rounded-full animate-progress"
                  style={{
                    background: "linear-gradient(90deg, #586ba4, #888282)",
                    boxShadow: "0 0 16px rgba(168, 85, 247, 0.6)",
                  }}
                />
              </div>
            </div>
      </section>
    </main>
  );
};

export default Home;