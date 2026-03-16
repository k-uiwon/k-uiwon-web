import { useState, useEffect, createContext, useContext } from "react";

/* ═══════════════ THEME ═══════════════ */
const THEMES = {
  dark: {
    bg: "#08080E", bgAlt: "rgba(255,255,255,0.025)", bgCard: "rgba(255,255,255,0.03)",
    bgHover: "rgba(255,255,255,0.05)", bgInput: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.07)", borderHover: "rgba(255,255,255,0.12)",
    text: "#fff", textMuted: "rgba(255,255,255,0.4)", textFaint: "rgba(255,255,255,0.25)",
    textLabel: "rgba(255,255,255,0.3)", textInverse: "#000",
    svgGrid: "rgba(255,255,255,0.04)", svgLine: "rgba(255,255,255,0.1)", svgAxis: "rgba(255,255,255,0.15)",
    svgLabel: "rgba(255,255,255,0.4)", svgTick: "rgba(255,255,255,0.25)",
    mapEmpty: "rgba(255,255,255,0.025)", mapEmptyHov: "rgba(255,255,255,0.1)",
    mapStroke: "rgba(255,255,255,0.12)", mapStrokeHov: "rgba(255,255,255,0.5)",
    mapLabelDim: "rgba(255,255,255,0.2)", mapLabel: "rgba(255,255,255,0.5)",
    tooltipBg: "rgba(8,8,14,0.92)", tooltipBorder: "rgba(255,255,255,0.15)",
    scatterTooltipBg: "rgba(0,0,0,0.9)",
    chipBg: "rgba(255,255,255,0.03)", chipBorder: "rgba(255,255,255,0.06)",
    selectBg: "rgba(255,255,255,0.06)", selectOptionBg: "#12121f",
    radarGrid: "rgba(255,255,255,0.05)", radarAxis: "rgba(255,255,255,0.06)", radarDotStroke: "#0A0A0F",
    barTrack: "rgba(255,255,255,0.04)",
    gradientBg: "radial-gradient(ellipse 90% 50% at 50% 20%,rgba(26,109,212,0.05) 0%,transparent 70%),radial-gradient(ellipse 60% 40% at 80% 80%,rgba(230,30,43,0.03) 0%,transparent 60%)",
    scrapBg: "linear-gradient(135deg,rgba(26,109,212,0.08),rgba(230,30,43,0.06))",
    toggleIcon: "🌙",
    gaugeTrack: "rgba(255,255,255,0.08)", gaugeText: "#fff",
    dropdownBg: "rgba(12,12,20,0.97)",
    topRankBg: "rgba(46,204,113,0.04)", topRankBorder: "rgba(46,204,113,0.12)",
    selectArrow: "white",
  },
  light: {
    bg: "#F5F6F8", bgAlt: "rgba(0,0,0,0.02)", bgCard: "#fff",
    bgHover: "rgba(0,0,0,0.04)", bgInput: "rgba(0,0,0,0.04)",
    border: "rgba(0,0,0,0.08)", borderHover: "rgba(0,0,0,0.15)",
    text: "#1a1a2e", textMuted: "rgba(0,0,0,0.5)", textFaint: "rgba(0,0,0,0.3)",
    textLabel: "rgba(0,0,0,0.4)", textInverse: "#fff",
    svgGrid: "rgba(0,0,0,0.04)", svgLine: "rgba(0,0,0,0.1)", svgAxis: "rgba(0,0,0,0.15)",
    svgLabel: "rgba(0,0,0,0.45)", svgTick: "rgba(0,0,0,0.3)",
    mapEmpty: "rgba(0,0,0,0.03)", mapEmptyHov: "rgba(0,0,0,0.08)",
    mapStroke: "rgba(0,0,0,0.1)", mapStrokeHov: "rgba(0,0,0,0.4)",
    mapLabelDim: "rgba(0,0,0,0.2)", mapLabel: "rgba(0,0,0,0.55)",
    tooltipBg: "rgba(255,255,255,0.96)", tooltipBorder: "rgba(0,0,0,0.1)",
    scatterTooltipBg: "rgba(255,255,255,0.95)",
    chipBg: "rgba(0,0,0,0.03)", chipBorder: "rgba(0,0,0,0.06)",
    selectBg: "rgba(0,0,0,0.04)", selectOptionBg: "#fff",
    radarGrid: "rgba(0,0,0,0.06)", radarAxis: "rgba(0,0,0,0.08)", radarDotStroke: "#F5F6F8",
    barTrack: "rgba(0,0,0,0.05)",
    gradientBg: "radial-gradient(ellipse 90% 50% at 50% 20%,rgba(26,109,212,0.04) 0%,transparent 70%),radial-gradient(ellipse 60% 40% at 80% 80%,rgba(230,30,43,0.02) 0%,transparent 60%)",
    scrapBg: "linear-gradient(135deg,rgba(26,109,212,0.06),rgba(230,30,43,0.04))",
    toggleIcon: "☀️",
    gaugeTrack: "rgba(0,0,0,0.08)", gaugeText: "#1a1a2e",
    dropdownBg: "rgba(255,255,255,0.98)",
    topRankBg: "rgba(46,204,113,0.06)", topRankBorder: "rgba(46,204,113,0.15)",
    selectArrow: "%23333",
  },
};
const ThemeCtx = createContext(THEMES.dark);
const useT = () => useContext(ThemeCtx);

