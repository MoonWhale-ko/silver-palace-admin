// Character list study: admin preview only. Names and portraits are placeholders.
export function openCharacterCatalog(root){
 const dialog=root.querySelector('#b-dialog'),body=root.querySelector('#dialog-content');
 if(!document.getElementById('folder-catalog-style')){const style=document.createElement('style');style.id='folder-catalog-style';style.textContent=`
 #ss-blue-silver .catalog-page.catalog-dialog{width:100%;max-width:900px;max-height:none;overflow:visible;margin:auto;background:transparent;padding:28px 24px}
 #ss-blue-silver .catalog-page .folder-item:after{background:#cec5b2;border:0}
 #ss-blue-silver .catalog-page .folder-label{display:none}
 
 #ss-blue-silver .catalog-dialog{width:min(980px,calc(100% - 28px));max-width:980px;max-height:90dvh;padding:24px 32px;background:#eae5da;color:#303a42;overflow:auto}
 #ss-blue-silver .catalog-dialog #dialog-title{margin:12px 0 6px}
 #ss-blue-silver .catalog-dialog .catalog-note{font-size:12px;margin:0 0 22px;color:#68665e}
 #ss-blue-silver .folder-stack{position:relative;margin:0 auto;padding:12px 0 0;max-width:360px;isolation:isolate}
 #ss-blue-silver .folder-item{display:block;position:relative;width:100%;height:auto;aspect-ratio:0.707 / 1;margin:0 0 calc(73px - 100% / 0.707);padding:0;border:0;background:transparent;color:#354149;text-align:left;isolation:isolate;transition:margin-bottom .32s ease;cursor:pointer}
 #ss-blue-silver .folder-item:last-child{margin-bottom:0}
 #ss-blue-silver .folder-item:before{content:'';position:absolute;inset:20px 0 0;background:#cec5b2;border:1px solid #b1a792;border-radius:0 7px 7px 7px;box-shadow:0 5px 10px #26333e20}
 #ss-blue-silver .folder-item:after{content:'';position:absolute;inset:40px 12px 12px;background:#f3eee2;border:1px solid #d8d0bf;z-index:0}
 #ss-blue-silver .folder-tab{position:absolute;top:0;left:0;width:180px;height:42px;padding:9px 19px;background:#cec5b2;border:1px solid #b1a792;border-bottom:0;border-radius:7px 13px 0 0;font:500 16px/1.5 'Noto Serif KR',serif;z-index:2}
 #ss-blue-silver .folder-label{position:absolute;left:202px;right:20px;top:30px;font-size:11px;letter-spacing:.1em;color:#716e62;z-index:2}
 #ss-blue-silver .folder-inside{position:absolute;inset:68px 22px 36%;z-index:2;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:14px;text-align:center;opacity:0;transform:translateY(8px);transition:opacity .22s,transform .28s;pointer-events:none}
 #ss-blue-silver .folder-portrait{width:90px;height:114px;flex-shrink:0;background:#aebcc4;border:5px solid #fcfaf2;box-shadow:0 0 0 1px #b5b3a9;position:relative;overflow:hidden}
 #ss-blue-silver .folder-portrait:before{content:'';position:absolute;width:41px;height:49px;border-radius:50%;background:#677b87;left:19px;top:12px}
 #ss-blue-silver .folder-portrait:after{content:'';position:absolute;width:98px;height:92px;border-radius:48% 48% 0 0;background:#677b87;left:-9px;top:66px}
 #ss-blue-silver .folder-copy strong{display:block;font:500 18px/1.5 'Noto Serif KR',serif;margin-bottom:calc(-100% / 0.707 / 3)}
 #ss-blue-silver .folder-copy span{display:block;font-size:12px;color:#706c63;line-height:1.9}
 #ss-blue-silver .folder-item:hover,#ss-blue-silver .folder-item:focus-visible,#ss-blue-silver .folder-item[data-expanded=true]{z-index:100!important;margin-bottom:calc(-100% / 0.707 / 3)}
 #ss-blue-silver .folder-item:hover .folder-inside,#ss-blue-silver .folder-item:focus-visible .folder-inside,#ss-blue-silver .folder-item[data-expanded=true] .folder-inside{opacity:1;transform:translateY(0)}
 #ss-blue-silver .folder-item:focus-visible{outline:2px solid #465f73;outline-offset:4px}
 #ss-blue-silver .catalog-status{font-size:12px;min-height:24px;margin:18px 0 0;color:#68665e}
 @media(max-width:540px){#ss-blue-silver .catalog-dialog{padding:20px 16px}#ss-blue-silver .folder-stack{padding-right:0}#ss-blue-silver .folder-tab{width:145px;font-size:14px}#ss-blue-silver .folder-label{left:160px;font-size:10px;letter-spacing:0}#ss-blue-silver .folder-inside{inset:58px 16px 36%;gap:10px}#ss-blue-silver .folder-portrait{width:86px;height:118px}#ss-blue-silver .folder-portrait:before{left:20px;top:12px}#ss-blue-silver .folder-portrait:after{left:-8px;top:67px}#ss-blue-silver .folder-copy strong{font-size:19px}#ss-blue-silver .folder-item:hover,#ss-blue-silver .folder-item:focus-visible,#ss-blue-silver .folder-item[data-expanded=true]{margin-bottom:calc(-100% / 0.707 / 3)}}
 @media(prefers-reduced-motion:reduce){#ss-blue-silver .folder-item,#ss-blue-silver .folder-inside{transition:none}}
 `;document.head.append(style);}
 dialog.classList.add('catalog-dialog');root.querySelector('#dialog-title').textContent='캐릭터 도감';root.querySelector('#dialog-status').textContent='목록 디자인 시안';
 body.replaceChildren();const note=document.createElement('p');note.className='catalog-note';note.textContent='폴더에 마우스를 올리거나 눌러보세요. 이름과 초상화는 임시 표시입니다.';
 const stack=document.createElement('div');stack.className='folder-stack';stack.setAttribute('aria-label','캐릭터 폴더 목록');
 const status=document.createElement('p');status.className='catalog-status';status.setAttribute('role','status');status.textContent='상세 페이지는 아직 연결되지 않았습니다.';
 for(let i=0;i<6;i++){const name='캐릭터 '+String.fromCharCode(65+i);const folder=document.createElement('button');folder.type='button';folder.className='folder-item';folder.style.zIndex=String(i+1);folder.setAttribute('aria-label',name+' 초상화 보기');folder.setAttribute('aria-expanded','false');
 const tab=document.createElement('span');tab.className='folder-tab';tab.textContent=name;
 const label=document.createElement('span');label.className='folder-label';label.textContent='소속 · 특성';
 const inside=document.createElement('span');inside.className='folder-inside';const portrait=document.createElement('span');portrait.className='folder-portrait';portrait.setAttribute('aria-hidden','true');const copy=document.createElement('span');copy.className='folder-copy';const title=document.createElement('strong');title.textContent=name;const text=document.createElement('span');text.textContent='초상화 준비 중';const sub=document.createElement('span');sub.textContent='캐릭터 정보';copy.append(title,text,sub);inside.append(portrait,copy);folder.append(tab,label,inside);
 folder.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){stack.querySelectorAll('button').forEach(b=>{b.dataset.expanded='false';b.setAttribute('aria-expanded','false')});}});
 folder.onclick=()=>{const opened=folder.dataset.expanded==='true';stack.querySelectorAll('button').forEach(b=>{b.dataset.expanded='false';b.setAttribute('aria-expanded','false')});if(!opened){folder.dataset.expanded='true';folder.setAttribute('aria-expanded','true');}status.textContent=opened?'상세 페이지는 아직 연결되지 않았습니다.':name+' · 초상화 미리보기';};stack.append(folder);}
 body.append(note,stack,status);dialog.addEventListener('close',()=>dialog.classList.remove('catalog-dialog'),{once:true});if(dialog.tagName==='DIALOG'&&!dialog.open)dialog.showModal();
}
