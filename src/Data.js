const data = [
  {
    questionText: "Why are you gay?",
    canVote: true,
    multiChoice: false,
    publichDate: "02-05-2021",
    choices: [
      {
        choice: "Yes",
        votes: "55"
      },
      {
        choice: "No",
        votes: "100"
      }
    ]
  },
  {
    questionText: "Do you love more than I think?",
    canVote: false,
    multiChoice: false,
    publichDate: "02-05-2021",
    choices: [
      {
        voted: true,
        choice: "Yes",
        votes: "55"
      },
      {
        choice: "No",
        votes: "100"
      },
      {
        choice: "Maybe",
        votes: "30"
      }
    ]
  },
  {
    questionText: "Do you love more than I think? are you still there!",
    canVote: true,
    multiChoice: false,
    publichDate: "02-05-2021",
    choices: [
      {
        choice: "Nothing in between",
        votes: "0"
      },
      {
        choice: "No",
        votes: "100"
      },
      {
        choice: "Maybe",
        votes: "30"
      }
    ]
  },
  {
    questionText: "Do you love more than I think? are you still there!",
    canVote: true,
    multiChoice: true,
    publichDate: "02-05-2021",
    choices: [
      {
        choice: "Nothing in between",
        votes: "0"
      },
      {
        voted: true,
        choice: "No",
        votes: "100"
      },
      {
        voted: true,
        choice: "Maybe",
        votes: "30"
      }
    ]
  }
];

export default data;
