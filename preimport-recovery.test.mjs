import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('./Madar.html',import.meta.url),'utf8');
const source=html.match(/^async function preserveBeforeReplace\([^\n]+/m)?.[0];
assert.ok(source,'Recovery snapshot must be implemented');
assert.match(html,/await preserveBeforeReplace\(\);D=\{\.\.\.defaults\(\),\.\.\.pendingImport/,'Import must snapshot before replacement');
assert.match(html,/async\(\)=>\{await preserveBeforeReplace\(\);D=value/,'Vault restore must snapshot before replacement');

const saved=new Map(),storage={
  setItem(key,value){saved.set(key,value)},
  getItem(key){return saved.get(key)||null}
};
const context={localStorage:storage,vaultOpen:async()=>null,setTimeout,clearTimeout,Date,JSON,Promise};
runInNewContext("let KEY='account-a',D={schema:1,tasks:[{id:'private',title:'قبل الاستيراد'}]},vaultQueue=Promise.resolve();"+source+"\nthis.snapshot=preserveBeforeReplace;this.select=(key,value)=>{KEY=key;D=value};",context);
await context.snapshot();
const prior=JSON.parse(saved.get('account-a.beforeImport'));
assert.equal(JSON.parse(prior.raw).tasks[0].title,'قبل الاستيراد');
context.select('account-b',{schema:1,tasks:[{id:'another',title:'حساب آخر'}]});
await context.snapshot();
assert.equal(JSON.parse(JSON.parse(saved.get('account-b.beforeImport')).raw).tasks[0].title,'حساب آخر');
assert.equal(JSON.parse(JSON.parse(saved.get('account-a.beforeImport')).raw).tasks[0].title,'قبل الاستيراد');

storage.setItem=()=>{throw Error('quota')};
await assert.rejects(context.snapshot(),/لم تتغير بياناتك/,'Replacement is blocked without a recoverable snapshot');
assert.match(html,/نسخة قبل الاستبدال/,'The snapshot is visible in the recovery list');
console.log('Pre-import/restore snapshot, account isolation and storage failure regression passed');
