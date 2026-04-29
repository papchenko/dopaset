import { useState } from "react";
import ContactModal from "./ContactModal";

import heroImg from '../../assets/logo.svg'
// import authorImg from '../../assets/author.svg'
import authorImg from '../../assets/author.jpg'

const features = [
  {
    title: "Dopaset 0.1",
        text:  {
        t1: 'Required and recommended tasks to achieve the result.',
        t2: 'Dopamine trigger monitoring.',
        t3: 'Progress tracking and results reports.',
  },
    img: heroImg
  },
  // {
  //   title: "Dopaset Challenge 1.0",
  //       text:  {
  //       t1: 'Time-based challenges with clear goals',
  //       t2: 'Progressive levels with increasing difficulty',
  //       t3: 'Progress tracking and completion milestones',
  // },
  //   img: heroImg
  // }
];

const testimonials = [
  {
    text: "Creating this platform is really necessary, we waste a lot of time just on empty things.",
    // name: "Mykola Papchenko",
    name: "Mykola",
    role: "Front-end developer and creator of the Dopaset.",
    img: authorImg
  }
];

export default function About() {
    const [open, setOpen] = useState(false);

  return (
    <main className="bg-[#0B0F19] text-white">

      {/* HERO */}
      <section className="py-16 md:py-20 text-center bg-gradient-to-b from-[#0B0F19] to-[#111827]">
      </section>

      {/* FEATURES */}
      <section className="pb-24 pt-0 bg-[#0F172A]">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl font-bold">Our developments</h2>
          <p className="text-gray-400 mt-3">
            Services we offer you.
          </p>
        </div>

        {/* <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8"> */}
        <div className="max-w-2xl mx-auto px-6 grid md:grid-cols-1 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#111827] border border-white/10"
            >
              <div className="w-16 h-16 mb-5 rounded-lg bg-white/10 flex items-center justify-center">
                <img src={f.img} alt="" className="w-10" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.text.t1}</p>
              <p className="text-gray-400 text-sm">{f.text.t2}</p>
              <p className="text-gray-400 text-sm">{f.text.t3}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUPPORT */}
      <section className="py-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">
           Versions
          </h2>
          <p className="text-gray-400">
            Stable version 1.1 | Release 10.001
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 bg-[#111827] rounded-xl border border-white/10">
            1.1 Release project.
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Our Team
            </h2>
            <p className="text-gray-400">
              Those who work on the project
            </p>
          </div>

          <div className="space-y-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 bg-[#111827] rounded-2xl border border-white/10"
              >
                <p className="text-gray-300 mb-4">{t.text}</p>
                <div className="flex items-center gap-4">
                    <img src={t.img} alt="" className="w-12 h-12 rounded-full object-cover" />
                    <div className="font-semibold pb-2">{t.name}
                    <div className="text-gray-500 text-sm pt-2">{t.role}</div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-gradient-to-t from-[#0B0F19] to-[#111827]">
        <h2 className="text-3xl font-bold mb-4">Need any help?</h2>
        <p className="text-gray-400 mb-6">
          Contact us with our team.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 bg-white text-black rounded-xl hover:scale-105 transition"
          >
            Contact Us
          </button>
        </div>
      </section>

      {open && <ContactModal onClose={() => setOpen(false)} />}
    </main>
  );
}