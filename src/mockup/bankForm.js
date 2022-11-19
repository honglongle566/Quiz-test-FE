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
  item: {
    group_question: 1,
    name: "<p>cd</p>",
    note_answer: "<p><strong>chu thich</strong></p>",
    type: 2,
    score: 4,

    answer_mul: [
      { id: "a", content: "<p>a</p>" },
      { id: "b", content: "<p>b</p>" },
      { id: "c", content: "<p>123</p>" },
      { id: "d", content: "<p>323</p>" },
      { id: "e", content: "<p>12</p>" },
    ],
    correct_answers_mul: ["a", "b"],
    has_mul_correct_answers: true,

    answer_boolean: [
      { id: "a", content: "<p>a</p>" },
      { id: "b", content: "<p>b</p>" },
    ],
    correct_answers_boolean: ["b"],

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

    fill_blank_correct_answers: [
      { key: 1, content: ["son"] },
      { key: 2, content: ["Nghia me"] },
    ],
  },
};

export default mockup;
