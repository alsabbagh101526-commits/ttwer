import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {webcrypto} from 'node:crypto';
const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
assert.equal(html,readFileSync(new URL('./index.html',import.meta.url),'utf8'));
const exportBlock=html.slice(html.indexOf('async function backupDigest('),html.indexOf('async function exportData('));
const sharedBlock=html.slice(html.indexOf('async function exportSharedSpace(){'),html.indexOf("document.addEventListener('click',event=>{",html.indexOf('async function exportSharedSpace(){')));
const collections={md_members:[{id:'member'}],md_profiles:[{id:'profile'}],md_tasks:Array.from({length:501},(_,i)=>({id:'task'+i})),md_notices:Array.from({length:500},(_,i)=>({id:'notice'+i})),md_snapshots:[],md_events:[{id:'event'}],md_hearts:[{id:'heart'}],md_heart_preferences:[{id:'preference'}]};
let sharedDownload,sharedCalls=[];
const sharedContext={crypto:webcrypto,TextEncoder,Uint8Array,Date,Promise,JSON,Object,Array,
 F:{session:{},familyId:'family-one',error:null,meta:{shareTasks:true}},D:{secret:'private journal'},
 familyRefresh:async()=>{},familyRequest:async path=>{sharedCalls.push(path);if(path.includes('md_documents'))return [{id:'own-document'}];const name=path.split('/').at(-1).split('?')[0],offset=Number(new URL('https://test.invalid'+path).searchParams.get('offset')||0);return collections[name].slice(offset,offset+500)},
 clone:value=>JSON.parse(JSON.stringify(value)),download:(raw)=>{sharedDownload=raw},toast:()=>{}};
runInNewContext(exportBlock+sharedBlock+'\nthis.exportShared=exportSharedSpace;',sharedContext);
await sharedContext.exportShared();
const sharedBackup=JSON.parse(sharedDownload);
assert.equal(sharedBackup.tasks.length,501,'Export must include records beyond the visible 1000-row list');
assert.equal(sharedBackup.notices.length,500,'An exact page boundary must trigger another request');
assert.equal(sharedBackup.myDocument.id,'own-document');
assert.equal(sharedBackup.hearts[0].id,'heart');
assert.equal(sharedBackup.heartPreferences[0].id,'preference');
assert.ok(sharedCalls.some(path=>path.includes('md_tasks')&&path.includes('offset=500')));
assert.ok(sharedCalls.some(path=>path.includes('md_notices')&&path.includes('offset=500')));
assert.equal(sharedBackup.secret,undefined,'Private account data is excluded from the shared export');
assert.equal((await sharedContext.backupVerify(sharedBackup)).verified,true);
console.log('Paginated, verified shared export passed');
