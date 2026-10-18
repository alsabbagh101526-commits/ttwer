'use strict';
const SCOPE=new URL(self.registration.scope);
const CACHE_PREFIX='madar-shell:'+encodeURIComponent(SCOPE.pathname)+':';
const CACHE=CACHE_PREFIX+'madar-ready-v25';
const CORE=['./','./manifest.webmanifest','./icon.svg'];
const ENTRY_PATHS=new Set(['./','./index.html','./Madar.html'].map(path=>new URL(path,SCOPE).pathname));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
function offlineResponse(){return new Response('اتصل بالإنترنت لفتح مدار أول مرة وحفظ نسخته على هذا الجهاز.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}})}
async function networkWithCache(event,key,isHTML){
 try{
  // A release query forces a fresh CDN variant when GitHub Pages still serves
  // a previously cached HTML entry point after deployment.
  const request=isHTML?(()=>{const u=new URL(event.request.url);u.searchParams.set('madar_release','v25');return u.href})():event.request;
  const response=await fetch(request,isHTML?{cache:'no-store'}:undefined);
  if(response.ok&&(!isHTML||(response.headers.get('content-type')||'').includes('text/html'))){
   // Clone before handing the response to the browser. Cache failures must not break navigation.
   const copy=response.clone();
   event.waitUntil(caches.open(CACHE).then(cache=>cache.put(key,copy)).catch(()=>{}));
  }
  return response;
 }catch{
  try{return await (await caches.open(CACHE)).match(key)||offlineResponse()}catch{return offlineResponse()}
 }
}
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==SCOPE.origin)return;
 // Only known public application entry points may update the offline shell.
 // Setup, Auth, API, and unrelated same-origin pages are left to the network.
 if(event.request.mode==='navigate'&&ENTRY_PATHS.has(url.pathname)){
  event.respondWith(networkWithCache(event,SCOPE.href,true));return;
 }
 if(CORE.slice(1).some(asset=>new URL(asset,SCOPE).href===url.href))event.respondWith(networkWithCache(event,event.request,false));
});
self.addEventListener('push',event=>event.waitUntil((async()=>{
 let data={};try{data=event.data?.json()||{}}catch{}
 const safe=new URL(data.url||'./#family=1',self.registration.scope);if(safe.origin!==SCOPE.origin||!safe.href.startsWith(SCOPE.href))safe.href=new URL('./#family=1',SCOPE).href;
 await self.registration.showNotification(String(data.title||'مدار').slice(0,80),{body:String(data.body||'لديك تحديث في المساحة المشتركة.').slice(0,300),icon:new URL('icon.svg',self.registration.scope).href,badge:new URL('icon.svg',self.registration.scope).href,tag:String(data.noticeId||'madar-family'),data:{url:safe.href}});
})()));
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil((async()=>{const target=new URL(event.notification.data?.url||'./#family=1',self.registration.scope);if(target.origin!==SCOPE.origin||!target.href.startsWith(SCOPE.href))target.href=new URL('./#family=1',SCOPE).href;const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});const existing=clients.find(c=>c.url.startsWith(self.registration.scope));if(existing){await existing.navigate(target.href);await existing.focus()}else await self.clients.openWindow(target.href)})())});
