(function () {
  "use strict";

  var data = window.OMIKUJI;
  var seen = Object.create(null);
  var STORAGE_KEY = "fortune-japan-lang";
  var lang = loadLang();
  var UI = {
    en: {
      tagline: "Tells your fortune. Accuracy not included.",
      name: "Name",
      optional: "optional",
      namePlaceholder: "For a fortune that stays put today",
      hint: "Same name, same day, same answer. Your name stays in the browser.",
      draw: "Draw a fortune",
      shaking: "Shaking…",
      drawAgain: "Draw again",
      untilMidnight: "Good until midnight.",
      oneTime: "A one-time draw.",
      randomDraw: "Drawn at random",
      luckyColor: "Lucky color",
      luckyItem: "Lucky item",
      renegotiate: "Same day, same answer. The shrine does not renegotiate.",
      addName: "Add a name if you want this held until midnight.",
      copy: "Copy fortune",
      copied: "Copied",
      copyFailed: "Copy failed",
      copiedStatus: "Copied to the clipboard.",
      copyFailedStatus: "Could not copy. Select the slip and copy it yourself.",
      shareX: "Share on X",
      share: "Share",
      signed: "Signed",
      langLabel: "Language",
      numberPrefix: "No. ",
      heldNamed: "For {name}, good until midnight.",
      heldRandom: "Drawn at random.",
      title: "fortune-japan — Tells your fortune",
    },
    ja: {
      tagline: "運勢を告げる。精度は保証しない。",
      name: "名前",
      optional: "任意",
      namePlaceholder: "今日の籤を固定するなら",
      hint: "同じ名前、同じ日、同じ答え。名前はこのブラウザの中だけ。",
      draw: "籤を引く",
      shaking: "振っています…",
      drawAgain: "もう一度",
      untilMidnight: "深夜まで有効。",
      oneTime: "一回きり。",
      randomDraw: "名前なし",
      luckyColor: "ラッキーカラー",
      luckyItem: "ラッキーアイテム",
      renegotiate: "同じ日、同じ答え。神社は交渉に応じない。",
      addName: "深夜まで残すなら、名前を入れよ。",
      copy: "籤をコピー",
      copied: "コピーした",
      copyFailed: "失敗",
      copiedStatus: "クリップボードにコピーした。",
      copyFailedStatus: "コピーできなかった。籤を選択して写せ。",
      shareX: "Xで共有",
      share: "共有",
      signed: "署名",
      langLabel: "言語",
      numberPrefix: "第",
      heldNamed: "{name}、深夜まで有効。",
      heldRandom: "名前なしの一回。",
      title: "fortune-japan — 運勢を告げる",
    },
    zh: {
      tagline: "告诉你运势。准不准另说。",
      name: "名字",
      optional: "可选",
      namePlaceholder: "用来把今天的签固定住",
      hint: "同一个名字，同一天，同一个答案。名字只留在这台浏览器里。",
      draw: "抽一签",
      shaking: "摇签中…",
      drawAgain: "再抽一次",
      untilMidnight: "午夜前有效。",
      oneTime: "只此一次。",
      randomDraw: "未留名",
      luckyColor: "幸运色",
      luckyItem: "幸运物",
      renegotiate: "同一天，同一个答案。神社不还价。",
      addName: "想留到午夜，就写个名字。",
      copy: "复制签文",
      copied: "已复制",
      copyFailed: "复制失败",
      copiedStatus: "已复制到剪贴板。",
      copyFailedStatus: "没复制成。选中签文，自己复制。",
      shareX: "分享到 X",
      share: "分享",
      signed: "署名",
      langLabel: "语言",
      numberPrefix: "第",
      heldNamed: "{name}，午夜前有效。",
      heldRandom: "未留名，随机一抽。",
      title: "fortune-japan — 告诉你运势",
    },
  };

  var form = document.getElementById("draw-form");
  var nameInput = document.getElementById("name");
  var drawButton = document.getElementById("draw");
  var shrineHit = document.getElementById("shrine-hit");
  var shaker = document.getElementById("shaker");
  var stickNo = document.getElementById("stick-no");
  var slip = document.getElementById("slip");
  var copyButton = document.getElementById("copy");
  var shareX = document.getElementById("share-x");
  var shareButton = document.getElementById("share");
  var copyStatus = document.getElementById("copy-status");

  var drawing = false;
  var current = null;
  var copyTimer = 0;

  validateData();

  if (navigator.share) {
    shareButton.hidden = false;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    beginDraw();
  });

  shrineHit.addEventListener("click", function () {
    if (!drawing) form.requestSubmit();
  });

  document.getElementById("lang-switch").addEventListener("click", function (event) {
    var button = event.target.closest("[data-lang]");
    if (!button) return;
    setLang(button.getAttribute("data-lang"));
  });

  copyButton.addEventListener("click", function () {
    if (!current) return;
    copyFortune(current);
  });

  shareButton.addEventListener("click", function () {
    if (!current) return;
    shareFortune(current);
  });

  function beginDraw() {
    if (drawing) return;
    drawing = true;
    setBusy(true);

    var fortune = buildFortune(nameInput.value);
    var repeat = fortune.seed && seen[fortune.seed];
    if (fortune.seed) seen[fortune.seed] = true;
    fortune.repeat = Boolean(repeat);

    stickNo.textContent = String(fortune.number);
    slip.hidden = true;
    shaker.classList.remove("is-out");

    var reduced = prefersReducedMotion();
    var resetWait = reduced ? 0 : 160;

    window.setTimeout(function () {
      if (!reduced) shaker.classList.add("is-shaking");
      window.setTimeout(function () {
        shaker.classList.remove("is-shaking");
        shaker.classList.add("is-out");
        window.setTimeout(function () {
          renderSlip(fortune);
          current = fortune;
          slip.hidden = false;
          restartAnimation(slip);
          setBusy(false);
          drawing = false;
          drawButton.textContent = t("drawAgain");
          slip.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "nearest",
          });
        }, reduced ? 0 : 520);
      }, reduced ? 0 : 780);
    }, resetWait);
  }

  function setBusy(busy) {
    drawButton.disabled = busy;
    shrineHit.classList.toggle("is-busy", busy);
    shaker.setAttribute("aria-busy", busy ? "true" : "false");
    if (busy) drawButton.textContent = t("shaking");
  }

  function renderSlip(fortune) {
    slip.dataset.tone = fortune.rank.tone;
    slip.dataset.rank = fortune.rank.id;

    text("slip-number", numberLabel(fortune.number));
    text("slip-when", fortune.named ? t("untilMidnight") : t("oneTime"));
    text("rank-jp", fortune.rank.jp);
    text("rank-reading", fortune.rank.reading);
    text("rank-en", fortune.rank.gloss[lang]);
    text("summary", summaryText(fortune));

    var forLine = document.getElementById("slip-for");
    forLine.hidden = false;
    forLine.textContent = personLine(fortune);

    var list = document.getElementById("categories");
    list.replaceChildren();
    data.categories.forEach(function (category) {
      var row = document.createElement("div");
      row.className = "category";

      var label = document.createElement("dt");
      var ruby = document.createElement("ruby");
      ruby.lang = "ja";
      ruby.append(document.createTextNode(category.kanji));
      var rt = document.createElement("rt");
      rt.textContent = category.reading;
      ruby.append(rt);
      label.append(ruby);
      if (lang !== "ja" && category.gloss[lang]) {
        var gloss = document.createElement("span");
        gloss.className = "gloss";
        gloss.textContent = category.gloss[lang];
        label.append(gloss);
      }

      var body = document.createElement("dd");
      body.textContent = lineText(fortune, category.key);

      row.append(label, body);
      list.append(row);
    });

    var swatch = document.getElementById("color-swatch");
    swatch.style.background = fortune.color.hex;
    text("color-name", fortune.color.name[lang]);
    var colorKanji = document.getElementById("color-jp");
    colorKanji.hidden = lang === "ja";
    colorKanji.textContent = fortune.color.kanji;
    text("item-name", data.items[lang][fortune.itemIndex]);

    var note = document.getElementById("repeat-note");
    if (fortune.repeat) {
      note.hidden = false;
      note.textContent = t("renegotiate");
    } else if (!fortune.named) {
      note.hidden = false;
      note.textContent = t("addName");
    } else {
      note.hidden = true;
      note.textContent = "";
    }

    copyButton.textContent = t("copy");
    copyStatus.textContent = "";
    shareX.href = xIntentUrl(fortune);
  }

  function buildFortune(rawName) {
    var displayName = rawName.trim().replace(/\s+/g, " ").slice(0, 40);
    var named = displayName.length > 0;
    var date = new Date();
    var seed = named ? normalize(displayName) + "|" + dateKey(date) : null;
    var rand = makeRng(seed);
    var rank = pickWeighted(rand, data.ranks);
    var summaryIndex = Math.floor(rand() * rank.summaries.en.length);
    var lineIndexes = {};
    data.categories.forEach(function (category) {
      lineIndexes[category.key] = Math.floor(rand() * rank.lines[category.key].en.length);
    });
    return {
      displayName: displayName,
      named: named,
      date: date,
      seed: seed,
      rank: rank,
      summaryIndex: summaryIndex,
      lineIndexes: lineIndexes,
      color: data.colors[Math.floor(rand() * data.colors.length)],
      itemIndex: Math.floor(rand() * data.items.en.length),
      number: 1 + Math.floor(rand() * 100),
    };
  }

  function formatPlain(fortune) {
    var lines = [
      "fortune-japan",
      fortune.rank.jp + " · " + fortune.rank.gloss[lang],
      numberLabel(fortune.number),
      "",
      summaryText(fortune),
      "",
    ];
    data.categories.forEach(function (category) {
      lines.push(categoryLabel(category) + " — " + lineText(fortune, category.key));
    });
    lines.push(
      "",
      t("luckyColor") + ": " + fortune.color.name[lang],
      t("luckyItem") + ": " + data.items[lang][fortune.itemIndex],
      "",
      fortune.named
        ? t("heldNamed").replace("{name}", fortune.displayName)
        : t("heldRandom"),
      t("tagline")
    );
    return lines.join("\n");
  }

  function copyFortune(fortune) {
    var plain = formatPlain(fortune);
    writeClipboard(plain).then(function (ok) {
      copyButton.textContent = ok ? t("copied") : t("copyFailed");
      copyStatus.textContent = ok ? t("copiedStatus") : t("copyFailedStatus");
      window.clearTimeout(copyTimer);
      copyTimer = window.setTimeout(function () {
        copyButton.textContent = t("copy");
        copyStatus.textContent = "";
      }, 2400);
    });
  }

  var SITE_URL = "https://uselesssoso.github.io/fortune-japan/";
  var X_MAX = 280;
  var X_URL_LENGTH = 23;
  var X_RANGES = [
    [0, 4351, 100],
    [8192, 8205, 100],
    [8208, 8223, 100],
    [8242, 8247, 100],
  ];

  function charWeight(code) {
    for (var i = 0; i < X_RANGES.length; i += 1) {
      if (code >= X_RANGES[i][0] && code <= X_RANGES[i][1]) return X_RANGES[i][2];
    }
    return 200;
  }

  function weightedLength(value) {
    var units = 0;
    for (var i = 0; i < value.length; ) {
      var code = value.codePointAt(i);
      units += charWeight(code);
      i += code > 65535 ? 2 : 1;
    }
    return units / 100;
  }

  function xLead(rank) {
    var gloss = rank.gloss[lang];
    if (lang === "ja") return rank.jp + "（" + gloss + "）を引いた。";
    if (lang === "zh") return "抽到" + rank.jp + "（" + gloss + "）：";
    return "I drew " + rank.jp + " (" + gloss + "): ";
  }

  function xText(fortune) {
    var lead = xLead(fortune.rank);
    var summary = summaryText(fortune);
    var budget = X_MAX - X_URL_LENGTH - 1;
    var full = lead + summary;
    if (weightedLength(full) <= budget) return full;
    var ellipsis = "…";
    var room = budget - weightedLength(lead) - weightedLength(ellipsis);
    var trimmed = "";
    var used = 0;
    for (var i = 0; i < summary.length; ) {
      var code = summary.codePointAt(i);
      var weight = charWeight(code) / 100;
      if (used + weight > room) break;
      var step = code > 65535 ? 2 : 1;
      trimmed += summary.slice(i, i + step);
      used += weight;
      i += step;
    }
    trimmed = trimmed.replace(/\s+\S*$/, "").trim();
    if (!trimmed) trimmed = summary.slice(0, 1);
    return lead + trimmed + ellipsis;
  }

  function xIntentUrl(fortune) {
    return (
      "https://x.com/intent/post?text=" +
      encodeURIComponent(xText(fortune)) +
      "&url=" +
      encodeURIComponent(SITE_URL)
    );
  }

  function shareFortune(fortune) {
    var plain = formatPlain(fortune);
    navigator
      .share({ title: "fortune-japan", text: plain })
      .catch(function (error) {
        if (error && error.name === "AbortError") return;
        copyFortune(fortune);
      });
  }

  function writeClipboard(value) {
    return new Promise(function (resolve) {
      var settled = false;
      function finish(ok) {
        if (settled) return;
        settled = true;
        resolve(ok);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(
          function () {
            finish(true);
          },
          function () {
            finish(fallbackCopy(value));
          }
        );
        window.setTimeout(function () {
          if (!settled) finish(fallbackCopy(value));
        }, 500);
        return;
      }
      finish(fallbackCopy(value));
    });
  }

  function fallbackCopy(value) {
    var area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (error) {
      ok = false;
    }
    area.remove();
    return ok;
  }

  function text(id, value) {
    document.getElementById(id).textContent = value;
  }

  function restartAnimation(element) {
    element.classList.remove("reveal");
    void element.offsetWidth;
    element.classList.add("reveal");
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function normalize(name) {
    return name.toLowerCase();
  }

  function dateKey(date) {
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    return date.getFullYear() + "-" + month + "-" + day;
  }

  function formatDate(date) {
    var locale = lang === "ja" ? "ja-JP" : lang === "zh" ? "zh-CN" : "en-GB";
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function t(key) {
    return UI[lang][key];
  }

  function loadLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "ja" || stored === "zh") return stored;
    } catch (error) {
      return "en";
    }
    return "en";
  }

  function setLang(next) {
    if (next !== "en" && next !== "ja" && next !== "zh") next = "en";
    lang = next;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      /* keep the choice for this visit */
    }
    applyStatic();
  }

  function applyStatic() {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
    document.title = t("title");
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    var group = document.getElementById("lang-switch");
    group.setAttribute("aria-label", t("langLabel"));
    group.querySelectorAll("[data-lang]").forEach(function (button) {
      var on = button.getAttribute("data-lang") === lang;
      button.setAttribute("aria-checked", on ? "true" : "false");
      button.classList.toggle("is-on", on);
    });
    shareX.textContent = t("shareX");
    shareButton.textContent = t("share");
    if (drawing) drawButton.textContent = t("shaking");
    else drawButton.textContent = current ? t("drawAgain") : t("draw");
    if (current) renderSlip(current);
    else copyButton.textContent = t("copy");
  }

  function summaryText(fortune) {
    return fortune.rank.summaries[lang][fortune.summaryIndex];
  }

  function lineText(fortune, key) {
    return fortune.rank.lines[key][lang][fortune.lineIndexes[key]];
  }

  function categoryLabel(category) {
    var ruby = category.kanji + "（" + category.reading + "）";
    if (lang === "ja" || !category.gloss[lang]) return ruby;
    return ruby + " " + category.gloss[lang];
  }

  function numberLabel(number) {
    if (lang === "ja") return "第" + number + "番";
    if (lang === "zh") return "第" + number + "签";
    return "No. " + number;
  }

  function personLine(fortune) {
    var date = formatDate(fortune.date);
    if (fortune.named) {
      if (lang === "en") return "For " + fortune.displayName + " · " + date;
      return fortune.displayName + " · " + date;
    }
    return t("randomDraw") + " · " + date;
  }

  function hashString(value) {
    var hash = 2166136261;
    for (var i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    var state = seed >>> 0;
    return function () {
      state = (state + 0x6d2b79f5) >>> 0;
      var t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function makeRng(seed) {
    if (seed == null) {
      var buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      return mulberry32(buf[0]);
    }
    return mulberry32(hashString(seed));
  }

  function pickWeighted(rand, list) {
    var total = 0;
    for (var i = 0; i < list.length; i += 1) total += list[i].weight;
    var cursor = rand() * total;
    for (var j = 0; j < list.length; j += 1) {
      cursor -= list[j].weight;
      if (cursor < 0) return list[j];
    }
    return list[list.length - 1];
  }

  function validateData() {
    var codes = ["en", "ja", "zh"];
    if (data.items.ja.length !== data.items.en.length || data.items.zh.length !== data.items.en.length) {
      throw new Error("Item lists differ in length");
    }
    data.ranks.forEach(function (rank) {
      codes.forEach(function (code) {
        if (rank.summaries[code].length !== rank.summaries.en.length) {
          throw new Error("Summary length " + rank.id + " " + code);
        }
      });
      data.categories.forEach(function (category) {
        var bundle = rank.lines[category.key];
        if (!bundle) throw new Error("Missing " + rank.id + " " + category.key);
        codes.forEach(function (code) {
          if (!bundle[code] || bundle[code].length !== bundle.en.length) {
            throw new Error("Line length " + rank.id + " " + category.key + " " + code);
          }
        });
      });
    });
  }

  applyStatic();
})();
