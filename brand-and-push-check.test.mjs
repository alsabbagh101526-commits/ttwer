import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
const index=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const icon=readFileSync(new URL('./icon.svg',import.meta.url),'utf8');
const manifest=JSON.parse(readFileSync(new URL('./manifest.webmanifest',import.meta.url),'utf8'));
assert.equal(html,index);
assert.match(html,/<div class="launchSplash"[^>]*>.*?<img class="launchLogo" src="\.\/icon\.svg\?v=2"/);
assert.match(html,/@media\(prefers-reduced-motion:reduce\)\{\.launchSplash\{display:none!important\}\}/);
assert.match(icon,/<svg[^>]+aria-label="مدار"/);
assert.equal(manifest.icons[0].src,'icon.svg?v=2');

const source=html.slice(html.indexOf('async function smartPushCheck(){'),html.indexOf('async function smartPushTest(){'));
assert.ok(source.startsWith('async function smartPushCheck(){'));
const status={hidden:true,textContent:''};
let subscriptionRead=0;
const context={window:{isSecureContext:true,Notification:function(){},PushManager:function(){}},Notification:{permission:'granted'},navigator:{onLine:true,serviceWorker:{getRegistration:async()=>({pushManager:{getSubscription:async()=>{subscriptionRead++;return {endpoint:'test'};}}})}},F:{session:{user:{id:'test'}},pushEnabled:true},pushPrefs:()=>({enabled:true}),document:{querySelector:()=>status}};
runInNewContext(source+'\nthis.runCheck=smartPushCheck;',context);
await context.runCheck();
assert.equal(status.hidden,false);
assert.match(status.textContent,/اشتراك هذا الجهاز مربوط/);
assert.equal(subscriptionRead,1);

context.Notification.permission='denied';context.F.pushEnabled=false;context.navigator.onLine=false;
await context.runCheck();
assert.match(status.textContent,/إذن إشعارات الموقع مرفوض/);
assert.match(status.textContent,/غير متصل/);
assert.doesNotMatch(status.textContent,/اشتراك هذا الجهاز مربوط/);
assert.equal(subscriptionRead,2);

context.navigator.serviceWorker.getRegistration=async()=>null;
await context.runCheck();
assert.match(status.textContent,/خدمة التطبيق غير مسجلة/);
assert.equal(subscriptionRead,2);
assert.match(html,/case'smart-push-check':smartPushCheck\(\)/);
console.log('Brand, welcome, and read-only push diagnosis passed');
