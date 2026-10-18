import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
assert.equal(html,readFileSync(new URL('./index.html',import.meta.url),'utf8'));
const start=html.indexOf("document.addEventListener('change',async e=>{");
const end=html.indexOf("\n$('#globalSearch')",start);
assert.ok(start>0&&end>start,'The task step handler is present');
const task={id:'task-1',steps:[{title:'خطوة',done:false}],touched:false};
const notices=[];let handler,primary=true,fallback=false,renders=0;
const context={D:{tasks:[task],settings:{}},document:{addEventListener:(type,fn)=>{if(type==='change')handler=fn}},
 save:()=>primary,personalAttempt:Promise.resolve(false),render:()=>{renders++},toast:(message,error)=>notices.push({message,error}),
 commit:()=>{},readImport:()=>{}};
runInNewContext(html.slice(start,end),context);
const target={dataset:{id:'task-1',step:'0'},checked:true,matches:selector=>selector==='[data-step]'};
await handler({target});
assert.equal(task.steps[0].done,true);
assert.equal(task.touched,true);
assert.equal(renders,1);

task.steps[0].done=false;task.touched=false;primary=false;fallback=true;context.personalAttempt=Promise.resolve(fallback);
await handler({target});
assert.equal(task.steps[0].done,true,'IndexedDB fallback keeps the completed step');
assert.equal(task.touched,true);

task.steps[0].done=false;task.touched=false;
let resolveFailure;
context.personalAttempt=new Promise(resolve=>{resolveFailure=resolve});
const pending=handler({target});
assert.equal(target.disabled,true,'The checkbox is locked while backup saving is pending');
resolveFailure(false);
await pending;
assert.equal(task.steps[0].done,false,'Failed writes roll back the task step');
assert.equal(task.touched,false,'Failed writes preserve the prior task metadata');
assert.equal(target.checked,false,'The checkbox must reflect the saved state');
assert.equal(target.disabled,false,'The checkbox can be retried after failure');
assert.match(notices.at(-1).message,/تعذّر حفظ/);
assert.equal(notices.at(-1).error,true);
console.log('Task step primary, fallback, and failed-save rollback passed');
