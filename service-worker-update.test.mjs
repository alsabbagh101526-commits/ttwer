import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('./sw.js',import.meta.url),'utf8');
const listeners={},items=new Map(),requests=[];
let now=1000,offline=false;
const cache={addAll:async()=>{},put:async(key,value)=>items.set(String(key),value),match:async key=>items.get(String(key))};
const response={ok:true,headers:{get:()=> 'text/html;charset=utf-8'},clone(){return this}};
const self={registration:{scope:'https://example.test/ttwer/'},addEventListener:(type,fn)=>listeners[type]=fn,skipWaiting:async()=>{},clients:{claim:async()=>{}}};
const context={self,URL,Promise,Date:{now:()=>++now},caches:{open:async()=>cache,keys:async()=>[]},
 fetch:async url=>{requests.push(String(url));if(offline)throw Error('offline');return response},
 Response:class{constructor(body,options){this.body=body;this.status=options.status}}};
runInNewContext(source,context);
const installWait=[];
listeners.install({waitUntil:p=>installWait.push(p)});
await Promise.all(installWait);
assert.match(requests[0],/madar_release=1001/);
assert.equal(items.get(self.registration.scope),response,'The fresh shell is cached for offline startup');

async function navigation(url){const waits=[];let result;
 listeners.fetch({request:{url,method:'GET',mode:'navigate'},respondWith:p=>result=p,waitUntil:p=>waits.push(p)});
 const value=await result;await Promise.all(waits);return value;
}
await navigation('https://example.test/ttwer/Madar.html');
await navigation('https://example.test/ttwer/Madar.html');
assert.notEqual(requests[1],requests[2],'Each navigation bypasses a previously cached CDN variant');
assert.ok(requests[1].includes('madar_release=1002'));
assert.ok(requests[2].includes('madar_release=1003'));
offline=true;
assert.equal(await navigation('https://example.test/ttwer/Madar.html'),response,'Offline navigation uses verified HTML');
let intercepted=false;
listeners.fetch({request:{url:'https://example.test/ttwer/setup.html',method:'GET',mode:'navigate'},respondWith:()=>{intercepted=true}});
assert.equal(intercepted,false,'The worker does not cache account setup pages');
console.log('Fresh PWA navigation, offline shell, and scope isolation passed');
