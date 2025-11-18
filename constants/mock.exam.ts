// mockData.js - Complete Mock Data for Exam System

export const mockExam = {
  _id: "exam_001",
  title: "New Pattern UBT - 001",
  duration: 90, // minutes
  totalQuestions: 40,
  sections: [
    {
      type: "reading",
      questionCount: 20,
      questions: [],
    },
    {
      type: "listening",
      questionCount: 20,
      questions: [],
    },
  ],
  createdAt: new Date(),
};

// Reading Questions Mock Data
export const mockReadingQuestions = [
  // Questions 1-6 (Individual questions)
  {
    _id: "q1",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 1,
    groupInfo: null,
    content: {
      type: "text",
      text: "다음 중 밑줄 친 부분이 틀린 것은?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: {
          type: "text",
          text: "나는 어제 영화를 봤어요.",
          imageUrl: null,
        },
      },
      {
        optionNumber: 2,
        content: {
          type: "text",
          text: "친구가 선물을 줬어요.",
          imageUrl: null,
        },
      },
      {
        optionNumber: 3,
        content: {
          type: "text",
          text: "우리는 공원에서 놀았어요.",
          imageUrl: null,
        },
      },
      {
        optionNumber: 4,
        content: {
          type: "text",
          text: "그는 학교에 갔어요.",
          imageUrl: null,
        },
      },
    ],
    correctAnswer: 2,
    explanation: "선물을 줬어요가 올바른 표현입니다.",
  },
  {
    _id: "q2",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 2,
    groupInfo: null,
    content: {
      type: "text",
      text: "빈칸에 알맞은 단어를 고르십시오.\n오늘 날씨가 정말 ___.",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "좋다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "좋아요", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "좋습니다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "좋네요", imageUrl: null },
      },
    ],
    correctAnswer: 4,
    explanation: "감탄을 나타낼 때는 '좋네요'가 적절합니다.",
  },
  {
    _id: "q3",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 3,
    groupInfo: null,
    content: {
      type: "text",
      text: "다음 중 의미가 다른 하나는?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "빠르다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "신속하다", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "느리다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "재빠르다", imageUrl: null },
      },
    ],
    correctAnswer: 3,
    explanation: "'느리다'는 다른 단어들과 반대의 의미입니다.",
  },
  {
    _id: "q4",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 4,
    groupInfo: null,
    content: {
      type: "text",
      text: "다음 문장에서 틀린 부분은?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "저는 학생이에요", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "친구를 만났어요", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "책을 읽어요", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "음악이 들어요", imageUrl: null },
      },
    ],
    correctAnswer: 4,
    explanation: "'음악을 들어요'가 올바른 표현입니다.",
  },
  {
    _id: "q5",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 5,
    groupInfo: null,
    content: {
      type: "text",
      text: "알맞은 조사를 고르십시오.\n친구___ 만났어요.",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "을", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "를", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "이", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "와", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "목적어에는 '을/를'을 사용합니다.",
  },
  {
    _id: "q6",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 6,
    groupInfo: null,
    content: {
      type: "text",
      text: "다음 중 가장 자연스러운 대화는?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: {
          type: "text",
          text: "A: 어디 가요? B: 네, 맞아요.",
          imageUrl: null,
        },
      },
      {
        optionNumber: 2,
        content: {
          type: "text",
          text: "A: 뭐 해요? B: 책을 읽어요.",
          imageUrl: null,
        },
      },
      {
        optionNumber: 3,
        content: {
          type: "text",
          text: "A: 안녕하세요? B: 감사합니다.",
          imageUrl: null,
        },
      },
      {
        optionNumber: 4,
        content: {
          type: "text",
          text: "A: 좋아해요? B: 학교예요.",
          imageUrl: null,
        },
      },
    ],
    correctAnswer: 2,
    explanation: "질문과 대답이 자연스럽게 연결됩니다.",
  },

  // Questions 7-10 (Group 1)
  {
    _id: "q7",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 7,
    groupInfo: {
      groupId: "7-10",
      groupTitle: "[7~10] Read the following and answer the questions.",
      groupTitleKorean: "[7~10] 다음 글을 읽고 물음에 답하십시오.",
    },
    content: {
      type: "text",
      text: "다음 단어와 관계있는 것은 무엇입니까?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "육각 렌치", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: {
          type: "text",
          text: "구멍을 뚫을 때 쓰는 도구예요.",
          imageUrl: null,
        },
      },
      {
        optionNumber: 3,
        content: {
          type: "text",
          text: "선선을 사를 때 사용하는 도구예요.",
          imageUrl: null,
        },
      },
      {
        optionNumber: 4,
        content: {
          type: "text",
          text: "나사를 조이거나 풀 때 쓰는 도구예요.",
          imageUrl: null,
        },
      },
    ],
    correctAnswer: 4,
    explanation: "렌치는 나사를 조이거나 풀 때 사용하는 도구입니다.",
  },
  {
    _id: "q8",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 8,
    groupInfo: {
      groupId: "7-10",
      groupTitle: "[7~10] Read the following and answer the questions.",
      groupTitleKorean: "[7~10] 다음 글을 읽고 물음에 답하십시오.",
    },
    content: {
      type: "text",
      text: "이 글의 주제는 무엇입니까?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "공구의 사용법", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "렌치의 종류", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "나사의 특징", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "도구의 역사", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "글의 주제는 공구의 사용법입니다.",
  },
  {
    _id: "q9",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 9,
    groupInfo: {
      groupId: "7-10",
      groupTitle: "[7~10] Read the following and answer the questions.",
      groupTitleKorean: "[7~10] 다음 글을 읽고 물음에 답하십시오.",
    },
    content: {
      type: "text",
      text: "이 글에서 알 수 있는 것은?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "렌치는 비싸다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "렌치는 유용한 도구다", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "렌치는 무겁다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: {
          type: "text",
          text: "렌치는 새로운 발명품이다",
          imageUrl: null,
        },
      },
    ],
    correctAnswer: 2,
    explanation: "글에서 렌치가 유용한 도구임을 알 수 있습니다.",
  },
  {
    _id: "q10",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 10,
    groupInfo: {
      groupId: "7-10",
      groupTitle: "[7~10] Read the following and answer the questions.",
      groupTitleKorean: "[7~10] 다음 글을 읽고 물음에 답하십시오.",
    },
    content: {
      type: "text",
      text: "빈칸에 들어갈 말로 알맞은 것은?\n렌치를 사용하면 나사를 ___.",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "자를 수 있다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "붙일 수 있다", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "조이거나 풀 수 있다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "만들 수 있다", imageUrl: null },
      },
    ],
    correctAnswer: 3,
    explanation: "렌치는 나사를 조이거나 푸는 데 사용됩니다.",
  },

  // Questions 11-15
  {
    _id: "q11",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 11,
    groupInfo: null,
    content: {
      type: "text",
      text: "다음 중 높임말이 아닌 것은?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "드시다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "주무시다", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "먹다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "계시다", imageUrl: null },
      },
    ],
    correctAnswer: 3,
    explanation: "'먹다'는 높임말이 아닙니다.",
  },
  {
    _id: "q12",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 12,
    groupInfo: null,
    content: {
      type: "text",
      text: "빈칸에 알맞은 것을 고르십시오.\n저는 매일 아침 7시에 ___.",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "일어나요", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "일어났어요", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "일어날 거예요", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "일어나고 있어요", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "습관을 나타낼 때는 현재형을 사용합니다.",
  },
  {
    _id: "q13",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 13,
    groupInfo: null,
    content: {
      type: "text",
      text: "다음 중 반대말은?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "크다 - 작다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "높다 - 낮다", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "좋다 - 나쁘다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "밝다 - 어둡다", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "모두 반대말입니다. (문제 오류)",
  },
  {
    _id: "q14",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 14,
    groupInfo: null,
    content: {
      type: "text",
      text: "문장을 완성하십시오.\n도서관에서는 조용히 ___.",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "해야 해요", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "하면 안 돼요", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "할 수 있어요", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "하고 싶어요", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "도서관에서는 조용히 해야 합니다.",
  },
  {
    _id: "q15",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 15,
    groupInfo: null,
    content: {
      type: "text",
      text: "다음 중 가장 예의 바른 표현은?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "이거 줘", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "이것 좀 주세요", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "이것 줘요", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "이거 주시겠어요?", imageUrl: null },
      },
    ],
    correctAnswer: 4,
    explanation: "'주시겠어요?'가 가장 예의 바른 표현입니다.",
  },

  // Questions 16-20
  {
    _id: "q16",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 16,
    groupInfo: null,
    content: {
      type: "text",
      text: "알맞은 연결어미를 고르십시오.\n비가 ___ 우산을 가져가세요.",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "오니까", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "와서", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "오면", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "오고", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "이유를 나타낼 때는 '-니까'를 사용합니다.",
  },
  {
    _id: "q17",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 17,
    groupInfo: null,
    content: {
      type: "text",
      text: "다음 중 틀린 문장은?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "어제 친구를 만났어요", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: {
          type: "text",
          text: "내일 영화를 볼 거예요",
          imageUrl: null,
        },
      },
      {
        optionNumber: 3,
        content: {
          type: "text",
          text: "지금 공부를 하고 있어요",
          imageUrl: null,
        },
      },
      {
        optionNumber: 4,
        content: {
          type: "text",
          text: "어제 학교에 갈 거예요",
          imageUrl: null,
        },
      },
    ],
    correctAnswer: 4,
    explanation: "어제는 과거이므로 '갈 거예요'가 틀렸습니다.",
  },
  {
    _id: "q18",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 18,
    groupInfo: null,
    content: {
      type: "text",
      text: "빈칸에 들어갈 말로 적절한 것은?\n저는 커피보다 차를 더 ___.",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "좋아요", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "좋아해요", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "좋습니다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "좋아합니다", imageUrl: null },
      },
    ],
    correctAnswer: 2,
    explanation: "'좋아하다'가 올바른 표현입니다.",
  },
  {
    _id: "q19",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 19,
    groupInfo: null,
    content: {
      type: "text",
      text: "다음 중 가장 자연스러운 순서는?",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "아침-점심-저녁-밤", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "밤-아침-점심-저녁", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "저녁-밤-아침-점심", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "점심-저녁-밤-아침", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "하루의 순서는 아침-점심-저녁-밤입니다.",
  },
  {
    _id: "q20",
    examId: "exam_001",
    sectionType: "reading",
    questionNumber: 20,
    groupInfo: null,
    content: {
      type: "text",
      text: "문맥상 알맞은 단어를 고르십시오.\n날씨가 추우니까 따뜻한 옷을 ___.",
      audioUrl: null,
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "입으세요", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "벗으세요", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "사세요", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "보세요", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "추울 때는 따뜻한 옷을 입어야 합니다.",
  },
];

// Listening Questions Mock Data
export const mockListeningQuestions = [
  // Questions 21-22
  {
    _id: "q21",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 21,
    groupInfo: null,
    content: {
      type: "audio",
      text: "21.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "학교에 갑니다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "집에 갑니다", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "병원에 갑니다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "회사에 갑니다", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "대화에서 학교에 간다고 했습니다.",
  },
  {
    _id: "q22",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 22,
    groupInfo: null,
    content: {
      type: "audio",
      text: "22.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "기쁩니다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "슬픕니다", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "화가 납니다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "놀랍니다", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "대화에서 기쁜 감정을 표현했습니다.",
  },

  // Questions 23-28 (Group with images)
  {
    _id: "q23",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 23,
    groupInfo: {
      groupId: "23-28",
      groupTitle: "[23~28] Listen and select the related picture.",
      groupTitleKorean:
        "[23~28] 다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.",
    },
    content: {
      type: "audio",
      text: "23.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=Picture+1",
        },
      },
      {
        optionNumber: 2,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=Picture+2",
        },
      },
      {
        optionNumber: 3,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/45B7D1/FFFFFF?text=Picture+3",
        },
      },
      {
        optionNumber: 4,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/96CEB4/FFFFFF?text=Picture+4",
        },
      },
    ],
    correctAnswer: 2,
    explanation: "음성에서 설명한 내용과 그림 2가 일치합니다.",
  },
  {
    _id: "q24",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 24,
    groupInfo: {
      groupId: "23-28",
      groupTitle: "[23~28] Listen and select the related picture.",
      groupTitleKorean:
        "[23~28] 다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.",
    },
    content: {
      type: "audio",
      text: "24.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/FFD93D/FFFFFF?text=Image+1",
        },
      },
      {
        optionNumber: 2,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/6BCB77/FFFFFF?text=Image+2",
        },
      },
      {
        optionNumber: 3,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/4D96FF/FFFFFF?text=Image+3",
        },
      },
      {
        optionNumber: 4,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/FF6B9D/FFFFFF?text=Image+4",
        },
      },
    ],
    correctAnswer: 3,
    explanation: "음성 설명과 일치하는 그림입니다.",
  },
  {
    _id: "q25",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 25,
    groupInfo: {
      groupId: "23-28",
      groupTitle: "[23~28] Listen and select the related picture.",
      groupTitleKorean:
        "[23~28] 다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.",
    },
    content: {
      type: "audio",
      text: "25.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/FFA07A/FFFFFF?text=Worker+1",
        },
      },
      {
        optionNumber: 2,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/98D8C8/FFFFFF?text=Worker+2",
        },
      },
    ],
    correctAnswer: 1,
    explanation: "작업자의 동작과 일치하는 그림입니다.",
  },
  {
    _id: "q26",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 26,
    groupInfo: {
      groupId: "23-28",
      groupTitle: "[23~28] Listen and select the related picture.",
      groupTitleKorean:
        "[23~28] 다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.",
    },
    content: {
      type: "audio",
      text: "26.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/E74C3C/FFFFFF?text=Scene+1",
        },
      },
      {
        optionNumber: 2,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/3498DB/FFFFFF?text=Scene+2",
        },
      },
      {
        optionNumber: 3,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/2ECC71/FFFFFF?text=Scene+3",
        },
      },
      {
        optionNumber: 4,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/F39C12/FFFFFF?text=Scene+4",
        },
      },
    ],
    correctAnswer: 2,
    explanation: "상황에 맞는 그림입니다.",
  },
  {
    _id: "q27",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 27,
    groupInfo: {
      groupId: "23-28",
      groupTitle: "[23~28] Listen and select the related picture.",
      groupTitleKorean:
        "[23~28] 다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.",
    },
    content: {
      type: "audio",
      text: "27.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/9B59B6/FFFFFF?text=Activity+1",
        },
      },
      {
        optionNumber: 2,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/1ABC9C/FFFFFF?text=Activity+2",
        },
      },
      {
        optionNumber: 3,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/E67E22/FFFFFF?text=Activity+3",
        },
      },
      {
        optionNumber: 4,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/34495E/FFFFFF?text=Activity+4",
        },
      },
    ],
    correctAnswer: 4,
    explanation: "활동 내용과 일치합니다.",
  },
  {
    _id: "q28",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 28,
    groupInfo: {
      groupId: "23-28",
      groupTitle: "[23~28] Listen and select the related picture.",
      groupTitleKorean:
        "[23~28] 다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.",
    },
    content: {
      type: "audio",
      text: "28.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/16A085/FFFFFF?text=Location+1",
        },
      },
      {
        optionNumber: 2,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/C0392B/FFFFFF?text=Location+2",
        },
      },
      {
        optionNumber: 3,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/2980B9/FFFFFF?text=Location+3",
        },
      },
      {
        optionNumber: 4,
        content: {
          type: "image",
          text: null,
          imageUrl:
            "https://via.placeholder.com/150x100/27AE60/FFFFFF?text=Location+4",
        },
      },
    ],
    correctAnswer: 1,
    explanation: "장소와 일치하는 그림입니다.",
  },

  // Questions 29-32 (Group)
  {
    _id: "q29",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 29,
    groupInfo: {
      groupId: "29-32",
      groupTitle: "[29~32] Listen and choose the correct answer.",
      groupTitleKorean: "[29~32] 다음을 듣고 질문에 알맞은 대답을 고르십시오.",
    },
    content: {
      type: "audio",
      text: "29.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "네, 좋아요.", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "아니요, 괜찮아요.", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "감사합니다.", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "미안합니다.", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "질문에 대한 적절한 응답입니다.",
  },
  {
    _id: "q30",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 30,
    groupInfo: {
      groupId: "29-32",
      groupTitle: "[29~32] Listen and choose the correct answer.",
      groupTitleKorean: "[29~32] 다음을 듣고 질문에 알맞은 대답을 고르십시오.",
    },
    content: {
      type: "audio",
      text: "30.",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "내일 만나요.", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "어제 만났어요.", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "지금 만나고 있어요.", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "만나지 않아요.", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "시간 표현이 일치합니다.",
  },
  {
    _id: "q31",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 31,
    groupInfo: {
      groupId: "29-32",
      groupTitle: "[29~32] Listen and choose the correct answer.",
      groupTitleKorean: "[29~32] 다음을 듣고 질문에 알맞은 대답을 고르십시오.",
    },
    content: {
      type: "audio",
      text: "31.",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "학교입니다.", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "회사입니다.", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "집입니다.", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "병원입니다.", imageUrl: null },
      },
    ],
    correctAnswer: 3,
    explanation: "장소에 대한 올바른 답변입니다.",
  },
  {
    _id: "q32",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 32,
    groupInfo: {
      groupId: "29-32",
      groupTitle: "[29~32] Listen and choose the correct answer.",
      groupTitleKorean: "[29~32] 다음을 듣고 질문에 알맞은 대답을 고르십시오.",
    },
    content: {
      type: "audio",
      text: "32.",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "매일 운동해요.", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "가끔 운동해요.", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "운동하지 않아요.", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "운동을 좋아해요.", imageUrl: null },
      },
    ],
    correctAnswer: 2,
    explanation: "빈도에 대한 올바른 답변입니다.",
  },

  // Questions 33-40
  {
    _id: "q33",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 33,
    groupInfo: null,
    content: {
      type: "audio",
      text: "33.",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "기쁩니다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "슬픕니다", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "화가 납니다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "걱정됩니다", imageUrl: null },
      },
    ],
    correctAnswer: 4,
    explanation: "감정 표현이 일치합니다.",
  },
  {
    _id: "q34",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 34,
    groupInfo: null,
    content: {
      type: "audio",
      text: "34.",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "아침 8시", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "오후 2시", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "저녁 6시", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "밤 10시", imageUrl: null },
      },
    ],
    correctAnswer: 2,
    explanation: "시간이 일치합니다.",
  },
  {
    _id: "q35",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 35,
    groupInfo: null,
    content: {
      type: "audio",
      text: "35.",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "날씨가 좋습니다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "비가 옵니다", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "눈이 옵니다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "바람이 붑니다", imageUrl: null },
      },
    ],
    correctAnswer: 2,
    explanation: "날씨 상태가 일치합니다.",
  },
  {
    _id: "q36",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 36,
    groupInfo: null,
    content: {
      type: "audio",
      text: "36.",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "한국 음식", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "중국 음식", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "일본 음식", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "서양 음식", imageUrl: null },
      },
    ],
    correctAnswer: 1,
    explanation: "음식 종류가 일치합니다.",
  },
  {
    _id: "q37",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 37,
    groupInfo: null,
    content: {
      type: "audio",
      text: "37.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "버스", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "지하철", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "택시", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "자전거", imageUrl: null },
      },
    ],
    correctAnswer: 2,
    explanation: "교통수단이 일치합니다.",
  },
  {
    _id: "q38",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 38,
    groupInfo: null,
    content: {
      type: "audio",
      text: "38.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "영화를 봅니다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "책을 읽습니다", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "음악을 듣습니다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "운동을 합니다", imageUrl: null },
      },
    ],
    correctAnswer: 3,
    explanation: "활동이 일치합니다.",
  },
  {
    _id: "q39",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 39,
    groupInfo: null,
    content: {
      type: "audio",
      text: "39.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "가족", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "친구", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "선생님", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "동료", imageUrl: null },
      },
    ],
    correctAnswer: 2,
    explanation: "관계가 일치합니다.",
  },
  {
    _id: "q40",
    examId: "exam_001",
    sectionType: "listening",
    questionNumber: 40,
    groupInfo: null,
    content: {
      type: "audio",
      text: "40.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      imageUrl: null,
    },
    mcqs: [
      {
        optionNumber: 1,
        content: { type: "text", text: "공부합니다", imageUrl: null },
      },
      {
        optionNumber: 2,
        content: { type: "text", text: "일합니다", imageUrl: null },
      },
      {
        optionNumber: 3,
        content: { type: "text", text: "쉽니다", imageUrl: null },
      },
      {
        optionNumber: 4,
        content: { type: "text", text: "잠을 잡니다", imageUrl: null },
      },
    ],
    correctAnswer: 3,
    explanation: "활동 내용이 일치합니다.",
  },
];

