import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
assert.equal(html,readFileSync(new URL('./index.html',import.meta.url),'utf8'));
assert.ok(html.includes('if(subscription&&mismatched){await subscription.unsubscribe()'));
assert.ok(!html.includes('if(subscription&&(previouslyEnabled||mismatched))'));
const source=html.slice(html.indexOf('async function smartPushTest(){'),html.indexOf("document.addEventListener('click',e=>{let b=e.target.closest('button[data-act]');if(!b)return;switch(b.dataset.act){case'smart-push-edit'"));
const messages=[];
let result={accepted:0,failures:[{error:'transport'}]};
const context={F:{session:{user:{id:'test'}},pushEnabled:true},familyRPC:async()=>result,toast:(message,error)=>messages.push({message,error}),num:String};
runInNewContext(source+'\nthis.testPush=smartPushTest;',context);
await context.testPush();
assert.match(messages.at(-1).message,/خادم مدار/);
assert.equal(messages.at(-1).error,true);
result={accepted:1,failures:[]};
await context.testPush();
assert.match(messages.at(-1).message,/قبلت خدمة الجهاز/);
result={accepted:0,failures:[{status:410}]};
await context.testPush();
assert.match(messages.at(-1).message,/اشتراك الإشعار/);
context.F.pushEnabled=false;
await assert.rejects(context.testPush(),/فعّل إشعارات هذا الجهاز/);

const monthly=html.match(/^ function smartMonthlyDue\([^\n]+/m)?.[0];
const smartItems=html.slice(html.indexOf('function smartItems(){'),html.indexOf('let smartBusy=false'));
assert.ok(monthly&&smartItems.includes('smartMonthlyDue(t,date)'));
class FixedDate extends Date {static now(){return +new Date('2026-04-01T00:00:00Z')}}
const addDays=(date,amount)=>new Date(Date.parse(date+'T12:00:00Z')+amount*86400000).toISOString().slice(0,10);
const reminderContext={Date:FixedDate,Math,Number,encodeURIComponent,Map,
 D:{tasks:[{id:'monthly-31',title:'مهمة ٣١',date:'2026-01-31',anchor:'2026-01-31',monthDay:31,repeat:'monthly'}],exercises:[],books:[],debts:[]},F:{events:[]},
 pushPrefs:()=>({enabled:true,categories:{task:true},days:[0,1,2,3,4,5,6],lead:0}),
 today:()=> '2026-04-01',addDays,smartLocalDay:date=>new Date(date+'T12:00:00Z').getUTCDay(),
 smartNext:(date,time)=>new Date(date+'T'+time+':00Z'),smartQuiet:()=>false,
 exerciseDays:()=>[],calmDailyPlan:()=>[],remaining:()=>0,repaymentSchedule:()=>null,nextSharedDate:()=>null};
runInNewContext(monthly+'\n'+smartItems+'\nthis.testItems=smartItems;this.testMonthly=smartMonthlyDue;',reminderContext);
assert.deepEqual(Array.from(reminderContext.testItems(),x=>x.key),['task:monthly-31:2026-04-30']);
assert.equal(reminderContext.testMonthly({date:'2027-01-31',monthDay:31},'2027-02-28'),true);
assert.equal(reminderContext.testMonthly({date:'2028-01-31',monthDay:31},'2028-02-29'),true);
assert.equal(reminderContext.testMonthly({date:'2026-01-31',monthDay:31},'2026-04-29'),false);
const editSource=html.match(/^\s?function smartEdit\([^\n]+/m)?.[0];
assert.ok(editSource);
let editSubmit;
const editContext={D:{settings:{}},PUSH_CATEGORIES:[['task','المهام']],days:['الأحد'],
 pushPrefs:()=>({enabled:false,categories:{task:true},calmCount:1,lead:10,reading:'20:30',exercise:'17:30',worship:'05:30',habit:'21:00',quietStart:'22:00',quietEnd:'07:00',days:[0],calmSeed:'fixed'}),
 openModal:(title,content,submit)=>{editSubmit=submit},field:()=>'',crypto:{randomUUID:()=> 'seed'},
 setTimeout:()=>{throw Error('Server sync started before local save')}};
runInNewContext(editSource+'\nthis.testEdit=smartEdit;',editContext);
editContext.testEdit();
await editSubmit({has:key=>key==='enabled'||key==='cat_task'||key==='day_0',get:key=>({lead:'10',calmCount:'2',reading:'20:30',exercise:'17:30',worship:'05:30',habit:'21:00',quietStart:'22:00',quietEnd:'07:00'})[key]});
assert.equal(editContext.D.settings.smartPush.calmCount,2);
assert.ok(html.includes('window.madarFamilyChange=function(){priorFamilyChange?.();clearTimeout(smartTimer)'));
console.log('Notification subscription and test feedback regression passed');
