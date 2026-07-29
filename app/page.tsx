"use client";

import { type FocusEvent, type FormEvent, useEffect, useRef, useState } from "react";

const bg = "/storyboards/angkor/";
const video = "/videos/angkor/";

const freePreviewPanels = [
  {
    image: "09-title-seen-final.png",
    no: "09",
    kicker: "第一章",
    title: "被看見的那一面",
    lines: ["Rin 坐在車廂陰影裡。", "第一頁，準備翻開。"],
    tone: "title",
  },
  {
    image: "09-story-open-book-final.png",
    no: "09-A",
    kicker: "翻頁",
    title: "第一頁，不是答案。",
    lines: ["它只是把你一直避開的地方，放到燈下。"],
    tone: "story",
  },
  {
    image: "09-story-window-reflection-final.png",
    no: "09-B",
    kicker: "倒影",
    title: "是你一直避開的那一面。",
    lines: ["窗外掠過的神廟，不只在外面。"],
    tone: "story",
  },
  {
    image: "09-book-result-final.png",
    no: "09-C",
    kicker: "書面分析",
    title: "第一頁｜被看見的那一面",
    lines: ["你外在看起來很穩。", "但心裡其實一直在衡量。", "你不是沒有方向。", "你只是習慣先替自己留退路。"],
    tone: "book",
  },
  {
    image: "10-title-repeat-final.png",
    no: "10",
    kicker: "第二章",
    title: "反覆出現的選擇",
    lines: ["三條軌道亮起。", "同一個問題，換了入口回來。"],
    tone: "title",
  },
  {
    image: "10-story-ticket-lines-final.png",
    no: "10-A",
    kicker: "票孔發光",
    title: "你以為是新的問題。",
    lines: ["其實只是同一條路線，換了入口。"],
    tone: "story",
  },
  {
    image: "10-story-loop-station-final.png",
    no: "10-B",
    kicker: "迴圈車站",
    title: "你不是卡住。",
    lines: ["你只是還沒看清，自己反覆選了什麼。"],
    tone: "story",
  },
  {
    image: "10-book-result-final.png",
    no: "10-C",
    kicker: "書面分析",
    title: "第二頁｜反覆出現的選擇",
    lines: ["工作裡，你先承擔。", "關係裡，你先觀察。", "人生裡，你總是晚一點相信自己。"],
    tone: "book",
  },
  {
    image: "11-title-code.png",
    no: "11",
    kicker: "第三章",
    title: "命格暗號",
    lines: ["懷錶、車票與書本，三條線在桌面交會。"],
    tone: "title",
  },
  {
    image: "11-story-symbol.png",
    no: "11-A",
    kicker: "符號浮現",
    title: "這不是一句安慰。",
    lines: ["它是你紀錄裡，早就留下的軌道。"],
    tone: "story",
  },
  {
    image: "11-story-seal-touch.png",
    no: "11-B",
    kicker: "封印線",
    title: "你的紀錄裡，本來就有這條軌道。",
    lines: ["只是你一直把它當成偶然。"],
    tone: "story",
  },
  {
    image: "11-book-result.png",
    no: "11-C",
    kicker: "書面分析",
    title: "第三頁｜命格暗號",
    lines: ["你的命格：開路者。", "你擅長先承擔壓力。", "也容易把需求藏起來。", "真正的轉向，是學會讓別人看見你。"],
    tone: "book-dark",
  },
  {
    image: "12-title-locked.png",
    no: "12",
    kicker: "封印頁",
    title: "尚未開封的頁面",
    lines: ["免費預覽，到這裡剛好。"],
    tone: "locked",
  },
  {
    image: "12-locked-chapters.png",
    no: "12-A",
    kicker: "後續章節",
    title: "列車仍在前行",
    lines: ["第七章｜關係迴圈的觸發點", "第八章｜界線與靠近的時機", "第九章｜承擔者的轉向密語"],
    tone: "locked-list",
  },
  {
    image: "13-rin-offer.png",
    no: "13",
    kicker: "Rin 收尾",
    title: "完整班次表在我手上。",
    lines: ["要不要看看，下一站會把你帶去哪？"],
    tone: "offer",
  },
];

const dispatchBeats = [
  "0-3 秒：車票啟動，孔洞亮起，三條金色路線從桌面延伸。",
  "3-10 秒：第一人稱穿過神廟地下車站，牆面高棉刻文依序甦醒。",
  "10-14 秒：黑色列車從月台黑暗中駛出，Rin 在車門內伸手。",
  "14-20 秒：列車穿過雨夜叢林，三條軌道在石像隧道前合成一條。",
  "20-25 秒：回到車廂桌前，Rin 再次剪票，桌面化成路線圖。",
  "25-30 秒：懷錶停止，黑色命運書落下，無縫接等待循環。",
];

const waitingLines = [
  "The archive is finding your route.",
  "Reading the record you left behind.",
  "Tracing the choices that keep returning.",
  "Locating the station you are standing at.",
];

const plans = [
  { name: "Single Route", price: "US$39", desc: "核心問題、90 天提醒、一份行動處方" },
  { name: "Transfer Set", price: "US$63", desc: "路線報告、職涯合作班次、關係避雷時刻" },
  { name: "Full Midnight Archive", price: "US$79", desc: "完整人生路線、金錢與關係分岔、30 天轉站清單" },
];