/* ═══════════════ DATA ═══════════════ */
const MEMBERS = [
  { name: "김정호", district: "강남구 갑", region: "강남구", party: "더불어민주당", partyColor: "#1A6DD4", bills: 87, passed: 31, attendance: 94, loyalty: 82, keywords: ["경제", "부동산", "세금", "청년", "일자리"], districtMentions: 28 },
  { name: "박수현", district: "해운대구 을", region: "해운대구", party: "국민의힘", partyColor: "#E61E2B", bills: 142, passed: 18, attendance: 76, loyalty: 97, keywords: ["안보", "국방", "해운대", "관광", "경제"], districtMentions: 45 },
  { name: "이소영", district: "성북구 갑", region: "성북구", party: "더불어민주당", partyColor: "#1A6DD4", bills: 54, passed: 28, attendance: 98, loyalty: 65, keywords: ["복지", "교육", "여성", "아동", "성북"], districtMentions: 52 },
  { name: "최재원", district: "종로구", region: "종로구", party: "국민의힘", partyColor: "#E61E2B", bills: 203, passed: 42, attendance: 88, loyalty: 91, keywords: ["경제", "규제", "기업", "성장", "혁신"], districtMentions: 12 },
  { name: "한지민", district: "마포구 갑", region: "마포구", party: "정의당", partyColor: "#FFCC00", bills: 38, passed: 19, attendance: 99, loyalty: 44, keywords: ["노동", "인권", "환경", "평등", "마포"], districtMentions: 61 },
  { name: "정태윤", district: "서초구 을", region: "서초구", party: "국민의힘", partyColor: "#E61E2B", bills: 95, passed: 11, attendance: 62, loyalty: 100, keywords: ["법률", "사법", "경제", "안보", "외교"], districtMentions: 5 },
  { name: "오세진", district: "동작구 갑", region: "동작구", party: "더불어민주당", partyColor: "#1A6DD4", bills: 67, passed: 35, attendance: 91, loyalty: 73, keywords: ["교육", "민생", "동작", "교통", "복지"], districtMentions: 38 },
  { name: "윤하경", district: "수영구", region: "수영구", party: "국민의힘", partyColor: "#E61E2B", bills: 121, passed: 15, attendance: 81, loyalty: 95, keywords: ["경제", "관광", "부산", "해양", "무역"], districtMentions: 22 },
  { name: "강민수", district: "관악구 갑", region: "관악구", party: "더불어민주당", partyColor: "#1A6DD4", bills: 29, passed: 22, attendance: 97, loyalty: 58, keywords: ["주거", "관악", "청년", "복지", "교육"], districtMentions: 71 },
  { name: "임서윤", district: "분당구 갑", region: "분당구", party: "국민의힘", partyColor: "#E61E2B", bills: 76, passed: 29, attendance: 85, loyalty: 88, keywords: ["IT", "혁신", "분당", "과학", "기술"], districtMentions: 33 },
];
const SEOUL = [
  { name: "종로구", d: "M 215,95 L 240,80 270,85 285,100 275,125 250,130 225,120 Z" },
  { name: "중구", d: "M 250,130 L 275,125 290,140 280,160 255,155 Z" },
  { name: "용산구", d: "M 225,155 L 255,155 280,160 270,185 240,190 220,175 Z" },
  { name: "성동구", d: "M 290,140 L 320,130 340,150 330,170 300,165 280,160 Z" },
  { name: "광진구", d: "M 340,150 L 370,140 385,160 370,180 340,175 330,170 Z" },
  { name: "동대문구", d: "M 285,100 L 320,95 340,115 320,130 290,140 275,125 Z" },
  { name: "중랑구", d: "M 340,115 L 370,100 390,120 385,160 370,140 340,150 320,130 Z" },
  { name: "성북구", d: "M 240,80 L 270,65 310,70 320,95 285,100 270,85 Z" },
  { name: "강북구", d: "M 210,55 L 240,45 270,50 270,65 240,80 215,75 Z" },
  { name: "도봉구", d: "M 240,25 L 275,20 290,40 270,50 240,45 Z" },
  { name: "노원구", d: "M 290,40 L 330,30 350,55 340,80 310,70 Z" },
  { name: "은평구", d: "M 155,65 L 190,50 210,55 215,75 215,95 195,100 170,90 Z" },
  { name: "서대문구", d: "M 170,90 L 195,100 215,95 225,120 210,135 185,130 Z" },
  { name: "마포구", d: "M 145,115 L 185,130 210,135 225,155 220,175 190,180 155,165 Z" },
  { name: "양천구", d: "M 100,185 L 135,175 155,195 145,220 115,225 Z" },
  { name: "강서구", d: "M 60,145 L 100,130 135,145 145,175 135,175 100,185 70,180 Z" },
  { name: "구로구", d: "M 90,230 L 115,225 145,220 155,245 130,260 100,255 Z" },
  { name: "금천구", d: "M 130,260 L 155,245 175,260 165,280 140,280 Z" },
  { name: "영등포구", d: "M 135,175 L 155,165 190,180 185,205 155,210 155,195 Z" },
  { name: "동작구", d: "M 185,205 L 220,195 240,215 225,240 195,235 175,220 Z" },
  { name: "관악구", d: "M 155,245 L 175,220 195,235 225,240 210,270 175,275 165,280 175,260 Z" },
  { name: "서초구", d: "M 240,215 L 280,200 310,215 320,255 290,270 255,260 225,240 Z" },
  { name: "강남구", d: "M 310,215 L 350,200 380,215 375,250 345,265 320,255 Z" },
  { name: "송파구", d: "M 380,215 L 415,205 430,225 420,260 390,265 375,250 Z" },
  { name: "강동구", d: "M 400,170 L 435,165 450,190 430,225 415,205 395,195 Z" },
];
const memberByRegion = {}; MEMBERS.forEach(m => { memberByRegion[m.region] = m; });
const getQuadrant = (bills, pr) => {
  if (bills >= 80 && pr >= 30) return { label: "입법 왕", emoji: "👑", color: "#2ECC71" };
  if (bills >= 80) return { label: "프로 발의러", emoji: "📝", color: "#E67E22" };
  if (pr >= 30) return { label: "효율 전문가", emoji: "🎯", color: "#3498DB" };
  return { label: "조용한 의원", emoji: "🤫", color: "#95A5A6" };
};
const getCentroid = d => { const p = d.match(/[\d.]+/g).map(Number); let x = 0, y = 0, n = 0; for (let i = 0; i < p.length; i += 2) { x += p[i]; y += p[i + 1]; n++; } return { x: x / n, y: y / n }; };

