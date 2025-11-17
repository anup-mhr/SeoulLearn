const MOCK_STUDY_MATERIALS = [
  {
    id: 1,
    title: "Basic Korean Phrases",
    description: "Essential phrases for beginners",
  },
  {
    id: 2,
    title: "Korean Grammar",
    description: "Master the fundamentals",
  },
  {
    id: 3,
    title: "Vocabulary Builder",
    description: "Expand your word bank",
  },
  {
    id: 4,
    title: "Pronunciation Guide",
    description: "Perfect your accent",
  },
  {
    id: 5,
    title: "Writing Practice",
    description: "Learn Hangul characters",
  },
];

const MOCK_EXAMS = [
  {
    id: 1,
    title: "TOPIK I Exam",
    date: "2024-12-15",
    progress: 0.4,
  },
  {
    id: 2,
    title: "TOPIK II Exam",
    date: "2024-12-20",
    progress: 0.25,
  },
];

const EXAM_QUESTIONS = [
  {
    id: 1,
    question: '다음 중 "감사합니다"의 뜻은 무엇인가요?',
    options: [
      { id: "A", text: "안녕하세요", isCorrect: false },
      { id: "B", text: "고맙습니다", isCorrect: true },
      { id: "C", text: "죄송합니다", isCorrect: false },
      { id: "D", text: "안녕히 가세요", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "다음 중 아침 인사말은 무엇인가요?",
    media: {
      type: "image",
      url: "https://worldenglishessouthkorea.weebly.com/uploads/6/4/6/0/64607789/220290_orig.jpg",
    },
    options: [
      { id: "A", text: "안녕히 주무세요", isCorrect: false },
      { id: "B", text: "좋은 아침이에요", isCorrect: true },
      { id: "C", text: "안녕히 가세요", isCorrect: false },
      { id: "D", text: "수고하세요", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: '"학교"는 영어로 무엇인가요?',
    media: {
      type: "video",
      url: "https://videos.pexels.com/video-files/6989176/6989176-hd_1920_1080_30fps.mp4",
    },
    options: [
      { id: "A", text: "Hospital", isCorrect: false },
      { id: "B", text: "Library", isCorrect: false },
      { id: "C", text: "School", isCorrect: true },
      { id: "D", text: "Market", isCorrect: false },
    ],
  },
  {
    id: 4,
    question: "다음 중 가족 관계가 아닌 것은?",
    media: {
      type: "audio",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    options: [
      { id: "A", text: "아버지", isCorrect: false },
      { id: "B", text: "어머니", isCorrect: false },
      { id: "C", text: "친구", isCorrect: true },
      { id: "D", text: "형", isCorrect: false },
    ],
  },
  {
    id: 5,
    question: '"물"을 마실 때 사용하는 것은?',
    options: [
      { id: "A", text: "젓가락", isCorrect: false },
      { id: "B", text: "숟가락", isCorrect: false },
      { id: "C", text: "컵", isCorrect: true },
      { id: "D", text: "접시", isCorrect: false },
    ],
  },
];

const MOCK_EXAMS_VIEW = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  title: "TOPIK I Exam",
  date: "2024-12-15",
  progress: 0.4,
}));

const USER_DATA = {
  name: "Aarav Maharjan",
  role: "Korean Language Learner",
  location: "Kathmandu, Nepal",
  email: "aarav.maharjan@mail.com",
  phone: "+977 9841234567",
  memberSince: "January 2024",
};

export {
  EXAM_QUESTIONS,
  MOCK_EXAMS,
  MOCK_EXAMS_VIEW,
  MOCK_STUDY_MATERIALS,
  USER_DATA,
};
