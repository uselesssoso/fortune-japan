/* Omikuji copy. Ranks are weighted; each draw picks one line per category. */
var OMIKUJI = {
  categories: [
    { key: "wish", en: "Wish", jp: "願望" },
    { key: "love", en: "Love", jp: "恋愛" },
    { key: "work", en: "Work", jp: "仕事" },
    { key: "health", en: "Health", jp: "健康" },
    { key: "lost", en: "Lost items", jp: "失物" },
    { key: "travel", en: "Travel", jp: "旅行" },
  ],
  colors: [
    { name: "vermilion", jp: "朱", hex: "#c44536" },
    { name: "indigo", jp: "藍", hex: "#2c4a6e" },
    { name: "gold", jp: "金茶", hex: "#b8893d" },
    { name: "moss", jp: "萌黄", hex: "#5e7d55" },
    { name: "ink", jp: "墨", hex: "#2a2724" },
    { name: "wisteria", jp: "藤", hex: "#7d5e8a" },
    { name: "persimmon", jp: "柿", hex: "#d4652f" },
    { name: "paper white", jp: "生成り", hex: "#f4efe4" },
  ],
  items: [
    "a spare pen",
    "the umbrella already by the door",
    "a second coffee, not a third",
    "a receipt you almost threw away",
    "clean socks",
    "the earlier train",
    "a paper bookmark",
    "the window seat",
    "a charged battery",
    "the plain black shirt",
    "a short grocery list",
    "one unread page",
  ],
  ranks: [
    {
      id: "daikichi",
      jp: "大吉",
      reading: "daikichi",
      en: "Great blessing",
      tone: "good",
      weight: 6,
      summaries: [
        "The day is unusually cooperative. Do the thing.",
        "Plans will behave. This is rare. Write it down.",
        "You may proceed. The obstacles called in sick.",
      ],
      lines: {
        wish: [
          "Ask once, clearly. The answer is closer to yes than usual.",
          "A wish you have been editing is ready to leave the drafts.",
        ],
        love: [
          "They noticed. Do not overthink the noticing.",
          "Say the plain version. It will land.",
        ],
        work: [
          "A small task will go unusually well. Do not announce this.",
          "The meeting will be shorter than the calendar claims.",
        ],
        health: [
          "Sleep will help more than a new routine.",
          "Your body is on your side today. Eat something with a color.",
        ],
        lost: [
          "Check the second place you already checked.",
          "It is in the room you used last, not the one you suspect.",
        ],
        travel: [
          "Leave ten minutes early. The day is punctual.",
          "The route you already know is the good one.",
        ],
      },
    },
    {
      id: "kichi",
      jp: "吉",
      reading: "kichi",
      en: "Blessing",
      tone: "good",
      weight: 16,
      summaries: [
        "A good day, with ordinary luck. That is enough.",
        "Something small will go right. Accept it without a speech.",
        "Favorable, in the unglamorous way.",
      ],
      lines: {
        wish: [
          "A modest wish clears. Save the grand one.",
          "Progress, not a miracle. Take the progress.",
        ],
        love: [
          "A short message beats a long one.",
          "Warmth is available if you keep it simple.",
        ],
        work: [
          "Finish the thing in front of you. It counts.",
          "Someone will agree with you. Stay brief when they do.",
        ],
        health: [
          "A walk fixes more than the plan you were about to make.",
          "Drink water before you invent a problem.",
        ],
        lost: [
          "Look where you were standing, not where you were hurrying.",
          "It never left the bag.",
        ],
        travel: [
          "Delays stay minor. Bring a book anyway.",
          "The earlier option is the lucky one.",
        ],
      },
    },
    {
      id: "chukichi",
      jp: "中吉",
      reading: "chūkichi",
      en: "Middle blessing",
      tone: "mid",
      weight: 22,
      summaries: [
        "Better than average. Spend it on the work, not on optimism.",
        "The middle path is open. Take it before you improve it.",
        "Solid. Not cinematic. Solid is the point.",
      ],
      lines: {
        wish: [
          "Half of what you want is available today. Take that half.",
          "Refine the wish. The vague version will stall.",
        ],
        love: [
          "Steady is the fortune. Grand gestures can wait.",
          "Be kind and specific. Skip the speech.",
        ],
        work: [
          "Useful work gets done. Impressive work can wait its turn.",
          "Ask one clear question. You will get a usable answer.",
        ],
        health: [
          "Keep the usual routine. It is doing its job.",
          "Stretch, then stop optimizing your body.",
        ],
        lost: [
          "Retrace the last hour, slowly.",
          "Check a pocket you already trust.",
        ],
        travel: [
          "Nothing dramatic. Pack light and leave on time.",
          "A familiar place will treat you well.",
        ],
      },
    },
    {
      id: "shokichi",
      jp: "小吉",
      reading: "shōkichi",
      en: "Small blessing",
      tone: "mid",
      weight: 20,
      summaries: [
        "A modest win is available. It will not announce itself.",
        "Keep the request small. The answer will match.",
        "Fine, once you stop adding features to the day.",
      ],
      lines: {
        wish: [
          "Ask for one thing, not a system.",
          "A small yes is the whole blessing. Notice it.",
        ],
        love: [
          "Low stakes, good odds. Suggest something simple.",
          "A quiet evening outperforms a plan with a theme.",
        ],
        work: [
          "One email, sent cleanly, is today's victory.",
          "Do the easy correct thing and leave the rest.",
        ],
        health: [
          "An earlier night is worth more than a new rule.",
          "Eat lunch. The rest is commentary.",
        ],
        lost: [
          "It is close, and slightly obvious.",
          "Look down. Then look in the coat.",
        ],
        travel: [
          "A short trip goes better than a long one.",
          "Nearby is lucky. Far can wait.",
        ],
      },
    },
    {
      id: "suekichi",
      jp: "末吉",
      reading: "suekichi",
      en: "Blessing, eventually",
      tone: "mid",
      weight: 16,
      summaries: [
        "Not yet. The good part is later, and it is real.",
        "Patience is the whole fortune. It is also the hard part.",
        "Start anyway. The blessing arrives after the boring part.",
      ],
      lines: {
        wish: [
          "Plant it today. Do not harvest it today.",
          "The wish is valid. The timing is the thing to adjust.",
        ],
        love: [
          "Give it a week before you interpret the silence.",
          "Kindness now, clarity later. Keep that order.",
        ],
        work: [
          "Begin the draft. The useful version comes second.",
          "A delay today protects the work. Let it.",
        ],
        health: [
          "Rest is part of the result.",
          "Recovery is slow and genuine. Let it be slow.",
        ],
        lost: [
          "It turns up after you stop searching so hard.",
          "Tomorrow's ordinary routine finds it.",
        ],
        travel: [
          "Go later. The trip improves by waiting.",
          "Book nothing irreversible before the weekend.",
        ],
      },
    },
    {
      id: "kyo",
      jp: "凶",
      reading: "kyō",
      en: "Misfortune",
      tone: "bad",
      weight: 12,
      summaries: [
        "Postpone the irreversible. Today is for drafts.",
        "Fewer decisions, better day.",
        "The shrine suggests you wait. It is rarely this direct.",
      ],
      lines: {
        wish: [
          "Keep the wish. Spend today on something smaller.",
          "Hold the request. A later day will carry it better.",
        ],
        love: [
          "Silence is the correct reply.",
          "Save the clarifying conversation for a calmer evening.",
        ],
        work: [
          "Send the email tomorrow. Today's version has opinions.",
          "Decline the optional meeting. Keep the afternoon.",
        ],
        health: [
          "Hydrate, and skip the dramatic new regimen.",
          "If it hurts, stop. Today is not for heroics.",
        ],
        lost: [
          "It is nearby, and it will wait until you are calmer.",
          "Stop searching. You will walk past it later.",
        ],
        travel: [
          "If you can reschedule, reschedule.",
          "Double-check the ticket before you leave the house.",
        ],
      },
    },
    {
      id: "daikyo",
      jp: "大凶",
      reading: "daikyō",
      en: "Great misfortune",
      tone: "bad",
      weight: 6,
      summaries: [
        "Stay close to home and to known quantities.",
        "Do not sign, send, or confess anything final.",
        "A quiet day is a successful day. Treat it as such.",
      ],
      lines: {
        wish: [
          "The wish can live. The attempt should wait.",
          "No launches, no confessions, no grand emails.",
        ],
        love: [
          "Be decent, and postpone the talk.",
          "Today is a poor day to decide what someone meant.",
        ],
        work: [
          "Do maintenance. Debut nothing.",
          "If it can be undone, fine. If it cannot, wait.",
        ],
        health: [
          "Cancel the ambitious workout. Keep the ordinary one.",
          "An early night is the entire strategy.",
        ],
        lost: [
          "You will not find it by force today.",
          "Leave it. A calmer search works better.",
        ],
        travel: [
          "Stay. The road is not the point today.",
          "If you must go, take the way you already know, slowly.",
        ],
      },
    },
  ],
};
