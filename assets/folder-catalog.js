export async function openCharacterCatalog(root){
 let records;try{const response=await fetch(new URL('../data/characters.json',import.meta.url),{cache:'no-cache'});if(!response.ok)throw Error();records=(await response.json()).characters;}catch{root.querySelector('#dialog-content').textContent='캐릭터 데이터를 불러오지 못했습니다. 새로고침해주세요.';return;}
 const collator=new Intl.Collator('ko');const byName=(a,b)=>collator.compare(a.name,b.name)||a.id.localeCompare(b.id);records.sort(byName);
 const host=root.querySelector('#b-dialog'),body=root.querySelector('#dialog-content');
 if(!document.getElementById('folder-catalog-style')){const style=document.createElement('style');style.id='folder-catalog-style';style.textContent=`
 #ss-blue-silver .catalog-page.catalog-dialog{width:100%;max-width:900px;margin:auto;padding:28px 24px;color:#354149}
 #ss-blue-silver #dialog-title{margin:12px 0 6px}#ss-blue-silver .catalog-note,#ss-blue-silver .catalog-status{font-size:12px;color:#68665e}
 #ss-blue-silver .folder-stack{position:relative;--folder-width:360px;--folder-ratio:.707;--closed-gap:73px;--reveal:.666667;--folder-height:509px;max-width:var(--folder-width);margin:36px auto 0;container-type:inline-size;padding-bottom:calc(var(--folder-height) - var(--closed-gap));isolation:isolate}
 #ss-blue-silver .folder-row{--full:var(--folder-height);height:var(--closed-gap);position:relative;will-change:transform}
 #ss-blue-silver .folder-row[data-open=true]{height:calc(var(--full) * var(--reveal))}
 #ss-blue-silver .folder-item{position:absolute;top:0;left:0;display:block;width:100%;height:var(--full);padding:0;border:0;background:transparent;text-align:left;color:#354149;transform:translate(var(--shift),0) rotate(var(--tilt));transform-origin:50% 15%;transition:transform 1.4s linear;cursor:pointer;overflow:visible}
 #ss-blue-silver .folder-row[data-open=true] .folder-item{transform:translate(var(--shift),-10px) rotate(0deg)}
 #ss-blue-silver .folder-shape{position:absolute;inset:0;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 4px 4px #26333e25);fill:var(--folder-fill,#cec5b2);stroke:var(--folder-edge,#b1a792);stroke-width:1}
 #ss-blue-silver .folder-paper{position:absolute;background:#f5f0e4;border:1px solid #d6d0c4;border-radius:0;width:84%;height:88%;left:8%;top:6%;transform:rotate(-2deg)}
 #ss-blue-silver .folder-paper.second{left:10%;top:7%;transform:rotate(2deg);background:#e8e3d7}
 #ss-blue-silver .folder-tab{position:absolute;left:24px;top:10px;font:500 14px/1.2 'Noto Serif KR',serif}
 #ss-blue-silver .folder-inside{position:absolute;top:14%;left:20px;right:20px;height:48%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;opacity:0;transition:opacity .5s ease;pointer-events:none;text-align:center}
 #ss-blue-silver .folder-row[data-open=true] .folder-inside{opacity:1}
 #ss-blue-silver .folder-portrait{position:relative;width:128px;height:170px;background:transparent;border:0;border-radius:0;overflow:hidden}
 #ss-blue-silver .folder-portrait:before{content:'';position:absolute;top:12px;left:21px;width:33px;height:40px;background:#71838c;border-radius:50%}
 #ss-blue-silver .folder-portrait:after{content:'';position:absolute;top:56px;left:1px;width:72px;height:66px;background:#71838c;border-radius:50% 50% 0 0}
 #ss-blue-silver .folder-copy strong{display:block;font:500 18px/1.5 'Noto Serif KR',serif;margin:0 0 5px}#ss-blue-silver .folder-copy span{display:block;font-size:12px;color:#706c63}
 #ss-blue-silver .folder-item:focus-visible{outline:2px solid #465f73;outline-offset:3px;border-radius:0}
 #ss-blue-silver .catalog-status{margin:22px 0 0}
 @media(max-width:540px){#ss-blue-silver .catalog-page.catalog-dialog{padding:24px 30px}#ss-blue-silver .folder-tab{font-size:12px;top:8px;left:20px}#ss-blue-silver .folder-portrait{width:100px;height:132px}#ss-blue-silver .folder-portrait:before{left:15px;top:7px;width:29px;height:34px}#ss-blue-silver .folder-portrait:after{left:-7px;top:45px}#ss-blue-silver .folder-inside{gap:8px}#ss-blue-silver .folder-copy strong{font-size:15px}}
 @media(prefers-reduced-motion:reduce){#ss-blue-silver .folder-row,#ss-blue-silver .folder-item,#ss-blue-silver .folder-inside{transition:none}}
 
 #ss-blue-silver .folder-portrait:has(img):before,#ss-blue-silver .folder-portrait:has(img):after{display:none}
 #ss-blue-silver .folder-portrait img{width:100%;height:100%;object-fit:contain;display:block}
 #ss-blue-silver .catalog-sort{display:flex;gap:12px;align-items:center;font-size:13px;margin-top:18px}
 #ss-blue-silver .catalog-sort select{font:inherit;padding:8px 12px;background:#f5f0e4;color:#354149;border:1px solid #b1a792}
 #ss-blue-silver .source-note{font-size:12px;color:#68665e;margin:20px 0}
 
 #ss-blue-silver .folder-inside{top:10%;left:0;right:0;height:88%;justify-content:flex-start;gap:0;opacity:1;overflow:hidden}
 #ss-blue-silver .folder-portrait{width:66.6667%;height:auto;flex-shrink:0;background:transparent;border:0;overflow:visible}
 #ss-blue-silver .folder-portrait img{width:100%;height:auto;object-fit:contain}
 #ss-blue-silver .folder-copy{display:none}
 @media(max-width:540px){#ss-blue-silver .folder-inside{top:10%;gap:0}#ss-blue-silver .folder-portrait{width:66.6667%;height:auto}}

 #ss-blue-silver .folder-nameplate{position:absolute;left:50%;top:66.6667%;transform:translate(-50%,-50%);width:88%;padding:10px 12px;background:#f3ecd9;color:#303a42;border:1px solid #988d75;box-shadow:0 2px 5px #26333e26;text-align:center;font-family:'Noto Serif KR',serif}
 #ss-blue-silver .folder-nameplate:before,#ss-blue-silver .folder-nameplate:after{content:'';position:absolute;top:7px;bottom:7px;width:2px;background:var(--folder-edge,#988d75);opacity:.7}
 #ss-blue-silver .folder-nameplate:before{left:5px}#ss-blue-silver .folder-nameplate:after{right:5px}
 #ss-blue-silver .folder-nameplate strong{display:block;font-size:18px;font-weight:500;line-height:1.5;overflow-wrap:anywhere}
 #ss-blue-silver .folder-nameplate small{display:block;font:12px/1.6 Pretendard,sans-serif;border-top:1px solid #c6bba4;margin-top:4px;padding-top:4px}
 @media(max-width:540px){#ss-blue-silver .folder-nameplate{padding:7px 10px}#ss-blue-silver .folder-nameplate strong{font-size:15px}#ss-blue-silver .folder-nameplate small{font-size:11px}}
`;document.head.append(style);}
 host.classList.add('catalog-dialog');root.querySelector('#dialog-title').textContent='캐릭터 도감';root.querySelector('#dialog-status').textContent='목록 디자인 시안';body.replaceChildren();
 const note=document.createElement('p');note.className='catalog-note';note.textContent='폴더에 마우스를 올리거나 눌러보세요. 폴더에 표지 일러스트와 속성별 색상을 적용했습니다.';
 const stack=document.createElement('div');stack.className='folder-stack';stack.setAttribute('aria-label','캐릭터 폴더 목록');
 const status=document.createElement('p');status.className='catalog-status';status.setAttribute('role','status');status.textContent='상세 페이지는 아직 연결되지 않았습니다.';
 const shifts=[-8,-3,14,6,18,-12,-7,-16,4,11,7,-5,15,-2],tilts=[-.4,-1.1,.3,.8,3.6,-.2,-.7,-2.1,.1,.6,.4,-3.3,1.2,-.5];let pinned=null;
 function activate(row){
 const rows=[...stack.querySelectorAll('.folder-row')];if(rows.every(r=>(r.dataset.open==='true')===(r===row)))return;
 const before=rows.map(r=>r.getBoundingClientRect().top);
 rows.forEach(r=>{r.getAnimations().forEach(a=>a.cancel());r.dataset.open=String(r===row);r.querySelector('button').setAttribute('aria-expanded',String(r===row));});
 const after=rows.map(r=>r.getBoundingClientRect().top),activeIndex=rows.indexOf(row);
 if(!matchMedia('(prefers-reduced-motion:reduce)').matches)rows.forEach((r,i)=>{const dy=before[i]-after[i];if(Math.abs(dy)>.5)r.animate([{transform:'translateY('+dy+'px)'},{transform:'translateY(0)'}],{duration:1800,delay:Math.min(300,Math.max(0,i-activeIndex-1)*55),easing:'linear',fill:'backwards'});});
}
 for(let i=0;i<records.length;i++){const character=records[i],name=character.name,row=document.createElement('div');row.className='folder-row';row.style.zIndex=String(i+1);row.style.setProperty('--shift',shifts[i%shifts.length]+'px');row.style.setProperty('--tilt',tilts[i%tilts.length]+'deg');
 const folder=document.createElement('button');folder.type='button';folder.className='folder-item';folder.setAttribute('aria-label',name+' 표지 보기');folder.setAttribute('aria-expanded','false');
 folder.innerHTML='<svg class="folder-shape" viewBox="0 0 360 509" preserveAspectRatio="none" aria-hidden="true"><path d="M12 8 H146 Q151 8 154 13 L162 27 Q164 30 170 30 H348 V505 H12 Z"/></svg><span class="folder-tab">'+name+'</span><span class="folder-inside"><span class="folder-portrait" aria-hidden="true"></span><span class="folder-copy"><strong>'+name+'</strong><span>표지 준비 중</span></span></span>';
 const palette={'연소':['#c98a78','#9f6659'],'응결':['#8fbdce','#668f9f'],'전격':['#d8bf75','#aa9457'],'정화':['#e2ddc6','#b1ab93'],'중력':['#afa0c4','#857598'],'방사':['#a5bc87','#7b9262']};const color=palette[character.element]||['#cec5b2','#b1a792'];row.style.setProperty('--folder-fill',color[0]);row.style.setProperty('--folder-edge',color[1]);row.dataset.element=character.element;row.dataset.characterId=character.id;const photo=document.createElement('img');photo.src=character.cover||character.portrait;photo.alt=name+' 표지';photo.loading='lazy';const cover=folder.querySelector('.folder-portrait');cover.append(photo);const plate=document.createElement('span');plate.className='folder-nameplate';const plateName=document.createElement('strong');plateName.textContent=name;const plateMeta=document.createElement('small');plateMeta.textContent=character.element+' · '+character.job;plate.append(plateName,plateMeta);cover.append(plate);folder.querySelector('.folder-copy span').textContent=character.element+' · '+character.job;
 const paperLayouts=[
 [[8,2.5,-2.4,82]],[[12,11,1.1,91],[-3,16,-1.8,88]],[[5,3.1,-.6,86],[12,15,2.6,90],[7,4.2,-2,83]],[[ -3,13,-1.1,90]],[[6,3.7,-3.1,84],[12,12,.8,90]],[[9,3.1,-1.2,82],[-4,17,2.1,90],[11,11,.4,91]],[[13,14,1.7,90]],[[-2,12,-2.2,89],[9,2.9,.8,83]],[[7,3.3,1.3,84],[12,17,-.7,91]],[[-4,13,-1.5,90],[6,3.8,2.4,85],[12,19,.3,90]],[[12,12,-1.8,91]],[[8,2.7,.9,84],[-3,18,-2.1,90]],[[12,16,1.2,90],[-2,12,-.8,89],[7,3.4,2,82]],[[8,3.2,-1.6,83],[-4,15,-.3,90]]
 ];const sheets=paperLayouts[i%paperLayouts.length];sheets.forEach(([left,top,angle,width],j)=>{const paper=document.createElement('span');paper.className='folder-paper';paper.setAttribute('aria-hidden','true');Object.assign(paper.style,{left:Math.max(8,left)+'%',top:top+'%',width:width+'%',transform:'rotate('+angle+'deg)',background:j%2?'#e8e3d7':'#f5f0e4'});folder.insertBefore(paper,folder.querySelector('svg'));});
 folder.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')activate(row)});folder.addEventListener('focus',()=>activate(row));folder.onclick=()=>{pinned=pinned===row?null:row;activate(pinned);status.textContent=pinned?name+' · 표지 미리보기':'상세 페이지는 아직 연결되지 않았습니다.';};row.append(folder);stack.append(row);}
 stack.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')activate(pinned)});const controls=document.createElement('label');controls.className='catalog-sort';controls.textContent='정렬';const sort=document.createElement('select');sort.setAttribute('aria-label','캐릭터 정렬');for(const [value,label] of [['name','가나다순'],['element','속성순'],['job','직군순']]){const option=document.createElement('option');option.value=value;option.textContent=label;sort.append(option);}controls.append(sort);
 sort.onchange=()=>{pinned=null;activate(null);const field=sort.value;const ordered=[...records].sort((a,b)=>(field==='name'?0:collator.compare(a[field],b[field]))||byName(a,b));const rows=new Map([...stack.children].map(r=>[r.dataset.characterId,r]));ordered.forEach((c,i)=>{const row=rows.get(c.id);row.getAnimations().forEach(a=>a.cancel());row.style.zIndex=String(i+1);stack.append(row);});status.textContent=records.length+'개 캐릭터 항목 · '+sort.selectedOptions[0].textContent;};
 body.append(note,controls,stack,status);
 const resize=new ResizeObserver(entries=>{const width=entries[0].contentRect.width;if(width>0){const ratio=parseFloat(getComputedStyle(stack).getPropertyValue('--folder-ratio'))||.707;stack.style.setProperty('--folder-height',(width/ratio)+'px');}});resize.observe(stack);
 if(host.tagName==='DIALOG'&&!host.open)host.showModal();
}
