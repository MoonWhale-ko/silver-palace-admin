if (process.env.CF_PAGES === '1') throw new Error('공개 승인 전 Cloudflare 빌드는 중지되어 있습니다.');
import {mkdir,cp,rm,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {validate} from '../assets/home.js';
validate(JSON.parse(await readFile('data/home.json','utf8')));
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const dir of ['assets','data','editor']) await cp(dir,'dist/'+dir,{recursive:true});
const files=['site.html','assets/site.css','assets/home.js','assets/site-runtime.js','assets/search-popup.js','assets/search-model.js','editor/editor.js','data/home.json'];
const version=createHash('sha256');for(const file of files)version.update(await readFile(file));const hash=version.digest('hex').slice(0,12);
const html=await readFile('site.html','utf8');
await writeFile('dist/site.html',html.replace('./assets/site.css','./assets/site.css?v='+hash).replace('./assets/home.js','./assets/home.js?v='+hash));
await writeFile('dist/assets/home.js',(await readFile('assets/home.js','utf8')).replace("'./site-runtime.js'", "'./site-runtime.js?v="+hash+"'"));
await writeFile('dist/index.html',(await readFile('index.html','utf8')).replace('src="site.html"','src="site.html?v='+hash+'"').replace('src="editor/editor.js"','src="editor/editor.js?v='+hash+'"'));
console.log('사이트 dist 빌드 완료 · '+hash);

await writeFile('dist/assets/site-runtime.js',(await readFile('assets/site-runtime.js','utf8')).replace("'./search-popup.js'", "'./search-popup.js?v="+hash+"'"));
await writeFile('dist/assets/search-popup.js',(await readFile('assets/search-popup.js','utf8')).replace("'./search-model.js'", "'./search-model.js?v="+hash+"'"));
