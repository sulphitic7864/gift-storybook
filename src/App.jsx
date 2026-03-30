import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import HTMLFlipBook from "react-pageflip";

const pages = [
  {
    id: 1,
    title: "مرحبًا",
    body: "مرحبًا بك في هذه القصة... هناك شيء كُتب لك فقط.",
    images: ["https://images.unsplash.com/photo-1529156069898-49953e39b3ac"]
  },
  {
    id: 2,
    title: "البداية",
    body: "كل قصة تبدأ بخطوة صغيرة، لكن بعض الخطوات تغيّر كل شيء.",
    images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e"]
  },
  {
    id: 3,
    title: "الرسالة",
    body: "أردت فقط أن أقول إن وجودك في الحياة يحدث فرقًا.",
    images: ["https://images.unsplash.com/photo-1511988617509-a57c8a288659"]
  },
  {
    id: 4,
    title: "الذكريات",
    body: "بعض اللحظات تبقى في القلب حتى لو مرّ عليها الزمن.",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e"]
  },
  {
    id: 5,
    title: "الهدوء",
    body: "في لحظات الهدوء نفهم أنفسنا أكثر.",
    images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e"]
  },
  {
    id: 6,
    title: "القوة",
    body: "أنت أقوى مما تتخيل، حتى في اللحظات الصعبة.",
    images: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"]
  },
  {
    id: 7,
    title: "الأمل",
    body: "دائمًا هناك ضوء صغير ينتظرك في نهاية الطريق.",
    images: ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"]
  },
  {
    id: 8,
    title: "الحلم",
    body: "لا تتوقف عن الحلم، فالأحلام تصنع المستقبل.",
    images: ["https://images.unsplash.com/photo-1520975916090-3105956dac38"]
  },
  {
    id: 9,
    title: "الاقتراب من النهاية",
    body: "كل صفحة قرأتها كانت خطوة نحو هذه اللحظة.",
    images: ["https://images.unsplash.com/photo-1519681393784-d120267933ba"]
  },
  {
    id: 10,
    title: "النهاية",
    body: "النهاية ليست نهاية فعلاً... بل بداية لشيء أجمل ✨",
    images: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"]
  }
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
      <section className="flex flex-col items-center justify-center bg-gradient-to-b from-rose-100 to-pink-200 p-[3vw]">

        <HTMLFlipBook
          ref={bookRef}
          width={400}
          height={600}
          size="stretch"
          drawShadow={true}
          maxShadowOpacity={1}
          showCover={true}
          mobileScrollSupport={true}
          className="shadow-5xl"
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
              className="min-h-full relative bg-[#f5efe6] p-4 md:p-10 flex flex-col items-center justify-center text-right rounded-2xl border"
              dir="rtl"
              style={{
                boxShadow:
                  "inset 0 0 40px rgba(0,0,0,0.08), 0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              {page.title && (
                <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-10">{page.title}</h2>
              )}

              {page.images && (
                <div className="flex gap-2 mb-4 flex-wrap justify-center">
                  {page.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="page"
                      className="w-20 h-14 sm:w-24 sm:h-24 md:w-80 md:h-60 object-cover rounded-lg shadow"
                    />
                  ))}
                </div>
              )}

              <p className="text-base md:text-lg text-center leading-loose">{page.body}</p>

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
