export function openCharacterCatalog(root){
 const host=root.querySelector('#b-dialog'),body=root.querySelector('#dialog-content');
 if(!document.getElementById('folder-catalog-style')){const style=document.createElement('style');style.id='folder-catalog-style';style.textContent=`
 #ss-blue-silver .catalog-page.catalog-dialog{width:100%;max-width:900px;margin:auto;padding:28px 24px;color:#354149}
 #ss-blue-silver #dialog-title{margin:12px 0 6px}#ss-blue-silver .catalog-note,#ss-blue-silver .catalog-status{font-size:12px;color:#68665e}
 #ss-blue-silver .folder-stack{position:relative;--folder-width:360px;--folder-ratio:.707;--closed-gap:73px;--reveal:.666667;--folder-height:509px;max-width:var(--folder-width);margin:36px auto 0;container-type:inline-size;padding-bottom:calc(var(--folder-height) - var(--closed-gap));isolation:isolate}
 #ss-blue-silver .folder-row{--full:var(--folder-height);height:var(--closed-gap);position:relative;will-change:transform}
 #ss-blue-silver .folder-row[data-open=true]{height:calc(var(--full) * var(--reveal))}
 #ss-blue-silver .folder-item{position:absolute;top:0;left:0;display:block;width:100%;height:var(--full);padding:0;border:0;background:transparent;text-align:left;color:#354149;transform:translate(var(--shift),0) rotate(var(--tilt));transform-origin:50% 15%;transition:transform .65s cubic-bezier(.22,.65,.25,1);cursor:pointer;overflow:visible}
 #ss-blue-silver .folder-row[data-open=true] .folder-item{transform:translate(var(--shift),-10px) rotate(var(--tilt))}
 #ss-blue-silver .folder-shape{position:absolute;inset:0;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 4px 4px #26333e25);fill:#cec5b2;stroke:#b1a792;stroke-width:1}
 #ss-blue-silver .folder-paper{position:absolute;background:#f5f0e4;border:1px solid #d6d0c4;border-radius:4px;width:84%;height:88%;left:8%;top:6%;transform:rotate(-2deg)}
 #ss-blue-silver .folder-paper.second{left:10%;top:7%;transform:rotate(2deg);background:#e8e3d7}
 #ss-blue-silver .folder-tab{position:absolute;left:24px;top:14px;font:500 15px/1.5 'Noto Serif KR',serif}
 #ss-blue-silver .folder-inside{position:absolute;top:17%;left:20px;right:20px;height:43%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;opacity:0;transition:opacity .35s ease;pointer-events:none;text-align:center}
 #ss-blue-silver .folder-row[data-open=true] .folder-inside{opacity:1}
 #ss-blue-silver .folder-portrait{position:relative;width:82px;height:104px;background:#aebcc4;border:4px solid #faf7ef;border-radius:3px;overflow:hidden}
 #ss-blue-silver .folder-portrait:before{content:'';position:absolute;top:12px;left:21px;width:33px;height:40px;background:#71838c;border-radius:50%}
 #ss-blue-silver .folder-portrait:after{content:'';position:absolute;top:56px;left:1px;width:72px;height:66px;background:#71838c;border-radius:50% 50% 0 0}
 #ss-blue-silver .folder-copy strong{display:block;font:500 18px/1.5 'Noto Serif KR',serif;margin:0 0 5px}#ss-blue-silver .folder-copy span{display:block;font-size:12px;color:#706c63}
 #ss-blue-silver .folder-item:focus-visible{outline:2px solid #465f73;outline-offset:3px;border-radius:12px}
 #ss-blue-silver .catalog-status{margin:22px 0 0}
 @media(max-width:540px){#ss-blue-silver .catalog-page.catalog-dialog{padding:24px 30px}#ss-blue-silver .folder-tab{font-size:13px;top:11px;left:20px}#ss-blue-silver .folder-portrait{width:66px;height:84px}#ss-blue-silver .folder-portrait:before{left:15px;top:7px;width:29px;height:34px}#ss-blue-silver .folder-portrait:after{left:-7px;top:45px}#ss-blue-silver .folder-inside{gap:8px}#ss-blue-silver .folder-copy strong{font-size:15px}}
 @media(prefers-reduced-motion:reduce){#ss-blue-silver .folder-row,#ss-blue-silver .folder-item,#ss-blue-silver .folder-inside{transition:none}}
 `;document.head.append(style);}
 host.classList.add('catalog-dialog');root.querySelector('#dialog-title').textContent='캐릭터 도감';root.querySelector('#dialog-status').textContent='목록 디자인 시안';body.replaceChildren();
 const note=document.createElement('p');note.className='catalog-note';note.textContent='폴더에 마우스를 올리거나 눌러보세요. 이름·사진·색상은 임시 표시입니다.';
 const stack=document.createElement('div');stack.className='folder-stack';stack.setAttribute('aria-label','캐릭터 폴더 목록');
 const status=document.createElement('p');status.className='catalog-status';status.setAttribute('role','status');status.textContent='상세 페이지는 아직 연결되지 않았습니다.';
 const shifts=[-12,15,-7,19,-16,5],tilts=[-.8,.6,-.4,.9,-.6,.3];let pinned=null;
 function activate(row){
 const rows=[...stack.querySelectorAll('.folder-row')];if(rows.every(r=>(r.dataset.open==='true')===(r===row)))return;
 const before=rows.map(r=>r.getBoundingClientRect().top);
 rows.forEach(r=>{r.getAnimations().forEach(a=>a.cancel());r.dataset.open=String(r===row);r.querySelector('button').setAttribute('aria-expanded',String(r===row));});
 const after=rows.map(r=>r.getBoundingClientRect().top),activeIndex=rows.indexOf(row);
 if(!matchMedia('(prefers-reduced-motion:reduce)').matches)rows.forEach((r,i)=>{const dy=before[i]-after[i];if(Math.abs(dy)>.5)r.animate([{transform:'translateY('+dy+'px)'},{transform:'translateY(0)'}],{duration:700,delay:Math.min(80,Math.max(0,i-activeIndex-1)*18),easing:'cubic-bezier(.2,.75,.25,1)',fill:'backwards'});});
}
 for(let i=0;i<6;i++){const name='캐릭터 '+String.fromCharCode(65+i),row=document.createElement('div');row.className='folder-row';row.style.zIndex=String(i+1);row.style.setProperty('--shift',shifts[i]+'px');row.style.setProperty('--tilt',tilts[i]+'deg');
 const folder=document.createElement('button');folder.type='button';folder.className='folder-item';folder.setAttribute('aria-label',name+' 초상화 보기');folder.setAttribute('aria-expanded','false');
 folder.innerHTML='<svg class="folder-shape" viewBox="0 0 360 509" preserveAspectRatio="none" aria-hidden="true"><path d="M12 20 Q12 8 24 8 H124 Q131 8 135 15 L149 39 Q152 44 160 44 H336 Q348 44 348 56 V493 Q348 505 336 505 H24 Q12 505 12 493 Z"/></svg><span class="folder-tab">'+name+'</span><span class="folder-inside"><span class="folder-portrait" aria-hidden="true"></span><span class="folder-copy"><strong>'+name+'</strong><span>초상화 준비 중</span></span></span>';
 const sheets=[
 [[8,5.7,-2.4,82]],[[10,6.9,1.1,79],[6,5.8,-1.8,85]],[[5,6.3,-.6,86],[9,5.4,2.6,80],[7,7.2,-2,83]],[[11,5.1,1.9,78]],[[6,6.7,-3.1,84],[10,5.8,.8,81]],[[9,6.1,-1.2,82],[5,7.3,2.1,86],[11,5.3,.4,78]]
 ][i];sheets.forEach(([left,top,angle,width],j)=>{const paper=document.createElement('span');paper.className='folder-paper';paper.setAttribute('aria-hidden','true');Object.assign(paper.style,{left:left+'%',top:top+'%',width:width+'%',transform:'rotate('+angle+'deg)',background:j%2?'#e8e3d7':'#f5f0e4'});folder.insertBefore(paper,folder.querySelector('svg'));});
 folder.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')activate(row)});folder.addEventListener('focus',()=>activate(row));folder.onclick=()=>{pinned=pinned===row?null:row;activate(pinned);status.textContent=pinned?name+' · 초상화 미리보기':'상세 페이지는 아직 연결되지 않았습니다.';};row.append(folder);stack.append(row);}
 stack.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')activate(pinned)});body.append(note,stack,status);
 const resize=new ResizeObserver(entries=>{const width=entries[0].contentRect.width;if(width>0){const ratio=parseFloat(getComputedStyle(stack).getPropertyValue('--folder-ratio'))||.707;stack.style.setProperty('--folder-height',(width/ratio)+'px');}});resize.observe(stack);
 if(host.tagName==='DIALOG'&&!host.open)host.showModal();
}