// Mock user answers (for testing)
export const mockUserAnswers: any = {
  7: 4,
  8: 1,
  // Add more as needed for testing
};

// Function to get exam with all questions
export const getExamWithQuestions = () => {
  const exam = { ...mockExam };
  exam.sections[0].questions = mockReadingQuestions as any;
  exam.sections[1].questions = mockListeningQuestions as any;
  return exam;
};

// Function to get question by number
export const getQuestionByNumber = (questionNumber: any) => {
  const allQuestions = [...mockReadingQuestions, ...mockListeningQuestions];
  return allQuestions.find(
    (q) => q.questionNumber === parseInt(questionNumber)
  );
};

// Function to get mock results
export const getMockResults = () => {
  const readingQuestions = mockReadingQuestions.map((q) => ({
    questionNumber: q.questionNumber,
    userAnswer: mockUserAnswers[q.questionNumber] || null,
    correctAnswer: q.correctAnswer,
    isCorrect: mockUserAnswers[q.questionNumber] === q.correctAnswer,
  }));

  const listeningQuestions = mockListeningQuestions.map((q) => ({
    questionNumber: q.questionNumber,
    userAnswer: mockUserAnswers[q.questionNumber] || null,
    correctAnswer: q.correctAnswer,
    isCorrect: mockUserAnswers[q.questionNumber] === q.correctAnswer,
  }));

  const solvedQuestions = Object.keys(mockUserAnswers).length;
  const correctAnswers = [...readingQuestions, ...listeningQuestions].filter(
    (q) => q.isCorrect
  ).length;

  return {
    totalQuestions: 40,
    solvedQuestions,
    remainingQuestions: 40 - solvedQuestions,
    score: Math.round((correctAnswers / 40) * 100),
    readingQuestions,
    listeningQuestions,
  };
};

// Function to get question review
export const getQuestionReview = (questionNumber: any) => {
  const question = getQuestionByNumber(questionNumber);
  const userAnswer = mockUserAnswers[questionNumber] || null;

  return {
    question,
    userAnswer,
    correctAnswer: (question as any).correctAnswer,
    isCorrect: userAnswer === (question as any).correctAnswer,
    totalQuestion: 20,
  };
};