/* ═══════════════ COMPONENTS ═══════════════ */

const StatBox = ({ label, value, color }) => {
  const T = useT();
  return (
    <div style={{ background: T.bgHover, borderRadius: "10px", padding: "14px 10px", textAlign: "center", flex: 1 }}>
      <div style={{ fontSize: "22px", fontWeight: 900, color, fontFamily: "'Space Mono',monospace" }}>{value}</div>
      <div style={{ fontSize: "10px", color: T.textMuted, marginTop: "3px" }}>{label}</div>
    </div>
  );
};

const KeywordCloud = ({ keywords }) => {
  const T = useT();
  const sizes = [24, 19, 15, 13, 11];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", alignItems: "baseline" }}>
      {keywords.map((kw, i) => {
        const op = [1, 0.8, 0.65, 0.5, 0.38][i];
        return <span key={i} style={{ fontSize: `${sizes[i]}px`, fontWeight: i < 2 ? 800 : 600, color: T.text, opacity: op }}>#{kw}</span>;
      })}
    </div>
  );
};

const GaugeChart = ({ value, size = 120 }) => {
  const T = useT();
  const r = 32, circ = Math.PI * r, offset = circ - (value / 100) * circ;
  const color = value >= 90 ? "#E61E2B" : value >= 70 ? "#E67E22" : value >= 50 ? "#FFCC00" : "#2ECC71";
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 80 44">
      <path d="M 8 40 A 32 32 0 0 1 72 40" fill="none" stroke={T.gaugeTrack} strokeWidth="5" strokeLinecap="round" />
      <path d="M 8 40 A 32 32 0 0 1 72 40" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      <text x="40" y="36" textAnchor="middle" fill={T.gaugeText} fontSize="15" fontWeight="900" fontFamily="'Space Mono',monospace">{value}%</text>
    </svg>
  );
};

const ScatterPlot = ({ data, hoveredMember, setHoveredMember }) => {
  const T = useT();
  const w = 700, h = 400, pad = { t: 30, r: 30, b: 50, l: 55 };
  const iW = w - pad.l - pad.r, iH = h - pad.t - pad.b;
  const maxB = Math.max(...data.map(d => d.bills)) * 1.1;
  const xS = v => pad.l + (v / maxB) * iW, yS = v => pad.t + iH - (v / 100) * iH;
  const mX = xS(80), mY = yS(30);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%" }}>
      <defs><pattern id="sgrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke={T.svgGrid} strokeWidth="1" /></pattern></defs>
      <rect width={w} height={h} fill="transparent" /><rect x={pad.l} y={pad.t} width={iW} height={iH} fill="url(#sgrid)" />
      <text x={mX + (w - pad.r - mX) / 2} y={pad.t + 18} textAnchor="middle" fill="rgba(46,204,113,0.35)" fontSize="11" fontWeight="700">👑 입법 왕</text>
      <text x={pad.l + (mX - pad.l) / 2} y={pad.t + 18} textAnchor="middle" fill="rgba(52,152,219,0.35)" fontSize="11" fontWeight="700">🎯 효율 전문가</text>
      <text x={mX + (w - pad.r - mX) / 2} y={h - pad.b - 8} textAnchor="middle" fill="rgba(230,126,34,0.35)" fontSize="11" fontWeight="700">📝 프로 발의러</text>
      <text x={pad.l + (mX - pad.l) / 2} y={h - pad.b - 8} textAnchor="middle" fill="rgba(149,165,166,0.35)" fontSize="11" fontWeight="700">🤫 조용한 의원</text>
      <line x1={mX} y1={pad.t} x2={mX} y2={h - pad.b} stroke={T.svgLine} strokeWidth="1" strokeDasharray="4,4" />
      <line x1={pad.l} y1={mY} x2={w - pad.r} y2={mY} stroke={T.svgLine} strokeWidth="1" strokeDasharray="4,4" />
      <line x1={pad.l} y1={h - pad.b} x2={w - pad.r} y2={h - pad.b} stroke={T.svgAxis} strokeWidth="1" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={h - pad.b} stroke={T.svgAxis} strokeWidth="1" />
      <text x={w / 2} y={h - 6} textAnchor="middle" fill={T.svgLabel} fontSize="11">발의 건수 →</text>
      <text x={14} y={h / 2} textAnchor="middle" fill={T.svgLabel} fontSize="11" transform={`rotate(-90,14,${h / 2})`}>가결률(%) →</text>
      {[0, 50, 100, 150, 200].map(v => <text key={v} x={xS(v)} y={h - pad.b + 16} textAnchor="middle" fill={T.svgTick} fontSize="9">{v}</text>)}
      {[0, 25, 50, 75, 100].map(v => <text key={v} x={pad.l - 8} y={yS(v) + 3} textAnchor="end" fill={T.svgTick} fontSize="9">{v}%</text>)}
      {data.map((m, i) => { const pr = (m.passed / m.bills) * 100, cx = xS(m.bills), cy = yS(pr), hov = hoveredMember === i; return (
        <g key={i} onMouseEnter={() => setHoveredMember(i)} onMouseLeave={() => setHoveredMember(null)} style={{ cursor: "pointer" }}>
          <circle cx={cx} cy={cy} r={hov ? 10 : 6} fill={m.partyColor} opacity={hov ? 1 : 0.75} stroke={hov ? T.text : "none"} strokeWidth="2" style={{ transition: "all 0.2s" }} />
          {hov && <g><rect x={cx + 14} y={cy - 34} width="150" height="50" rx="6" fill={T.scatterTooltipBg} stroke={T.tooltipBorder} strokeWidth="1" />
            <text x={cx + 22} y={cy - 16} fill={T.text} fontSize="11" fontWeight="700">{m.name} ({m.district})</text>
            <text x={cx + 22} y={cy + 2} fill={T.textMuted} fontSize="10">발의 {m.bills}건 · 가결률 {pr.toFixed(1)}%</text></g>}
        </g>); })}
    </svg>
  );
};

