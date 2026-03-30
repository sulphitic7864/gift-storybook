import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import HTMLFlipBook from "react-pageflip";

const pages = [
  { id: 1, title: "مرحبًا", body: "مرحبًا بك في قصتي..." },
  { id: 2, title: "رسالة", body: "هذه رسالة كتبتها لك من القلب.", images: ["https://via.placeholder.com/120"] },
  { id: 3, body: "كل صفحة تحمل شعورًا خاصًا..." },
  { id: 4, title: "أمنية", body: "أتمنى أن تجلب لك السعادة ❤️", images: ["https://via.placeholder.com/120","https://via.placeholder.com/120"] },
  { id: 5, body: "النهاية... لكن القصة مستمرة ✨" }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));
  const [giftOpened, setGiftOpened] = useState(false);

  const audioRef = useRef(null);
  const bookRef = useRef();

  const markVisited = (i) => {
    setVisited((prev) => {
      const newSet = new Set(prev);
      newSet.add(i);
      return newSet;
    });
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const nextPage = () => {
    bookRef.current.pageFlip().flipNext();
  };

  const prevPage = () => {
    bookRef.current.pageFlip().flipPrev();
  };

  // ✅ FIX: react-pageflip uses spreads (2 pages at once)
  const allVisited = visited.size >= pages.length;

  return (
    <div className="font-sans">
      <audio ref={audioRef} src="/page-flip.mp3" preload="auto" />

      {/* Intro */}
      <section className="min-h-screen flex items-center justify-center bg-rose-50 text-center">
        <h1 className="text-3xl font-bold">مرر للأسفل لاكتشاف القصة ↓</h1>
      </section>

      {/* Book Section */}
      <section className="min-h-[95vh] flex flex-col items-center justify-center bg-gradient-to-b from-rose-100 to-pink-200 px-[3vw]">

        <HTMLFlipBook
          ref={bookRef}
          width={window.innerWidth < 640 ? window.innerWidth * 0.9 : 500}
          height={window.innerWidth < 640 ? window.innerHeight * 0.95 : 600}
          size="stretch"
          drawShadow={true}
          maxShadowOpacity={0.8}
          showCover={true}
          mobileScrollSupport={true}
          className="shadow-2xl max-h-[95vh]"
          onFlip={(e) => {
            const i = e.data;
            setIndex(i);

            // ✅ FIX: mark both visible pages (spread)
            markVisited(i);
            markVisited(i + 1);

            playSound();
          }}
        >
          {pages.map((page, i) => (
            <div
              key={page.id}
              className="relative bg-white p-8 flex flex-col items-center justify-center text-right rounded-2xl border"
              dir="rtl"
              style={{
                boxShadow:
                  "inset 0 0 40px rgba(0,0,0,0.08), 0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              {page.title && (
                <h2 className="text-2xl font-bold mb-4">{page.title}</h2>
              )}

              {page.images && (
                <div className="flex gap-2 mb-4 flex-wrap justify-center">
                  {page.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="page"
                      className="w-24 h-24 object-cover rounded-lg shadow"
                    />
                  ))}
                </div>
              )}

              <p className="text-lg text-center leading-loose">{page.body}</p>

              <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400">
                {i + 1}
              </div>
            </div>
          ))}
        </HTMLFlipBook>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-6">
          <button
            onClick={prevPage}
            className="bg-white p-4 rounded-xl shadow"
          >
            <FiChevronLeft size={24} />
          </button>

          <span className="text-lg">
            صفحة {index + 1} / {pages.length}
          </span>

          <button
            onClick={nextPage}
            className="bg-white p-4 rounded-xl shadow"
          >
            <FiChevronRight size={24} />
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
              className="text-7xl"
            >
              🎁
            </motion.button>

            {giftOpened && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-10 text-7xl animate-bounce"
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
