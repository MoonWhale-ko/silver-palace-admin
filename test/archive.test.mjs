import {test} from 'node:test';
import assert from 'node:assert/strict';
import {pack,unpack} from '../editor/archive.js';
test('Korean content and image bytes survive ZIP round trip',async()=>{const image=Uint8Array.from([137,80,78,71,0,255]),project=JSON.stringify({text:'실버 스트림 수정'});const files=unpack(await pack({'project.json':project,'images/1.png':image}).arrayBuffer());assert.equal(new TextDecoder().decode(files['project.json']),project);assert.deepEqual(files['images/1.png'],image);});
test('damaged image data is rejected',async()=>{const buffer=await pack({'project.json':'{}'}).arrayBuffer();const bytes=new Uint8Array(buffer);bytes[42]^=1;assert.throws(()=>unpack(buffer));});
test('truncated archives and unknown projects are rejected',()=>{assert.throws(()=>unpack(new ArrayBuffer(2)));});