const CompareView = ({ memberA, memberB, onSelectA, onSelectB }) => {
  const T = useT();
  const mA = MEMBERS[memberA], mB = MEMBERS[memberB];
  const prA = ((mA.passed / mA.bills) * 100).toFixed(1), prB = ((mB.passed / mB.bills) * 100).toFixed(1);
  const metrics = [
    { label: "본회의 출석률", a: mA.attendance, b: mB.attendance, unit: "%", max: 100 },
    { label: "법안 발의 건수", a: mA.bills, b: mB.bills, unit: "건", max: Math.max(mA.bills, mB.bills) * 1.2 },
    { label: "법안 가결률", a: parseFloat(prA), b: parseFloat(prB), unit: "%", max: 100 },
    { label: "당론 일치율", a: mA.loyalty, b: mB.loyalty, unit: "%", max: 100 },
    { label: "지역구 언급", a: mA.districtMentions, b: mB.districtMentions, unit: "회", max: Math.max(mA.districtMentions, mB.districtMentions) * 1.2 },
  ];
  const Sel = ({ value, onChange }) => (
    <select value={value} onChange={e => onChange(Number(e.target.value))} style={{ background: T.selectBg, border: `1px solid ${MEMBERS[value].partyColor}50`, borderRadius: "8px", color: T.text, padding: "8px 28px 8px 12px", fontSize: "13px", fontWeight: 700, fontFamily: "'Noto Sans KR',sans-serif", cursor: "pointer", outline: "none", appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${T.selectArrow}' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}>
      {MEMBERS.map((m, i) => <option key={i} value={i} style={{ background: T.selectOptionBg, color: T.text }}>{m.name} ({m.district})</option>)}
    </select>
  );
  const rM = [
    { label: "출석", a: mA.attendance, b: mB.attendance },
    { label: "발의", a: Math.min(mA.bills / 2, 100), b: Math.min(mB.bills / 2, 100) },
    { label: "가결", a: parseFloat(prA), b: parseFloat(prB) },
    { label: "충성도", a: mA.loyalty, b: mB.loyalty },
    { label: "지역구", a: Math.min(mA.districtMentions * 1.3, 100), b: Math.min(mB.districtMentions * 1.3, 100) },
  ];
  const rcx = 150, rcy = 140, rR = 95, st = (2 * Math.PI) / 5;
  const xy = (i, v) => { const a = -Math.PI / 2 + i * st, r = (v / 100) * rR; return { x: rcx + r * Math.cos(a), y: rcy + r * Math.sin(a) }; };
  const poly = k => rM.map((_, i) => { const p = xy(i, rM[i][k]); return `${p.x},${p.y}`; }).join(" ");
  return (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", width: "100%", justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><div style={{ width: "10px", height: "10px", borderRadius: "50%", background: mA.partyColor }} /><Sel value={memberA} onChange={onSelectA} /></div>
        <div style={{ fontSize: "20px", fontWeight: 900, color: T.textFaint }}>VS</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><div style={{ width: "10px", height: "10px", borderRadius: "50%", background: mB.partyColor }} /><Sel value={memberB} onChange={onSelectB} /></div>
      </div>
      <div style={{ flex: "0 0 300px" }}>
        <svg viewBox="0 0 300 280" style={{ width: "100%" }}>
          {[20, 40, 60, 80, 100].map(v => <polygon key={v} points={rM.map((_, i) => { const p = xy(i, v); return `${p.x},${p.y}`; }).join(" ")} fill="none" stroke={T.radarGrid} strokeWidth="0.8" />)}
          {rM.map((_, i) => { const p = xy(i, 100); return <line key={i} x1={rcx} y1={rcy} x2={p.x} y2={p.y} stroke={T.radarAxis} strokeWidth="0.8" />; })}
          <polygon points={poly("a")} fill={`${mA.partyColor}22`} stroke={mA.partyColor} strokeWidth="2" />
          <polygon points={poly("b")} fill={`${mB.partyColor}18`} stroke={mB.partyColor} strokeWidth="2" strokeDasharray="5,3" />
          {rM.map((m, i) => { const pA = xy(i, m.a), pB = xy(i, m.b); return <g key={i}><circle cx={pA.x} cy={pA.y} r="4" fill={mA.partyColor} stroke={T.radarDotStroke} strokeWidth="1.5" /><circle cx={pB.x} cy={pB.y} r="4" fill={mB.partyColor} stroke={T.radarDotStroke} strokeWidth="1.5" /></g>; })}
          {rM.map((m, i) => { const p = xy(i, 120); return <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill={T.textMuted} fontSize="10" fontWeight="600">{m.label}</text>; })}
        </svg>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", minWidth: "260px" }}>
        {metrics.map((met, i) => {
          const pA = (met.a / met.max) * 100, pB = (met.b / met.max) * 100;
          const win = met.a > met.b ? "A" : met.a < met.b ? "B" : null;
          return (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                <span style={{ fontSize: "12px", fontWeight: win === "A" ? 800 : 500, color: win === "A" ? mA.partyColor : T.textMuted, fontFamily: "'Space Mono',monospace" }}>{met.a}{met.unit}{win === "A" ? " ◀" : ""}</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: T.textMuted }}>{met.label}</span>
                <span style={{ fontSize: "12px", fontWeight: win === "B" ? 800 : 500, color: win === "B" ? mB.partyColor : T.textMuted, fontFamily: "'Space Mono',monospace" }}>{win === "B" ? "▶ " : ""}{met.b}{met.unit}</span>
              </div>
              <div style={{ display: "flex", gap: "3px", height: "7px" }}>
                <div style={{ flex: 1, background: T.barTrack, borderRadius: "4px 0 0 4px", overflow: "hidden", display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ width: `${pA}%`, background: `linear-gradient(90deg,transparent,${mA.partyColor})`, borderRadius: "4px 0 0 4px", transition: "width 0.5s" }} />
                </div>
                <div style={{ flex: 1, background: T.barTrack, borderRadius: "0 4px 4px 0", overflow: "hidden" }}>
                  <div style={{ width: `${pB}%`, background: `linear-gradient(270deg,transparent,${mB.partyColor})`, borderRadius: "0 4px 4px 0", transition: "width 0.5s" }} />
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ marginTop: "6px", padding: "10px 12px", background: T.bgHover, borderRadius: "8px", border: `1px solid ${T.border}`, fontSize: "12px", color: T.textMuted, lineHeight: 1.6 }}>
          📋 <strong style={{ color: mA.partyColor }}>{mA.name}</strong> 가결률 <span style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700 }}>{prA}%</span> vs <strong style={{ color: mB.partyColor }}>{mB.name}</strong> <span style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700 }}>{prB}%</span>.{" "}
          {parseFloat(prA) > parseFloat(prB) ? `${mA.name} 의원이 효율에서 앞서고, ${mB.name} 의원은 발의 건수에서 적극적.` : `${mB.name} 의원이 효율에서 앞서고, ${mA.name} 의원은 지역구 밀착도가 높음.`}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════ MAIN ═══════════════════════ */
