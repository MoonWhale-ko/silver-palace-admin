import {test} from 'node:test';
import assert from 'node:assert/strict';
import {playOpening} from '../assets/opening-motion.js';

test('slow frames cannot jump straight to navigation', async () => {
 let next, progress;
 const finished=playOpening(p=>{progress=p}, {duration:100,schedule:f=>{next=f},visible:()=>true});
 next(0); next(10000);
 assert.equal(progress,.5);
 next(20000);
 await finished;
 assert.equal(progress,1);
});

test('time in a hidden tab does not advance the opening', async () => {
 let next, progress, shown=true;
 const finished=playOpening(p=>{progress=p}, {duration:100,schedule:f=>{next=f},visible:()=>shown});
 next(0); next(25); shown=false; next(5000);
 assert.equal(progress,.25);
 shown=true; next(10000);
 assert.equal(progress,.25);
 next(10050); next(10075);
 await finished;
 assert.equal(progress,1);
});
