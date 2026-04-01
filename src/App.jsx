
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import HTMLFlipBook from "react-pageflip";
// No import needed here - images in public folder are accessed directly

const pages = [
  {
    id: 1,
    title: "رحلة دراكاريس",
    body: `اهلا انا دراكاريس..
هذي يومياتي اللي احب اسميها 
بـ"رحلة دراكاريس"`,
    images: []
  },
  {
    id: 2,
    title: "November 2023",
    body: `كانت اول مره في حياتي اشتري بي سي واللي كنت اعتبره وانا طفل حلم بالنسبه لي، لكن... لسوء حظي او لحسنه انه ماكان عندي اصحاب العب معهم بالبي سي بسبب ان اخوياي كانوا لسى كونسل
`,
    images: []
  },
  {
    id: 3,
    title: "",
    body: `استمريت بالاشهر لحالي وكانت وحده من الجداول اللي تضيع وقتي هي اني اتابع ستريمرز عشوائيين في تويتش لعل وعسى القى ستريمر اقدر احط اغلب وقتي في متابعته لكن ماحصلت للاسف.
`,
    images: []
  },
  {
    id: 4,
    title: "January 19th, 2024",
    body:  `لازلت مستمر بالبحث الى ان بالصدفة طاحت عيني على قناة بالاقتراحات كانت لسى صغيره وكان اسمها (Hnoll1) مألوف الاسم عليكم صح؟
وكعادتي بالاشهر الماضيه قررت ادخل البث واسلم على الستريمر والموجودين 
ولازلت اتذكر الرقم 181 اللي كان رقم الفولو، لكن الغريب بالموضوع اني استمريت بالمتابعه بدون ملل لفتره تعتبر طويله مقارنه باي ستريمر دخلت بثه قبل
واقدر اقول لكم اخيرا وجدت ضالتي
`,
    images: []
  },
  {
    id: 5,
    title:"",
    body: `ما اخفيكم كنت احس الشات مو متقبلني كنت اكلم مكسي ويزبد لي احيانا وقتها كنت غريب عليهم فما الومهم لكن الاهم اني كنت مبسوط بوقتي وانا اتابع
وهنا قررت اسوي شي اول مره اسويه اللي هو اني شطحت عليها وطلبت مود 
غريبه صح؟ لي كم يوم بالبث وجاي ببجاحه اطلب مود، وبالمناسبه ماكنت اعرف وش يسوي المود اصلا بس كنت ابغاه
وطلبي قوبل بالرفض اكيد وقلت ماراح اترك البث لين اشوف السيف جنب اسمي
`,
    images: []
  },
  {
    id: 6,
    title: "April 8th, 2024",
    body: `خلوني انتقل بكم للمستقبل شوي تحديدا لهالتاريخ اللي اعتبره يوم مفصلي لكن ليش مفصلي؟
بكل اختصار علاقتي مع الشات صارت احسن وتعرفت عليهم لكن الاهم منهم كلهم 
هو اني تعرفت على صديقي واخوي اللي ماجابته امي "مكسي"
تعرفي على مكسي قادني الى اني اتعرف على اشخاص احبهم واغليهم واعتبرهم اخوان وساعدوني كثير اللي هم شرلوك وموني
الله لايحرمني منكم ياخوان`,
    images: []
  },
  {
    id: 7,
    title: "",
    body: `لكن دقيقه ماتحسون نسيت اذكر شخص؟ كلكم اليوم تعرفونني باسم "دراك" لكن من وين جا ذا الاسم؟
اكيد كلكم تعرفون كلفر صديقة هنو واللي بدورها ماقصرت معي ابدا وكانت داعمنا الاول ببثوثنا الله يسعدها ويكتب اجرها
شافت اسمي ذاك اليوم وقال " يوه يوزرك طويل خلاص بسميك دراك" اعجبني الاسم واعجب الشات واعتمدناه الى يومكم هذا فشكرا كلفر`,
    images: []
  },
  {
    id: 8,
    title: "الهوية الجديدة",
    body: `فصل جديد برحلتي بعنوان "الهوية الجديدة"
بعد ماصرت دراك اقدر اقول لكم انها هوية جديده واحب ابشركم اخذت السيف اللي احارب فيه الاعداء
واستمريت كمود وكصديق للشات وانا مستمتع بمتابعة بثوث هنو الممتعه والعفوية والروح المرحه واكيد كنت مستمتع بلعبتي المفضله اللي كانت تلعبها ذاك الوقت "اوفرواتش"
`,
    images: []
  },
  {
    id: 9,
    title: "October 26th, 2024",
    body: `لكن زي مايقول المثل "الزين مايكمل" بهذا التاريخ بالضبط كان اول بث لهنو وهي تلعب لعبتكم المفضلة "Dead By Daylight" بس ليش زعلان يادراك؟ لان ستريمري المفضل ماعاد يلعب لعبتي المفضله وراح للعبه ما احبها والى يومكم ما احبها
`,
    images: []
  },
  {
    id: 10,
    title: "المجتمع",
    body: `لكن دام اني ما احب اللعبه وش اللي قعدني للحين؟ زي ماقلت لكم انا انبسط هنا بغض النظر عن اللعبه احب يوم اشوف مكسي يعطينا ردوده الغريبه  زي "سيرفر العافية" اول ماسوينا سيرفر الدسكورد، او برضو احب لمن بوكا يرفع ضغط هنو المهاوشات ذي تضحكني
فإيه هذا جوابي ليه للحين مكمل مع اني اكره اللعبه
`,
    images: []
  },
  {
    id: 11,
    title: "March 1st, 2025",
    body: `هنا هنو قررت تسوي شي جديد وتجمعنا كلنا في سيرفر ماين كرافت لاول مره، السيرفر كان جميل بسيط خفيف ممتع يعطيك احساس بيت الجدة من حلاوته
اعتقد كل اللي لعبوا السيرفر هذا يتذكرون كلامي وكيف هو جميل بالذات افضل معلم سياحي "مطعم بنت عمو".`,
    images: []
  },
  {
    id: 12,
    title: "نهاية السيرفر",
    body: `وكما يقال "دوام الحال من المحال"
انتهى السيرفر وبقى ذكرى جميله باذهاننا وسيبقى حتى مماتنا، نشكرك هنو مره ثانيه على الشغل اللي سويتيه اسعدتينا وصنعتي ذكريات لاتنسى`,
    images: []
  },
  {
    id: 13,
    title: "نجاح هنو",
    body: `وطبعا اكيد بعد كل اللي ذكرته اكيد اننا نتكلم عن ستريمر ناجح، ذكي وعنده خطط مستقبلية للتنمية شفنا تطور كبير بقناة هنو اللي ماشاء الله تعدت 2500 فولو الله يوفقها لكن عدد الفولو ذا ماجاء من فراغ فخلوني اقول لكم وش سوت هنو عشان تجذب جمهور كبير.
`,
    images: []
  },
  {
    id: 14,
    title: "فعاليات",
    body: `زي ماذكرت لكم قبل سيرفر ماين كرافت الاول
ايضا نضيف عليها اهم حدث لمجتمع دبد اللي هي فعالية هنو بدبد واللي للاسف ماكنت حاضرها لكن من كلام مكسي ان الكل انبسط واستانس وشفنا تطور بالمشاهدات اللي وصلت اكثر من سبعين في وقت واحد ماشاءالله`,
    images: []
  },
  {
    id: 15,
    title: "الشات",
    body: `طبعا مافيه بث ناجح يخلو من شات رهيبين وسيعين صدر فخلوني اذكر بعض المتواجدين اللي دايم يتركون بصمة حلوه
اكيد وعلى راسهم حبايب قلبي مكسو وشرلوك ومونو، ولو بذكر ناس رهيبين تعرف عليهم؟ اكييد بيطري على بالي ستوك الامير، وكيف ننسى الون بيسي بوكا، ولا جداوي وبعلولته؟ ولا خلودي وشطحاته بالدن رينق، واكيد كيف ننسى البلات المبجل سانجي
هذولا ناس احبهم واعزهم كلهم كسبتهم بفضل الله ثم وجودي ببث هنو`,
    images: []
  },
  {
    id: 16,
    title: "February 18th, 2026",
    body: `وصلنا للحدث المنتظر من شهور واخيرا عودة سيرفر هنو بالموسم الثاني واخيرا لكن هالمره؟ شفنا نقله نوعية بالسيرفر من عدة نواحي خلوني اذكرها لكم
`,
    images: []
  },
  {
    id: 17,
    title: "الموسم الثاني",
    body: `اولها عدد اكبر واضافتهم زادت من المتعه اضعاف مضاعفه كل شخص لعب الموسم الثاني اوجه لك شكر من اعماق قلبي لانك اضفت لمسه حلوه 
لحظات كثير عشناها لا يمكن ننساها ولا مين يقدر ينسى فعالية الكولوسيوم والمعارك الطاحنه ومين ينسى مزاد مكسي ووجح اللي سرقوا نص ثروات السيرفر لكن تبون الصدق؟ انسرقت وانا مستانس واضحك`,
    images: []
  },
  {
    id: 18,
    title: "المملكة اللوجيه",
    body: `ولو بتسألونني يادراك اغلب وقتك وش كنت تسوي بالسيرفر؟ ما اخفيكم بعد ما انتهينا من بناء الكولوسيوم كان كل وقتي يروح وانا جدول واسولف مع الناس وهنا خلوني اعرفكم على اعضاء جدد بروايتي اللي هم
"المملكة اللوجيه" اعتقد نص السيرفر ضيعوا وقتهم بالمملكة وبنينا معهم اشياء وذكريات اكثر من مناطقنا الخاصة، الصراحه ناس اتشرف بمعرفتهم 
`,
    images: []
  },
  {
    id: 19,
    title: "النهاية",
    body: `الكل ابدع وامتعنا بمنطقة سبون حية بمحلات ومناظر خلابة واخيرا عندنا فعالية احسن مبنى وشفنا تنافس شرس بين المتسابقين ونبارك لكل الفائزين فيها الكل استحق
`,
    images: []
  },
  {
    id: 20,
    title: "رسالة",
    body: `ونقدر نختم فصل ماين كرافت الموسم الثاني بقتل التنين وتصورنا صورة جماعية
`,
    images: [`/nqder.png`]
  },
  {
    id: 21,
    title: "ختام لا يُنسى",
    body: `انتهى سيرفر ماين لكن ذكرياته ما انتهت وباجماع الكل الموسم الثاني تفوق على الاول من كل النواحي متعه اكبر اشخاص اكثر فعاليات متنوعه والقائمة تطووول ونشكرك ياهنو على ذا الابداع ونشكر الجندي الخفي اكيد يحيى دايم نتعبه معنا الله يوفقك وين ماكان
`,
    images: []
  },
  {
    id: 22,
    title: "رسالة من القلب",
    body: `ختاما واعتذر على الاطالة هذي رسالة لك ياهنو، الله يسعدك على كل ثانية بثيتي فيها ويرزقك ويعطيك حتى يرضيك. انا يوم كتبت برسالة مباركة ال2500 اللي سوتها رغد مشكوره كتبت ان حياتي تغيرت للاحسن واعتقد عرفتوا ليه كتبتها، ماكنت اكذب فيها ولا كنت ابالغ كانت كلمات صادقة وكنت اعني كل حرف كتبته بالمعنى الحرفي شكرا جزيلا على كل شي سويتيه كنتي سبب بعد الله باسعاد ناس كثير وماراح انسى لك هالفضل ماحييت
`,
    images: []
  },
  {
    id: 23,
    title: "النهاية ✨",
    body: `This work was done by Dracarys

Special thanks to:
Mixi74, Rand_slimshady, Luna_ii78

❤️`,
    images: []
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
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-100 to-rose-100 text-center relative overflow-hidden">

        {/* Background floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 35 }).map((_, i) => {
            const icons = ["👋", "✨", "💖", "🎉", "🌸", "💫", "🤍"];

            // FIX: distribute using percentages (NOT window size)
            const left = Math.random() * 100;   // %
            const top = Math.random() * 100;    // %
            const size = Math.random() * 24 + 16;

            return (
              <motion.span
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  fontSize: `${size}px`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  y: [0, -80, -160],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration: Math.random() * 6 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              >
                {icons[i % icons.length]}
              </motion.span>
            );
          })}
        </div>

        {/* Foreground text */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl font-bold z-10"
        >
          مرر للأسفل لاكتشاف القصة ↓
        </motion.h1>
      </section>

      {/* Book Container - This handles the "Desktop Size" issue */}
      <section className="flex flex-col items-center justify-space-between p-4 md:p-10 bg-gradient-to-b from-rose-100 to-pink-200">

        {/* The "Cover" Wrapper */}
        <div className="relative w-full h-full overflow-hidden max-w-[500px] lg:max-w-[900px] aspect-[3/4] md:aspect-[3/2] bg-[#4a3225] p-2 md:p-4 rounded-xl shadow-2xl">

          <HTMLFlipBook
            width={500}
            height={650}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={(e) => {
              const i = e.data;
              setIndex(i);
              markVisited(i);
              markVisited(i + 1);
              playSound();
            }}
            ref={bookRef}
            className="book-main"
          >
            {/* FRONT COVER */}
            <div className="w-full h-full">
              <img
                src="/cover.png" // ← replace with your image
                alt="cover"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            {pages.map((page, i) => (
              <div
                key={page.id}
                className="bg-[#f4e4bc] relative flex flex-col items-center p-6 md:p-12 shadow-inner border-l border-black/10"
                dir="rtl"
              >
                {/* Header Badge from your design */}
                {/* <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-[#fffcf5] border border-[#e2d2b1] px-4 py-1 rounded-full shadow-sm text-xs md:text-sm text-[#8a7a5a]">
                  {page.badge}
                </div> */}

                {/* Page Number */}
                <div className="absolute top-4 left-6 text-xl font-serif text-grey-500 opacity-50">
                  {i + 1}
                </div>

                {/* Content */}
                <div className="mt-12 w-full flex flex-col items-center">
                  {page.title && (
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#5d4a37]">{page.title}</h2>
                  )}

                  {page.images.length > 0 && (
                    <div className="w-full mb-6">
                      <img
                        src={page.images[0]}
                        alt="memory"
                        className="w-full h-40 md:h-64 object-cover rounded-md shadow-md sepia-[0.3]"
                      />
                    </div>
                  )}

                  <p className="text-[#5d4a37] text-base md:text-lg leading-relaxed text-right w-full">
                    {page.body}
                  </p>
                </div>

                {/* Spine Shadow Effect */}
                <div className={`absolute top-0 bottom-0 w-12 pointer-events-none ${i % 2 === 0 ? 'left-0 bg-gradient-to-r from-black/10 to-transparent' : 'right-0 bg-gradient-to-l from-black/10 to-transparent'}`} />
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-10 mb-20">
          <button onClick={() => bookRef.current.pageFlip().flipPrev()} className="bg-white p-4 rounded-full shadow-lg hover:bg-rose-50 transition-colors">
            <FiChevronLeft size={24} className="text-[#4a3225]" />
          </button>

          <span className="text-lg font-medium text-[#4a3225]">
            {index + 1} / {pages.length}
          </span>

          <button onClick={() => bookRef.current.pageFlip().flipNext()} className="bg-white p-4 rounded-full shadow-lg hover:bg-rose-50 transition-colors">
            <FiChevronRight size={24} className="text-[#4a3225]" />
          </button>
        </div>
      </section>

      {/* Gift Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-rose-300 relative overflow-hidden">
{/* Background floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 35 }).map((_, i) => {
            const icons = ["👋", "✨", "💖", "🎉", "🌸", "💫", "🤍"];

            // FIX: distribute using percentages (NOT window size)
            const left = Math.random() * 100;   // %
            const top = Math.random() * 100;    // %
            const size = Math.random() * 24 + 16;

            return (
              <motion.span
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  fontSize: `${size}px`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  y: [0, -80, -160],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration: Math.random() * 6 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              >
                {icons[i % icons.length]}
              </motion.span>
            );
          })}
        </div>
        {!allVisited ? (
          <p className="text-lg">📖 أكمل قراءة جميع الصفحات لفتح الهدية</p>
        ) : (
          <div className="flex flex-col items-center">

            {/* Hint before opening */}
            {!giftOpened && (
              <p className="text-sm mb-4 opacity-70 animate-pulse text-center">
                👇 اضغط على الهدية لفتح المفاجأة
              </p>
            )}

            {/* Gift button */}
            <motion.button
              onClick={() => setGiftOpened(true)}
              whileTap={{ scale: 0.9 }}
              className="text-7xl mb-10"
            >
              🎁
            </motion.button>

            {/* Firework burst + celebration */}
            {giftOpened && (
              <div className=" flex items-center justify-center pointer-events-none">

                {/* Center celebration */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-7xl animate-bounce z-10 mt-10"
                >
                  🎉💖✨
                </motion.div>

                {/* Burst emojis */}
                {Array.from({ length: 30 }).map((_, i) => {
                  const emojis = ["🎉", "🎊", "💖", "✨", "🎗", "📢", "🎷", "🎺", "🎸", "💫"];
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        x: (Math.random() - 0.5) * 1500,
                        y: (Math.random() - 0.5) * 1500,
                      }}
                      transition={{ duration: 2.2, delay: i * 0.02 }}
                      className="absolute text-3xl"
                    >
                      {emojis[i % emojis.length]}
                    </motion.span>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