export default function KuiwonDashboard() {
  const [mode, setMode] = useState("dark");
  const T = THEMES[mode];
  const [sel, setSel] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [subTab, setSubTab] = useState("scatter");
  const [loaded, setLoaded] = useState(false);
  const [hovScatter, setHovScatter] = useState(null);
  const [cmpA, setCmpA] = useState(0);
  const [cmpB, setCmpB] = useState(3);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const member = sel !== null ? MEMBERS[sel] : null;
  const passRate = member ? ((member.passed / member.bills) * 100).toFixed(1) : null;
  const quad = member ? getQuadrant(member.bills, parseFloat(passRate)) : null;
  const filtered = MEMBERS.filter(m => m.name.includes(searchQuery) || m.district.includes(searchQuery));
  const rebellRank = [...MEMBERS].sort((a, b) => a.loyalty - b.loyalty).slice(0, 5);
  const hovMember = hovered ? memberByRegion[hovered] : null;

  const SUB_TABS = [
    { id: "scatter", label: "성실도 vs 효율성", icon: "📊" },
    { id: "compare", label: "의원 비교", icon: "⚔️" },
    { id: "loyalty", label: "소신파 랭킹", icon: "🗳️" },
    { id: "rank", label: "종합 랭킹", icon: "🏆" },
  ];

  return (
    <ThemeCtx.Provider value={T}>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'Noto Sans KR',sans-serif", transition: "background 0.4s ease, color 0.3s ease" }}>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: T.gradientBg, transition: "background 0.4s ease" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "20px 28px" }}>

          {/* HEADER */}
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `1px solid ${T.border}`, paddingBottom: "14px", marginBottom: "24px", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(-8px)", transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <h1 style={{ fontSize: "30px", fontWeight: 900, letterSpacing: "-1.5px", margin: 0, color: T.text }}> K-의원</h1>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#1A6DD4", background: "rgba(26,109,212,0.12)", padding: "2px 7px", borderRadius: "4px" }}>BETA</span>
              </div>
              <p style={{ fontSize: "12px", color: T.textMuted, margin: "3px 0 0" }}>숫자로 검증하는 우리 동네 의원 성적표 — 22대 국회</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Theme toggle */}
              <button onClick={() => setMode(m => m === "dark" ? "light" : "dark")} style={{ background: T.bgHover, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "6px 12px", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px", color: T.text, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 600, transition: "all 0.2s" }}>
                {T.toggleIcon} <span style={{ fontSize: "11px" }}>{mode === "dark" ? "라이트" : "다크"}</span>
              </button>
              <div style={{ position: "relative" }}>
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="지역구 · 의원명 검색" style={{ background: T.bgInput, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "8px 14px 8px 30px", color: T.text, fontSize: "13px", width: "200px", outline: "none", fontFamily: "'Noto Sans KR',sans-serif" }} />
                <span style={{ position: "absolute", left: "9px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", opacity: 0.35 }}>🔍</span>
                {searchQuery && (
                  <div style={{ position: "absolute", top: "42px", right: 0, width: "260px", zIndex: 200, background: T.dropdownBg, border: `1px solid ${T.border}`, borderRadius: "10px", backdropFilter: "blur(20px)", overflow: "hidden" }}>
                    {filtered.length === 0 ? <div style={{ padding: "14px", fontSize: "12px", color: T.textMuted, textAlign: "center" }}>결과 없음</div> :
                      filtered.map((m, i) => (
                        <div key={i} onClick={() => { setSel(MEMBERS.indexOf(m)); setSearchQuery(""); }} style={{ padding: "9px 14px", cursor: "pointer", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}
                          onMouseEnter={e => e.currentTarget.style.background = T.bgHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <div><div style={{ fontSize: "13px", fontWeight: 700 }}>{m.name}</div><div style={{ fontSize: "10px", color: T.textMuted }}>{m.district}</div></div>
                          <span style={{ fontSize: "9px", color: m.partyColor, fontWeight: 700, background: `${m.partyColor}18`, padding: "2px 6px", borderRadius: "3px" }}>{m.party}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* ════════ HERO MAP ════════ */}
          <div style={{ display: "grid", gridTemplateColumns: member ? "1fr 340px" : "1fr", gap: "20px", marginBottom: "24px", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(14px)", transition: "all 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>
            <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "28px", position: "relative", overflow: "hidden", boxShadow: mode === "light" ? "0 1px 3px rgba(0,0,0,0.04)" : "none" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#1A6DD4,#E61E2B,#FFCC00)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 900 }}>🗺️ 우리 동네 의원 찾기</h2>
                  <p style={{ margin: "4px 0 0", fontSize: "11px", color: T.textMuted }}>지역구를 클릭하면 의원 상세 정보를 확인할 수 있습니다</p>
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {[{ c: "#1A6DD4", l: "민주당" }, { c: "#E61E2B", l: "국민의힘" }, { c: "#FFCC00", l: "정의당" }, { c: T.mapEmpty, l: "미등록" }].map(x => (
                    <div key={x.l} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: x.c, border: `1px solid ${T.border}` }} />
                      <span style={{ fontSize: "9px", color: T.textFaint }}>{x.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <svg viewBox="35 5 440 295" style={{ width: "100%", maxHeight: "420px" }}>
                  <defs><filter id="glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
                  {SEOUL.map(dist => {
                    const m = memberByRegion[dist.name]; const isH = hovered === dist.name; const isS = m && sel === MEMBERS.indexOf(m);
                    const fill = m ? (isH || isS ? m.partyColor : `${m.partyColor}${mode === "dark" ? "55" : "40"}`) : (isH ? T.mapEmptyHov : T.mapEmpty);
                    return (
                      <g key={dist.name} onMouseEnter={() => setHovered(dist.name)} onMouseLeave={() => setHovered(null)} onClick={() => m && setSel(MEMBERS.indexOf(m))} style={{ cursor: m ? "pointer" : "default" }}>
                        <path d={dist.d} fill={fill} stroke={isH || isS ? T.mapStrokeHov : T.mapStroke} strokeWidth={isH || isS ? "2" : "0.7"} filter={isH && m ? "url(#glow)" : "none"} style={{ transition: "all 0.2s" }} />
                      </g>
                    );
                  })}
                  {SEOUL.map(dist => {
                    const c = getCentroid(dist.d); const isH = hovered === dist.name; const m = memberByRegion[dist.name]; const isS = m && sel === MEMBERS.indexOf(m);
                    return <text key={`l-${dist.name}`} x={c.x} y={c.y + 1} textAnchor="middle" dominantBaseline="middle"
                      fill={isH || isS ? (mode === "dark" ? "#fff" : "#000") : m ? T.mapLabel : T.mapLabelDim} fontSize={isH ? "9" : "7.5"} fontWeight={isH || isS ? "800" : "500"}
                      pointerEvents="none" style={{ transition: "all 0.15s" }}>
                      {dist.name.replace("구", "")}
                    </text>;
                  })}
                </svg>
                {hovMember && (
                  <div style={{ position: "absolute", top: "12px", right: "12px", background: T.tooltipBg, border: `1px solid ${hovMember.partyColor}50`, borderRadius: "12px", padding: "14px 16px", backdropFilter: "blur(12px)", minWidth: "200px", animation: "fadeUp 0.2s ease", boxShadow: mode === "light" ? "0 4px 16px rgba(0,0,0,0.08)" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: `${hovMember.partyColor}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", border: `1px solid ${hovMember.partyColor}40` }}>👤</div>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: 900 }}>{hovMember.name}</div>
                        <div style={{ fontSize: "10px", color: T.textMuted }}>{hovMember.district} · <span style={{ color: hovMember.partyColor }}>{hovMember.party}</span></div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {[{ l: "출석", v: `${hovMember.attendance}%` }, { l: "발의", v: `${hovMember.bills}건` }, { l: "가결", v: `${((hovMember.passed / hovMember.bills) * 100).toFixed(0)}%` }].map((s, i) => (
                        <div key={i} style={{ flex: 1, background: T.bgHover, borderRadius: "6px", padding: "6px 4px", textAlign: "center" }}>
                          <div style={{ fontSize: "14px", fontWeight: 900, fontFamily: "'Space Mono',monospace" }}>{s.v}</div>
                          <div style={{ fontSize: "8px", color: T.textFaint }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: "8px", fontSize: "10px", color: T.textFaint, textAlign: "center" }}>클릭하여 상세 보기 →</div>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: "6px", marginTop: "12px", overflowX: "auto", paddingBottom: "4px" }}>
                {MEMBERS.map((m, i) => (
                  <div key={i} onClick={() => setSel(i)} onMouseEnter={() => setHovered(m.region)} onMouseLeave={() => setHovered(null)}
                    style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", background: sel === i ? `${m.partyColor}18` : T.chipBg, border: `1px solid ${sel === i ? `${m.partyColor}40` : T.chipBorder}`, transition: "all 0.15s", whiteSpace: "nowrap" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: m.partyColor }} />
                    <span style={{ fontSize: "11px", fontWeight: 700 }}>{m.name}</span>
                    <span style={{ fontSize: "10px", color: T.textFaint }}>{m.district}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MEMBER DETAIL */}
            {member && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", animation: "fadeUp 0.35s ease" }}>
                <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "14px", padding: "22px", position: "relative", overflow: "hidden", boxShadow: mode === "light" ? "0 1px 3px rgba(0,0,0,0.04)" : "none" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: member.partyColor }} />
                  <button onClick={() => setSel(null)} style={{ position: "absolute", top: "10px", right: "12px", background: T.bgHover, border: "none", borderRadius: "6px", color: T.textMuted, padding: "4px 8px", cursor: "pointer", fontSize: "11px" }}>✕</button>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "13px", background: `${member.partyColor}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", border: `1px solid ${member.partyColor}40` }}>👤</div>
                    <div>
                      <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 900 }}>{member.name}</h2>
                      <div style={{ fontSize: "11px", color: T.textMuted, marginTop: "2px" }}>{member.district}</div>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: member.partyColor, background: `${member.partyColor}15`, padding: "2px 7px", borderRadius: "4px", display: "inline-block", marginTop: "3px" }}>{member.party}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", background: `${quad.color}10`, borderRadius: "8px", border: `1px solid ${quad.color}25`, marginBottom: "16px" }}>
                    <span style={{ fontSize: "18px" }}>{quad.emoji}</span>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: quad.color }}>{quad.label}</span>
                    <span style={{ fontSize: "9px", color: T.textFaint, marginLeft: "auto" }}>입법 타율 분류</span>
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <StatBox label="출석률" value={`${member.attendance}%`} color={member.attendance >= 90 ? "#2ECC71" : "#E67E22"} />
                    <StatBox label="발의" value={`${member.bills}건`} color="#3498DB" />
                    <StatBox label="가결률" value={`${passRate}%`} color={parseFloat(passRate) >= 30 ? "#2ECC71" : "#E67E22"} />
                  </div>
                </div>
                <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "14px", padding: "18px", boxShadow: mode === "light" ? "0 1px 3px rgba(0,0,0,0.04)" : "none" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: T.textLabel, letterSpacing: "0.8px", marginBottom: "10px" }}>💬 핵심 키워드</div>
                  <KeywordCloud keywords={member.keywords} />
                  <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: T.bgHover, borderRadius: "7px" }}>
                    <span style={{ fontSize: "10px", color: T.textFaint }}>지역구 언급</span>
                    <span style={{ fontSize: "15px", fontWeight: 900, fontFamily: "'Space Mono',monospace", color: member.districtMentions >= 30 ? "#2ECC71" : "#E67E22" }}>{member.districtMentions}회</span>
                  </div>
                </div>
                <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "14px", padding: "18px", textAlign: "center", boxShadow: mode === "light" ? "0 1px 3px rgba(0,0,0,0.04)" : "none" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: T.textLabel, letterSpacing: "0.8px", marginBottom: "10px" }}>🗳️ 정당 충성도</div>
                  <GaugeChart value={member.loyalty} />
                  <div style={{ marginTop: "4px", fontSize: "11px", color: T.textMuted }}>
                    {member.loyalty >= 90 ? "🟥 거수기 의심" : member.loyalty >= 70 ? "🟧 당론 존중형" : member.loyalty >= 50 ? "🟨 독립 노선" : "🟩 완전 소신파"}
                  </div>
                </div>
                <div style={{ background: T.scrapBg, border: `1px solid ${T.border}`, borderRadius: "12px", padding: "14px 16px" }}>
                  <div style={{ fontSize: "9px", fontWeight: 700, color: T.textLabel, letterSpacing: "0.5px", marginBottom: "5px" }}>📰 스크랩 포인트</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, lineHeight: 1.5 }}>
                    "{member.name} 의원, 타율 <span style={{ color: parseFloat(passRate) >= 30 ? "#2ECC71" : "#E61E2B", fontFamily: "'Space Mono',monospace" }}>{passRate}%</span>
                    {parseFloat(passRate) < 20 ? " — 리그 최하위?" : parseFloat(passRate) >= 50 ? " — 효율 최상위!" : ""}"
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ════════ SUB TABS ════════ */}
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(14px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s" }}>
            <div style={{ display: "flex", gap: "3px", background: T.bgAlt, borderRadius: "10px", padding: "4px", border: `1px solid ${T.border}`, marginBottom: "16px" }}>
              {SUB_TABS.map(t => (
                <button key={t.id} onClick={() => setSubTab(t.id)} style={{ flex: 1, padding: "10px 8px", border: "none", borderRadius: "8px", cursor: "pointer", background: subTab === t.id ? T.bgHover : "transparent", color: subTab === t.id ? T.text : T.textFaint, fontWeight: subTab === t.id ? 700 : 500, fontSize: "12px", fontFamily: "'Noto Sans KR',sans-serif", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
            <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "14px", padding: "24px", boxShadow: mode === "light" ? "0 1px 3px rgba(0,0,0,0.04)" : "none" }}>
              {subTab === "scatter" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div><h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800 }}>입법 타율 4분면 차트</h3><p style={{ margin: "4px 0 0", fontSize: "11px", color: T.textMuted }}>X: 발의 건수 / Y: 가결률</p></div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {[{ c: "#1A6DD4", l: "민주당" }, { c: "#E61E2B", l: "국민의힘" }, { c: "#FFCC00", l: "정의당" }].map(x => (
                        <div key={x.l} style={{ display: "flex", alignItems: "center", gap: "4px" }}><div style={{ width: "8px", height: "8px", borderRadius: "50%", background: x.c }} /><span style={{ fontSize: "10px", color: T.textFaint }}>{x.l}</span></div>
                      ))}
                    </div>
                  </div>
                  <ScatterPlot data={MEMBERS} hoveredMember={hovScatter} setHoveredMember={setHovScatter} />
                </div>
              )}
              {subTab === "compare" && (
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 800 }}>⚔️ 의원 비교 분석</h3>
                  <p style={{ margin: "0 0 20px", fontSize: "11px", color: T.textMuted }}>두 의원의 의정 활동을 한눈에 비교합니다</p>
                  <CompareView memberA={cmpA} memberB={cmpB} onSelectA={setCmpA} onSelectB={setCmpB} />
                </div>
              )}
              {subTab === "loyalty" && (
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 800 }}>🔥 반전의 주인공 — 소신파 TOP 5</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "11px", color: T.textMuted }}>당론과 반대되는 표를 가장 많이 던진 의원</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {rebellRank.map((m, i) => (
                      <div key={i} onClick={() => setSel(MEMBERS.indexOf(m))} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", background: T.bgAlt, borderRadius: "10px", cursor: "pointer", border: `1px solid ${T.border}`, transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = T.bgHover; e.currentTarget.style.borderColor = T.borderHover; }}
                        onMouseLeave={e => { e.currentTarget.style.background = T.bgAlt; e.currentTarget.style.borderColor = T.border; }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: i === 0 ? "rgba(46,204,113,0.15)" : T.bgHover, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 900, fontFamily: "'Space Mono',monospace", color: i === 0 ? "#2ECC71" : T.textMuted }}>{i + 1}</div>
                        <div style={{ flex: 1 }}><div style={{ fontSize: "14px", fontWeight: 700 }}>{m.name} <span style={{ fontSize: "11px", color: T.textFaint, fontWeight: 400 }}>{m.district}</span></div><div style={{ fontSize: "10px", color: m.partyColor, marginTop: "2px" }}>{m.party}</div></div>
                        <div style={{ textAlign: "right" }}><div style={{ fontSize: "20px", fontWeight: 900, fontFamily: "'Space Mono',monospace", color: m.loyalty <= 50 ? "#2ECC71" : "#E67E22" }}>{m.loyalty}%</div><div style={{ fontSize: "9px", color: T.textFaint }}>당론 일치</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {subTab === "rank" && (
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 800 }}>🏆 의정 활동 종합 랭킹</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "11px", color: T.textMuted }}>출석률 + 가결률 + 지역구 언급 종합 점수</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {[...MEMBERS].sort((a, b) => { const s = m => m.attendance * 0.3 + ((m.passed / m.bills) * 100) * 0.5 + Math.min(m.districtMentions, 50) * 0.4; return s(b) - s(a); }).map((m, i) => {
                      const score = (m.attendance * 0.3 + ((m.passed / m.bills) * 100) * 0.5 + Math.min(m.districtMentions, 50) * 0.4).toFixed(0);
                      return (
                        <div key={i} onClick={() => setSel(MEMBERS.indexOf(m))} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: i < 3 ? T.topRankBg : T.bgAlt, borderRadius: "10px", cursor: "pointer", border: `1px solid ${i < 3 ? T.topRankBorder : T.border}` }}
                          onMouseEnter={e => e.currentTarget.style.background = T.bgHover} onMouseLeave={e => e.currentTarget.style.background = i < 3 ? T.topRankBg : T.bgAlt}>
                          <div style={{ fontSize: "16px", fontWeight: 900, fontFamily: "'Space Mono',monospace", color: i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : i === 2 ? "#CD7F32" : T.textFaint, width: "24px" }}>{i + 1}</div>
                          <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: "13px", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</div><div style={{ fontSize: "9px", color: m.partyColor }}>{m.district}</div></div>
                          <div style={{ fontSize: "18px", fontWeight: 900, fontFamily: "'Space Mono',monospace", color: i < 3 ? "#2ECC71" : T.textMuted }}>{score}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <footer style={{ marginTop: "24px", paddingTop: "14px", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", opacity: loaded ? 0.6 : 0, transition: "opacity 0.8s ease 0.5s" }}>
            <div style={{ fontSize: "10px", color: T.textFaint }}>데이터 출처: 공공데이터포털 · 국회 의안 정보 API · 회의록 API — 최종 갱신 2026.03.15</div>
            <div style={{ fontSize: "10px", color: T.textFaint }}>K-의원 © 2026 · MVP Beta</div>
          </footer>
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}
