/* Classical omikuji headings: 願事, 縁談, 商売, 病気, 失せ物, 旅立ち. */
var OMIKUJI = (function () {
  function L(en, ja, zh) {
    return { en: en, ja: ja, zh: zh };
  }

  return {
    categories: [
      { key: "wish", kanji: "願事", reading: "ねがいごと", gloss: L("Wish", "", "心愿") },
      { key: "love", kanji: "縁談", reading: "えんだん", gloss: L("Match", "", "姻缘") },
      { key: "work", kanji: "商売", reading: "しょうばい", gloss: L("Business", "", "买卖") },
      { key: "health", kanji: "病気", reading: "びょうき", gloss: L("Illness", "", "疾病") },
      { key: "lost", kanji: "失せ物", reading: "うせもの", gloss: L("Lost items", "", "失物") },
      { key: "travel", kanji: "旅立ち", reading: "たびだち", gloss: L("Travel", "", "出行") },
    ],
    colors: [
      { kanji: "朱", hex: "#c44536", name: L("vermilion", "朱色", "朱红") },
      { kanji: "藍", hex: "#2c4a6e", name: L("indigo", "藍色", "靛蓝") },
      { kanji: "金茶", hex: "#b8893d", name: L("gold", "金茶", "金茶") },
      { kanji: "萌黄", hex: "#5e7d55", name: L("moss", "萌黄", "萌黄") },
      { kanji: "墨", hex: "#2a2724", name: L("ink", "墨色", "墨色") },
      { kanji: "藤", hex: "#7d5e8a", name: L("wisteria", "藤色", "藤紫") },
      { kanji: "柿", hex: "#d4652f", name: L("persimmon", "柿色", "柿色") },
      { kanji: "生成り", hex: "#f4efe4", name: L("paper white", "生成り", "素白") },
    ],
    items: {
      en: [
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
      ja: [
        "予備のペン",
        "玄関に既にある傘",
        "二杯目のコーヒー。三杯目ではない",
        "捨てかけたレシート",
        "きれいな靴下",
        "一本早い電車",
        "紙のしおり",
        "窓側の席",
        "充電された電池",
        "無地の黒いシャツ",
        "短い買い物メモ",
        "まだ読んでいない一ページ",
      ],
      zh: [
        "一支备用笔",
        "门口那把已经有的伞",
        "第二杯咖啡，不是第三杯",
        "差点扔掉的收据",
        "干净袜子",
        "早一班车",
        "一枚纸书签",
        "靠窗的座位",
        "充满电的电池",
        "那件素黑衬衫",
        "一张短购物清单",
        "还没读的一页",
      ],
    },
    ranks: [
      {
        id: "daikichi",
        jp: "大吉",
        reading: "daikichi",
        gloss: L("Great blessing", "この上なく良い", "上上签"),
        tone: "good",
        weight: 6,
        summaries: L(
          [
            "The day is unusually cooperative. Do the thing.",
            "Plans will behave. This is rare. Write it down.",
            "You may proceed. The obstacles called in sick.",
          ],
          [
            "今日は妙に協力的だ。やれ。",
            "予定が従う。珍しい。書いておけ。",
            "進めてよい。障害は病欠だ。",
          ],
          [
            "今天难得听话。去做。",
            "计划会守规矩。少见。记下来。",
            "可以动手。障碍请了病假。",
          ]
        ),
        lines: {
          wish: L(
            [
              "Ask once, clearly. The answer is closer to yes than usual.",
              "A wish you have been editing is ready to leave the drafts.",
            ],
            [
              "一度だけ、はっきり頼め。答えはいつもより肯定に近い。",
              "直していた願いは、下書きを出てよい。",
            ],
            [
              "问一次，说清楚。答案比平时更接近可以。",
              "改了很久的那个愿望，可以离开草稿了。",
            ]
          ),
          love: L(
            [
              "They noticed. Do not overthink the noticing.",
              "Say the plain version. It will land.",
            ],
            [
              "相手は気づいている。その件を、こねるな。",
              "飾らないほうを言え。届く。",
            ],
            [
              "对方注意到了。别把这件事想复杂。",
              "说朴素的那版。能落到实处。",
            ]
          ),
          work: L(
            [
              "A small task will go unusually well. Do not announce this.",
              "The meeting will be shorter than the calendar claims.",
            ],
            [
              "小さな仕事が、異常にうまくいく。発表するな。",
              "会議は、予定が主張するより短い。",
            ],
            [
              "一件小事会异常顺利。别广而告之。",
              "会比日历上写的短。",
            ]
          ),
          health: L(
            [
              "Sleep will help more than a new routine.",
              "Your body is on your side today. Eat something with a color.",
            ],
            [
              "新しい規則より、眠ったほうが効く。",
              "今日の体は味方だ。色のあるものを食べよ。",
            ],
            [
              "睡觉比一套新规矩有用。",
              "今天身体站在你这边。吃点有颜色的东西。",
            ]
          ),
          lost: L(
            [
              "Check the second place you already checked.",
              "It is in the room you used last, not the one you suspect.",
            ],
            [
              "一度見た、その次の場所を見よ。",
              "疑っている部屋ではない。最後にいた部屋だ。",
            ],
            [
              "再查你已经查过的第二处。",
              "它在你最后待过的房间，不在你怀疑的那间。",
            ]
          ),
          travel: L(
            [
              "Leave ten minutes early. The day is punctual.",
              "The route you already know is the good one.",
            ],
            [
              "十分早く出よ。今日は時間に正確だ。",
              "知っている道が、良い道だ。",
            ],
            [
              "提前十分钟出门。今天守时。",
              "你已经认得的那条路，就是对的。",
            ]
          ),
        },
      },
      {
        id: "kichi",
        jp: "吉",
        reading: "kichi",
        gloss: L("Blessing", "良い", "上签"),
        tone: "good",
        weight: 16,
        summaries: L(
          [
            "A good day, with ordinary luck. That is enough.",
            "Something small will go right. Accept it without a speech.",
            "Favorable, in the unglamorous way.",
          ],
          [
            "良い日だ。普通の運で足りる。",
            "小さいことが、うまくいく。演説は不要。",
            "地味に良い。華はない。それでよい。",
          ],
          [
            "好日子，普通的运气。够了。",
            "有件小事会成。收下，不必致辞。",
            "顺利，是那种不体面的顺利。",
          ]
        ),
        lines: {
          wish: L(
            [
              "A modest wish clears. Save the grand one.",
              "Progress, not a miracle. Take the progress.",
            ],
            [
              "控えめな願いは通る。壮大なほうは取っておけ。",
              "奇跡ではない。前進だ。前進を取れ。",
            ],
            [
              "一个不大的愿望能过。宏大的那个先存着。",
              "不是奇迹，是进展。把进展拿走。",
            ]
          ),
          love: L(
            [
              "A short message beats a long one.",
              "Warmth is available if you keep it simple.",
            ],
            [
              "短い文が、長い文に勝つ。",
              "単純にしておけば、温度はある。",
            ],
            [
              "短消息胜过长消息。",
              "事情保持简单，温度就在。",
            ]
          ),
          work: L(
            [
              "Finish the thing in front of you. It counts.",
              "Someone will agree with you. Stay brief when they do.",
            ],
            [
              "目の前の一件を終えよ。それで数に入る。",
              "同意する人が出る。そのとき、短くあれ。",
            ],
            [
              "做完眼前这一件。它算数。",
              "会有人同意你。那时，说短一点。",
            ]
          ),
          health: L(
            [
              "A walk fixes more than the plan you were about to make.",
              "Drink water before you invent a problem.",
            ],
            [
              "これから作る計画より、歩いたほうが直る。",
              "問題を発明する前に、水を飲め。",
            ],
            [
              "走一走，比你正要制定的计划有用。",
              "先喝水，再发明问题。",
            ]
          ),
          lost: L(
            [
              "Look where you were standing, not where you were hurrying.",
              "It never left the bag.",
            ],
            [
              "急いでいた場所ではなく、立っていた場所を見よ。",
              "鞄から出ていない。",
            ],
            [
              "去看你站过的地方，不是你赶路的地方。",
              "它没离开过那个包。",
            ]
          ),
          travel: L(
            [
              "Delays stay minor. Bring a book anyway.",
              "The earlier option is the lucky one.",
            ],
            [
              "遅れは小さいままだ。それでも本は持っていけ。",
              "早いほうの選択が、当たりだ。",
            ],
            [
              "延误保持在小事。书还是带着。",
              "更早的那个选项是运气所在。",
            ]
          ),
        },
      },
      {
        id: "chukichi",
        jp: "中吉",
        reading: "chūkichi",
        gloss: L("Middle blessing", "真ん中の良い", "中上签"),
        tone: "mid",
        weight: 22,
        summaries: L(
          [
            "Better than average. Spend it on the work, not on optimism.",
            "The middle path is open. Take it before you improve it.",
            "Solid. Not cinematic. Solid is the point.",
          ],
          [
            "平均より良い。楽観ではなく、仕事に使え。",
            "中間の道は開いている。改良する前に、通れ。",
            "堅い。映画ではない。堅さが要点だ。",
          ],
          [
            "好于平均。把它花在事情上，不是花在乐观上。",
            "中间那条路是开的。先走，再改进。",
            "结实。不上镜。结实就是重点。",
          ]
        ),
        lines: {
          wish: L(
            [
              "Half of what you want is available today. Take that half.",
              "Refine the wish. The vague version will stall.",
            ],
            [
              "欲しいものの半分は、今日ある。その半分を取れ。",
              "願いを絞れ。曖昧な版は、止まる。",
            ],
            [
              "你想要的一半，今天有。拿走那一半。",
              "把愿望收窄。模糊的那版会停住。",
            ]
          ),
          love: L(
            [
              "Steady is the fortune. Grand gestures can wait.",
              "Be kind and specific. Skip the speech.",
            ],
            [
              "安定が、この籤だ。大袈裟は待て。",
              "親切に、具体的に。スピーチは省け。",
            ],
            [
              "稳，就是这支签。盛大的表示可以等。",
              "善意，并且具体。演讲省掉。",
            ]
          ),
          work: L(
            [
              "Useful work gets done. Impressive work can wait its turn.",
              "Ask one clear question. You will get a usable answer.",
            ],
            [
              "役に立つ仕事は片づく。立派な仕事は順番を待て。",
              "明確な質問を一つ。使える答えが返る。",
            ],
            [
              "有用的事会做完。漂亮的事排队。",
              "问一个清楚的问题。你会得到能用的回答。",
            ]
          ),
          health: L(
            [
              "Keep the usual routine. It is doing its job.",
              "Stretch, then stop optimizing your body.",
            ],
            [
              "いつもの調子を保て。それは働いている。",
              "伸びをして、体の最適化は止めよ。",
            ],
            [
              "保持原来的节奏。它正在起作用。",
              "伸个懒腰，然后停止优化身体。",
            ]
          ),
          lost: L(
            [
              "Retrace the last hour, slowly.",
              "Check a pocket you already trust.",
            ],
            [
              "最後の一時間を、ゆっくり戻れ。",
              "既に信用しているポケットを見よ。",
            ],
            [
              "把最后一小时慢慢走回去。",
              "查一个你本来就信任的口袋。",
            ]
          ),
          travel: L(
            [
              "Nothing dramatic. Pack light and leave on time.",
              "A familiar place will treat you well.",
            ],
            [
              "劇的なことはない。軽く詰めて、時間どおりに出よ。",
              "知っている場所が、よくしてくれる。",
            ],
            [
              "没什么戏剧性的。少带东西，准时出发。",
              "熟悉的地方会好好待你。",
            ]
          ),
        },
      },
      {
        id: "shokichi",
        jp: "小吉",
        reading: "shōkichi",
        gloss: L("Small blessing", "控えめに良い", "小吉"),
        tone: "mid",
        weight: 20,
        summaries: L(
          [
            "A modest win is available. It will not announce itself.",
            "Keep the request small. The answer will match.",
            "Fine, once you stop adding features to the day.",
          ],
          [
            "小さな勝ちはある。自分から名乗らない。",
            "頼みは小さく。答えはそれに揃う。",
            "今日に機能を足すのをやめれば、まあ良い。",
          ],
          [
            "有一个不大的赢面。它不会自我介绍。",
            "请求保持很小。回答会跟着小。",
            "停止给今天加功能，就还行。",
          ]
        ),
        lines: {
          wish: L(
            [
              "Ask for one thing, not a system.",
              "A small yes is the whole blessing. Notice it.",
            ],
            [
              "一つ頼め。仕組みは頼むな。",
              "小さな肯定が、籤のすべてだ。見逃すな。",
            ],
            [
              "要一件事，不要一套系统。",
              "一个小小的可以，就是全部签文。注意到它。",
            ]
          ),
          love: L(
            [
              "Low stakes, good odds. Suggest something simple.",
              "A quiet evening outperforms a plan with a theme.",
            ],
            [
              "賭け金は低く、確率は良い。単純な提案をせよ。",
              "静かな夜は、テーマのある計画に勝つ。",
            ],
            [
              "赌注低，概率不错。提议简单的事。",
              "安静的一晚，胜过一个有主题的计划。",
            ]
          ),
          work: L(
            [
              "One email, sent cleanly, is today's victory.",
              "Do the easy correct thing and leave the rest.",
            ],
            [
              "きれいに送ったメール一通が、今日の勝利だ。",
              "簡単で正しいことをして、残りは置け。",
            ],
            [
              "一封写干净的邮件，就是今天的胜利。",
              "做那件容易而且正确的事，其余放下。",
            ]
          ),
          health: L(
            [
              "An earlier night is worth more than a new rule.",
              "Eat lunch. The rest is commentary.",
            ],
            [
              "早い夜は、新しい規則より価値がある。",
              "昼を食べよ。残りは注釈だ。",
            ],
            [
              "早一点睡，比一条新规矩值钱。",
              "把午饭吃了。其余都是注释。",
            ]
          ),
          lost: L(
            [
              "It is close, and slightly obvious.",
              "Look down. Then look in the coat.",
            ],
            [
              "近い。そして、少し明白だ。",
              "下を見よ。それから上着の中を。",
            ],
            [
              "它就在附近，而且有点明显。",
              "先往下看。再看外套里。",
            ]
          ),
          travel: L(
            [
              "A short trip goes better than a long one.",
              "Nearby is lucky. Far can wait.",
            ],
            [
              "短い移動のほうが、長い移動より良い。",
              "近場が当たりだ。遠方は待てる。",
            ],
            [
              "短途比长途顺利。",
              "近处有运气。远处可以等。",
            ]
          ),
        },
      },
      {
        id: "suekichi",
        jp: "末吉",
        reading: "suekichi",
        gloss: L("Blessing, eventually", "終わりごろに良い", "好事在后头"),
        tone: "mid",
        weight: 16,
        summaries: L(
          [
            "Not yet. The good part is later, and it is real.",
            "Patience is the whole fortune. It is also the hard part.",
            "Start anyway. The blessing arrives after the boring part.",
          ],
          [
            "まだだ。良い部分は後で、そして実在する。",
            "忍耐が籤のすべてだ。そこが難しい。",
            "とにかく始めよ。吉は、退屈のあとから来る。",
          ],
          [
            "还没到。好的部分在后面，而且是真的。",
            "耐心就是整支签。也是难的那部分。",
            "还是开始。吉利在无聊之后抵达。",
          ]
        ),
        lines: {
          wish: L(
            [
              "Plant it today. Do not harvest it today.",
              "The wish is valid. The timing is the thing to adjust.",
            ],
            [
              "今日は植えよ。今日は刈るな。",
              "願いは有効だ。直すのは時期のほうだ。",
            ],
            [
              "今天种下。今天不要收。",
              "愿望成立。要调整的是时机。",
            ]
          ),
          love: L(
            [
              "Give it a week before you interpret the silence.",
              "Kindness now, clarity later. Keep that order.",
            ],
            [
              "沈黙を解釈する前に、一週間おけ。",
              "今は親切、明快は後。その順を守れ。",
            ],
            [
              "解释沉默之前，先给一周。",
              "现在善意，以后说明。保持这个顺序。",
            ]
          ),
          work: L(
            [
              "Begin the draft. The useful version comes second.",
              "A delay today protects the work. Let it.",
            ],
            [
              "下書きを始めよ。使える版は二番目だ。",
              "今日の遅れは、仕事を守る。させよ。",
            ],
            [
              "先写草稿。能用的版本是第二稿。",
              "今天的延迟在保护这件事。让它延迟。",
            ]
          ),
          health: L(
            [
              "Rest is part of the result.",
              "Recovery is slow and genuine. Let it be slow.",
            ],
            [
              "休みは、結果の一部だ。",
              "回復は遅く、本物だ。遅いままにせよ。",
            ],
            [
              "休息是结果的一部分。",
              "恢复得慢，而且是真的。让它慢。",
            ]
          ),
          lost: L(
            [
              "It turns up after you stop searching so hard.",
              "Tomorrow's ordinary routine finds it.",
            ],
            [
              "必死に探すのをやめたあと、出てくる。",
              "明日の普通の手順が、見つける。",
            ],
            [
              "等你不再那么用力找，它会出现。",
              "明天的日常会找到它。",
            ]
          ),
          travel: L(
            [
              "Go later. The trip improves by waiting.",
              "Book nothing irreversible before the weekend.",
            ],
            [
              "後で行け。待つと、旅は良くなる。",
              "週末の前に、取り消せない予約はするな。",
            ],
            [
              "晚一点再去。等一等，行程会变好。",
              "周末之前，别订不能反悔的票。",
            ]
          ),
        },
      },
      {
        id: "kyo",
        jp: "凶",
        reading: "kyō",
        gloss: L("Misfortune", "悪い", "下签"),
        tone: "bad",
        weight: 12,
        summaries: L(
          [
            "Postpone the irreversible. Today is for drafts.",
            "Fewer decisions, better day.",
            "The shrine suggests you wait. It is rarely this direct.",
          ],
          [
            "取り消せないことは、後日。今日は下書きの日だ。",
            "決断を減らせ。そのほうが良い日になる。",
            "神社は待てと言う。ここまで直接的なのは珍しい。",
          ],
          [
            "不能反悔的事，往后放。今天只写下草稿。",
            "少做决定，这一天会好一些。",
            "神社让你等。它很少说得这么直。",
          ]
        ),
        lines: {
          wish: L(
            [
              "Keep the wish. Spend today on something smaller.",
              "Hold the request. A later day will carry it better.",
            ],
            [
              "願いは持っておれ。今日は、もっと小さいことに使え。",
              "頼みは保留だ。後の日のほうが、よく運ぶ。",
            ],
            [
              "愿望留着。今天拿去办更小的事。",
              "请求先按住。往后的某一天更扛得住。",
            ]
          ),
          love: L(
            [
              "Silence is the correct reply.",
              "Save the clarifying conversation for a calmer evening.",
            ],
            [
              "沈黙が、正しい返信だ。",
              "はっきりさせる会話は、より静かな夜まで取れ。",
            ],
            [
              "沉默是正确的回复。",
              "把说清楚的那次谈话，留到更平静的晚上。",
            ]
          ),
          work: L(
            [
              "Send the email tomorrow. Today's version has opinions.",
              "Decline the optional meeting. Keep the afternoon.",
            ],
            [
              "メールは明日送れ。今日の版には、意見がある。",
              "任意の会議は断れ。午後を残せ。",
            ],
            [
              "邮件明天再发。今天这版带着意见。",
              "可选的会，推掉。把下午留下。",
            ]
          ),
          health: L(
            [
              "Hydrate, and skip the dramatic new regimen.",
              "If it hurts, stop. Today is not for heroics.",
            ],
            [
              "水を飲め。劇的な新しい養生は、飛ばせ。",
              "痛むなら、やめよ。今日は英雄の日ではない。",
            ],
            [
              "把水喝了，跳过那套戏剧性的新养生。",
              "疼就停下。今天不适合当英雄。",
            ]
          ),
          lost: L(
            [
              "It is nearby, and it will wait until you are calmer.",
              "Stop searching. You will walk past it later.",
            ],
            [
              "近くにある。あなたが落ち着くまで、待つ。",
              "探すのはやめよ。後で、その脇を通る。",
            ],
            [
              "它在附近，会等到你平静一些。",
              "停止寻找。你稍后会从它旁边走过。",
            ]
          ),
          travel: L(
            [
              "If you can reschedule, reschedule.",
              "Double-check the ticket before you leave the house.",
            ],
            [
              "動かせるなら、動かせ。",
              "家を出る前に、切符を二度見よ。",
            ],
            [
              "能改期就改期。",
              "出门之前，把票再核对一遍。",
            ]
          ),
        },
      },
      {
        id: "daikyo",
        jp: "大凶",
        reading: "daikyō",
        gloss: L("Great misfortune", "かなり悪い", "下下签"),
        tone: "bad",
        weight: 6,
        summaries: L(
          [
            "Stay close to home and to known quantities.",
            "Do not sign, send, or confess anything final.",
            "A quiet day is a successful day. Treat it as such.",
          ],
          [
            "家と、知っているもののそばにいろ。",
            "最終的な署名も、送信も、告白も、するな。",
            "静かな日が、成功だ。そのように扱え。",
          ],
          [
            "待在家里，待在你认得的东西旁边。",
            "别签、别发、别做最终的告白。",
            "安静的一天就是成功。就这么过。",
          ]
        ),
        lines: {
          wish: L(
            [
              "The wish can live. The attempt should wait.",
              "No launches, no confessions, no grand emails.",
            ],
            [
              "願いは生きていてよい。実行は待て。",
              "発表も、告白も、壮大なメールも、なし。",
            ],
            [
              "愿望可以活着。尝试应当等待。",
              "不要发布，不要告白，不要写宏大的邮件。",
            ]
          ),
          love: L(
            [
              "Be decent, and postpone the talk.",
              "Today is a poor day to decide what someone meant.",
            ],
            [
              "まともにして、話は後日。",
              "相手の意味を決める日としては、今日は悪い。",
            ],
            [
              "体面一点，谈话改日。",
              "今天不适合判定对方是什么意思。",
            ]
          ),
          work: L(
            [
              "Do maintenance. Debut nothing.",
              "If it can be undone, fine. If it cannot, wait.",
            ],
            [
              "整備をせよ。初公開はするな。",
              "取り消せるなら、よい。取り消せないなら、待て。",
            ],
            [
              "做维护。不要首演。",
              "能撤回的，可以。不能撤回的，等。",
            ]
          ),
          health: L(
            [
              "Cancel the ambitious workout. Keep the ordinary one.",
              "An early night is the entire strategy.",
            ],
            [
              "野心的な運動は取り消せ。普通のほうは残せ。",
              "早い夜が、戦略のすべてだ。",
            ],
            [
              "取消那场野心勃勃的锻炼。留下普通的那次。",
              "早睡就是全部策略。",
            ]
          ),
          lost: L(
            [
              "You will not find it by force today.",
              "Leave it. A calmer search works better.",
            ],
            [
              "今日、力ずくでは見つからない。",
              "置いておけ。落ち着いた検索のほうが、うまくいく。",
            ],
            [
              "今天靠用力是找不到的。",
              "先放下。平静一点再找，更有效。",
            ]
          ),
          travel: L(
            [
              "Stay. The road is not the point today.",
              "If you must go, take the way you already know, slowly.",
            ],
            [
              "留まれ。今日の要点は、道ではない。",
              "どうしても行くなら、知っている道を、遅く。",
            ],
            [
              "留下。今天的重点不是那条路。",
              "如果必须走，走你已经认得的路，慢慢走。",
            ]
          ),
        },
      },
    ],
  };
})();
