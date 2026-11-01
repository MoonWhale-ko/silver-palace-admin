import {sanitizeHistory,remember,forget,suggest} from './search-model.js';
export function mountSearch(root,records){
 const popup=root.querySelector('#search-dialog'),input=root.querySelector('#b-search'),options=root.querySelector('#search-options'),footer=root.querySelector('#search-history-footer');
 const storageKey='silver-stream-search-history-v1';let history=[];
 function load(){try{history=sanitizeHistory(JSON.parse(localStorage.getItem(storageKey)));}catch{history=[];}}
 function persist(){try{localStorage.setItem(storageKey,JSON.stringify(history));}catch{}}
 function setInput(term){input.value=term;render();input.focus();input.setSelectionRange?.(term.length,term.length);}
 function close(){popup.close();}
 function run(term){const q=term.trim();if(!q)return;history=remember(history,q);persist();input.value=q;const panel=root.querySelector('#search-results'),list=root.querySelector('#results-list');panel.hidden=false;list.replaceChildren();const matches=records.filter(r=>(r.title+' '+r.description).toLocaleLowerCase('ko').includes(q.toLocaleLowerCase('ko'))).sort((a,b)=>a.title.localeCompare(b.title,'ko'));root.querySelector('#search-status').textContent=matches.length?`‘${q}’ 검색 결과 ${matches.length}개`:`‘${q}’에 해당하는 자료가 없습니다.`;matches.forEach(record=>{const row=document.createElement('button');row.type='button';row.className='result-row';const tag=document.createElement('small'),title=document.createElement('span');tag.textContent=record.type;title.textContent=record.title;row.append(tag,title);row.onclick=record.open;list.append(row);});close();panel.scrollIntoView({block:'nearest'});}
 function render(){
  const typing=Boolean(input.value.trim()),items=typing?suggest(records.map(r=>r.title),input.value):history.slice(0,6);
  root.querySelector('#search-list-title').textContent=typing?'추천 검색어':'최근 검색';footer.hidden=false;footer.style.visibility=typing?'hidden':'visible';root.querySelector('#history-clear').disabled=!history.length;options.replaceChildren();
  if(!items.length){const empty=document.createElement('p');empty.className='search-empty';empty.textContent=typing?'일치하는 추천 검색어가 없습니다.':'최근 검색 기록이 없습니다.';options.append(empty);return;}
  items.forEach(term=>{const row=document.createElement('div');row.className='search-option';const choose=document.createElement('button');choose.type='button';choose.className='search-term';choose.textContent=term;choose.onclick=()=>run(term);const action=document.createElement('button');action.type='button';action.className='search-option-action';action.textContent=typing?'↖':'×';action.setAttribute('aria-label',typing?term+' 입력하기':term+' 기록 삭제');action.onclick=()=>{if(typing){setInput(term);return;}const index=history.indexOf(term);history=forget(history,term);persist();render();const remaining=[...options.querySelectorAll('.search-option-action')];(remaining[Math.min(index,remaining.length-1)]||input).focus();};row.append(choose,action);options.append(row);});
 }
 root.querySelector('#search-toggle').onclick=()=>{load();input.value='';render();if(!popup.open)popup.showModal();input.focus();};
 popup.addEventListener('click',e=>{if(e.target===popup){const b=popup.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)close();}});
 input.oninput=render;root.querySelector('.popup-search').onsubmit=e=>{e.preventDefault();run(input.value);};root.querySelector('#history-clear').onclick=()=>{history=[];persist();render();input.focus();};
 root.querySelector('#clear-search').onclick=()=>{root.querySelector('#search-results').hidden=true;root.querySelector('#search-toggle').focus();};
}
