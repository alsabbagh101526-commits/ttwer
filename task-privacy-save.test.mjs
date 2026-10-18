import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
const listener=html.match(/^document\.addEventListener\('click',async e=>\{const b=e\.target\.closest\('\[data-act="shared-task-privacy"\]'\)[^\n]+/m)?.[0];
assert.ok(listener,'Task privacy handler exists');
const task={id:'test',title:'مهمة اختبار'};
const D={tasks:[task]},F={familyId:'couple',meta:{approved:true}};
let saveWorks=false,fallback=false,rendered=0;
const notices=[],handlers=[];
const context={D,F,document:{addEventListener:(_kind,fn)=>handlers.push(fn)},save:()=>saveWorks,render:()=>{rendered++},toast:(text)=>notices.push(text),navigator:{onLine:true},personalAttempt:Promise.resolve(false)};
runInNewContext(listener,context);
const event={target:{closest:()=>({dataset:{id:'test'}})}};
await handlers[0](event);
assert.equal(task.private,undefined,'Failed local and fallback storage must roll privacy back exactly');
assert.match(notices.at(-1),/تعذر حفظ اختيار الخصوصية/);

context.personalAttempt=Promise.resolve(true);
await handlers[0](event);
assert.equal(task.private,true,'Verified fallback storage keeps the privacy choice');
assert.match(notices.at(-1),/قد تبقى النسخة السابقة مرئية للشريك حتى ينجح نشر التحديث/);

saveWorks=true;
await handlers[0](event);
assert.equal(task.private,false,'The user can explicitly make the task shareable again');
assert.ok(rendered>=3);
console.log('Task privacy rollback and pending partner publication regression passed');
