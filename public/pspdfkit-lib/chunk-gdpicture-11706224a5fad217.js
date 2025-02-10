/*!
 * PSPDFKit for Web 2024.8.1 (https://pspdfkit.com/web)
 *
 * Copyright (c) 2016-2024 PSPDFKit GmbH. All rights reserved.
 *
 * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 * This notice may not be removed from this file.
 *
 * PSPDFKit uses several open source third-party components: https://pspdfkit.com/acknowledgements/web/
 */
"use strict";(globalThis.webpackChunkPSPDFKit=globalThis.webpackChunkPSPDFKit||[]).push([[1860],{60919:(e,t,s)=>{s.r(t),s.d(t,{Conformance:()=>a,GdPicture:()=>h,GdPictureWorker:()=>w,getBrowserSpawner:()=>g});var r=s(85409),n=s(25030);let a=function(e){return e[e.pdf_a_1a=0]="pdf_a_1a",e[e.pdf_a_1b=1]="pdf_a_1b",e[e.pdf_a_2a=2]="pdf_a_2a",e[e.pdf_a_2u=3]="pdf_a_2u",e[e.pdf_a_2b=4]="pdf_a_2b",e[e.pdf_a_3a=5]="pdf_a_3a",e[e.pdf_a_3u=6]="pdf_a_3u",e[e.pdf_a_3b=7]="pdf_a_3b",e[e.pdf_a_4=8]="pdf_a_4",e[e.pdf_a_4e=9]="pdf_a_4e",e[e.pdf_a_4f=10]="pdf_a_4f",e}({});const o="/create.pdf",i="/save.pdf",l="/create.docx",d="/save.docx",u="/templateData.json",c="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope;let f=null,p=null;function m(e){let t;(0,r.V1)(p,"GdPicture WebAssembly is not loaded.");for(var s=arguments.length,n=new Array(s>1?s-1:0),a=1;a<s;a++)n[a-1]=arguments[a];for(const e of n)t=Object.assign(n[0],e);const o=JSON.stringify({type:e,...t}),i=JSON.parse(p.CommandHandler(o));if(!i.success)throw new Error(i.errorReason+": "+i.errorMessage+"\n"+i.error);return i}class h{_mountCustomFonts(e,t){(0,r.V1)(f,"WebAssembly module not loaded."),f.FS.mkdir(t);{const s=c?f.FS.filesystems.WORKERFS:f.FS.filesystems.MEMFS;f.FS.mount(s,{blobs:e},t)}}async loadModule(e,t,s,r,a,o,i){const{Assemblies:l,Module:d}=await async function(e,t){if("string"==typeof e){const s="pspdfkit-lib/",r=`${s}gdpicture-7d551320/jit`,n=`${s}gdpicture-7d551320/aot`;let a,o;t?(a=`${e}${n}/initDotnet.js`,o=`${e}${n}`):(a=`${e}${r}/initDotnet.js`,o=`${e}${r}`);const{initDotnet:i}=await import(a);return i(o,((e,t,s,r,n)=>"blazor.boot.json"===t?fetch(s,{credentials:"same-origin"}):null))}throw new Error("GdPicture WASM loader not implemented")}(e,t);p=l.GdPictureWasm.API,f=d,m("gdpicture/setLicense",{origin:s},{licenseKey:r||"DEMO_PSPDFKIT_WEB"});const u=a?"/fonts":"";if(a&&!f.FS.analyzePath(u).exists&&(this._mountCustomFonts(a,u),m("gdpicture/setFonts",{fontPaths:[u]})),o){const e=await(0,n.sw)(o);m("gdpicture/setDynamicFontLoading",{baseUrl:o.split("/").slice(0,-1).join("/"),allowedFonts:e.availableFonts,v:1})}i&&m("gdpicture/setFontSubstitutions",{fontSubstitutions:i})}toPdf(e,t){f.FS.writeFile(o,new Uint8Array(e));const s={file:i,format:"pdf"};t&&t in a&&(s.conformance=t);try{return m("gdpicture/process",{input:{file:o},output:s}),f.FS.readFile(i).buffer}finally{try{f.FS.unlink(i)}catch(e){}}}toOffice(e,t){f.FS.writeFile(o,new Uint8Array(e));const s=`/save.${t}`;try{return m("gdpicture/process",{input:{file:o},output:{file:s,format:t}}),f.FS.readFile(s).buffer}finally{try{f.FS.unlink(s)}catch(e){console.log(e.message)}}}async populateDocumentTemplate(e,t){let s;f.FS.writeFile(l,new Uint8Array(e));try{s=JSON.stringify(t,null,2)}catch(e){throw new Error("Invalid config data")}f.FS.writeFile(u,s);try{return m("gdpicture/process-office-template",{inputFile:l,modelAndConfigFile:u,outputFile:d}),f.FS.readFile(d).buffer}finally{try{f.FS.unlink(d),f.FS.unlink(u)}catch(e){console.log(e.message)}}}}var _=s(67136);const w=class{constructor(e){let{baseUrl:t,aot:s,mainThreadOrigin:n,licenseKey:a,customFonts:o,dynamicFonts:i,fontSubstitutions:l,workerSpawner:d,wasmLoaderPath:u}=e;(0,_.A)(this,"requests",new Map),(0,_.A)(this,"nextRequestId",1),(0,_.A)(this,"handleMessage",(e=>{const t=e.data,s=this.requests.get(t.id);(0,r.V1)(s,`No request was made for id ${t.id}.`);const{resolve:n,reject:a}=s;if(this.requests.delete(t.id),t.error){const e=new r.uE(t.error);e.callArgs=t.callArgs,a(e)}else n(t.result)})),this.workerSpawner=d,this.workerSpawner.setMessageHandler(this.handleMessage),this.moduleLoadPromise=this.sendRequest("loadModule",[u?{baseUrl:t,wasmLoaderPath:u}:t,s,n,a,o,i,l])}toOffice(e,t){return this.sendRequest("toOffice",[e,t])}toPdf(e,t){let s;return t&&(s=t.replace("pdf","pdf_").replaceAll("-","_")),this.sendRequest("toPdf",[e,s])}async populateDocumentTemplate(e,t){return this.sendRequest("populateDocumentTemplate",[e,t])}destroy(){this.workerSpawner?.terminate(),this.workerSpawner=null}async sendRequest(e,t){(0,r.V1)(this.workerSpawner,"GdPictureClient has been destroyed"),this.moduleLoadPromise&&await this.moduleLoadPromise;const s=this.workerSpawner;return new Promise(((r,n)=>{const a=this.assignId(),o=[...t].filter((e=>e instanceof ArrayBuffer));s.postMessage({id:a,action:e,args:t},o),this.requests=this.requests.set(a,{resolve:r,reject:n})}))}assignId(){const e=this.nextRequestId;return this.nextRequestId=this.nextRequestId+1,e}};const g=async function(){let e,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(t){const{default:t}=await s.e(11).then(s.bind(s,37979));e=new t}else e=new Worker(new URL(s.p+s.u(387),s.b));return{setMessageHandler(t){(0,r.V1)(e,"Worker is null"),e.onmessage=t},postMessage(t,s){e?.postMessage(t,s)},terminate(){e?.terminate(),e=null}}}}}]);