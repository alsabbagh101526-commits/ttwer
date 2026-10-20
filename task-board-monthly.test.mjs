import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
assert.equal(html,readFileSync(new URL('./index.html',import.meta.url),'utf8'));
const block=html.slice(html.indexOf('let madarTaskBoardDate=today();'),html.indexOf("if(location.hash.includes('harvest=')",html.indexOf('let madarTaskBoardDate=today();')));
assert.ok(block.includes('function madarTaskBoardEntries('));
const page={innerHTML:''},nav={insertAdjacentHTML:()=>{}},handlers={};
const personal=[
 {id:'own-open',title:'مشوار خاص',category:'بيت',date:'2026-10-21',done:false,private:true},
 {id:'own-done',title:'تقرير العمل',category:'عمل',date:'2026-10-20',done:true,doneAt:'2026-10-21T12:00:00Z'},
 {id:'own-future',title:'موعد قادم',category:'بيت',date:'2026-10-30',done:false}
];
const F={familyId:'room',session:{},error:'',tasks:[{id:'shared',title:'موعد مشترك',due_date:'2026-10-21',done:true}],snapshots:[{user_id:'partner',payload:{scopes:{tasks:true},tasks:[{id:'partner-visible',title:'مهمة ظاهرة',category:'صحة',date:'2026-10-21',done:false},{id:'partner-hidden',title:'سر الزوجة',category:'صحة',date:'2026-10-21',done:false,private:true}]}}]};
const context={Date,Map,Set,Number,String,Array,Math,JSON,RegExp,F,D:{tasks:personal},currentPage:'taskboard',harvestMonth:'2026-10',
 today:()=> '2026-10-21',localDate:d=>d.toISOString().slice(0,10),familyPartner:()=> 'partner',familyName:()=> 'رؤى',
 head:(title,sub,actions)=>title+sub+actions,btn:(label,action)=>`<button data-act="${action}">${label}</button>`,
 esc:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;'),num:n=>String(n),stat:(label,value)=>label+value,
 limitedRows:(rows,key,render)=>rows.map(render).join(''),icon:()=>'',
 $:selector=>selector==='#page'?page:nav,nav:()=>{},render:()=>{page.innerHTML='old'},
 harvestPage:()=>'<details class="card"><summary><h2>✅ مهام وعادات</h2></summary>',harvestReport:()=>({month:'2026-10'}),
 document:{addEventListener:(event,callback)=>(handlers[event]??=[]).push(callback)},familyRefresh:async()=>{},familyError:e=>e.message,toast:()=>{}};
runInNewContext(block+'\nthis.board={render,harvestPage,madarTaskBoardEntries,madarMonthlyTaskInsights};',context);
const before=JSON.stringify({personal,F});
context.board.render();
assert.match(page.innerHTML,/مشوار خاص/,'My private task remains visible to me');
assert.match(page.innerHTML,/تقرير العمل/,'Completion uses its actual day');
assert.match(page.innerHTML,/موعد مشترك/);
assert.match(page.innerHTML,/مهمة ظاهرة/);
assert.doesNotMatch(page.innerHTML,/سر الزوجة/,'Partner private task must stay hidden');
assert.doesNotMatch(page.innerHTML,/موعد قادم/,'Other dates are excluded from the selected day');
assert.match(page.innerHTML,/تاريخ الإكمال غير متاح/,'Shared completion date is not invented');
handlers.change.at(-1)({target:{id:'taskboardDate',value:'2026-10-30'}});
assert.match(page.innerHTML,/موعد قادم/,'Choosing another day updates the list');
assert.doesNotMatch(page.innerHTML,/مشوار خاص/);
handlers.click.at(-1)({target:{closest:()=>({dataset:{act:'taskboard-all'}})}});
assert.match(page.innerHTML,/مشوار خاص/);
assert.match(page.innerHTML,/موعد قادم/);
const report=context.board.madarMonthlyTaskInsights([...personal,{id:'late',date:'2026-10-02',done:true,doneAt:'2026-10-03T08:00:00Z'}],'2026-10','2026-10-21');
assert.deepEqual([report.due,report.done,report.onTime,report.late,report.open],[3,2,0,2,1]);
assert.match(context.board.harvestPage(),/تفصيل مهام الشهر/);
assert.equal(JSON.stringify({personal,F}),before,'Board and report must not mutate records or sharing settings');
console.log('Categorized task board, date selection, privacy, and monthly counts passed');
