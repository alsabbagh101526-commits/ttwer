import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
assert.equal(html,readFileSync(new URL('./index.html',import.meta.url),'utf8'));
const local=html.match(/^async function cloudLocal\([^\n]+/m)?.[0];
const restore=html.slice(html.indexOf('function cloudRestore('),html.indexOf("document.addEventListener('click'",html.indexOf('function cloudRestore(')));
assert.ok(local&&restore,'Encrypted backup helpers exist');

let transaction,request,closes=0;
const makeDb=()=>({close(){closes++},transaction(){request={result:'stored'};transaction={
 objectStore:()=>({get:()=>request,put:()=>request,delete:()=>request}),abort(){transaction.onabort?.()}
 };return transaction}});
const context={cloudBackupStore:async()=>makeDb(),Promise,Error};
runInNewContext(local+'\nthis.testCloudLocal=cloudLocal;',context);

let result='pending';
const aborted=context.testCloudLocal('pending:user',{part:1}).then(()=>{result='resolved'},()=>{result='rejected'});
await new Promise(setImmediate);
request.onsuccess();
await Promise.resolve();
assert.equal(result,'pending','Request success is not transaction completion');
transaction.onabort();await aborted;
assert.equal(result,'rejected','An aborted transaction cannot report a durable backup');
assert.equal(closes,1);

const committed=context.testCloudLocal('pending:user',{part:2});
await new Promise(setImmediate);
request.onsuccess();transaction.oncomplete();
assert.equal(await committed,'stored');
assert.equal(closes,2);

const modals=[],old={tasks:[{id:'old'}],settings:{notifications:true}},fresh={tasks:[{id:'new'}],settings:{notifications:false}};
let allowSnapshot=false,attempts=0,extraCopies=0;
const restoreContext={D:old,Promise,Error,cloudDownload:async()=>fresh,
 openModal:(title,body,onSubmit)=>modals.push({title,onSubmit}),
 preserveBeforeReplace:async()=>{attempts++;if(!allowSnapshot)throw Error('snapshot failed')},
 cloudLocal:async()=>{extraCopies++},familyUID:()=> 'user',JSON,
 mergePersonalBackup:(current,incoming)=>({data:{...current,tasks:[...current.tasks,...incoming.tasks]},added:incoming.tasks.length}),
 defaults:()=>({settings:{notifications:false}}),num:String,btn:()=>''};
runInNewContext(restore+'\nthis.testCloudRestore=cloudRestore;this.current=()=>D;',restoreContext);
restoreContext.testCloudRestore('backup-id');
await modals[0].onSubmit({get:()=> 'long passphrase'});
assert.equal(modals[1].title,'معاينة الاستعادة');
await assert.rejects(modals[1].onSubmit(),/snapshot failed/);
assert.equal(restoreContext.current(),old,'A failed recovery snapshot leaves the current data intact');
assert.equal(extraCopies,0);
allowSnapshot=true;
restoreContext.cloudLocal=async()=>{throw Error('temporary backup failed')};
await assert.rejects(modals[1].onSubmit(),/temporary backup failed/);
assert.equal(restoreContext.current(),old,'A failed extra backup also blocks replacement');
restoreContext.cloudLocal=async()=>{extraCopies++};
assert.equal(await modals[1].onSubmit(),true);
assert.equal(attempts,3);
assert.equal(extraCopies,1);
assert.deepEqual(restoreContext.current().tasks.map(x=>x.id),['old','new']);
assert.equal(restoreContext.current().settings.notifications,true);
console.log('Encrypted transfer commit and pre-restore recovery safety passed');
