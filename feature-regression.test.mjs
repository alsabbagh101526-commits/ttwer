import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
assert.equal(html,readFileSync(new URL('./index.html',import.meta.url),'utf8'));

const block=html.slice(html.indexOf('function personalTaskOccurrences('),html.indexOf('function personalTaskCalendar(){'));
const tasks=[
 {id:'a',title:'موعد أول',date:'2026-10-22',repeat:'none',done:false,time:''},
 {id:'b',title:'رياضة أسبوعية',date:'2026-10-22',repeat:'weekly',done:false,time:''},
 {id:'c',title:'مكتملة',date:'2026-10-23',repeat:'none',done:true,time:''}
];
const parseDate=s=>new Date(s+'T12:00:00Z'),diffDays=(a,b)=>Math.round((parseDate(a)-parseDate(b))/86400000);
const calendar={D:{tasks},diffDays,parseDate,Date,Set};
runInNewContext(block+'\nthis.onDay=personalTaskOccurrences;',calendar);
assert.deepEqual(Array.from(calendar.onDay('2026-10-22'),x=>x.task.id).sort(),['a','b']);
assert.deepEqual(Array.from(calendar.onDay('2026-10-29'),x=>x.task.id),['b']);
tasks[0].date='2026-10-24';
assert.deepEqual(Array.from(calendar.onDay('2026-10-22'),x=>x.task.id),['b']);
assert.deepEqual(Array.from(calendar.onDay('2026-10-24'),x=>x.task.id),['a']);
tasks.splice(0,1);
assert.equal(calendar.onDay('2026-10-24').length,0);
assert.equal(calendar.onDay('2026-10-23')[0].task.done,true);

const mergeSource=html.slice(html.indexOf('function mergePersonalBackup('),html.indexOf('async function readImport('));
const mergeContext={validateData:v=>{if(v.schema!==1)throw Error('schema')},defaults:()=>({schema:1,settings:{notifications:false}}),Set,Object,Array,Error};
runInNewContext(mergeSource+'\nthis.merge=mergePersonalBackup;',mergeContext);
const current={schema:1,settings:{profileName:'صاحب الحساب',notifications:true},tasks:[{id:'keep',title:'جديد'}],sessions:[],exercises:[],careDays:[]};
const older={schema:1,settings:{profileName:'صاحب الحساب',notifications:false},tasks:[{id:'keep',title:'قديم'},{id:'restore',title:'ناقص'}],sessions:[],exercises:[],careDays:[]};
const merged=mergeContext.merge(current,older);
assert.equal(merged.added,1);
assert.equal(merged.data.tasks[0].title,'جديد');
assert.equal(merged.data.tasks[1].title,'ناقص');
assert.equal(merged.data.settings.notifications,true);
assert.equal(current.tasks.length,1,'Preview cannot mutate the live account');
assert.throws(()=>mergeContext.merge(current,{...older,settings:{profileName:'زوجتي'}}),/الحساب.*مختلف/);

const exerciseStart=html.lastIndexOf('function editExercise(id){');
const exerciseSource=html.slice(exerciseStart,html.indexOf('function syncExerciseFields(){',exerciseStart));
let exerciseForm;
const legacy={id:'legacy',name:'قديم',day:1,sets:3,reps:10,minutes:0,weight:0};
const exerciseContext={
 D:{exercises:[legacy],sessions:[]},Date,days:['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
 openModal:(title,body,submit)=>{exerciseForm={title,body,submit}},
 field:()=>'',exerciseDays:e=>Array.isArray(e.scheduleDays)?e.scheduleDays:[e.day],
 syncExerciseFields:()=>{},uid:()=> 'new-time',num:String,
 nval:(form,key)=>Number(form.get(key)||0),str:(form,key)=>String(form.get(key)||'').trim(),
 required:(form,key)=>String(form.get(key)||'').trim(),
 integer:(value)=>{if(!Number.isInteger(value)||value<0)throw Error('invalid integer');return value},
 positive:(value)=>{if(!Number.isFinite(value)||value<0)throw Error('invalid number');return value}
};
runInNewContext(exerciseSource+'\nthis.edit=editExercise;',exerciseContext);
exerciseContext.edit();
const values=new Map([['name','بلانك'],['exerciseType','time'],['day','0'],['sets','2'],['durationMinutes','0'],['durationRemainderSeconds','45'],['restMinutes','0'],['restRemainderSeconds','30'],['minutes','2'],['weight','0']]);
exerciseForm.submit({get:key=>values.get(key)||'',has:key=>key==='libraryOnly'});
assert.equal(exerciseContext.D.exercises.length,2);
assert.equal(exerciseContext.D.exercises[0],legacy,'Legacy exercise stays untouched');
assert.equal(exerciseContext.D.exercises[1].durationSeconds,45);
assert.equal(exerciseContext.D.exercises[1].restSeconds,30);
assert.equal(exerciseContext.D.exercises[1].libraryOnly,true);
assert.equal(exerciseContext.D.sessions.length,0,'Saving a template is not recorded performance');
exerciseContext.edit();
assert.throws(()=>exerciseForm.submit({get:key=>values.get(key)||'',has:key=>key==='libraryOnly'}),/موجود في المكتبة/);

assert.match(html,/function editExercise\(id\)\{[\s\S]*?exerciseType:selected/);
assert.match(html,/if\(!old\)queueEncouragement\('workout'\)/);
assert.match(html,/timedWorkSeconds:sessions\.reduce/);
assert.doesNotMatch(html,/مظاريف/);
console.log('Timed exercise, task calendar derivation and current-first restore regression passed');
