import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// ✅ JSON structured data (title + multiple images optional)
const pages = [
  {
    id: 1,
    title: "مرحبًا",
    body: "مرحبًا بك في قصتي... هذه بداية شيء جميل ✨",
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300",
    ],
  },
  {
    id: 2,
    title: "رسالة",
    body: "هذه رسالة كتبتها لك من القلب 💌",
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300",
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=300",
    ],
  },
  {
    id: 3,
    body: "كل صفحة تحمل شعورًا خاصًا... فقط استمر في القراءة 🌙",
  },
  {
    id: 4,
    title: "أمنية",
    body: "أتمنى أن تجلب لك هذه اللحظات السعادة ❤️",
    images: [
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300",
    ],
  },
  {
    id: 5,
    body: "النهاية... لكن القصة مستمرة دائمًا ✨",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300",
    ],
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));
  const [giftOpened, setGiftOpened] = useState(false);
  const audioRef = useRef(null);

  const markVisited = (i) => {
    setVisited((prev) => new Set(prev).add(i));
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const nextPage = () => {
    if (index < pages.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      markVisited(newIndex);
      playSound();
    }
  };

  const prevPage = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      markVisited(newIndex);
      playSound();
    }
  };

  const allVisited = visited.size === pages.length;
  const current = pages[index];

  return (
    <div className="font-sans">
      {/* Sound */}
      <audio ref={audioRef} src="/page-flip.mp3" preload="auto" />

      {/* Intro */}
      <section className="min-h-screen flex items-center justify-center bg-rose-50 text-center">
        <h1 className="text-3xl font-bold">مرر للأسفل لاكتشاف القصة ↓</h1>
      </section>

      {/* Book Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rose-100 to-pink-200">

        {/* Book */}
        <div className="relative w-[340px] h-[460px] perspective">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full h-full bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-right leading-loose"
              dir="rtl"
              style={{
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.35), inset 0 0 50px rgba(0,0,0,0.12)",
              }}
            >
              {current.title && (
                <h2 className="text-xl font-bold mb-4 text-center">{current.title}</h2>
              )}

              {current.images && (
                <div className="flex gap-2 mb-4 flex-wrap justify-center">
                  {current.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="page"
                      className="w-20 h-20 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}

              <p className="text-lg text-center">{current.body}</p>

              {/* Footer Page Number inside page */}
              <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-gray-500">
                {index + 1} / {pages.length}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls + Counter */}
        <div className="flex items-center gap-6 mt-6">
          <button
            onClick={prevPage}
            disabled={index === 0}
            className="bg-white p-3 rounded-xl shadow-lg hover:scale-105 transition disabled:opacity-40"
          >
            <FiChevronLeft size={20} />
          </button>

          <span className="text-sm font-medium">
            صفحة {index + 1} / {pages.length}
          </span>

          <button
            onClick={nextPage}
            disabled={index === pages.length - 1}
            className="bg-white p-3 rounded-xl shadow-lg hover:scale-105 transition disabled:opacity-40"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Gift Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-rose-300">
        {!allVisited ? (
          <p className="text-lg">📖 أكمل قراءة جميع الصفحات لفتح الهدية</p>
        ) : (
          <div className="flex flex-col items-center">
            <motion.button
              onClick={() => setGiftOpened(true)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="text-6xl drop-shadow-xl"
            >
              🎁
            </motion.button>

            {giftOpened && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-10 text-6xl animate-bounce"
              >
                🎉💖✨
              </motion.div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
