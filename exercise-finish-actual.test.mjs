import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
const start=html.indexOf('function editSession(id,finish=false,seed=null){');
const source=html.slice(start,html.indexOf('function editRest(){',start));
assert.ok(source.startsWith('function editSession('));
const plan={id:'plan',name:'بلانك',exerciseType:'time',sets:3,reps:0,durationSeconds:45,weight:0};
const older={id:'older',name:'جلسة سابقة',exerciseType:'reps',sets:4,reps:8};
const D={exercises:[plan],sessions:[older],timer:{exerciseId:'plan',name:'بلانك',sets:0,running:false}};
const fields=new Map();
let modal,encouraged=0;
const context={D,Date,Math,
 today:()=> '2026-10-22',elapsed:()=>90000,round:n=>Math.round(n*100)/100,
 field:(name,label,value)=>{fields.set(name,value);return `<span>${label}</span>`},
 openModal:(title,body,submit)=>{modal={title,body,submit}},
 num:String,syncSessionFields:()=>{},uid:()=> 'logged',queueEncouragement:()=>{encouraged++},
 nval:(form,key)=>Number(form.get(key)||0),str:(form,key)=>String(form.get(key)||'').trim(),
 required:(form,key)=>String(form.get(key)||'').trim(),validDate:s=>s,
 integer:(n)=>{if(!Number.isInteger(n)||n<0)throw Error('عدد غير صحيح');return n},
 positive:(n)=>{if(!Number.isFinite(n)||n<0)throw Error('مدة غير صحيحة');return n}
};
runInNewContext(source+'\nthis.edit=editSession;',context);
context.edit(null,true);
assert.equal(modal.title,'ماذا أنجزت في الجلسة؟');
assert.match(modal.body,/خطتك لهذا التمرين: 3 جولات · 45 ثانية/);
assert.equal(fields.get('sets'),0,'Planned sets are not recorded as completed');
assert.equal(fields.get('durationMinutes'),0);
assert.equal(fields.get('durationRemainderSeconds'),0,'Planned duration is not recorded as performed');
assert.equal(D.sessions.length,1,'Opening the form does not create a session');
assert.equal(D.timer.exerciseId,'plan','The timer remains until actual results are saved');
const values=new Map([['name','بلانك'],['date','2026-10-22'],['minutes','1.5'],['sessionExerciseType','time'],['sets','2'],['durationMinutes','0'],['durationRemainderSeconds','30'],['reps','0'],['weight','0'],['difficulty','5'],['note','']]);
assert.equal(modal.submit({get:key=>values.get(key)||''}),true);
assert.equal(D.sessions.length,2);
assert.equal(D.sessions[0],older,'Older performance remains untouched');
assert.equal(D.sessions[1].sets,2);
assert.equal(D.sessions[1].durationSeconds,30);
assert.equal(D.sessions[1].exerciseId,'plan');
assert.equal(D.timer,null);
assert.equal(plan.sets,3,'Finishing does not change the saved plan');
assert.equal(plan.durationSeconds,45);
assert.equal(encouraged,1);
console.log('Workout finish records actual performance only; plan and existing records remain intact');
