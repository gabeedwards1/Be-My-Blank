import { toYMDLocal, fromInputLocal, todayInputValue, ymdToLocalDate, dom } from './utils.js';
import { loadFunJson, loadHolidayEmojiJson, loadUnicodeEmoji, store } from './dataLoaders.js';
import { funNamesForDate, craftMessage } from './generator.js';
import './nounPicker.js';
import './emoji.js';

// Bind DOM
dom.dateEl       = document.getElementById('date');
dom.statusEl     = document.getElementById('status');
dom.holidaysEl   = document.getElementById('holidays');
dom.outputEl     = document.getElementById('output');
dom.includeFunEl = document.getElementById('includeFun');
dom.bundleEl     = document.getElementById('bundle');

dom.dateEl.value = todayInputValue();

/* ---------- core generate ---------- */
async function generate(){
  dom.statusEl.textContent="Generating…";
  dom.holidaysEl.innerHTML="";
  dom.outputEl.textContent="";

  const dateLocal = fromInputLocal(dom.dateEl.value);
  const ymd = toYMDLocal(dateLocal);

  const names = funNamesForDate(dateLocal, dom.includeFunEl.checked);
  if(!names.length){
    dom.holidaysEl.innerHTML = "<div class='muted'>No holidays found for this date.</div>";
    dom.statusEl.textContent = "";
    return;
  }

  // pills
  names.forEach(n=>{
    const el=document.createElement('span'); el.className='pill'; el.textContent=n;
    dom.holidaysEl.appendChild(el);
  });

  // messages
  let messages = names.map(n => craftMessage(ymd, n));
  if(dom.bundleEl.checked){
    messages = [ names.map(n => "• " + craftMessage(ymd, n)).join("\n") ];
  }
  dom.outputEl.textContent = messages.join("\n\n");
  dom.statusEl.textContent = `Generated ${messages.length} message${messages.length>1?'s':''}.`;
}

/* ---------- copy / random ---------- */
function copyOut(){
  const text = dom.outputEl.textContent.trim(); if(!text) return;
  navigator.clipboard.writeText(text).then(()=>{ dom.statusEl.textContent="Copied ✅"; });
}

function randomHoliday(){
  dom.statusEl.textContent = "Picking a holiday date…";
  let eligible = Object.keys(store.FUN_BY_DATE);
  if(!eligible.length){
    const year = new Date().getFullYear();
    // synthesize dates from the minimal map if main JSON missing
    eligible = Object.keys(FUN_HOLIDAYS_MIN).map(mmdd => `${year}-${mmdd}`);
  }
  if(!eligible.length){ dom.statusEl.textContent = "No dates available."; return; }
  const pick = eligible[Math.floor(Math.random()*eligible.length)];
  dom.dateEl.value = pick;
  dom.statusEl.textContent = `Random holiday picked: ${ymdToLocalDate(pick).toDateString()}`;
  generate();
}

/* ---------- events ---------- */
document.getElementById('go').addEventListener('click', generate);
document.getElementById('today').addEventListener('click', ()=>{ dom.dateEl.value=todayInputValue(); generate(); });
document.getElementById('copy').addEventListener('click', copyOut);
document.getElementById('regenerate').addEventListener('click', generate);
document.getElementById('random').addEventListener('click', randomHoliday);

/* ---------- startup ---------- */
(async()=>{
  await loadHolidayEmojiJson();  // per-date emoji mapping
  await loadFunJson();           // your scraped fun-holiday dates
  await loadUnicodeEmoji();      // optional fallback scoring
  generate();
})();
