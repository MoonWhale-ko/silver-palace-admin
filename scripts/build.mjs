if (process.env.CF_PAGES === '1') throw new Error('공개 승인 전 Cloudflare 빌드는 중지되어 있습니다.');
import {mkdir,cp,rm,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {validate} from '../assets/home.js';
validate(JSON.parse(await readFile('data/home.json','utf8')));
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const dir of ['assets','data','editor']) await cp(dir,'dist/'+dir,{recursive:true});
const files=['assets/catalog-divider.png','assets/catalog-header.css','assets/catalog-header.js','characters.html','assets/desk-scene.css',...['wood','lamp','quill','letters','tea','books'].map(name=>'assets/desk/'+name+'.webp'),'index.html','assets/folder-catalog.js','assets/application-sheet.js','assets/opening-motion.js','assets/application-sheet.css','assets/character-application-aged.webp','assets/fonts/silver-palace-script.ttf','assets/typography.css','site.html','assets/site.css','assets/home.js','assets/site-runtime.js','assets/search-popup.js','assets/search-model.js','editor/editor.js','data/home.json'];
for(const character of JSON.parse(await readFile('data/characters.json','utf8')).characters) files.push('assets/party-icons/'+character.id+'.webp');
const version=createHash('sha256');for(const file of files)version.update(await readFile(file));const hash=version.digest('hex').slice(0,12);
const html=await readFile('site.html','utf8');
await writeFile('dist/site.html',html.replace('./assets/site.css','./assets/site.css?v='+hash).replace('./assets/home.js','./assets/home.js?v='+hash));
await writeFile('dist/assets/home.js',(await readFile('assets/home.js','utf8')).replace("'./site-runtime.js'", "'./site-runtime.js?v="+hash+"'"));
await writeFile('dist/index.html',(await readFile('index.html','utf8')).replace('src="site.html"','src="site.html?v='+hash+'"').replace('src="editor/editor.js"','src="editor/editor.js?v='+hash+'"'));
console.log('사이트 dist 빌드 완료 · '+hash);

await writeFile('dist/assets/site-runtime.js',(await readFile('assets/site-runtime.js','utf8')).replace("'./search-popup.js'", "'./search-popup.js?v="+hash+"'").replace("'./folder-catalog.js'", "'./folder-catalog.js?v="+hash+"'"));
await writeFile('dist/assets/search-popup.js',(await readFile('assets/search-popup.js','utf8')).replace("'./search-model.js'", "'./search-model.js?v="+hash+"'"));

await writeFile('dist/characters.html',(await readFile('characters.html','utf8')).replace('./assets/folder-catalog.js','./assets/folder-catalog.js?v='+hash).replace('./assets/application-sheet.css','./assets/application-sheet.css?v='+hash).replace('./assets/desk-scene.css','./assets/desk-scene.css?v='+hash).replace('./assets/catalog-header.css','./assets/catalog-header.css?v='+hash).replace('./assets/catalog-header.js','./assets/catalog-header.js?v='+hash));

await writeFile('dist/assets/folder-catalog.js',(await readFile('assets/folder-catalog.js','utf8')).replace("'./application-sheet.js'", "'./application-sheet.js?v="+hash+"'").replace("'./opening-motion.js'", "'./opening-motion.js?v="+hash+"'"));

await writeFile('dist/assets/catalog-header.js',(await readFile('assets/catalog-header.js','utf8')).replace("'./search-popup.js'","'./search-popup.js?v="+hash+"'"));
