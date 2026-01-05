export const questions = [
  {
    id: 1,
    question: "Which of the following is NOT an operating system?",
    options: ["Linux", "Windows", "Oracle", "Mac OS"],
    answer: "Oracle",
    marks: 1,
    subject: "Operating Systems",
  },
  {
    id: 2,
    question: "Which data structure uses FIFO principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
    marks: 1,
    subject: "Data Structures",
  },
  {
    id: 3,
    question: "In which scheduling algorithm does the process with the shortest burst time get executed first?",
    options: [
      "FCFS",
      "Round Robin",
      "Shortest Job First",
      "Priority Scheduling",
    ],
    answer: "Shortest Job First",
    marks: 2,
    subject: "Operating Systems",
  },
  {
    id: 4,
    question: "Which of the following is a primary key property?",
    options: [
      "Allows duplicate values",
      "Can be NULL",
      "Uniquely identifies a record",
      "Used only for sorting",
    ],
    answer: "Uniquely identifies a record",
    marks: 1,
    subject: "DBMS",
  },
  {
    id: 5,
    question: "Which layer of the OSI model is responsible for error detection and correction?",
    options: [
      "Network Layer",
      "Transport Layer",
      "Data Link Layer",
      "Physical Layer",
    ],
    answer: "Data Link Layer",
    marks: 2,
    subject: "Computer Networks",
  },
  {
    id: 6,
    question: "Which traversal of a Binary Search Tree gives sorted output?",
    options: ["Preorder", "Postorder", "Inorder", "Level Order"],
    answer: "Inorder",
    marks: 1,
    subject: "Data Structures",
  },
  {
    id: 7,
    question: "Which cache memory mapping technique allows a block to be placed anywhere in cache?",
    options: [
      "Direct Mapping",
      "Associative Mapping",
      "Set Associative Mapping",
      "Indexed Mapping",
    ],
    answer: "Associative Mapping",
    marks: 2,
    subject: "Computer Organization",
  },
  {
    id: 8,
    question: "Deadlock occurs when each process holds a resource and waits for another. This condition is known as?",
    options: [
      "Mutual Exclusion",
      "Hold and Wait",
      "Circular Wait",
      "Preemption",
    ],
    answer: "Circular Wait",
    marks: 1,
    subject: "Operating Systems",
  },
];
export const examData = {
  GATE: {
    duration: 60,
    marking: {
      correct: 1,
      wrong: -0.33,
    },
    questions: questions,
  },

  EAMCET: {
    duration: 45,
    marking: {
      correct: 1,
      wrong: 0,
    },
    questions: [
      {
        id: 1,
        question: "2 + 2 = ?",
        options: ["2", "3", "4", "5"],
        answer: "4",
      },
    ],
  },
};

