import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {webcrypto} from 'node:crypto';
const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
assert.equal(html,readFileSync(new URL('./index.html',import.meta.url),'utf8'));
const exportBlock=html.slice(html.indexOf('async function backupDigest('),html.indexOf('async function exportData('));
const sharedBlock=html.slice(html.indexOf('async function exportSharedSpace(){'),html.indexOf("document.addEventListener('click',event=>{",html.indexOf('async function exportSharedSpace(){')));
const collections={md_members:[{id:'member'}],md_profiles:[{id:'profile'}],md_tasks:Array.from({length:501},(_,i)=>({id:'task'+i})),md_notices:Array.from({length:500},(_,i)=>({id:'notice'+i})),md_snapshots:[],md_events:[{id:'event'}],md_hearts:Array.from({length:451},(_,i)=>({id:'heart'+i})),md_heart_preferences:[{id:'preference'}]};
let sharedDownload,sharedCalls=[],preview;
const sharedContext={crypto:webcrypto,TextEncoder,Uint8Array,Date,Promise,JSON,Object,Array,
 F:{session:{},familyId:'family-one',error:null,meta:{shareTasks:true}},D:{secret:'private journal'},
 familyRefresh:async()=>{},familyRequest:async path=>{sharedCalls.push(path);if(path.includes('md_documents'))return [{id:'own-document'}];const name=path.split('/').at(-1).split('?')[0],params=new URL('https://test.invalid'+path).searchParams,offset=Number(params.get('offset')||0),limit=Math.min(name==='md_hearts'?200:500,Number(params.get('limit')||500));return collections[name].slice(offset,offset+limit)},
 clone:value=>JSON.parse(JSON.stringify(value)),download:(raw)=>{sharedDownload=raw},toast:()=>{},
 familyUID:()=> 'member',openModal:(title,body)=>{preview={title,body}},
 esc:value=>String(value),num:value=>String(value),btn:()=>''};
runInNewContext(exportBlock+sharedBlock+'\nthis.exportShared=exportSharedSpace;this.checkShared=checkSharedBackup;',sharedContext);
await sharedContext.exportShared();
const sharedBackup=JSON.parse(sharedDownload);
assert.equal(sharedBackup.tasks.length,501,'Export must include records beyond the visible 1000-row list');
assert.equal(sharedBackup.notices.length,500,'An exact page boundary must trigger another request');
assert.equal(sharedBackup.myDocument.id,'own-document');
assert.equal(sharedBackup.hearts.length,451,'All visible heart records must be exported across 200-row server pages');
assert.equal(sharedBackup.heartPreferences[0].id,'preference');
assert.ok(sharedCalls.some(path=>path.includes('md_tasks')&&path.includes('offset=500')));
assert.ok(sharedCalls.some(path=>path.includes('md_notices')&&path.includes('offset=500')));
assert.ok(sharedCalls.some(path=>path.includes('md_hearts?')&&path.includes('offset=200')));
assert.ok(sharedCalls.some(path=>path.includes('md_hearts?')&&path.includes('offset=400')));
assert.equal(sharedBackup.secret,undefined,'Private account data is excluded from the shared export');
assert.equal((await sharedContext.backupVerify(sharedBackup)).verified,true);
const file=body=>({size:JSON.stringify(body).length,name:'shared.json',text:async()=>JSON.stringify(body)});
sharedBackup.members[0].user_id='member';sharedBackup.members[0].family_id='family-one';
const previewBackup=await sharedContext.backupEnvelope(sharedBackup.madarBackupIntegrity?Object.fromEntries(Object.entries(sharedBackup).filter(([key])=>key!=='madarBackupIntegrity')):sharedBackup);
await sharedContext.checkShared(file(previewBackup));
assert.equal(preview.title,'فحص نسخة المساحة');
assert.match(preview.body,/لا يسترجع سجلات/);
assert.match(preview.body,/المهام: 501/);
assert.equal(sharedContext.D.secret,'private journal','Backup inspection must not touch personal data');
const wrongFamily=await sharedContext.backupEnvelope({...sharedBackup,familyId:'another-room',madarBackupIntegrity:undefined});
await assert.rejects(sharedContext.checkShared(file(wrongFamily)),/مساحة أخرى/);
const tampered=JSON.parse(JSON.stringify(previewBackup));tampered.tasks.pop();
await assert.rejects(sharedContext.checkShared(file(tampered)),/تغيّر محتوى الملف/);
const duplicated=await sharedContext.backupEnvelope({...sharedBackup,madarBackupIntegrity:undefined,tasks:[sharedBackup.tasks[0],sharedBackup.tasks[0]]});
await assert.rejects(sharedContext.checkShared(file(duplicated)),/معرّفات مكررة/);
sharedContext.familyRequest=async path=>{if(path.includes('md_documents'))return [{id:'own-document'}];const name=path.split('/').at(-1).split('?')[0];return name==='md_tasks'?collections.md_tasks.slice(0,500):collections[name].slice(0,Math.min(name==='md_hearts'?200:500,collections[name].length))};
await assert.rejects(sharedContext.exportShared(),/كررت الخدمة سجلات/,'A service ignoring page offsets must not produce a misleading backup');
console.log('Paginated, verified shared export passed');
