import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Student",
    feedback:
      "This platform has completely changed the way I study. The sessions are interactive and very well structured!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "Developer",
    feedback:
      "I was able to book study sessions easily and the tutors are amazing. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Amina Khan",
    role: "Designer",
    feedback:
      "The study materials and resources are very helpful. I love the smooth booking process.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 3,
    name: "Aria Tasan",
    role: "Python Developer",
    feedback:
      "BrainBuddy was truly a game-changer and a great guide for me as we brought Dimensional to life.",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3">
        <h2 className="text-3xl font-bold text-center mb-12">
          See what others are achieving through learning
        </h2>

        <div className="grid gap-8 md:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white shadow-lg rounded-2xl p-7 flex flex-col text-left"
            >
              <div className="flex items-start mb-4">
                <FaQuoteLeft size={40} className="text-gray-300 mr-4 flex-shrink-0" />
                <p className="text-gray-600">{t.feedback}</p>
              </div>

              <div className="flex items-center mt-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{t.name}</h3>
                  <span className="text-sm text-gray-500">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
