import {validate} from './home.js';
export function mount(data){
 validate(data);
 const root=document.getElementById('ss-blue-silver'),dialog=document.getElementById('b-dialog'),input=document.getElementById('b-search');
 root.querySelector('h1').textContent=data.heading;root.querySelector('.b-intro').textContent=data.description;
 const features=root.querySelectorAll('.b-entry');features[0].querySelector('h3').textContent=data.beginnerTitle;features[0].querySelector('p').textContent=data.beginnerDescription;
 features[1].querySelector('h3').textContent=data.menus[0].title;features[1].querySelector('p').textContent=data.menus[0].description;
 root.querySelector('#update-text').textContent=data.updateText;const time=root.querySelector('#update-date');time.textContent=data.updateDate.replaceAll('-','.');time.dateTime=data.updateDate;
 const theme=root.querySelector('#b-theme');let dark=matchMedia('(prefers-color-scheme:dark)').matches;try{const saved=localStorage.getItem('sp-guide-theme');if(saved)dark=saved==='dark';}catch{}
 function paint(){root.dataset.theme=dark?'dark':'light';document.documentElement.style.colorScheme=dark?'dark':'light';theme.textContent=dark?'라이트 모드':'다크 모드';theme.setAttribute('aria-pressed',String(dark));}
 theme.onclick=()=>{dark=!dark;paint();try{localStorage.setItem('sp-guide-theme',dark?'dark':'light');}catch{}};paint();
 function open(title,url){if(url){location.assign(url);return;}root.querySelector('#dialog-title').textContent=title;if(!dialog.open)dialog.showModal();}
 features[0].querySelector('button').onclick=()=>open(data.beginnerTitle,'');features[1].querySelector('button').onclick=()=>open(data.menus[0].title,data.menus[0].url);
 const categories=['캐릭터','장비','가이드','가이드','가이드'],list=root.querySelector('.b-list');list.replaceChildren();
 data.menus.forEach((m,i)=>{const row=document.createElement('button');row.type='button';row.className='b-record';row.dataset.category=categories[i];const tag=document.createElement('span');tag.className='b-tag';tag.textContent=categories[i];const body=document.createElement('span'),title=document.createElement('strong'),desc=document.createElement('small');title.textContent=m.title;desc.textContent=m.description;body.append(title,desc);const arrow=document.createElement('span');arrow.className='b-row-arrow';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');row.append(tag,body,arrow);row.onclick=()=>open(m.title,m.url);list.append(row);});
 let category='전체';function filter(){let count=0;const q=input.value.trim().toLowerCase();list.querySelectorAll('.b-record').forEach(row=>{row.hidden=!((category==='전체'||row.dataset.category===category)&&row.textContent.toLowerCase().includes(q));if(!row.hidden)count++;});root.querySelector('#b-count').textContent=count+'개';root.querySelector('#b-empty').hidden=count>0;}
 input.oninput=filter;root.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{category=b.dataset.filter;root.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filter();});filter();
 root.querySelector('#b-close').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}};
}
