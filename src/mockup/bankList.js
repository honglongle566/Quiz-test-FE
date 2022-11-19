const mockup = {
  questionGroup: [
    {
      id: 1,
      name: "question1",
    },
    {
      id: 2,
      name: "question2",
    },
    {
      id: 3,
      name: "question3",
    },
    {
      id: 4,
      name: "question4",
    },
  ],
  list: [
    {
      id: 1,
      group_question: 1,
      name: "<p>question113111</p>",
      note_answer: "<p><strong>question1</strong></p>",
      type: 1,
      score: 2,

      answer: [
        { id: "a", content: "<p>a</p>" },
        { id: "b", content: "<p>b</p>" },
        { id: "c", content: "<p>123</p>" },
        { id: "d", content: "<p>323</p>" },
        { id: "e", content: "<p>12</p>" },
      ],
      correct_answers: ["a", "b"],
      has_mul_correct_answers: true,

      matching_answers: null,
      matching_correct_answers: null,

      fill_blank_correct_answers: null,
    },
    {
      group_question: 2,
      name: "<p>Question321313</p>",
      note_answer: "<p><strong>question2</strong></p>",
      type: 1,
      score: 3,

      answer: [
        { id: "a", content: "<p>a</p>" },
        { id: "b", content: "<p>b</p>" },
        { id: "c", content: "<p>123</p>" },
        { id: "d", content: "<p>323</p>" },
        { id: "e", content: "<p>12</p>" },
      ],
      correct_answers: ["c"],
      has_mul_correct_answers: false,

      matching_answers: null,
      matching_correct_answers: null,

      fill_blank_correct_answers: null,
    },
    {
      group_question: 3,
      name: "<p>Question3123</p>",
      note_answer: "<p><strong>Question3</strong></p>",
      type: 2,
      score: 4,

      answer_boolean: [
        { id: "a", content: "<p>a</p>" },
        { id: "b", content: "<p>b</p>" },
      ],
      correct_answers_boolean: ["b"],
      has_mul_correct_answers: false,

      matching_answers: null,
      matching_correct_answers: null,

      fill_blank_correct_answers: null,
    },
    {
      group_question: 1,
      name: "<p>Question4</p>",
      note_answer: "<p><strong>chu thich</strong></p>",
      type: 3,
      score: 4,

      answer: null,
      correct_answers_mul: null,
      has_mul_correct_answers: false,

      matching_answers: {
        questions: [
          { id: 1, content: "<p>1</p>" },
          { id: 2, content: "<p>2</p>" },
          { id: 3, content: "<p>f</p>" },
        ],
        answers: [
          { id: "a", content: "<p>1</p>" },
          { id: "b", content: "<p>2</p>" },
        ],
      },
      matching_correct_answers: { 1: ["a"], 2: ["b"], 3: ["a"] },

      fill_blank_correct_answers: null,
    },
    {
      group_question: 1,
      name: "<p>cd</p>",
      note_answer: "<p><strong>chu thich</strong></p>",
      type: 4,
      score: 1,

      answer: null,
      correct_answers: null,
      has_mul_correct_answers: false,

      matching_answers: null,
      matching_correct_answers: null,

      fill_blank_correct_answers: [
        { key: 1, content: ["son"] },
        { key: 2, content: ["Nghia me"] },
      ],
    },
  ],
  pagination: {
    total_items: 5,
    total_pages: 5,
    current_page: 1,
    rows: 10,
  },
};

export default mockup;
