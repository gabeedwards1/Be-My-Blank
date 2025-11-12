import { titleCase } from './utils.js';

const OVERRIDE_NOUN = {
  "Talk Like Yoda Day": "Yoda",
  "International Talk Like a Pirate Day": "pirate",
  "Talk Like a Pirate Day": "pirate",
  "Pi Day": "pi",
  "Tau Day": "tau",
  "Festival of Sleep Day": "nap buddy",
  "Opposite Day": "contrarian",
  "World Kindness Day": "kindheart",
  "Hug Your Cat Day": "cat",
  "Towel Day": "towel",
  "Wright Brothers Day": "aviator",
  "Star Wars Day": "Jedi",
  "Donut Day": "donut",
  "Chocolate Chip Day": "cookie",
  "International Coffee Day": "coffee"
};
const STOP = new Set(["day","week","month","international","world","national","the","a","an","my","your","our","of","and","or","to","in","on","for","with","at","by","like","up"]);

function singularize(word){
  if (/ies$/.test(word)) return word.replace(/ies$/,"y");
  if (/ses$/.test(word)) return word.replace(/es$/,"");
  if (/s$/.test(word) && !/(ss|us|is)$/.test(word)) return word.slice(0,-1);
  return word;
}
function tokensFromName(name){
  return name
    .toLowerCase()
    .replace(/[“”"’']/g,"")
    .replace(/[^a-z0-9\s-]/g," ")
    .split(/\s+/)
    .filter(Boolean);
}

export function pickBeMyNoun(holidayName){
  if (OVERRIDE_NOUN[holidayName]) return OVERRIDE_NOUN[holidayName];

  const base = holidayName.replace(/\s+(Day|Week|Month)$/i,"");
  const lower = base.toLowerCase();

  let m = lower.match(/talk\s+like\s+(?:a|an)\s+([a-z0-9][a-z0-9\s-]*)/);
  if (m) return titleCase(singularize(m[1].split(/\s+/)[0]));

  m = lower.match(/of\s+([a-z0-9][a-z0-9\s-]*)$/);
  if (m) return titleCase(singularize(m[1].split(/\s+/)[0]));

  m = lower.match(/for\s+([a-z0-9][a-z0-9\s-]*)$/);
  if (m) return titleCase(singularize(m[1].split(/\s+/)[0]));

  const toks = tokensFromName(base).filter(t => !STOP.has(t));
  if (toks.length){
    const noun = singularize(toks[toks.length-1]);
    return titleCase(noun);
  }
  return "buddy";
}
