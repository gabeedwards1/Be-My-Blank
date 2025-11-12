// Loads local JSON files and exposes them

export const store = {
  FUN_BY_DATE: {},        // { "YYYY-MM-DD": [names...] }
  HOLIDAY_EMOJIS: {},     // { "YYYY-MM-DD": [ {name, emojis} ] }
  EMOJI_DATA: []          // optional unicode list
};

export async function loadFunJson(){
  try{
    const res = await fetch('./fun_holidays_by_date.json', {cache:'no-store'});
    store.FUN_BY_DATE = await res.json();
    console.log('FUN_BY_DATE', Object.keys(store.FUN_BY_DATE).length);
  }catch(e){
    console.warn('fun_holidays_by_date.json not found', e);
  }
}

export async function loadHolidayEmojiJson(){
  try{
    const res = await fetch('./holiday_emojis_2025.json', {cache:'no-store'});
    store.HOLIDAY_EMOJIS = await res.json();
    console.log('HOLIDAY_EMOJIS', Object.keys(store.HOLIDAY_EMOJIS).length);
  }catch(e){
    console.warn('holiday_emojis_2025.json not found', e);
  }
}

export async function loadUnicodeEmoji(){
  try{
    const res = await fetch('./emoji.json', {cache:'no-store'});
    store.EMOJI_DATA = await res.json();
    console.log('EMOJI_DATA', store.EMOJI_DATA.length);
  }catch(e){
    console.warn('emoji.json not found (fallback to 🎉 only)', e);
  }
}
