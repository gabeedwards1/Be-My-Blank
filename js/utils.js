// Date helpers, DOM refs, tiny shared stuff

export const FUN_HOLIDAYS_MIN = {
  "01-01":["New Year’s Day (Fun)","Bloody Mary Day"],
  "02-14":["Valentine’s (Fun)","International Book Giving Day"],
  "03-14":["Pi Day","Potato Chip Day"],
  "03-17":["St. Patrick’s (Fun)"],
  "04-01":["April Fools’ Day"],
  "05-04":["Star Wars Day"],
  "06-01":["Say Something Nice Day"],
  "09-19":["Talk Like a Pirate Day"],
  "10-09":["Leif Erikson Day"],
  "10-31":["Halloween (Fun)"],
  "11-13":["World Kindness Day"],
  "11-23":["Espresso Day"],
  "12-25":["Christmas (Fun)"]
};

export function toYMDLocal(d){
  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
export function fromInputLocal(v){
  if(!v) return new Date();
  const [y,m,d]=v.split('-').map(Number);
  return new Date(y,m-1,d,12,0,0);
}
export function todayInputValue(){ return toYMDLocal(new Date()); }
export function titleCase(s){ return (s||"").replace(/\b([a-z])/g,m=>m.toUpperCase()); }
export function ymdToLocalDate(ymd){
  const [y,m,d]=ymd.split('-').map(Number);
  return new Date(y,m-1,d,12,0,0);
}
export function tokenize(s){ return (s||"").toLowerCase().replace(/['’]/g,"").match(/[a-z0-9]+/g)||[]; }

// DOM references (grabbed in main.js)
export const dom = {};