function Panel({
  image,
  children,
  className = "",
}: {
  image: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`preview-panel ${className}`}>
      <img src={`${bg}${image}`} alt="" />
      {children}
    </section>
  );
}

function VideoPanel({
  src,
  kicker,
  title,
  note,
  loop = false,
  autoPlay = false,
  className = "",
}: {
  src: string;
  kicker: string;
  title: string;
  note: string;
  loop?: boolean;
  autoPlay?: boolean;
  className?: string;
}) {
  return (
    <section className={`video-panel ${className}`}>
      <video
        src={`${video}${src}`}
        autoPlay={autoPlay}
        muted
        playsInline
        loop={loop}
        preload="metadata"
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
      />
      <div className="video-caption">
        <p>{note}</p>
      </div>
    </section>
  );
}

const introSequence = [
  {
    src: "01-cover-opening.mp4",
    kicker: "01V / 撿起車票",
    title: "Rin 走進黑色車門，車票開始發光",
    note: "你撿起車票的那一刻，門後的神廟車站開始醒來。",
  },
  {
    src: "02-station-entry-a.mp4",
    kicker: "02V-A / 進入車站",
    title: "第一人稱穿過黑色車門，跟著 Rin 進入神廟午夜車站",
    note: "跟上 Rin。這裡不是出口，是另一段路線的入口。",
  },
  {
    src: "03-station-entry-b.mp4",
    kicker: "02V-B / 抵達驗票口",
    title: "深入車站，抵達登記櫃台",
    note: "把名字留下，車站才知道該替誰開門。",
  },
];

const introCutoffs = [5, 14.5, 14.5];

const analysisSequence = [
  {
    src: "04-waiting-analysis-a.mp4",
    kicker: "07V-A / 資料已送出",
    title: "列車接收資料，Rin 剪票後引入車廂",
    note: "你的記錄已經進站，列車會把它帶到該去的地方。",
  },
  {
    src: "05-waiting-analysis-b.mp4",
    kicker: "07V-B / 車廂調度",
    title: "坐進車廂，命運書開始讀取資料",
    note: "窗外掠過的不是風景，是你留下的路線正在被追回來。",
  },
  {
    src: "06-waiting-train-transition.mp4",
    kicker: "08V-A / 火車與懷錶",
    title: "列車駛入黑暗，懷錶開始校準",
    note: "懷錶正在校準，第一段班次很快會被翻開。",
  },
];

const analysisWaitingVideo = "07-waiting-watch-loop.mp4";

function IntroSequence({ muted, onDone }: { muted: boolean; onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const current = introSequence[index];
  const next = introSequence[index + 1];

  function goNext() {
    if (transitioning) return;
    if (index < introSequence.length - 1) {
      setTransitioning(true);
      window.setTimeout(() => {
        setIndex(index + 1);
        setTransitioning(false);
      }, 650);
      return;
    }
    onDone();
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = 0;
    void el.play().catch(() => {});
  }, [index]);

  return (
    <section className={`video-panel intro-sequence ${transitioning ? "is-transitioning" : ""}`}>
      <video
        key={current.src}
        ref={ref}
        src={`${video}${current.src}`}
        autoPlay
        muted={muted}
        playsInline
        preload="auto"
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        onTimeUpdate={(event) => {
          const cutoff = introCutoffs[index];
          if (cutoff && event.currentTarget.currentTime >= cutoff) {
            goNext();
          }
        }}
        onEnded={() => {
          goNext();
        }}
      />
      {next ? <video className="preload-video" src={`${video}${next.src}`} preload="auto" muted /> : null}
      <div className="video-transition-shade" />
      <div className="video-caption">
        <p>{current.note}</p>
      </div>
    </section>
  );
}

function AnalysisSequence({
  muted,
  resultReady,
  onDone,
}: {
  muted: boolean;
  resultReady: boolean;
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const current = analysisSequence[index];
  const inLoop = index >= analysisSequence.length;
  const next = analysisSequence[index + 1];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = 0;
    void el.play().catch(() => {});
  }, [index]);

  return (
    <section className={`video-panel analysis-sequence ${transitioning ? "is-transitioning" : ""}`}>
      <video
        key={inLoop ? analysisWaitingVideo : current.src}
        ref={ref}
        src={`${video}${inLoop ? analysisWaitingVideo : current.src}`}
        autoPlay
        muted={muted}
        playsInline
        loop={inLoop && !resultReady}
        preload="auto"
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        onEnded={() => {
          if (!inLoop && index < analysisSequence.length - 1) {
            setTransitioning(true);
            window.setTimeout(() => {
              setIndex(index + 1);
              setTransitioning(false);
            }, 650);
            return;
          }
          if (!inLoop) {
            setTransitioning(true);
            window.setTimeout(() => {
              setIndex(analysisSequence.length);
              setTransitioning(false);
            }, 650);
            return;
          }
          if (resultReady) {
            onDone();
          }
        }}
      />
      {!inLoop && next ? <video className="preload-video" src={`${video}${next.src}`} preload="auto" muted /> : null}
      {!inLoop && index === analysisSequence.length - 1 ? (
        <video className="preload-video" src={`${video}${analysisWaitingVideo}`} preload="auto" muted />
      ) : null}
      <div className="video-transition-shade" />
      <div className="video-caption">
        <p>
          {inLoop
            ? resultReady
              ? "資料已回傳。第一頁即將翻開。"
              : "命運書正在讀取你的路線。"
            : current.note}
        </p>
      </div>
    </section>
  );
}

