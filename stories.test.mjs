import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
const module=html.match(/<script id="harvestModule">([\s\S]*?)<\/script>/)?.[1];
assert.ok(module,'Story module is included in the shipped app');
const array=module.slice(module.indexOf('const MADAR_STORIES=['),module.indexOf('];',module.indexOf('const MADAR_STORIES=['))+2);
const selector=module.match(/function harvestStoryPool\([^\n]+/)?.[0]+'\n'+module.match(/function harvestStoryFor\([^\n]+/)?.[0]+'\n'+module.match(/function harvestStoryGcd\([^\n]+/)?.[0];
assert.ok(selector);
const context={};
runInNewContext(array+'\n'+selector+'\nthis.stories=MADAR_STORIES;this.storyFor=harvestStoryFor;',context);
const stories=context.stories;
assert.equal(stories.length,39);
assert.equal(new Set(stories.map(x=>x.id)).size,stories.length);
assert.ok(stories.filter(x=>x.kind==='world').length>=10);
for(const story of stories){
  assert.match(story.id,/^[a-z][a-z0-9-]*$/);
  assert.ok(story.title&&story.teaser&&story.body&&story.ref);
  assert.equal(new URL(story.url).protocol,'https:');
  assert.ok(story.kind==='world'||story.url.startsWith('https://quran.com/'));
}
const libraryContext={MADAR_STORIES:stories,D:{settings:{storyLibrary:{favorites:['ayyub','ayyub','unknown'],read:['johnson','unknown']}}}};
runInNewContext(module.match(/function harvestStoryBook\([^\n]+/)?.[0]+'\nthis.book=harvestStoryBook;',libraryContext);
assert.equal(libraryContext.book().favorites.join(','),'ayyub','Old or invalid IDs are ignored without changing the user’s raw backup');
assert.equal(libraryContext.book().read.join(','),'johnson');
const start=Date.UTC(2026,9,18)/86400000;
for(const count of [1,2,3]){
  const scheduled=[];
  for(let d=0;d<30;d++){
    const date=new Date((start+d)*86400000).toISOString().slice(0,10);
    const daily=Array.from({length:count},(_,slot)=>context.storyFor(date,slot,count).id);
    assert.equal(new Set(daily).size,count,'A day contains distinct stories');
    scheduled.push(...daily);
  }
  assert.equal(new Set(scheduled.slice(0,stories.length)).size,Math.min(stories.length,scheduled.length),'Complete story rotation before repeating');
}
for(const kind of ['faith','world']){
  const date='2026-10-18',pool=stories.filter(x=>(x.kind||'faith')===kind);
  const selected=Array.from({length:pool.length},(_,d)=>context.storyFor(new Date(Date.parse(date+'T00:00:00Z')+d*86400000).toISOString().slice(0,10),0,1,kind));
  assert.equal(new Set(selected.map(x=>x.id)).size,pool.length,'Each selected genre rotates before repeating');
  assert.ok(selected.every(x=>(x.kind||'faith')===kind));
}
assert.ok(module.includes('inspireCount')&&module.includes("'story='+story.id"),'Frequency and deep link are included');
const wrapper=module.slice(module.indexOf('const harvestBaseSmartItems=smartItems;'),module.indexOf("window.addEventListener('hashchange'"));
const tomorrow=new Date(Date.now()+86400000).toISOString().slice(0,10);
const D={monthGoals:[],settings:{harvestNotify:{enabled:true,inspire:true,inspireCount:2,weekly:false,monthEnd:false,goals:false,evening:'21:00'}}};
const prefs={enabled:true};
const notifications={
  D,Date,smartItems:()=>[],pushPrefs:()=>prefs,today:()=>tomorrow,
  addDays:(date,n)=>new Date(Date.parse(date+'T12:00:00Z')+n*86400000).toISOString().slice(0,10),
  harvestMonthRange:date=>({last:new Date(Date.UTC(Number(date.slice(0,4)),Number(date.slice(5,7)),0)).toISOString().slice(0,10)}),
  smartNext:(date,time)=>new Date(date+'T'+time+':00Z'),smartQuiet:()=>false,
  MADAR_STORIES:stories,harvestStoryFor:context.storyFor
};
runInNewContext(wrapper,notifications);
for(const count of [1,2,3]){
  D.settings.harvestNotify.inspireCount=count;
  const items=notifications.smartItems();
  const daily=items.filter(x=>x.key.startsWith('harvest:story-')&&x.key.endsWith(':'+tomorrow));
  assert.equal(daily.length,count,`Exactly ${count} stories on the chosen day`);
  assert.equal(new Set(daily.map(x=>x.url_hash)).size,count);
  assert.ok(daily.every(x=>x.category==='habit'&&x.url_hash.startsWith('story=')));
  assert.ok(items.length<=450);
}
D.settings.harvestNotify.storyKind='world';
assert.ok(notifications.smartItems().filter(x=>x.key.startsWith('harvest:story-')).every(x=>stories.find(s=>s.id===x.url_hash.slice(6))?.kind==='world'));
D.settings.harvestNotify.pauseUntil=tomorrow;
assert.equal(notifications.smartItems().filter(x=>x.key.startsWith('harvest:story-')&&x.key.endsWith(':'+tomorrow)).length,0,'Pause skips stories for its inclusive end date');
D.settings.harvestNotify.pauseUntil='';
D.settings.harvestNotify.inspire=false;
assert.equal(notifications.smartItems().filter(x=>x.key.startsWith('harvest:story-')).length,0);
D.settings.harvestNotify.inspire=true;prefs.enabled=false;
assert.equal(notifications.smartItems().length,0);
console.log('Story library, rotation, and reminder link tests passed');
