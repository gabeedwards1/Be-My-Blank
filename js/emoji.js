import { tokenize } from './utils.js';
import { store } from './dataLoaders.js';

export function emojisForHoliday(ymd, name){
  // 1) Exact per-date JSON (highest priority)
  const items = store.HOLIDAY_EMOJIS[ymd];
  if(items){
    const hit = items.find(it => (it.name||"").toLowerCase() === (name||"").toLowerCase());
    if(hit && hit.emojis){
      if (Array.isArray(hit.emojis)) return hit.emojis;
      return String(hit.emojis).split(/\s+/).filter(Boolean);
    }
  }
  // 2) Unicode fallback
  return bestEmojisFromUnicode(name, 2);
}

function bestEmojisFromUnicode(name, maxEmojis=2){
  const data = store.EMOJI_DATA;
  if(!data || !data.length) return ["🎉","🥳"];
  const query = tokenize(name).filter(w=>!["day","week","month","national","international","world","the","of","and"].includes(w));
  const scored=[];
  for(const e of data){
    const n=tokenize(e.name), sg=tokenize(e.subgroup), g=tokenize(e.group);
    let score=0;
    for(const w of query){
      if(n.includes(w)) score+=5; else if(sg.includes(w)) score+=3; else if(g.includes(w)) score+=2;
    }
    if(score>0) scored.push({emoji:e.emoji,score});
  }
  if(!scored.length) return ["🎉"];
  scored.sort((a,b)=>b.score-a.score);
  const out=[], seen=new Set();
  for(const s of scored){ if(!seen.has(s.emoji)){ out.push(s.emoji); seen.add(s.emoji); if(out.length>=maxEmojis) break; } }
  return out.length?out:["🎉"];
}
