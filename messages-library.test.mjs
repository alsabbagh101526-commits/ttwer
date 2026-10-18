import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('./messages-library.js',import.meta.url),'utf8');
const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
const index=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const sw=readFileSync(new URL('./sw.js',import.meta.url),'utf8');
assert.equal(index,html,'Both Pages entry points ship the same code');
assert.ok(html.includes(source.trim()),'Library is embedded for offline use');
assert.match(sw,/madar-ready-v27/);
assert.match(sw,/searchParams\.set\('madar_release',String\(Date\.now\(\)\)\)/);
const encoded=JSON.parse(html.match(/const RUNTIME_ASSETS=(\{[^\n]+\});/)?.[1]||'{}')['sw.js'];
assert.equal(Buffer.from(encoded,'base64').toString(),sw,'The built-in recovery ZIP contains the same service worker');

const listeners={};let saves=0,oldEncouragements=0,renderCount=0;
const D={settings:{}};
const context={
 D,Date,Math,Set,URL,Promise,navigator:{clipboard:{writeText:async()=>{}}},
 MADAR_STORIES:[{id:'original-story'}],
 document:{addEventListener:(type,listener)=>{(listeners[type]||=[]).push(listener)}},
 today:()=> '2026-10-18',home:()=>'<div>original home</div>',
 harvestStoriesPage:()=>'<div id="harvestStoryCards"></div>',
 queueEncouragement:()=>{oldEncouragements++},
 save:()=>{saves++;return true},render:()=>{renderCount++},go:()=>{},toast:()=>{},
 btn:(label,act,id)=>`<button data-act="${act}" data-id="${id||''}">${label}</button>`,
 esc:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;'),num:n=>String(n),
 storageOK:true,pendingExternal:false,setTimeout:()=>{},
 $:()=>({innerHTML:''})
};
runInNewContext(source+'\nthis.api={MADAR_MESSAGES,MADAR_MESSAGE_SEEDS,MADAR_STORIES,madarMessageDaily,madarMessagePick,madarMessagePrefs,madarMessagePanel};',context);
const {MADAR_MESSAGES:messages,MADAR_MESSAGE_SEEDS:seeds,MADAR_STORIES:stories,madarMessageDaily:daily,madarMessagePick:pick,madarMessagePrefs:prefs,madarMessagePanel:panel}=context.api;
assert.equal(Object.keys(seeds).length,10);
assert.equal(messages.filter(x=>x.kind==='original').length,200);
assert.equal(messages.length,205);
assert.equal(stories.length,5);
assert.equal(stories[0].id,'original-story','Original stories remain first and intact');
assert.equal(new Set(messages.map(x=>x.id)).size,messages.length);
const normalized=s=>s.replace(/[\u064B-\u065F\u0670]/g,'').replace(/[\s\p{P}]+/gu,' ').trim();
assert.equal(new Set(messages.map(x=>normalized(x.text))).size,messages.length,'No identical or near-identical text');
for(const m of messages){assert.ok(m.category&&m.text&&m.id);if(m.kind!=='original'){assert.ok(m.source);assert.equal(new URL(m.url).protocol,'https:')}}
for(const m of stories.slice(1)){assert.ok(m.ref&&m.body&&m.teaser);assert.equal(new URL(m.url).protocol,'https:')}
assert.equal(new Set(Array.from({length:200},(_,i)=>daily('day',new Date(Date.UTC(2026,9,18+i)).toISOString().slice(0,10)).id)).size,200,'Daily message cycles before repeating');
assert.notEqual(daily('morning').id,daily('evening').id);
assert.equal(new Set(Array.from({length:20},()=>pick('wife').id)).size,20,'A category rotates before repetition');
assert.equal(saves,20);
assert.match(panel(),/حق ربي/);
assert.match(context.home(),/original home/);
assert.match(context.home(),/رسالة اليوم/);
assert.match(context.harvestStoriesPage(),/id="harvestStoryCards"/);
assert.match(context.harvestStoriesPage(),/madarMessageLibrary/);
assert.equal(prefs().favorites.length,0);

const click=listeners.click.at(-1);
const favorite=messages.find(x=>x.category==='family');
const event=(act,id)=>({target:{closest:()=>({dataset:{act,id}})}});
await click(event('madar-message-favorite',favorite.id));
assert.equal(prefs().favorites[0],favorite.id);
await click(event('madar-message-favorite',favorite.id));
assert.equal(prefs().favorites.length,0);
assert.equal(renderCount,2);
const before=saves;
context.queueEncouragement('tasks');
assert.equal(oldEncouragements,1,'The existing completion message still runs');
assert.equal(saves,before,'No extra message is stored until the user opts in');
assert.equal(D.settings.messageLibrary.success,false);
assert.ok(!source.includes('Notification.requestPermission'),'Library never asks for push permission');
assert.ok(!source.includes('familyRPC('),'Library never sends content to partner or server');
console.log('Message content, rotation, favorites, context and legacy regressions passed');
