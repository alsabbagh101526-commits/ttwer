'use strict';
const CACHE='madar-ready-v12';
const CORE=['./','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith('madar-family-')||key.startsWith('madar-ready-'))&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 // Never cache Auth, API responses, shared data or tokens. Only this app's public shell.
 if(event.request.mode==='navigate')event.respondWith(fetch(event.request).then(response=>{if(response.ok)caches.open(CACHE).then(cache=>cache.put(new URL('./',self.registration.scope),response.clone()));return response}).catch(()=>caches.match(new URL('./',self.registration.scope))));
 if(CORE.slice(1).some(asset=>new URL(asset,self.registration.scope).href===url.href))event.respondWith(fetch(event.request).then(response=>{if(response.ok)caches.open(CACHE).then(cache=>cache.put(event.request,response.clone()));return response}).catch(()=>caches.match(event.request)));
});
self.addEventListener('push',event=>event.waitUntil((async()=>{
 let data={};try{data=event.data?.json()||{}}catch{}
 const safe=new URL('./',self.registration.scope);safe.hash='family=1';
 await self.registration.showNotification(String(data.title||'مدار').slice(0,80),{body:String(data.body||'لديك تحديث في المساحة المشتركة.').slice(0,300),icon:new URL('icon.svg',self.registration.scope).href,badge:new URL('icon.svg',self.registration.scope).href,tag:String(data.noticeId||'madar-family'),data:{url:safe.href}});
})()));
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil((async()=>{const target=new URL('./',self.registration.scope);target.hash='family=1';const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});const existing=clients.find(c=>c.url.startsWith(self.registration.scope));if(existing){await existing.navigate(target.href);await existing.focus()}else await self.clients.openWindow(target.href)})())});