export default function AngkorPreviewPage() {
  const [started, setStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [analysisTransitioning, setAnalysisTransitioning] = useState(false);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    name: "",
    birth: "",
    time: "",
    birthplace: "",
    concern: "",
    email: "",
  });

  const canSubmit =
    form.name.trim() &&
    form.birth.trim() &&
    form.birthplace.trim() &&
    form.concern.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  function updateForm(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function keepFieldInCard(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    window.setTimeout(() => {
      const field = event.currentTarget;
      const card = field.closest(".register-card");
      if (!(card instanceof HTMLElement)) return;
      const targetTop = field.offsetTop - card.clientHeight * 0.35;
      card.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    }, 80);
  }

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const activeViewport = viewport;

    function syncViewportHeight() {
      document.documentElement.style.setProperty("--app-vvh", `${activeViewport.height}px`);
    }

    syncViewportHeight();
    activeViewport.addEventListener("resize", syncViewportHeight);
    activeViewport.addEventListener("scroll", syncViewportHeight);
    return () => {
      activeViewport.removeEventListener("resize", syncViewportHeight);
      activeViewport.removeEventListener("scroll", syncViewportHeight);
    };
  }, []);

  function submitPassengerRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitError("");
    setAnalysisTransitioning(true);
    setAnalysisDone(false);
    setResultReady(false);
    window.setTimeout(() => {
      setAnalysisStarted(true);
      setAnalysisTransitioning(false);
    }, 650);

    void fetch("/api/destiny", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        birth: form.birth,
        time: form.time,
        unknownTime: !form.time.trim(),
        birthplace: form.birthplace,
        concern: form.concern,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload?.error || "分析暫時沒有回傳");
        }
        return response.json();
      })
      .then(() => {
        setResultReady(true);
      })
      .catch((error) => {
        setSubmitError(error instanceof Error ? error.message : "分析暫時沒有回傳");
        setResultReady(true);
      });
  }


  const progressValue = !started
    ? 4
    : analysisDone
      ? 100
      : analysisStarted
        ? resultReady
          ? 84
          : 72
        : introDone
          ? 44
          : 18;

  function resetJourney() {
    setStarted(false);
    setSoundEnabled(false);
    setIntroDone(false);
    setAnalysisStarted(false);
    setAnalysisTransitioning(false);
    setAnalysisDone(false);
    setResultReady(false);
    setSubmitError("");
  }

  function goBackSegment() {
    if (analysisStarted) {
      setAnalysisStarted(false);
      setAnalysisTransitioning(false);
      setAnalysisDone(false);
      setResultReady(false);
      return;
    }

    if (introDone) {
      setIntroDone(false);
      return;
    }

    if (started) {
      setStarted(false);
    }
  }
  return (
    <main
      className={`angkor-preview ${started ? "is-started" : "is-cover"} ${
        introDone ? "is-form" : "is-intro"
      } ${analysisStarted ? "is-analysis" : "is-before-analysis"} ${
        analysisDone ? "is-result" : "is-waiting"
      } ${analysisTransitioning ? "is-submit-transition" : ""}`}
    >
      <div className="phone">
        {analysisTransitioning ? <div className="submit-transition-shade" /> : null}
        <div className="topbar">
          <button className="nav-icon" type="button" onClick={goBackSegment} aria-label="返回上段">
            ‹
          </button>
          <div className="story-progress" aria-hidden="true">
            <i style={{ width: `${progressValue}%` }} />
          </div>
          <button className="nav-icon" type="button" onClick={resetJourney} aria-label="回首頁">
            ⌂
          </button>
        </div>

        <Panel image="01-cover-ticket-visible.png" className="cover-panel">
          <div className="caption bottom">
            <small>01 / 封面</small>
            <h1>午夜門票</h1>
            <p>吳哥神廟深處，黑色車門已經打開。Rin 沒有回頭，只留下那張發光的票。</p>
            <button
              className="ticket-start-button"
              type="button"
              onClick={() => {
                setSoundEnabled(true);
                setStarted(true);
                setIntroDone(false);
              }}
            >
              撿起車票
            </button>
            <em className="sound-hint">點擊後播放影片並開啟聲音</em>
          </div>
        </Panel>

        {started && !introDone ? <IntroSequence muted={!soundEnabled} onDone={() => setIntroDone(true)} /> : null}

        <VideoPanel
          src="01-cover-opening.mp4"
          kicker="01V / 撿起車票"
          title="Rin 走進黑色車門，車票開始發光"
          note="封面按下後先播這段，讓用戶從神廟外被拉進故事。"
          className="intro-review-only"
        />

        <Panel image="02-temple-station-entry.png" className="storyboard-only">
          <div className="caption bottom">
            <small>02 / 進站</small>
            <h2>Rin 驗票後，帶你進入神廟裡的午夜車站。</h2>
            <p>石階下的鐵軌開始發光，像一條被藏了很久的路，終於被重新叫醒。</p>
          </div>
        </Panel>

        <VideoPanel
          src="02-station-entry-a.mp4"
          kicker="02V-A / 進入車站"
          title="第一人稱穿過黑色車門，跟著 Rin 進入神廟午夜車站"
          note="這段接封面影片，保留探索感與場景建立。"
          className="intro-review-only"
        />

        <VideoPanel
          src="03-station-entry-b.mp4"
          kicker="02V-B / 抵達驗票口"
          title="深入車站，抵達登記櫃台"
          note="這段接 A 段結尾，最後要銜接填寫資料畫面。"
          className="intro-review-only"
        />

        <Panel image="03-temple-registration-desk.png" className="registration-panel">
          <div className="caption top">
            <small>03 / 登記區</small>
            <h2>每位乘客，都要先建立身份。</h2>
            <p>Rin 把車票推到你面前。姓名、出生記錄、出生地，還有你最想逃開的問題。</p>
          </div>
          <form
            className="register-card"
            onSubmit={submitPassengerRecord}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
                event.preventDefault();
              }
            }}
          >
            <label>
              姓名
              <input
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                onFocus={keepFieldInCard}
                placeholder="Guan-Yu Lai"
              />
            </label>
            <label>
              生日
              <input
                value={form.birth}
                onChange={(event) => updateForm("birth", event.target.value)}
                onFocus={keepFieldInCard}
                placeholder="1996/04/28"
                inputMode="numeric"
              />
            </label>
            <label>
              時間
              <input
                value={form.time}
                onChange={(event) => updateForm("time", event.target.value)}
                onFocus={keepFieldInCard}
                placeholder="13:15，可空白"
                inputMode="numeric"
              />
            </label>
            <label>
              出生地
              <input
                value={form.birthplace}
                onChange={(event) => updateForm("birthplace", event.target.value)}
                onFocus={keepFieldInCard}
                placeholder="Phnom Penh / 嘉義 / 台中"
              />
            </label>
            <label>
              問題
              <textarea
                value={form.concern}
                onChange={(event) => updateForm("concern", event.target.value)}
                onFocus={keepFieldInCard}
                placeholder="你最近最想逃開的問題"
              />
            </label>
            <label>
              信箱
              <input
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
                onFocus={keepFieldInCard}
                placeholder="example@mail.com"
                type="email"
              />
            </label>
            {submitError ? <p className="form-error">{submitError}</p> : null}
            <button disabled={!canSubmit || analysisStarted || analysisTransitioning} type="submit">
              {analysisStarted ? "已送出，正在調度" : "送出乘客記錄"}
            </button>
          </form>
        </Panel>

        {analysisStarted && !analysisDone ? (
          <AnalysisSequence muted={!soundEnabled} resultReady={resultReady} onDone={() => setAnalysisDone(true)} />
        ) : null}

        <Panel image="04-temple-station-awakens.png" className="storyboard-only">
          <div className="caption bottom">
            <small>04 / 甦醒</small>
            <h2>資料送出後，整座神廟車站甦醒。</h2>
            <p>票孔亮起，地面的裂紋連成軌道。Rin 低聲說：現在，路線會自己回答你。</p>
          </div>
        </Panel>

        <Panel image="04-temple-station-awakens.png" className="video-brief-panel storyboard-only">
          <div className="video-brief">
            <small>07 / 三叉調度影片</small>
            <h2>30 秒單次影片</h2>
            <p>這裡用影片播放，不是靜態圖。它負責把「資料送出」變成一段旅程，最後接到等待畫面。</p>
            <ul>
              {dispatchBeats.map((beat) => (
                <li key={beat}>{beat}</li>
              ))}
            </ul>
            <em>結尾停在：黑色命運書放在桌面中央，Rin 的黑手套按住書封。</em>
          </div>
        </Panel>

        <Panel image="04-clean-archive-book.png" className="waiting-panel storyboard-only">
          <div className="waiting-card">
            <small>08 / 等待循環</small>
            <h2>等待 GPT 回傳資料</h2>
            <p>這一幕會鎖在循環畫面。資料沒回來，就不進入下一段。</p>
            <div className="waiting-lines">
              {waitingLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </div>
        </Panel>

        {freePreviewPanels.map((panel) => (
          <Panel
            key={panel.no}
            image={panel.image}
            className={`post-result free-preview-card tone-${panel.tone} panel-${panel.no.toLowerCase()}`}
          >
            <div className="free-preview-copy">
              <small>
                {panel.no} / {panel.kicker}
              </small>
              <h2>{panel.title}</h2>
              {panel.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Panel>
        ))}

        <Panel image="10-clean-plan-selection.png" className="post-result">
          <div className="plan-copy">
            <small>20 / 方案</small>
            <h2>選擇你要打開的班次。</h2>
            <div className="plans">
              {plans.map((plan) => (
                <article key={plan.name}>
                  <h3>{plan.name}</h3>
                  <p>{plan.desc}</p>
                  <strong>{plan.price}</strong>
                </article>
              ))}
            </div>
          </div>
        </Panel>

        <Panel image="11-clean-after-payment-book.png" className="post-result">
          <div className="book-single-copy">
            <small>15 / 彩蛋</small>
            <h2>封印已開</h2>
            <p>後續頁面正在寫入。你可以離開，列車會把完整檔案送到你的信箱。</p>
          </div>
        </Panel>

        <Panel image="12-clean-waiting-train.png" className="post-result">
          <div className="caption bottom">
            <small>16 / 等待報告</small>
            <h2>你不必停在這裡等。</h2>
            <p>當完整檔案生成完畢，它會抵達你的收件匣。</p>
          </div>
        </Panel>
      </div>

      <style jsx>{`
        .angkor-preview {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          background: #050607;
          color: #fff6ea;
        }

        .is-form.is-before-analysis {
          height: var(--app-vvh, 100svh);
          min-height: var(--app-vvh, 100svh);
          overflow: hidden;
        }

        .phone {
          position: relative;
          width: min(100vw, 430px);
          min-height: var(--app-vvh, 100svh);
          background: #050607;
          box-shadow: 0 0 80px rgba(0, 0, 0, 0.7);
        }

        .submit-transition-shade {
          position: fixed;
          inset: 0;
          z-index: 60;
          background:
            radial-gradient(circle at 50% 42%, rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.96) 70%),
            #000;
          animation: submitFade 650ms ease both;
          pointer-events: none;
        }

        @keyframes submitFade {
          0% {
            opacity: 0;
          }
          48%,
          100% {
            opacity: 1;
          }
        }

        .topbar {
          position: fixed;
          top: 0;
          left: 50%;
          width: min(100vw, 430px);
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: calc(env(safe-area-inset-top) + 14px) 20px 10px;
          background: linear-gradient(180deg, rgba(5, 6, 7, 0.86), rgba(5, 6, 7, 0.08));
          color: rgba(255, 246, 234, 0.72);
          font-size: 12px;
          pointer-events: none;
        }

        .nav-icon {
          width: 44px;
          height: 44px;
          min-height: 44px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 246, 234, 0.18);
          border-radius: 9px;
          background: rgba(5, 6, 7, 0.48);
          color: #fff6ea;
          font: 900 25px/1 Georgia, "Times New Roman", serif;
          backdrop-filter: blur(14px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.34);
          pointer-events: auto;
          touch-action: manipulation;
        }

        .story-progress {
          flex: 1;
          height: 5px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 246, 234, 0.17);
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18) inset;
        }

        .story-progress i {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #82c7f1, #d8b36d 58%, #df584e);
          transition: width 420ms ease;
        }

        .topbar b,
        small {
          color: #d8b36d;
        }

        .preview-panel {
          position: relative;
          min-height: 100dvh;
          overflow: hidden;
          border-bottom: 0;
        }

        .is-cover .phone > .video-panel,
        .is-cover .phone > .preview-panel:not(.cover-panel) {
          display: none;
        }

        .is-started.is-intro .phone > :not(.topbar):not(.intro-sequence) {
          display: none;
        }

        .is-form .cover-panel,
        .is-form .intro-review-only {
          display: none;
        }

        .is-form.is-before-analysis .phone > :not(.topbar):not(.registration-panel) {
          display: none !important;
        }

        .analysis-review-only,
        .storyboard-only {
          display: none !important;
        }

        .is-before-analysis .post-result,
        .is-waiting .post-result,
        .is-analysis .registration-panel {
          display: none !important;
        }

        .is-analysis.is-waiting .phone > :not(.topbar):not(.analysis-sequence) {
          display: none !important;
        }

        .video-panel {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 20%, rgba(216, 179, 109, 0.16), transparent 34%),
            linear-gradient(180deg, #050607, #0c0b09 48%, #050607);
          border-bottom: 0;
          padding: 0;
        }

        .video-panel video {
          width: 100%;
          min-height: var(--app-vvh, 100dvh);
          max-height: none;
          aspect-ratio: 9 / 16;
          object-fit: cover;
          border: 0;
          border-radius: 0;
          background: #000;
          box-shadow: none;
          pointer-events: none;
          transform: translate(-26px, -18px) scale(1.13);
          transform-origin: center center;
        }

        .cover-panel img {
          transform: translate(-24px, -16px) scale(1.12);
          transform-origin: center center;
        }

        .preload-video {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }

        .video-transition-shade {
          position: absolute;
          inset: 0;
          z-index: 3;
          background:
            radial-gradient(circle at 50% 45%, rgba(0, 0, 0, 0.36), rgba(0, 0, 0, 0.94) 72%),
            #000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 520ms ease;
        }

        .intro-sequence.is-transitioning .video-transition-shade,
        .analysis-sequence.is-transitioning .video-transition-shade {
          opacity: 1;
        }

        .video-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 22px 18px 18px;
          background: linear-gradient(180deg, transparent, rgba(5, 6, 7, 0.82) 22%, rgba(5, 6, 7, 0.94));
          border-radius: 0;
          pointer-events: none;
          z-index: 2;
        }

        .video-caption h2 {
          margin: 7px 0 8px;
          font-size: 22px;
          line-height: 1.24;
          letter-spacing: 0;
        }

        .video-caption p {
          margin: 0;
          color: rgba(255, 246, 234, 0.94);
          font: 900 22px/1.48 "Noto Serif TC", serif;
          letter-spacing: 0;
          text-shadow: 0 4px 24px rgba(0, 0, 0, 0.95);
        }

        .continue-button {
          width: 100%;
          margin-top: 16px;
          pointer-events: auto;
          box-shadow:
            0 0 22px rgba(216, 179, 109, 0.24),
            0 14px 34px rgba(0, 0, 0, 0.45);
        }

        .preview-panel img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.86) contrast(1.06);
        }

        .cover-panel img {
          object-position: center center;
          filter: brightness(0.9) contrast(1.08);
        }

        .preview-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(5, 6, 7, 0.03), rgba(5, 6, 7, 0.18) 42%, rgba(5, 6, 7, 0.92));
          pointer-events: none;
        }

        small {
          display: block;
          margin-bottom: 8px;
          font: 900 13px/1.2 Georgia, "Times New Roman", serif;
        }

        h1,
        h2,
        h3,
        p {
          margin: 0;
        }

        .caption,
        .register-card,
        .video-brief,
        .waiting-card,
        .book-copy,
        .plan-copy,
        .book-single-copy,
        .float-button {
          position: relative;
          z-index: 2;
        }

        .caption {
          position: absolute;
          left: 0;
          width: 100%;
          padding: 0 22px;
          text-shadow: 0 4px 26px rgba(0, 0, 0, 0.94);
        }

        .caption.bottom {
          bottom: 34px;
        }

        .caption.top {
          top: 48px;
        }

        .caption h1 {
          color: #fff6ea;
          font: 900 42px/1 Georgia, "Times New Roman", serif;
        }

        .caption h2 {
          color: #fff6ea;
          font: 900 28px/1.2 Georgia, "Noto Serif TC", serif;
        }

        .caption p {
          margin-top: 10px;
          color: rgba(255, 246, 234, 0.84);
          font: 700 16px/1.65 "Noto Serif TC", serif;
        }

        button {
          min-height: 46px;
          border: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #82c7f1, #d8b36d 52%, #df584e);
          color: #130c08;
          font-weight: 900;
          font-size: 15px;
        }

        .caption button {
          width: 100%;
          margin-top: 18px;
        }

        .ticket-start-button {
          box-shadow:
            0 0 22px rgba(216, 179, 109, 0.28),
            0 14px 36px rgba(0, 0, 0, 0.46);
        }

        .sound-hint {
          display: block;
          margin-top: 10px;
          color: rgba(255, 246, 234, 0.68);
          font: 800 12px/1.4 "Noto Serif TC", serif;
          font-style: normal;
          text-align: center;
        }

        .register-card {
          position: fixed;
          left: 50%;
          top: auto;
          bottom: calc(env(safe-area-inset-bottom) + 78px);
          width: min(386px, calc(100vw - 44px));
          max-height: min(520px, calc(var(--app-vvh, 100svh) - 150px));
          overflow-y: auto;
          overscroll-behavior: contain;
          transform: translateX(-50%);
          display: grid;
          gap: 10px;
          padding: 14px;
          border: 1px solid rgba(216, 179, 109, 0.34);
          border-radius: 8px;
          background: rgba(5, 6, 7, 0.5);
          backdrop-filter: blur(8px);
          box-shadow: 0 16px 46px rgba(0, 0, 0, 0.34);
          -webkit-overflow-scrolling: touch;
        }

        .register-card label {
          display: grid;
          grid-template-columns: 64px 1fr;
          align-items: center;
          gap: 10px;
          color: rgba(255, 246, 234, 0.58);
          font: 800 12px/1.2 "Noto Serif TC", serif;
        }

        .register-card span {
          color: #fff6ea;
          font-size: 14px;
        }

        .register-card input,
        .register-card textarea {
          width: 100%;
          border: 1px solid rgba(255, 246, 234, 0.2);
          border-radius: 7px;
          background: rgba(6, 8, 9, 0.68);
          color: #fff6ea;
          padding: 10px 11px;
          font: 800 16px/1.35 "Noto Serif TC", serif;
          outline: none;
          touch-action: manipulation;
        }

        .register-card textarea {
          min-height: 72px;
          resize: none;
        }

        .register-card input:focus,
        .register-card textarea:focus {
          border-color: rgba(216, 179, 109, 0.78);
          box-shadow: 0 0 0 2px rgba(216, 179, 109, 0.13);
        }

        .register-card button:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .form-error {
          color: #ffb8ae;
          font: 800 12px/1.45 "Noto Serif TC", serif;
        }

        .video-brief-panel img {
          filter: brightness(0.58) contrast(1.12);
        }

        .video-brief {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 28px 24px;
          text-shadow: 0 4px 26px rgba(0, 0, 0, 0.94);
        }

        .video-brief h2,
        .waiting-card h2 {
          color: #fff6ea;
          font: 900 30px/1.12 Georgia, "Noto Serif TC", serif;
        }

        .video-brief p,
        .waiting-card p {
          margin-top: 10px;
          color: rgba(255, 246, 234, 0.82);
          font: 700 15px/1.58 "Noto Serif TC", serif;
        }

        .video-brief ul {
          display: grid;
          gap: 8px;
          margin: 18px 0 0;
          padding: 0;
          list-style: none;
        }

        .video-brief li {
          padding: 10px 12px;
          border-left: 3px solid rgba(216, 179, 109, 0.86);
          background: rgba(5, 6, 7, 0.55);
          color: rgba(255, 246, 234, 0.88);
          font: 800 13px/1.48 "Noto Serif TC", serif;
        }

        .video-brief em {
          margin-top: 14px;
          color: #d8b36d;
          font: 900 13px/1.5 "Noto Serif TC", serif;
        }

        .waiting-panel img {
          filter: brightness(0.62) contrast(1.08);
        }

        .waiting-card {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 28px;
          text-align: center;
          text-shadow: 0 4px 26px rgba(0, 0, 0, 0.96);
        }

        .waiting-lines {
          display: grid;
          gap: 8px;
          width: 100%;
          margin-top: 20px;
        }

        .waiting-lines span {
          padding: 10px 12px;
          border: 1px solid rgba(216, 179, 109, 0.28);
          border-radius: 8px;
          background: rgba(5, 6, 7, 0.58);
          color: rgba(255, 246, 234, 0.8);
          font: 800 13px/1.35 Georgia, "Times New Roman", serif;
        }

        .book-panel img {
          filter: brightness(0.98) contrast(1.02);
        }

        .book-panel::after {
          background: none;
        }

        .book-copy {
          position: absolute;
          left: 8%;
          top: 12%;
          width: 46%;
          min-height: 48%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          color: #21160f;
          text-shadow: 0 1px 0 rgba(255, 246, 226, 0.5);
        }

        .book-copy small {
          color: #9c2923;
          font-size: 12px;
        }

        .book-copy h2 {
          color: #9c2923;
          font: 900 23px/1.16 Georgia, "Noto Serif TC", serif;
        }

        .book-copy p {
          margin-top: 10px;
          color: #21160f;
          font: 800 15px/1.52 "Noto Serif TC", serif;
        }

        .free-preview-card {
          min-height: var(--app-vvh, 100svh);
          aspect-ratio: auto;
          border: 0;
        }

        .free-preview-card.tone-title,
        .free-preview-card.tone-story,
        .free-preview-card.tone-locked,
        .free-preview-card.tone-locked-list,
        .free-preview-card.tone-offer {
          min-height: auto;
          aspect-ratio: 16 / 9;
        }

        .free-preview-card.tone-book,
        .free-preview-card.tone-book-dark {
          aspect-ratio: auto;
        }

        .free-preview-card img {
          filter: brightness(0.7) contrast(1.1);
        }

        .free-preview-card.tone-book img {
          filter: brightness(1.02) contrast(1.04);
        }

        .free-preview-card.tone-book-dark img {
          filter: brightness(0.82) contrast(1.08);
        }

        .free-preview-card.tone-locked img,
        .free-preview-card.tone-locked-list img {
          filter: brightness(0.56) contrast(1.12);
        }

        .free-preview-card::after {
          background:
            linear-gradient(180deg, rgba(5, 6, 7, 0.05), rgba(5, 6, 7, 0.18) 34%, rgba(5, 6, 7, 0.9)),
            radial-gradient(circle at 50% 70%, rgba(216, 179, 109, 0.16), transparent 42%);
        }

        .free-preview-card.tone-book::after,
        .free-preview-card.tone-book-dark::after,
        .free-preview-card.tone-record::after {
          background: linear-gradient(180deg, rgba(5, 6, 7, 0.08), transparent 24%, rgba(5, 6, 7, 0.22) 72%, rgba(5, 6, 7, 0.78));
        }

        .free-preview-copy {
          position: absolute;
          z-index: 2;
          left: 24px;
          right: 24px;
          bottom: 48px;
          text-align: left;
          text-shadow: 0 4px 28px rgba(0, 0, 0, 0.96);
        }

        .free-preview-card.tone-title .free-preview-copy,
        .free-preview-card.tone-story .free-preview-copy,
        .free-preview-card.tone-locked .free-preview-copy,
        .free-preview-card.tone-locked-list .free-preview-copy,
        .free-preview-card.tone-offer .free-preview-copy {
          left: 22px;
          right: 22px;
          bottom: 20px;
          max-width: calc(100% - 44px);
        }

        .free-preview-card.tone-title .free-preview-copy small,
        .free-preview-card.tone-story .free-preview-copy small,
        .free-preview-card.tone-locked .free-preview-copy small,
        .free-preview-card.tone-locked-list .free-preview-copy small,
        .free-preview-card.tone-offer .free-preview-copy small {
          font-size: 12px;
        }

        .free-preview-card.tone-title .free-preview-copy h2,
        .free-preview-card.tone-story .free-preview-copy h2,
        .free-preview-card.tone-locked .free-preview-copy h2,
        .free-preview-card.tone-locked-list .free-preview-copy h2,
        .free-preview-card.tone-offer .free-preview-copy h2 {
          font-size: clamp(22px, 6.6vw, 34px);
          line-height: 1.08;
        }

        .free-preview-card.tone-title .free-preview-copy p,
        .free-preview-card.tone-story .free-preview-copy p,
        .free-preview-card.tone-locked .free-preview-copy p,
        .free-preview-card.tone-locked-list .free-preview-copy p,
        .free-preview-card.tone-offer .free-preview-copy p {
          margin-top: 8px;
          font-size: clamp(13px, 3.8vw, 18px);
          line-height: 1.4;
        }

        .tone-book .free-preview-copy,
        .tone-book-dark .free-preview-copy,
        .tone-record .free-preview-copy {
          left: 13%;
          right: 13%;
          top: 13%;
          bottom: auto;
          text-align: center;
          color: #1b120c;
          text-shadow: 0 1px 0 rgba(255, 246, 226, 0.45);
        }

        .tone-book-dark .free-preview-copy {
          color: rgba(255, 246, 234, 0.92);
          text-shadow: 0 4px 22px rgba(0, 0, 0, 0.9);
        }

        .panel-11-c .free-preview-copy {
          left: 46%;
          right: 7%;
          top: 14%;
          width: auto;
          max-width: none;
          min-height: 48%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
        }

        .panel-11-c .free-preview-copy small {
          margin-bottom: 10px;
          color: #9c2923;
          font-size: 13px;
        }

        .panel-11-c .free-preview-copy h2 {
          max-width: 100%;
          color: #d8b36d;
          font-size: clamp(24px, 6.8vw, 34px);
          line-height: 1.16;
        }

        .panel-11-c .free-preview-copy p {
          max-width: 92%;
          margin-top: 14px;
          color: rgba(255, 246, 234, 0.94);
          font-size: clamp(17px, 4.6vw, 23px);
          line-height: 1.72;
          text-shadow: 0 4px 18px rgba(0, 0, 0, 0.92);
        }

        .tone-record .free-preview-copy {
          top: 14%;
        }

        .tone-locked .free-preview-copy,
        .tone-locked-list .free-preview-copy {
          top: 16%;
          bottom: auto;
          text-align: center;
        }

        .free-preview-copy small {
          color: #d8b36d;
          letter-spacing: 0;
        }

        .tone-book .free-preview-copy small,
        .tone-book-dark .free-preview-copy small,
        .tone-record .free-preview-copy small {
          color: #9c2923;
        }

        .free-preview-copy h2 {
          color: #fff6ea;
          font: 900 32px/1.18 Georgia, "Noto Serif TC", serif;
          letter-spacing: 0;
        }

        .tone-book .free-preview-copy h2,
        .tone-book-dark .free-preview-copy h2,
        .tone-record .free-preview-copy h2 {
          color: #9c2923;
          font-size: 28px;
        }

        .tone-book-dark .free-preview-copy h2 {
          color: #d8b36d;
        }

        .tone-locked .free-preview-copy h2 {
          color: #d8b36d;
        }

        .free-preview-copy p {
          margin-top: 12px;
          color: rgba(255, 246, 234, 0.9);
          font: 800 18px/1.62 "Noto Serif TC", serif;
          letter-spacing: 0;
        }

        .tone-book .free-preview-copy p,
        .tone-book-dark .free-preview-copy p,
        .tone-record .free-preview-copy p {
          color: #21160f;
          font-size: 18px;
          line-height: 1.7;
        }

        .tone-book-dark .free-preview-copy p {
          color: rgba(255, 246, 234, 0.9);
        }

        .float-button {
          position: absolute;
          left: 22px;
          right: 22px;
          bottom: 38px;
          width: auto;
        }

        .plan-copy {
          position: absolute;
          inset: 54px 18px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          text-shadow: 0 4px 26px rgba(0, 0, 0, 0.94);
        }

        .plan-copy h2 {
          margin-bottom: 18px;
          color: #fff6ea;
          font: 900 23px/1.25 Georgia, "Noto Serif TC", serif;
        }

        .plans {
          display: grid;
          gap: 10px;
        }

        .plans article {
          padding: 14px;
          border: 1px solid rgba(216, 179, 109, 0.36);
          border-radius: 8px;
          background: rgba(5, 6, 7, 0.68);
          text-align: left;
        }

        .plans h3 {
          color: #fff6ea;
          font: 900 17px/1.25 Georgia, "Noto Serif TC", serif;
        }

        .plans p {
          margin-top: 6px;
          color: rgba(255, 246, 234, 0.68);
          font-size: 12px;
          line-height: 1.45;
        }

        .plans strong {
          display: block;
          margin-top: 8px;
          color: #d8b36d;
          font-size: 18px;
        }

        .book-single-copy {
          position: absolute;
          left: 12%;
          top: 20%;
          width: 56%;
          color: #20150e;
          text-align: center;
          text-shadow: 0 1px 0 rgba(255, 246, 226, 0.46);
        }

        .book-single-copy small,
        .book-single-copy h2 {
          color: #9c2923;
        }

        .book-single-copy h2 {
          font: 900 26px/1.12 Georgia, "Noto Serif TC", serif;
        }

        .book-single-copy p {
          margin-top: 14px;
          color: #1f150e;
          font: 800 16px/1.6 "Noto Serif TC", serif;
        }

        @media (max-width: 380px) {
          .caption h1 {
            font-size: 38px;
          }

          .caption h2 {
            font-size: 25px;
          }

          .book-copy {
            left: 6%;
            width: 48%;
          }

          .book-copy h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </main>
  );
}
