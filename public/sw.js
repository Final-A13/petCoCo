if(!self.define){let s,e={};const a=(a,c)=>(a=new URL(a+".js",c).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(c,i)=>{const t=s||("document"in self?document.currentScript.src:"")||location.href;if(e[t])return;let u={};const n=s=>a(s,t),r={module:{uri:t},exports:u,require:n};e[t]=Promise.all(c.map((s=>r[s]||n(s)))).then((s=>(i(...s),u)))}}define(["./workbox-1bb06f5e"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"c54a5e94165fd9df629046c50d59dc9d"},{url:"/_next/static/Qu_qEuZNmudvWyKrECcEb/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/Qu_qEuZNmudvWyKrECcEb/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1336-f020d3f7282dcb78.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/1920-b16242ab2228c2c8.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/231-0b5c0900cc13f58e.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/3197-f170fcee657c869a.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/343-eb1160eb55a1c4d4.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/3721-466f2a4c2fc54580.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/3760.ba52013e4462a88c.js",revision:"ba52013e4462a88c"},{url:"/_next/static/chunks/3812.34789b872f2ef409.js",revision:"34789b872f2ef409"},{url:"/_next/static/chunks/41ade5dc-0d1ba84dc813af6c.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/4370-2220307515c4cf04.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/4875.1beb5dcb12511e8a.js",revision:"1beb5dcb12511e8a"},{url:"/_next/static/chunks/4904-3fed447c935c03e3.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/5928-61aac0f37935e805.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/6648-4dec1aba9e6e6187.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/6937-2bb46a8b87e67664.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/7023-6d23709ad6bd0224.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/7035.cb726032edead13d.js",revision:"cb726032edead13d"},{url:"/_next/static/chunks/8137.803f3e454a6d9b29.js",revision:"803f3e454a6d9b29"},{url:"/_next/static/chunks/8461-947cc1b68bd21000.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/8e1d74a4-d531bf0e919230c5.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/94730671-0074c06a9318ebcb.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/9567-11084a680f01375d.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/9708-52e98debf124e8f3.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(private)/message/list/page-1ed317bd7ddc654c.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(private)/message/page-2aa71f33e381393b.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(private)/mypage2/%5Bid%5D/addMyPetProfile/page-459edf54046f61df.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(private)/mypage2/%5Bid%5D/fixMyPetProfile/%5BpetId%5D/page-580d2fc3bae583c6.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(private)/mypage2/%5Bid%5D/fixMyProfile/page-ad8ac7172185a818.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(private)/mypage2/%5Bid%5D/myMatePosts/page-9f9bede369cc5318.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(private)/mypage2/%5Bid%5D/myPosts/page-a339fe557f25c8c2.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(private)/mypage2/%5Bid%5D/page-62475bf34199ac5a.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/(account)/GCallback/page-e13f149101d81731.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/(account)/KCallback/page-6ae2ef0d17969b10.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/(account)/nickname/page-eea7d500a2b5a5a7.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/(account)/signin/page-bc17e917213ec916.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/(account)/signup/page-fe921bf2b739be04.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/community2/%5Bid%5D/page-cb23631c24f43b39.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/community2/createPost/layout-77d2787fbed79a8e.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/community2/createPost/page-0e9c3df81d849bda.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/community2/page-7f0a3334fd57b2b4.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/mate/filter/page-4d490abeb2278fb2.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/mate/page-76a8081ac9d64205.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/mate/posts/%5Bid%5D/page-365f0485d411cb5b.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/mate/posts/page-0b6b6f2a447691f9.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/userInfo/%5Bid%5D/page-ecb59a4f21396dd5.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/userInfo/%5Bid%5D/petProfile/%5BpetId%5D/page-1704fa19469d862e.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/userInfo/%5Bid%5D/userMatePosts/page-78d3fe6e897fcdbc.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/userInfo/%5Bid%5D/userPosts/page-aca2eb2f820c4dc9.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/(public)/userInfo/%5Bid%5D/userProfile/page-e1a08613f1f12120.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/_not-found/page-4b702d4e7d24fa95.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/layout-49c3399671438b50.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/app/page-fb012b87b7551652.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/fc2f6fa8-37dd54aa83623506.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/fd9d1056-1b26ba00f820661a.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/main-8e8cf8fbab56e892.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/main-app-e70849ea955534c1.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-a5844d3c6789cf2e.js",revision:"Qu_qEuZNmudvWyKrECcEb"},{url:"/_next/static/css/08d3aada632dfdd2.css",revision:"08d3aada632dfdd2"},{url:"/_next/static/css/4bb062a3a5056a25.css",revision:"4bb062a3a5056a25"},{url:"/_next/static/css/4d338b51a0f89846.css",revision:"4d338b51a0f89846"},{url:"/_next/static/css/628765f20b848f76.css",revision:"628765f20b848f76"},{url:"/_next/static/css/83c0e08565c504ee.css",revision:"83c0e08565c504ee"},{url:"/_next/static/css/b6960cf6413574ed.css",revision:"b6960cf6413574ed"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/assets/img/BannerPetcoco.png",revision:"1814fbad2809f9b1a87dfd245ed67be6"},{url:"/assets/svg/ActiveKenner.svg",revision:"a583928095720b073f3bb7469a9734d3"},{url:"/assets/svg/Activechat(message).svg",revision:"0f842bf968cf424ada053020d002e263"},{url:"/assets/svg/Activedog.svg",revision:"56947410ad67ea255cc1c098cfcf2c24"},{url:"/assets/svg/Activemy.svg",revision:"56942fd4fa52f60fee71389a44631477"},{url:"/assets/svg/Activepaw.svg",revision:"2db61601a0033313ebb9b03cc5d2e402"},{url:"/assets/svg/Arrow - Left 2.svg",revision:"1f89fb9a4e27c2778495033a174bb780"},{url:"/assets/svg/ImageIcon.svg",revision:"db31d2885dc8ae95dd038fb05b0592d5"},{url:"/assets/svg/Kenner.svg",revision:"cc3f3b5e3378a8df9ccf0564ac03cb8a"},{url:"/assets/svg/Loading.svg",revision:"8db309acf9874f9517d436353235026d"},{url:"/assets/svg/Plus2.svg",revision:"3fb69b7e4ef25290e721ab4deddc4098"},{url:"/assets/svg/Send.svg",revision:"5e123077a99294efacd0ec69bde7dda9"},{url:"/assets/svg/_logo-small.svg",revision:"9fbd06efa05018e80fe1b2805201da55"},{url:"/assets/svg/chat(message).svg",revision:"6ae39df22d10385ea0960023364fa481"},{url:"/assets/svg/chevron-left.svg",revision:"5e8c7b021b625257359e554448f81cdd"},{url:"/assets/svg/comment.svg",revision:"c6615ebb5c24310e158134f6fa4c7463"},{url:"/assets/svg/comunitychat(message).svg",revision:"374e8f65127a07d20f043ecaa438403e"},{url:"/assets/svg/dog.svg",revision:"8fd815e0ac14aa5dffab4deabce52522"},{url:"/assets/svg/file.svg",revision:"db31d2885dc8ae95dd038fb05b0592d5"},{url:"/assets/svg/filter-lines.svg",revision:"cf62de9c167c1cf4a80c3162509be2b9"},{url:"/assets/svg/heart.svg",revision:"be7bc50f93eb7d9d0e5b2a196c6b4543"},{url:"/assets/svg/heart2.svg",revision:"9b007bc5af385c59eb81210df4db1fb4"},{url:"/assets/svg/heart3.svg",revision:"cf2adeb272db09222f12bd5cd6f29410"},{url:"/assets/svg/heart4.svg",revision:"93a01e0f37249398333fd1c20c781a41"},{url:"/assets/svg/ic_calendar2.svg",revision:"cdfe1e7127bbad5ffd6353282f331639"},{url:"/assets/svg/ic_info.svg",revision:"2d79fab9382d6aa61a2075a84b5469f9"},{url:"/assets/svg/ic_location2.svg",revision:"578b89a09e146890233ca7b5e0623c3f"},{url:"/assets/svg/ic_user2.svg",revision:"e784cb33dc0a38202b79a99e7379a3a8"},{url:"/assets/svg/mail-alt.svg",revision:"062b762ed918cdf629446fb4a2d1dfe2"},{url:"/assets/svg/mi_options-vertical.svg",revision:"b407ea250f8c59909efdc8556c80754c"},{url:"/assets/svg/my.svg",revision:"f2505f9556c4baca3a28182b2def112e"},{url:"/assets/svg/paw.svg",revision:"60768ae732cc815d8510453404d26d7f"},{url:"/assets/svg/petCoco.svg",revision:"d6d8d1a5ae701cd281bf2b2bb83dfc0c"},{url:"/assets/svg/petcoco.ico",revision:"686e5c51ca3799edb0f535feac6e0b63"},{url:"/assets/svg/ph_paw.svg",revision:"e6b6688f214b0f43f185c4911b14d474"},{url:"/assets/svg/plus-01.svg",revision:"9229cd17b48edf23f872b02b61878754"},{url:"/assets/svg/plus.svg",revision:"21cf95a08827a7d0c82ad69135ff3f07"},{url:"/assets/svg/search.svg",revision:"8bf9d85c361a79166cf68482007a9d33"},{url:"/assets/svg/xIcon.svg",revision:"0744ba70f1e60c3f67d8952fa419d7de"},{url:"/assets/svg/xbtn.svg",revision:"1689fde417029e5eb702691da43ee0f1"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:c})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
