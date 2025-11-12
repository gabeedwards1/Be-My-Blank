import { FUN_HOLIDAYS_MIN, toYMDLocal, titleCase } from './utils.js';
import { store } from './dataLoaders.js';
import { pickBeMyNoun } from './nounPicker.js';
import { emojisForHoliday } from './emoji.js';

export function funNamesForDate(dateLocal, includeFun){
  const ymd = toYMDLocal(dateLocal);
  const mmdd = ymd.slice(5);
  const fromFile = store.FUN_BY_DATE[ymd] || [];
  const builtin = FUN_HOLIDAYS_MIN[mmdd] || [];
  if(!includeFun) return [];
  return [...fromFile, ...builtin].filter((v,i,a)=>a.indexOf(v)===i);
}

export function craftMessage(ymd, name){
  const noun = pickBeMyNoun(name);
  const ems = emojisForHoliday(ymd, name).slice(0,2).join(" ");
  return `Be my ${noun} ${ems} — Happy ${name}!`;
}
