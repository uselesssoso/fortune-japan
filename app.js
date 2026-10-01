(function () {
  "use strict";

  var data = window.OMIKUJI;
  var seen = Object.create(null);

  var form = document.getElementById("draw-form");
  var nameInput = document.getElementById("name");
  var drawButton = document.getElementById("draw");
  var shrineHit = document.getElementById("shrine-hit");
  var shaker = document.getElementById("shaker");
  var stickNo = document.getElementById("stick-no");
  var slip = document.getElementById("slip");
  var copyButton = document.getElementById("copy");
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
          drawButton.textContent = "Draw again";
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
    if (busy) drawButton.textContent = "Shaking…";
  }

  function renderSlip(fortune) {
    slip.dataset.tone = fortune.rank.tone;
    slip.dataset.rank = fortune.rank.id;

    text("slip-number", "No. " + fortune.number);
    text("slip-when", fortune.named ? "Good until midnight." : "A one-time draw.");
    text("rank-jp", fortune.rank.jp);
    text("rank-reading", fortune.rank.reading);
    text("rank-en", fortune.rank.en);
    text("summary", fortune.summary);

    var forLine = document.getElementById("slip-for");
    if (fortune.named) {
      forLine.hidden = false;
      forLine.textContent = "For " + fortune.displayName + " · " + formatDate(fortune.date);
    } else {
      forLine.hidden = false;
      forLine.textContent = "Drawn at random · " + formatDate(fortune.date);
    }

    var list = document.getElementById("categories");
    list.replaceChildren();
    data.categories.forEach(function (category) {
      var row = document.createElement("div");
      row.className = "category";

      var label = document.createElement("dt");
      var jp = document.createElement("span");
      jp.lang = "ja";
      jp.textContent = category.jp;
      var en = document.createElement("span");
      en.textContent = category.en;
      label.append(jp, en);

      var body = document.createElement("dd");
      body.textContent = fortune.lines[category.key];

      row.append(label, body);
      list.append(row);
    });

    var swatch = document.getElementById("color-swatch");
    swatch.style.background = fortune.color.hex;
    text("color-name", fortune.color.name);
    text("color-jp", fortune.color.jp);
    text("item-name", fortune.item);

    var note = document.getElementById("repeat-note");
    if (fortune.repeat) {
      note.hidden = false;
      note.textContent = "Same day, same answer. The shrine does not renegotiate.";
    } else if (!fortune.named) {
      note.hidden = false;
      note.textContent = "Add a name if you want this held until midnight.";
    } else {
      note.hidden = true;
      note.textContent = "";
    }

    copyButton.textContent = "Copy fortune";
    copyStatus.textContent = "";
  }

  function buildFortune(rawName) {
    var displayName = rawName.trim().replace(/\s+/g, " ").slice(0, 40);
    var named = displayName.length > 0;
    var date = new Date();
    var seed = named ? normalize(displayName) + "|" + dateKey(date) : null;
    var rand = makeRng(seed);
    var rank = pickWeighted(rand, data.ranks);
    var summary = pick(rand, rank.summaries);
    var lines = {};
    data.categories.forEach(function (category) {
      lines[category.key] = pick(rand, rank.lines[category.key]);
    });
    return {
      displayName: displayName,
      named: named,
      date: date,
      seed: seed,
      rank: rank,
      summary: summary,
      lines: lines,
      color: pick(rand, data.colors),
      item: pick(rand, data.items),
      number: 1 + Math.floor(rand() * 100),
    };
  }

  function formatPlain(fortune) {
    var lines = [
      "fortune-japan",
      fortune.rank.jp + " · " + fortune.rank.en,
      "No. " + fortune.number,
      "",
      fortune.summary,
      "",
    ];
    data.categories.forEach(function (category) {
      lines.push(category.en + " — " + fortune.lines[category.key]);
    });
    lines.push(
      "",
      "Lucky color: " + fortune.color.name,
      "Lucky item: " + fortune.item,
      "",
      fortune.named
        ? "For " + fortune.displayName + ", good until midnight."
        : "Drawn at random.",
      "Tells your fortune. Accuracy not included."
    );
    return lines.join("\n");
  }

  function copyFortune(fortune) {
    var plain = formatPlain(fortune);
    writeClipboard(plain).then(function (ok) {
      copyButton.textContent = ok ? "Copied" : "Copy failed";
      copyStatus.textContent = ok
        ? "Copied to the clipboard."
        : "Could not copy. Select the slip and copy it yourself.";
      window.clearTimeout(copyTimer);
      copyTimer = window.setTimeout(function () {
        copyButton.textContent = "Copy fortune";
        copyStatus.textContent = "";
      }, 2400);
    });
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
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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

  function pick(rand, list) {
    return list[Math.floor(rand() * list.length)];
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
    var keys = data.categories.map(function (category) {
      return category.key;
    });
    data.ranks.forEach(function (rank) {
      if (!rank.summaries.length) throw new Error("Missing summaries for " + rank.id);
      keys.forEach(function (key) {
        if (!rank.lines[key] || !rank.lines[key].length) {
          throw new Error("Missing lines for " + rank.id + " " + key);
        }
      });
    });
  }
})();
