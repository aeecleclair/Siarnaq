(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{3258:function(e,l,s){Promise.resolve().then(s.bind(s,1672))},1672:function(e,l,s){"use strict";s.r(l),s.d(l,{default:function(){return es}});var a=s(7437),r=s(9733),i=s(4662),t=s(3304),n=s(4008);let d=e=>{let{isOpened:l,setIsOpened:s,title:d,description:c,status:o,callback:u,width:x="w-[100px]"}=e;return(0,a.jsx)(i.Vq,{open:l,onOpenChange:s,children:(0,a.jsxs)(i.cZ,{className:"sm:max-w-[600px]",onClick:e=>e.stopPropagation(),children:[(0,a.jsx)(i.fK,{children:(0,a.jsxs)(i.$N,{className:"h-20",children:[(0,a.jsx)("div",{className:"mt-16",children:d}),(0,a.jsx)("div",{className:"".concat("SUCCESS"===o?"bg-green-600":"bg-red-600"," w-52 h-52 rounded-full relative -top-52 mx-auto"),children:"SUCCESS"===o?(0,a.jsx)(n.dZ6,{className:"text-white w-32 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}):(0,a.jsx)(n.apv,{className:"text-white w-32 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"})})]})}),(0,a.jsx)(t.Be,{children:c}),(0,a.jsx)("div",{className:"flex justify-end mt-2 space-x-4",children:(0,a.jsx)(r.z,{variant:"outline",onClick:function(e){e.stopPropagation(),u(),s(!1)},className:x,children:"Continuer"})})]})})};var c=s(7948),o=s(692),u=s(5355);let x=()=>{let{isTokenExpired:e}=(0,c.d)(),{data:l,isLoading:s,refetch:a}=(0,u.a)({queryKey:["onlineSellers"],queryFn:o.keh,retry:3,enabled:!e()});return{onlineSellers:(null==l?void 0:l.data)||[],isLoading:s,refetch:a}};var m=s(9196),h=s(7061),p=s(8087),f=s(7138),j=s(6463);let v=()=>{var e,l;let s=(0,p.useTranslations)("AssociationPanel"),{onlineSellers:r}=x(),{userId:i}=(0,h.u)(),t=(0,j.useSearchParams)().get("sellerId")||(null===(e=r.at(0))||void 0===e?void 0:e.id),{purchases:d}=(0,m.$)(i),c=null!==(l=null==d?void 0:d.reduce((e,l)=>e+l.quantity,0))&&void 0!==l?l:0;return(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"mx-auto grid w-full max-w-6xl gap-2 mb-6",children:(0,a.jsx)("h1",{className:"text-3xl font-semibold",children:s("associations")})}),(0,a.jsxs)("nav",{className:"grid gap-4 text-sm text-muted-foreground",children:[(0,a.jsx)(f.default,{href:"/?sellerId=intro",className:"hover:text-primary ".concat("intro"===t?"font-semibold text-primary":""),children:(0,a.jsxs)("div",{className:"flex flex-row items-center",children:[(0,a.jsx)(n.Moc,{className:"h-4 w-4 mr-2"}),s("presentation")]})}),r.map(e=>{var l;let s=null!==(l=d.filter(l=>l.seller.id===e.id).length)&&void 0!==l?l:0;return(0,a.jsx)(f.default,{href:"/?sellerId=".concat(e.id),className:"hover:text-primary ".concat(e.id===t?"font-semibold text-primary":""),children:(0,a.jsxs)("div",{className:"flex flex-row items-center",children:[s>0?(0,a.jsx)(n.qk2,{className:"h-4 w-4 mr-2"}):(0,a.jsx)("div",{className:"w-4 mr-2"}),e.name,s>0&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{className:"ml-2",children:"\xb7"}),(0,a.jsx)("span",{className:"ml-2",children:s})]})]})},e.id)}),(0,a.jsx)(f.default,{href:"/?sellerId=recap",className:"hover:text-primary ".concat("recap"===t?"font-semibold text-primary":""),children:(0,a.jsxs)("div",{className:"flex flex-row items-center",children:[(0,a.jsx)(n.GwR,{className:"h-4 w-4 mr-2"}),s("summary"),c>0&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{className:"ml-2",children:"\xb7"}),(0,a.jsx)("span",{className:"ml-2",children:c})]})]})})]})]})};var N=s(8185),g=s(2265),y=s(4300),w=s(1266),C=s(1976),b=s(9354);let _=g.createContext(null);function P(){let e=g.useContext(_);if(!e)throw Error("useCarousel must be used within a <Carousel />");return e}let k=g.forwardRef((e,l)=>{let{orientation:s="horizontal",opts:r,setApi:i,plugins:t,className:n,children:d,...c}=e,[o,u]=(0,y.Z)({...r,axis:"horizontal"===s?"x":"y"},t),[x,m]=g.useState(!1),[h,p]=g.useState(!1),f=g.useCallback(e=>{e&&(m(e.canScrollPrev()),p(e.canScrollNext()))},[]),j=g.useCallback(()=>{null==u||u.scrollPrev()},[u]),v=g.useCallback(()=>{null==u||u.scrollNext()},[u]),N=g.useCallback(e=>{"ArrowLeft"===e.key?(e.preventDefault(),j()):"ArrowRight"===e.key&&(e.preventDefault(),v())},[j,v]);return g.useEffect(()=>{u&&i&&i(u)},[u,i]),g.useEffect(()=>{if(u)return f(u),u.on("reInit",f),u.on("select",f),()=>{null==u||u.off("select",f)}},[u,f]),(0,a.jsx)(_.Provider,{value:{carouselRef:o,api:u,opts:r,orientation:s||((null==r?void 0:r.axis)==="y"?"vertical":"horizontal"),scrollPrev:j,scrollNext:v,canScrollPrev:x,canScrollNext:h},children:(0,a.jsx)("div",{ref:l,onKeyDownCapture:N,className:(0,b.cn)("relative",n),role:"region","aria-roledescription":"carousel",...c,children:d})})});k.displayName="Carousel";let S=g.forwardRef((e,l)=>{let{className:s,...r}=e,{carouselRef:i,orientation:t}=P();return(0,a.jsx)("div",{ref:i,className:"overflow-hidden",children:(0,a.jsx)("div",{ref:l,className:(0,b.cn)("flex","horizontal"===t?"-ml-4":"-mt-4 flex-col",s),...r})})});S.displayName="CarouselContent";let I=g.forwardRef((e,l)=>{let{className:s,...r}=e,{orientation:i}=P();return(0,a.jsx)("div",{ref:l,role:"group","aria-roledescription":"slide",className:(0,b.cn)("min-w-0 shrink-0 grow-0 basis-full","horizontal"===i?"pl-4":"pt-4",s),...r})});I.displayName="CarouselItem",g.forwardRef((e,l)=>{let{className:s,variant:i="outline",size:t="icon",...n}=e,{orientation:d,scrollPrev:c,canScrollPrev:o}=P();return(0,a.jsxs)(r.z,{ref:l,variant:i,size:t,className:(0,b.cn)("absolute  h-8 w-8 rounded-full","horizontal"===d?"-left-12 top-1/2 -translate-y-1/2":"-top-12 left-1/2 -translate-x-1/2 rotate-90",s),disabled:!o,onClick:c,...n,children:[(0,a.jsx)(w.Z,{className:"h-4 w-4"}),(0,a.jsx)("span",{className:"sr-only",children:"Previous slide"})]})}).displayName="CarouselPrevious",g.forwardRef((e,l)=>{let{className:s,variant:i="outline",size:t="icon",...n}=e,{orientation:d,scrollNext:c,canScrollNext:o}=P();return(0,a.jsxs)(r.z,{ref:l,variant:i,size:t,className:(0,b.cn)("absolute h-8 w-8 rounded-full","horizontal"===d?"-right-12 top-1/2 -translate-y-1/2":"-bottom-12 left-1/2 -translate-x-1/2 rotate-90",s),disabled:!o,onClick:c,...n,children:[(0,a.jsx)(C.Z,{className:"h-4 w-4"}),(0,a.jsx)("span",{className:"sr-only",children:"Next slide"})]})}).displayName="CarouselNext";var z=s(4032),O=s(9055),E=s(9888),F=s(8068),R=s(6943),Z=s(5127),U=s(4599);let q=e=>{var l,s;let{user:r,refetch:i}=e,{toast:t}=(0,F.pm)(),n=(0,p.useTranslations)("IntroCarouselItem"),{scrollNext:d}=P(),{curriculums:c}=(0,R.M)(),{onlineSellers:u}=x(),m=(0,j.useRouter)(),[h,f]=(0,g.useState)(!1),[v,N]=(0,g.useState)(0),y=[n("begin"),n("validate")],[w,C]=(0,g.useState)(null===(l=r.curriculum)||void 0===l?void 0:l.id),b=0===v||1===v&&w&&w!==(null===(s=r.curriculum)||void 0===s?void 0:s.id),_=[(0,a.jsx)("div",{className:"flex flex-col gap-2",children:(0,a.jsx)("span",{children:n("description")})},"intro"),(0,a.jsxs)("div",{className:"h-full gap-4 flex flex-col",children:[(0,a.jsx)("span",{children:n("selectCurriculum")}),(0,a.jsxs)(E.Ph,{value:w,onValueChange:C,children:[(0,a.jsx)(E.i4,{className:"w-[300px] m-auto",children:(0,a.jsx)(E.ki,{})}),(0,a.jsx)(E.Bw,{children:(0,a.jsx)(E.DI,{children:c.map(e=>(0,a.jsx)(E.Ql,{value:e.id,children:(0,a.jsx)(O.C,{variant:"secondary",children:e.name})},e.id))})})]})]},"curriculum")];async function k(){if(f(!0),!w){f(!1);return}let{data:e,error:l}=await (0,o.Vum)({path:{user_id:r.id,curriculum_id:w}});if(l){t({title:"Error",description:l.detail,variant:"destructive"}),f(!1);return}i(),f(!1)}async function q(){if(b){var e;if(1===v){await k();let e=u.length>0?u[0]:void 0;e&&m.push("?sellerId=".concat(e.id))}if(0!==v||(null===(e=r.curriculum)||void 0===e?void 0:e.id)){let e=u.length>0?u[0]:void 0;e&&m.push("?sellerId=".concat(e.id))}else N(v+1),d()}}return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(S,{children:_.map((e,l)=>(0,a.jsx)(I,{children:e},l))}),(0,a.jsx)("div",{className:"pb-6 pt-10 flex justify-center",children:(0,a.jsx)(z.f,{size:"lg",className:"w-[160px]",onClick:q,isLoading:h,children:(0,a.jsx)(Z.M,{initial:!1,mode:"wait",children:(0,a.jsx)(U.E.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:y[v]},v)})})})]})};var B=s(7042);let D=()=>{let e=(0,p.useTranslations)("IntroPanel"),{userId:l}=(0,h.u)(),{user:s,refetch:r}=(0,B.a)(l);return(0,a.jsxs)(N.Zb,{children:[(0,a.jsx)(N.Ol,{children:(0,a.jsx)(N.ll,{children:e("presentation")})}),(0,a.jsx)(N.aY,{className:"space-y-2",children:(0,a.jsx)(k,{opts:{watchDrag:!1},children:s&&(0,a.jsx)(q,{user:s,refetch:r})})})]})};var V=s(1333),G=s(5265);let A=e=>{let{isTokenExpired:l}=(0,c.d)(),{data:s,isLoading:a,refetch:r}=(0,u.a)({queryKey:["onlineSellerProducts",null!=e?e:""],queryFn:()=>(0,o.vsp)({path:{seller_id:e}}),retry:3,enabled:!l()&&!!e});return{onlineProducts:(null==s?void 0:s.data)||[],isLoading:a,refetch:r}};var K=s(7911),M=s(518),T=s(7592);let L=()=>{var e,l;let s=(0,p.useTranslations)("ProductPanel"),{onlineSellers:i}=x(),t=(0,j.useSearchParams)().get("sellerId")||(null==i?void 0:null===(e=i.at(0))||void 0===e?void 0:e.id)||"",{onlineProducts:n}=A(t),d=null==i?void 0:i.find(e=>e.id===t),c=null==i?void 0:i.findIndex(e=>e.id===t),{productExpansion:o,setExpandedProducts:u}=(0,K.g)(),m=(0,j.useRouter)(),{userId:f}=(0,h.u)(),{user:v}=(0,B.a)(f);(0,g.useEffect)(()=>{void 0===o[t]&&(null==d?void 0:d.id)===t&&n&&u(t,n.map(e=>e.id))},[o,t,u,n,null==d?void 0:d.id]);let y=n.filter(e=>{var l,s,a;return null!==(a=null==e?void 0:null===(s=e.variants)||void 0===s?void 0:null===(l=s.filter(e=>{var l,s,a;return null!==(a=null===(s=e.allowed_curriculum)||void 0===s?void 0:null===(l=s.filter(e=>{var l;return e.id===(null==v?void 0:null===(l=v.curriculum)||void 0===l?void 0:l.id)}))||void 0===l?void 0:l.length)&&void 0!==a&&a}))||void 0===l?void 0:l.length)&&void 0!==a&&a});return(0,a.jsx)("div",{className:"grid gap-6",children:(0,a.jsxs)(N.Zb,{children:[(0,a.jsx)(N.Ol,{children:(0,a.jsx)(N.ll,{children:d?d.name:"No seller found"})}),(0,a.jsx)(N.aY,{children:y.length>0?(0,a.jsx)(G.UQ,{type:"multiple",value:o[t],onValueChange:e=>u(t,e),children:y.map(e=>(0,a.jsx)(V.A,{product:e,sellerId:(null==d?void 0:d.id)||"",userId:f,showDescription:!0,isSelectable:!0,refreshProduct:()=>{}},e.id))}):(0,a.jsx)("h3",{className:"text-lg font-semibold",children:s("noProductFound")})}),(0,a.jsx)(N.eW,{className:"px-6 py-4",children:(0,a.jsxs)("div",{className:"flex items-center space-x-2 ml-auto",children:[(0,a.jsxs)(r.z,{variant:"outline",className:"h-8 w-8 p-0",onClick:()=>{var e;i&&void 0!==c&&(m.replace("/?sellerId=".concat((null===(e=i[c-1])||void 0===e?void 0:e.id)||"")),m.refresh())},disabled:0===c,children:[(0,a.jsx)("span",{className:"sr-only",children:"Go to previous page"}),(0,a.jsx)(M.Z,{className:"h-4 w-4"})]}),i&&void 0!==c&&(0,a.jsxs)("span",{className:"text-sm font-medium text-muted-foreground w-14 flex justify-center",children:[c+1," / ",i.length]}),(0,a.jsxs)(r.z,{variant:"outline",className:"h-8 w-8 p-0",onClick:()=>{var e;i&&void 0!==c&&m.replace("/?sellerId=".concat((null===(e=i[c+1])||void 0===e?void 0:e.id)||""))},disabled:c===(null!==(l=null==i?void 0:i.length)&&void 0!==l?l:0)-1,children:[(0,a.jsx)("span",{className:"sr-only",children:"Go to next page"}),(0,a.jsx)(T.Z,{className:"h-4 w-4"})]})]})})]})})};var Y=s(2625),W=s(2140),$=s(4867);let Q=e=>{let{isLoading:l,onClick:s}=e;return(0,a.jsxs)(r.z,{className:"border-[#3d33a6] group-hover:border-[#3d33a6] p-0 group",variant:"outline",disabled:l,onClick:s,children:[(0,a.jsxs)("svg",{width:"46",viewBox:"20 0 40 50",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"pl-3 w-14",children:[(0,a.jsxs)("g",{"clip-path":"url(#clip0_16_2460)",children:[(0,a.jsx)("path",{d:"M28.7465 34.0888C24.2637 28.8367 27.2522 15.5602 29.1589 15.5602C25.477 15.4863 19.2669 17.9752 20.1037 26.856C20.428 29.479 21.4172 31.9676 22.9717 34.071C24.5263 36.1745 26.5912 37.8184 28.9584 38.8373C31.3257 39.8562 33.9116 40.2139 36.4558 39.8746C38.9999 39.5352 41.4123 38.5107 43.4499 36.9043C36.409 42.0947 31.6364 37.468 28.7465 34.0888Z",fill:"url(#paint0_linear_16_2460)"}),(0,a.jsx)("path",{d:"M45.1931 25.1679C41.4695 32.8474 30.0474 36.0787 28.7563 34.1011C30.9888 37.4433 36.5265 42.1101 43.5046 36.8734C45.5247 35.2573 47.0962 33.1214 48.0613 30.6806C49.0264 28.2397 49.3509 25.58 49.0022 22.9689C48.6536 20.3577 47.6441 17.8872 46.0752 15.8059C44.5063 13.7245 42.4334 12.1056 40.0649 11.1121C47.9515 14.7223 47.1536 21.1234 45.1931 25.1679Z",fill:"url(#paint1_linear_16_2460)"}),(0,a.jsx)("path",{d:"M29.1602 15.5613C37.2292 14.671 46.3531 23.1852 45.1936 25.169C47.4648 21.2015 47.9848 14.7234 40.1131 11.1132C37.7418 10.118 35.1584 9.78278 32.6218 10.1412C30.0853 10.4996 27.6847 11.5391 25.6607 13.1554C23.6368 14.7716 22.0606 16.9079 21.0902 19.35C20.1199 21.7922 19.7894 24.4543 20.1319 27.0696C19.5611 18.2381 26.1478 15.8939 29.1602 15.5613Z",fill:"url(#paint2_linear_16_2460)"})]}),(0,a.jsxs)("linearGradient",{id:"paint0_linear_16_2460",x1:"23.1041",y1:"17.5615",x2:"36.9885",y2:"40.8976",gradientUnits:"userSpaceOnUse",children:[(0,a.jsx)("stop",{"stop-color":"#3B8964"}),(0,a.jsx)("stop",{offset:"0.25","stop-color":"#5ABF8C"})]}),(0,a.jsxs)("linearGradient",{id:"paint1_linear_16_2460",x1:"33.6387",y1:"38.5088",x2:"48.0033",y2:"15.916",gradientUnits:"userSpaceOnUse",children:[(0,a.jsx)("stop",{"stop-color":"#803471"}),(0,a.jsx)("stop",{offset:"0.21","stop-color":"#B34F9E"})]}),(0,a.jsxs)("linearGradient",{id:"paint2_linear_16_2460",x1:"22.2234",y1:"16.1265",x2:"45.6611",y2:"24.404",gradientUnits:"userSpaceOnUse",children:[(0,a.jsx)("stop",{offset:"0.6","stop-color":"#F99C2E"}),(0,a.jsx)("stop",{offset:"1","stop-color":"#C57538"})]}),(0,a.jsx)("clipPath",{id:"clip0_16_2460",children:(0,a.jsx)("rect",{width:"30",height:"30",fill:"white",transform:"translate(20 10)"})}),(0,a.jsx)("clipPath",{id:"clip1_16_2460",children:(0,a.jsx)("rect",{width:"72",height:"22",fill:"white",transform:"translate(173 14)"})})]}),(0,a.jsx)("span",{className:"text-white bg-[#4C40CF] group-hover:bg-[#3d33a6] h-full justify-center flex items-center rounded-r-sm w-[165px]",children:l?(0,a.jsx)($.BGW,{className:"h-4 w-4 animate-spin"}):(0,a.jsxs)(a.Fragment,{children:["Payer avec ",(0,a.jsx)("span",{className:"font-bold ml-1",children:"helloasso"})]})})]})},X=e=>{let{isOpened:l,setIsOpened:s,isLoading:n,title:d,description:c,validateLabel:o,callback:u,width:x="w-[100px]",customButton:m}=e;return(0,a.jsx)(i.Vq,{open:l,onOpenChange:s,children:(0,a.jsxs)(i.cZ,{className:"sm:max-w-[600px]",onClick:e=>e.stopPropagation(),children:[(0,a.jsx)(i.fK,{children:(0,a.jsx)(i.$N,{children:d})}),(0,a.jsx)(t.Be,{children:c}),(0,a.jsxs)("div",{className:"flex justify-end mt-2 space-x-4",children:[(0,a.jsx)(r.z,{variant:"outline",onClick:function(e){e.stopPropagation(),s(!1)},disabled:n,className:x,children:"Annuler"}),null!=m?m:(0,a.jsx)(z.f,{isLoading:n,onClick:function(e){e.stopPropagation(),u&&u()},className:x,children:o})]})]})})},H=()=>{let{data:e,isLoading:l,refetch:s}=(0,u.a)({queryKey:["paymentUrl"],queryFn:o.pPI,retry:3,enabled:!1});return{paymentUrl:null==e?void 0:e.data,isLoading:l,refetch:s}},J=()=>{let e=(0,p.useTranslations)("PaymentButton"),[l,s]=(0,g.useState)(!1),{paymentUrl:i,isLoading:t,refetch:n}=H(),d=(0,j.useRouter)();return!t&&i&&d.push(i.url),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(X,{isOpened:l,setIsOpened:s,isLoading:t,title:"Payer",description:(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"my-2 font-semibold",children:e("title")}),(0,a.jsx)("p",{children:e("description")})]}),customButton:(0,a.jsx)(Q,{isLoading:t,onClick:()=>n()})}),(0,a.jsx)(r.z,{className:"col-span-4 ml-auto w-[100px]",onClick:e=>{s(!0)},children:e("pay")})]})},ee=()=>{let{userId:e}=(0,h.u)(),{user:l}=(0,B.a)(e);return(0,a.jsxs)(N.Zb,{children:[(0,a.jsx)(N.Ol,{}),(0,a.jsx)(N.aY,{className:"space-y-2",children:l&&(0,a.jsxs)("div",{className:"flex flex-col gap-8",children:[(0,a.jsx)(W.q,{user:l}),(0,a.jsx)(Y.X,{user:l})]})}),(0,a.jsx)(N.eW,{className:"px-6 py-4",children:(0,a.jsx)(J,{})})]})},el=()=>{var e;let{onlineSellers:l}=x(),s=(0,j.useSearchParams)().get("sellerId")||(null===(e=l.at(0))||void 0===e?void 0:e.id)||"";return"intro"===s?(0,a.jsx)(D,{}):"recap"===s?(0,a.jsx)(ee,{}):(0,a.jsx)(L,{})};function es(){let{userId:e}=(0,h.u)(),{refetch:l}=(0,B.a)(e),s=(0,j.useRouter)(),r=(0,j.useSearchParams)().get("code"),[i,t]=(0,g.useState)(!0);return(0,a.jsxs)("div",{className:"flex min-h-screen w-full flex-col",children:["succeeded"===r&&(0,a.jsx)(d,{isOpened:i,setIsOpened:t,title:"Paiement effectu\xe9",description:"Votre paiement a \xe9t\xe9 effectu\xe9 avec succ\xe8s",status:"SUCCESS",callback:()=>{l(),t(!1),s.replace("/?sellerId=recap")}}),"refused"===r&&(0,a.jsx)(d,{isOpened:i,setIsOpened:t,title:"Paiement refus\xe9",description:"Votre paiement a \xe9t\xe9 refus\xe9. Vous pouvez r\xe9essayer de payer, si le probl\xe8me persiste, veuillez nous contacter.",status:"ERROR",callback:()=>{t(!1),s.replace("/?sellerId=recap")}}),(0,a.jsx)("main",{className:"flex min-h-[calc(100vh_-_theme(spacing.32))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10",children:(0,a.jsxs)("div",{className:"mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]",children:[(0,a.jsx)(v,{}),(0,a.jsx)(el,{})]})}),(0,a.jsx)("footer",{className:"py-6 md:px-8 md:py-0 border-t-2",children:(0,a.jsx)("div",{className:"w-full max-w-screen-xl mx-auto p-4 md:py-8",children:(0,a.jsxs)("div",{className:"sm:flex sm:items-center sm:justify-between",children:[(0,a.jsx)("p",{className:"text-balance text-sm leading-loose text-muted-foreground",children:"D\xe9velopp\xe9 par \xc9clair"}),(0,a.jsxs)("span",{className:"block text-sm text-gray-500 sm:text-center dark:text-gray-400",children:["\xa9 ",new Date().getFullYear()," ",(0,a.jsx)("a",{href:"",className:"font-medium underline underline-offset-4",children:"\xc9clair"}),". Tout droits r\xe9serv\xe9s."]})]})})})]})}}},function(e){e.O(0,[310,516,422,8,622,213,633,189,587,971,23,744],function(){return e(e.s=3258)}),_N_E=e.O()}]);