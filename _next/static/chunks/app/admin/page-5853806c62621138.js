(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3],{9261:function(e,s,t){Promise.resolve().then(t.bind(t,2868))},2868:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return e0}});var l=t(7437),a=t(2265),r=t(2447),i=t(9354);let n=r.fC,d=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)(r.aV,{ref:s,className:(0,i.cn)("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",t),...a})});d.displayName=r.aV.displayName;let c=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)(r.xz,{ref:s,className:(0,i.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",t),...a})});c.displayName=r.xz.displayName;let o=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)(r.VY,{ref:s,className:(0,i.cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",t),...a})});o.displayName=r.VY.displayName;var u=t(692),m=t(7061),x=t(5355),f=t(7948);let h=()=>{var e,s;let{isTokenExpired:t}=(0,f.d)(),{userId:l}=(0,m.u)(),{data:a,isLoading:r,refetch:i}=(0,x.a)({queryKey:["coreUser",null!=l?l:""],queryFn:()=>(0,u.o87)({path:{user_id:l}}),retry:3,enabled:!t()&&!!l});return{user:null==a?void 0:a.data,isAdmin:null==a?void 0:null===(s=a.data)||void 0===s?void 0:null===(e=s.groups)||void 0===e?void 0:e.map(e=>e.id).includes("c1275229-46b2-4e53-a7c4-305513bb1a2a"),isLoading:r,refetch:i}},p=()=>{let{isTokenExpired:e}=(0,f.d)(),{data:s,isLoading:t,refetch:l}=(0,x.a)({queryKey:["sellers"],queryFn:u.C$B,retry:3,enabled:!e()});return{sellers:(null==s?void 0:s.data)||[],isLoading:t,refetch:l}};var j=t(6463);let g=e=>{let{isTokenExpired:s}=(0,f.d)(),{data:t,isLoading:l,refetch:a}=(0,x.a)({queryKey:["sellerProducts",null!=e?e:""],queryFn:()=>(0,u.MgL)({path:{seller_id:e}}),retry:3,enabled:!s()&&!!e});return{products:(null==t?void 0:t.data)||[],isLoading:l,refetch:a}};var v=t(7042),N=t(5265),b=t(6943),w=t(4032),y=t(3363),S=t(7209),C=t(8068),k=t(9772);let z=k.z.object({name:k.z.string({required_error:"Veuillez renseigner le nom de la variante"}).min(1,{message:"Veuillez renseigner le nom de la variante"})});var R=t(1014),_=t(9343);let F=()=>{let{toast:e}=(0,C.pm)(),{refetch:s}=(0,b.M)(),[t,r]=(0,a.useState)(!1),i=(0,_.cI)({resolver:(0,R.F)(z),mode:"onBlur",defaultValues:{}});async function n(t){r(!0);let l={...t},{data:a,error:n}=await (0,u.hRe)({body:l});if(n){e({title:"Error",description:n.detail,variant:"destructive"}),r(!1);return}s(),r(!1),i.reset({name:""})}return(0,l.jsx)(y.l0,{...i,children:(0,l.jsx)("form",{onSubmit:i.handleSubmit(n),children:(0,l.jsxs)("div",{className:"w-full flex flex-row gap-4 p-1 pr-0",children:[(0,l.jsx)(y.Wi,{control:i.control,name:"name",render:e=>{let{field:s}=e;return(0,l.jsx)(y.xJ,{className:"w-full",children:(0,l.jsx)(y.NI,{children:(0,l.jsx)(S.I,{...s,type:"text",placeholder:"Nom du cursus"})})})}}),(0,l.jsx)(w.f,{variant:"outline",type:"submit",isLoading:t,className:"w-[100px]",children:"Ajouter"})]})})})};var V=t(1109);let P=e=>{let{curriculum:s}=e,{toast:t}=(0,C.pm)(),{refetch:r}=(0,b.M)(),[i,n]=(0,a.useState)(!1);async function d(e){n(!0);let{data:s,error:l}=await (0,u.QA_)({path:{curriculum_id:e}});if(l){t({title:"Error",description:l.detail,variant:"destructive"}),n(!1);return}r(),n(!1)}return(0,l.jsxs)("div",{className:"flex flex-row items-center",children:[(0,l.jsx)(w.f,{size:"icon",variant:"destructive",className:"h-8",isLoading:i,onClick:()=>d(s.id),children:(0,l.jsx)(V._YF,{className:"w-5 h-5"})}),(0,l.jsx)("span",{className:"ml-4",children:s.name})]},s.id)},I=()=>{let{curriculums:e}=(0,b.M)();return(0,l.jsxs)(N.Qd,{value:"curriculum",children:[(0,l.jsx)(N.o4,{children:(0,l.jsx)("div",{className:"flex flex-col items-start justify-between",children:(0,l.jsx)("h3",{className:"text-lg font-semibold",children:"Cursus"})})}),(0,l.jsxs)(N.vF,{className:"space-y-2",children:[(0,l.jsx)(F,{}),e.map(e=>(0,l.jsx)(P,{curriculum:e},e.id))]})]})},A=()=>{let{isTokenExpired:e}=(0,f.d)(),{data:s,isLoading:t,refetch:l}=(0,x.a)({queryKey:["groups"],queryFn:u.jA4,retry:3,enabled:!e()});return{groups:(null==s?void 0:s.data)||[],isLoading:t,refetch:l}},E=e=>{let{group:s,sellers:t}=e,{toast:r}=(0,C.pm)(),{refetch:i}=A(),{refetch:n}=p(),[d,c]=(0,a.useState)(!1),o=t.map(e=>e.group_id);async function m(e){c(!0);let s={group_id:e.id,name:e.name,order:t.length+1},{data:l,error:a}=await (0,u.sKK)({body:s});if(a){r({title:"Error",description:a.detail,variant:"destructive"}),c(!1);return}i(),n(),c(!1)}async function x(e){c(!0);let{data:s,error:t}=await (0,u.vJT)({path:{seller_id:e}});if(t){r({title:"Error",description:t.detail,variant:"destructive"}),c(!1);return}i(),n(),c(!1)}return(0,l.jsxs)("div",{className:"flex flex-row items-center",children:[o.includes(s.id)?(0,l.jsx)(w.f,{size:"icon",variant:"destructive",className:"h-8",isLoading:d,onClick:()=>x(t.find(e=>e.group_id===s.id).id),children:(0,l.jsx)(V._YF,{className:"w-5 h-5"})}):(0,l.jsx)(w.f,{variant:"outline",size:"icon",className:"h-8",isLoading:d,onClick:()=>m(s),children:(0,l.jsx)(V.b9W,{className:"w-5 h-5"})}),(0,l.jsx)("span",{className:"ml-4",children:s.name})]},s.id)},M=e=>{let{sellers:s}=e,{groups:t}=A();return(0,l.jsxs)(N.Qd,{value:"association",children:[(0,l.jsx)(N.o4,{children:(0,l.jsx)("div",{className:"flex flex-col items-start justify-between",children:(0,l.jsx)("h3",{className:"text-lg font-semibold",children:"Association"})})}),(0,l.jsx)(N.vF,{className:"space-y-2",children:t.map(e=>(0,l.jsx)(E,{group:e,sellers:s},e.id))})]})},T=()=>{let{isTokenExpired:e}=(0,f.d)(),{data:s,isLoading:t,refetch:l}=(0,x.a)({queryKey:["status"],queryFn:u.Dy4,retry:3,enabled:!e()});return{status:null==s?void 0:s.data,isLoading:t,refetch:l}},U=e=>{let{status:s}=e,{toast:t}=(0,C.pm)(),{refetch:r}=T(),[i,n]=(0,a.useState)(!1),d=async e=>{n(!0);let{data:s,error:l}=await (0,u.kb4)({body:{status:e}});if(l){t({title:"Error",description:l.detail,variant:"destructive"}),n(!1);return}r(),n(!1)},c={pending:"online",online:"onsite",onsite:"closed",closed:"pending"};return(0,l.jsxs)(N.Qd,{value:"status",children:[(0,l.jsx)(N.o4,{children:(0,l.jsx)("div",{className:"flex flex-col items-start justify-between",children:(0,l.jsx)("h3",{className:"text-lg font-semibold",children:"Status"})})}),(0,l.jsx)(N.vF,{className:"space-y-2",children:s&&(0,l.jsxs)("div",{className:"flex flex-row space-y-2 justify-between items-center w-full",children:[(0,l.jsx)("span",{children:{pending:"En attente",online:"En ligne",onsite:"Sur place",closed:"Ferm\xe9"}[s.status]}),(0,l.jsx)(w.f,{onClick:()=>d(c[s.status]),isLoading:i,className:"w-[130px]",children:{pending:"R\xe9initialiser",online:"Mettre en ligne",onsite:"Sur place",closed:"Fermer"}[c[s.status]]})]})})]})},L=e=>{let{sellers:s,status:t}=e;return(0,l.jsxs)(N.UQ,{type:"multiple",defaultValue:["status"],children:[(0,l.jsx)(M,{sellers:s}),(0,l.jsx)(I,{}),(0,l.jsx)(U,{status:t})]})};var q=t(2272),O=t(1729),X=t(9733),K=t(8185),Z=t(402),Q=t(9888),G=t(9973);let B=/^[\w\-.]*@etu(-enise)?\.ec-lyon\.fr$/,D=k.z.object({nickname:k.z.string().optional(),email:k.z.string().email({message:"Veuillez renseigner l'email de Centrale"}).refine(e=>B.test(e),{message:"Veuillez renseigner un email de Centrale"}),floor:k.z.enum(["Autre","Adoma","Exte","T1","T2","T3","T4","T56","U1","U2","U3","U4","U56","V1","V2","V3","V45","V6","X1","X2","X3","X4","X5","X6"],{required_error:"Veuillez renseigner l'\xe9tage"})});var Y=t(6898),H=t(9196),W=t(2625),J=t(2140),$=t(9495);let ee=e=>{let{form:s,isLoading:t,setIsOpened:a,closeDialog:r}=e,i=["Autre","Adoma","Exte","T1","T2","T3","T4","T56","U1","U2","U3","U4","U56","V1","V2","V3","V45","V6","X1","X2","X3","X4","X5","X6"];return(0,l.jsxs)("div",{className:"grid gap-6 mt-4",children:[(0,l.jsx)($.L,{form:s,label:"Surnom",id:"nickname",input:e=>(0,l.jsx)(S.I,{...e})}),(0,l.jsx)($.L,{form:s,label:"Email de Centrale",id:"email",input:e=>(0,l.jsx)(S.I,{...e,type:"email"})}),(0,l.jsx)("div",{className:"flex flex-row gap-2 w-full",children:(0,l.jsx)($.L,{form:s,label:"\xc9tage",id:"floor",input:e=>(0,l.jsxs)(Q.Ph,{onValueChange:e.onChange,defaultValue:e.value,children:[(0,l.jsx)(Q.i4,{children:(0,l.jsx)(Q.ki,{})}),(0,l.jsx)(Q.Bw,{side:"top",children:i.map(e=>(0,l.jsx)(Q.Ql,{value:e,children:(0,l.jsx)("div",{className:"flex items-center flex-row gap-2",children:e})},e))})]})})}),(0,l.jsxs)("div",{className:"flex justify-end mt-2 space-x-4",children:[(0,l.jsx)(X.z,{variant:"outline",onClick:r,disabled:t,className:"w-[100px]",children:"Annuler"}),(0,l.jsx)(w.f,{isLoading:t,className:"w-[100px]",type:"submit",children:"Modifier"})]})]})},es=e=>{var s,t,r,i;let{user:n,refetch:d}=e,{toast:c}=(0,C.pm)(),{total:o}=(0,Y.T)(n.id),{total:m}=(0,H.$)(n.id),{curriculums:x}=(0,b.M)(),[f,h]=(0,a.useState)(!1),[p,j]=(0,a.useState)(!1),g=!!(null===(s=n.curriculum)||void 0===s?void 0:s.id),[v,N]=(0,a.useState)(null===(t=n.curriculum)||void 0===t?void 0:t.id);function S(e){e.stopPropagation(),h(!1)}async function k(){var e;if(j(!0),!v){j(!1),h(!1);return}if(g){let{data:s,error:t}=await (0,u.gKZ)({path:{user_id:n.id,curriculum_id:v}});e=t}else{let{data:s,error:t}=await (0,u.Vum)({path:{user_id:n.id,curriculum_id:v}});e=t}if(e){c({title:"Error",description:e.detail,variant:"destructive"}),j(!1),h(!1);return}d(),h(!1),j(!1)}let z=(0,_.cI)({resolver:(0,R.F)(D),mode:"onBlur"});async function F(e){j(!0),j(!1),z.reset()}return(0,l.jsxs)("div",{className:"grid gap-12 pt-8",children:[(0,l.jsxs)("div",{className:"space-y-8",children:[(0,l.jsxs)(K.ll,{className:"flex flex-row justify-between items-center",children:[(0,l.jsx)("div",{children:n.nickname?(0,l.jsxs)("span",{className:"font-bold",children:[n.nickname," (",n.firstname," ",n.name,")"]}):(0,l.jsxs)("span",{className:"font-bold",children:[n.firstname," ",n.name]})}),(0,l.jsxs)("div",{className:"flex gap-4 items-center",children:[(0,l.jsx)("span",{className:"font-semibold text-base",children:null!==(i=null===(r=n.curriculum)||void 0===r?void 0:r.name)&&void 0!==i?i:"Pas de cursus"}),(0,l.jsx)(q.Q,{isOpened:f,setIsOpened:h,title:"Modifier le cursus",description:(0,l.jsxs)("div",{className:"grid gap-6 mt-4",children:[(0,l.jsxs)("div",{className:"grid gap-2",children:[(0,l.jsx)(Z._,{children:"Cursus"}),(0,l.jsxs)(Q.Ph,{onValueChange:N,defaultValue:v,children:[(0,l.jsx)(Q.i4,{children:(0,l.jsx)(Q.ki,{})}),(0,l.jsx)(Q.Bw,{side:"top",children:x.map(e=>(0,l.jsx)(Q.Ql,{value:e.id,children:(0,l.jsx)("div",{className:"flex items-center flex-row gap-2",children:e.name})},e.id))})]})]}),(0,l.jsxs)("div",{className:"flex justify-end mt-2 space-x-4",children:[(0,l.jsx)(X.z,{variant:"outline",onClick:S,disabled:p,className:"w-[100px]",children:"Annuler"}),(0,l.jsx)(w.f,{isLoading:p,className:"w-[100px]",type:"button",onClick:k,children:"Modifier"})]}),(0,l.jsx)(O.S,{text:"Modifier l'utilisateur"}),(0,l.jsx)(y.l0,{...z,children:(0,l.jsx)("form",{onSubmit:z.handleSubmit(F),children:(0,l.jsx)(ee,{form:z,setIsOpened:h,isLoading:p,closeDialog:S})})})]}),children:(0,l.jsx)(X.z,{size:"icon",variant:"outline",className:"w-[40px]",children:(0,l.jsx)(V._vs,{className:"h-5 w-5"})})})]})]}),(0,l.jsx)(G.Z,{})]}),(0,l.jsx)(J.q,{user:n,isAdmin:!0}),(0,l.jsx)(W.X,{user:n,isAdmin:!0}),(0,l.jsx)("div",{className:"grid gap-6",children:(0,l.jsxs)(K.ll,{className:"flex flex-row w-full",children:[(0,l.jsx)("span",{className:"font-bold",children:"Reste \xe0 payer"}),(0,l.jsxs)("span",{className:"ml-auto font-semibold",children:[((null!=m?m:0)-(null!=o?o:0)).toFixed(2)," €"]})]})})]})};var et=t(1333),el=t(7911),ea=t(5390),er=t(8528);let ei=e=>{let{seller:s,refreshProduct:t}=e,{toast:r}=(0,C.pm)(),[i,n]=(0,a.useState)(!1),[d,c]=(0,a.useState)(!1),o=(0,_.cI)({resolver:(0,R.F)(ea.k),mode:"onBlur",defaultValues:{product_constraints:[],document_constraints:[],ticket_max_use:"1",generate_ticket:!1}});async function m(e){var l;c(!0);let a={...e,available_online:"true"===e.available_online,ticket_max_use:e.ticket_max_use?parseInt(e.ticket_max_use):null,ticket_expiration:null===(l=e.ticket_expiration)||void 0===l?void 0:l.toISOString()},{data:i,error:d}=await (0,u.NxE)({path:{seller_id:s.id},body:a});if(d){r({title:"Error",description:d.detail,variant:"destructive"}),c(!1),n(!1);return}t(),n(!1),c(!1),o.reset()}return(0,l.jsx)(q.Q,{title:"Nouveau produit",description:(0,l.jsx)(y.l0,{...o,children:(0,l.jsx)("form",{onSubmit:o.handleSubmit(m),children:(0,l.jsx)(er.G,{form:o,setIsOpened:n,isLoading:d})})}),isOpened:i,setIsOpened:n,children:(0,l.jsxs)("div",{className:"flex flex-1 items-center justify-start py-4 font-medium border-b cursor-pointer",children:[(0,l.jsx)(V.b9W,{className:"w-4 h-4 mr-6"}),(0,l.jsx)("h3",{className:"text-lg font-semibold",children:"New Product"})]})})},en=e=>{let{status:s,seller:t,products:r,refetchProducts:i}=e,n=(0,j.useSearchParams)(),d=n.get("sellerId"),c=n.get("userId"),{productExpansion:u,setExpandedProducts:m}=(0,el.g)();return(0,a.useEffect)(()=>{void 0===u[t.id]&&t.id===d&&r&&r.length>0&&m(t.id,r.map(e=>e.id))},[u,t.id,m,r,d]),(0,l.jsxs)(o,{value:t.id,className:"min-w-96",children:[(0,l.jsx)(ei,{seller:t,refreshProduct:i}),r.length>0?(0,l.jsx)(N.UQ,{type:"multiple",value:u[t.id],onValueChange:e=>m(t.id,e),children:r.map(e=>(0,l.jsx)(et.A,{product:e,sellerId:t.id,userId:c,canAdd:"closed"!==s.status,canEdit:"pending"===s.status||"online"===s.status&&!e.available_online,canRemove:"pending"===s.status,canDisable:"closed"!==s.status,refreshProduct:i,isSelectable:"onsite"===s.status,isAdmin:!0},e.id))}):(0,l.jsx)("div",{className:"p-4 border border-gray-200 rounded-md",children:(0,l.jsx)("h3",{className:"text-lg font-semibold",children:"No products found"})})]})},ed=e=>{let{status:s,sellers:t,isAdmin:a}=e,r=(0,j.useSearchParams)(),i=r.get("sellerId"),{products:n,refetch:d}=g(["cdradmin","cdrrecap"].includes(null!=i?i:"")?null:i),c=r.get("userId"),{user:o,refetch:u}=(0,v.a)(c);return"cdradmin"===i&&a?(0,l.jsx)(L,{sellers:t,status:s}):"cdrrecap"===i&&a?o&&(0,l.jsx)(es,{user:o,refetch:u}):t.map(e=>(0,l.jsx)(en,{seller:e,status:s,products:n,refetchProducts:d},e.id))};var ec=t(8087);let eo=e=>{let{status:s,sellers:t,isAdmin:a}=e,r=(0,ec.useTranslations)("ProductPart"),i=(0,j.useRouter)(),n=(0,j.useSearchParams)(),o=e=>{let s=new URLSearchParams(Array.from(n.entries()));s.set("sellerId",e);let t=s.toString();i.push("admin?".concat(t))};return(0,l.jsxs)(d,{className:'"grid w-full grid-cols-'.concat(t.length+(a?1:0)+("onsite"===s.status&&a?1:0),'"'),children:[t.map(e=>(0,l.jsx)(c,{value:e.id,className:"w-full min-w-18",onClick:()=>o(e.id),children:e.name},e.id)),a&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c,{value:"cdradmin",className:"w-full min-w-18",onClick:()=>o("cdradmin"),children:"Admin"},"cdradmin"),"onsite"===s.status&&(0,l.jsx)(c,{value:"cdrrecap",className:"w-full min-w-18",onClick:()=>o("cdrrecap"),children:r("summary")},"cdrrecap")]})]})},eu=e=>{var s;let{status:t}=e,{isAdmin:r}=h(),{sellers:i}=p(),d=(0,j.useSearchParams)(),c=(0,j.useRouter)(),o=d.get("sellerId")||(null===(s=i.at(0))||void 0===s?void 0:s.id)||(r?"cdradmin":"");return(0,a.useEffect)(()=>{if(!d.get("sellerId")&&i.length>0&&o){let e=new URLSearchParams(Array.from(d.entries()));e.set("sellerId",o);let s=e.toString();c.replace("admin?".concat(s))}},[o,c,d,i]),(0,l.jsx)("div",{className:"flex items-center justify-center p-6 min-w-96",children:o&&(0,l.jsxs)(n,{defaultValue:o,className:"w-full",children:[(0,l.jsx)(eo,{status:t,sellers:i,isAdmin:r}),(0,l.jsx)(ed,{status:t,sellers:i,isAdmin:r})]})})},em=()=>{let{isTokenExpired:e}=(0,f.d)(),[s,t]=(0,a.useState)([]),{isLoading:l,refetch:r}=(0,x.a)({queryKey:["users"],queryFn:async()=>{let{data:e,error:s}=await (0,u.CTm)();if(s)throw s;return e&&t(e),e},retry:3,enabled:!e(),staleTime:1/0}),{token:i}=(0,m.u)(),n="https://hyperion.myecl.fr".replace("http","ws")+"/cdr/users/ws";return(0,a.useEffect)(()=>{if(l)return;let e=new WebSocket(n);return e.onopen=()=>{e.send(JSON.stringify({token:i}))},e.onmessage=e=>{let l=JSON.parse(e.data);if(l.command)switch(l.command){case"NEW_USER":let a=l.data;s.find(e=>e.id===a.id)?t(s.map(e=>e.id===a.id?a:e)):t([...s,a]);break;case"UPDATE_USER":let r=l.data;t(s.map(e=>e.id===r.id?r:e));break;case"WSStatus":"invalid_token"===l.data.status&&console.log("Invalid token")}},e.onclose=()=>{console.log("WebSocket connection closed")},()=>{e.close()}},[n,l,s,i]),{users:s,isLoading:l,refetch:r}};var ex=t(9055),ef=t(4971),eh=t(7592),ep=t(2468),ej=t(8165);let eg=ef.fC,ev=ef.xz;ef.ZA,ef.Uv,ef.Tr,ef.Ee,a.forwardRef((e,s)=>{let{className:t,inset:a,children:r,...n}=e;return(0,l.jsxs)(ef.fF,{ref:s,className:(0,i.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",a&&"pl-8",t),...n,children:[r,(0,l.jsx)(eh.Z,{className:"ml-auto h-4 w-4"})]})}).displayName=ef.fF.displayName,a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)(ef.tu,{ref:s,className:(0,i.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...a})}).displayName=ef.tu.displayName;let eN=a.forwardRef((e,s)=>{let{className:t,sideOffset:a=4,...r}=e;return(0,l.jsx)(ef.Uv,{children:(0,l.jsx)(ef.VY,{ref:s,sideOffset:a,className:(0,i.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...r})})});eN.displayName=ef.VY.displayName;let eb=a.forwardRef((e,s)=>{let{className:t,inset:a,...r}=e;return(0,l.jsx)(ef.ck,{ref:s,className:(0,i.cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a&&"pl-8",t),...r})});eb.displayName=ef.ck.displayName;let ew=a.forwardRef((e,s)=>{let{className:t,children:a,checked:r,...n}=e;return(0,l.jsxs)(ef.oC,{ref:s,className:(0,i.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),checked:r,...n,children:[(0,l.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,l.jsx)(ef.wU,{children:(0,l.jsx)(ep.Z,{className:"h-4 w-4"})})}),a]})});ew.displayName=ef.oC.displayName,a.forwardRef((e,s)=>{let{className:t,children:a,...r}=e;return(0,l.jsxs)(ef.Rk,{ref:s,className:(0,i.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),...r,children:[(0,l.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,l.jsx)(ef.wU,{children:(0,l.jsx)(ej.Z,{className:"h-2 w-2 fill-current"})})}),a]})}).displayName=ef.Rk.displayName;let ey=a.forwardRef((e,s)=>{let{className:t,inset:a,...r}=e;return(0,l.jsx)(ef.__,{ref:s,className:(0,i.cn)("px-2 py-1.5 text-sm font-semibold",a&&"pl-8",t),...r})});ey.displayName=ef.__.displayName;let eS=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)(ef.Z0,{ref:s,className:(0,i.cn)("-mx-1 my-1 h-px bg-muted",t),...a})});eS.displayName=ef.Z0.displayName;var eC=t(4867);function ek(e){let{column:s,title:t,className:a}=e;return s.getCanSort()?(0,l.jsx)("div",{className:(0,i.cn)("flex items-center space-x-2",a),children:(0,l.jsxs)(eg,{children:[(0,l.jsx)(ev,{asChild:!0,children:(0,l.jsxs)(X.z,{variant:"ghost",size:"sm",className:"-ml-3 h-8 data-[state=open]:bg-accent -mr-7",children:[(0,l.jsx)("span",{children:t}),"desc"===s.getIsSorted()?(0,l.jsx)(eC.veu,{className:"ml-2 h-4 w-4"}):"asc"===s.getIsSorted()?(0,l.jsx)(eC.Hf3,{className:"ml-2 h-4 w-4"}):(0,l.jsx)(eC.jnn,{className:"ml-2 h-4 w-4"})]})}),(0,l.jsxs)(eN,{align:"start",children:[(0,l.jsxs)(eb,{onClick:()=>s.toggleSorting(!1),children:[(0,l.jsx)(eC.Hf3,{className:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),"Asc"]}),(0,l.jsxs)(eb,{onClick:()=>s.toggleSorting(!0),children:[(0,l.jsx)(eC.veu,{className:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),"Desc"]}),(0,l.jsx)(eS,{}),(0,l.jsxs)(eb,{onClick:()=>s.toggleVisibility(!1),children:[(0,l.jsx)(eC.L52,{className:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),"Cacher"]})]})]})}):(0,l.jsx)("div",{className:(0,i.cn)(a),children:t})}var ez=t(3541),eR=t(4175);let e_=(e,s,t)=>{let l=0;if(e.columnFiltersMeta[t]){var a,r;l=(0,ez.S1)(null===(a=e.columnFiltersMeta[t])||void 0===a?void 0:a.itemRank,null===(r=s.columnFiltersMeta[t])||void 0===r?void 0:r.itemRank)}return 0===l?eR.V2.alphanumeric(e,s,t):l},eF=(e,s,t,l)=>{let a=(0,ez.O4)(e.getValue(s),t);return l({itemRank:a}),a.passed},eV=[{accessorKey:"name",header:e=>{let{column:s}=e;return(0,l.jsx)(ek,{column:s,title:"Nom"})},cell:e=>{let{row:s}=e;return(0,l.jsx)("div",{children:s.getValue("name")})},enableSorting:!1,filterFn:"fuzzy",sortingFn:e_},{accessorKey:"firstname",header:e=>{let{column:s}=e;return(0,l.jsx)(ek,{column:s,title:"Pr\xe9nom"})},cell:e=>{let{row:s}=e;return(0,l.jsx)("div",{children:s.getValue("firstname")})},enableSorting:!1,filterFn:"fuzzy",sortingFn:e_},{accessorKey:"nickname",header:e=>{let{column:s}=e;return(0,l.jsx)(ek,{column:s,title:"Surnom"})},cell:e=>{let{row:s}=e;return(0,l.jsx)("div",{children:s.getValue("nickname")})},enableSorting:!1,filterFn:"fuzzy",sortingFn:e_},{accessorKey:"curriculum",header:e=>{let{column:s}=e;return(0,l.jsx)(ek,{column:s,title:"Cursus"})},cell:e=>{let{row:s}=e;return(0,l.jsx)("div",{className:"flex space-x-2",children:(0,l.jsx)(ex.C,{variant:"outline",children:s.getValue("curriculum")?s.getValue("curriculum").name:"Aucun cursus"})})},filterFn:(e,s,t)=>e.getValue(s)?t.includes(e.getValue(s).id):t.includes("")}],eP=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)("div",{className:"relative w-full overflow-auto",children:(0,l.jsx)("table",{ref:s,className:(0,i.cn)("w-full caption-bottom text-sm",t),...a})})});eP.displayName="Table";let eI=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)("thead",{ref:s,className:(0,i.cn)("[&_tr]:border-b",t),...a})});eI.displayName="TableHeader";let eA=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)("tbody",{ref:s,className:(0,i.cn)("[&_tr:last-child]:border-0",t),...a})});eA.displayName="TableBody",a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)("tfoot",{ref:s,className:(0,i.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",t),...a})}).displayName="TableFooter";let eE=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)("tr",{ref:s,className:(0,i.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted data-[state=selected]:font-semibold",t),...a})});eE.displayName="TableRow";let eM=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)("th",{ref:s,className:(0,i.cn)("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",t),...a})});eM.displayName="TableHead";let eT=a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)("td",{ref:s,className:(0,i.cn)("p-4 align-middle [&:has([role=checkbox])]:pr-0",t),...a})});eT.displayName="TableCell",a.forwardRef((e,s)=>{let{className:t,...a}=e;return(0,l.jsx)("caption",{ref:s,className:(0,i.cn)("mt-4 text-sm text-muted-foreground",t),...a})}).displayName="TableCaption";var eU=t(3514);function eL(e){let{table:s}=e;return(0,l.jsxs)("div",{className:"flex items-center justify-between px-2",children:[(0,l.jsxs)("div",{className:"flex-1 text-sm text-muted-foreground min-w-[110px]",children:[s.getFilteredSelectedRowModel().rows.length," s\xe9lectionn\xe9s"]}),(0,l.jsxs)("div",{className:"flex items-center space-x-2 lg:space-x-3",children:[(0,l.jsxs)("div",{className:"flex items-center space-x-2 min-w-[140px]",children:[(0,l.jsxs)(Q.Ph,{value:"".concat(s.getState().pagination.pageSize),onValueChange:e=>{s.setPageSize(Number(e))},children:[(0,l.jsx)(Q.i4,{className:"h-8 w-[70px] min-w-[70px]",children:(0,l.jsx)(Q.ki,{placeholder:s.getState().pagination.pageSize})}),(0,l.jsx)(Q.Bw,{side:"top",children:[10,25,50,100].map(e=>(0,l.jsx)(Q.Ql,{value:"".concat(e),children:e},e))})]}),(0,l.jsx)("p",{className:"text-sm font-medium",children:"par page"})]}),(0,l.jsxs)("div",{className:"flex w-[100px] items-center justify-center text-sm font-medium",children:["Page ",s.getState().pagination.pageIndex+1," sur"," ",s.getPageCount()]}),(0,l.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,l.jsxs)(X.z,{variant:"outline",className:"hidden h-8 w-8 p-0 lg:flex",onClick:()=>s.setPageIndex(0),disabled:!s.getCanPreviousPage(),children:[(0,l.jsx)("span",{className:"sr-only",children:"Go to first page"}),(0,l.jsx)(eC.kRt,{className:"h-4 w-4"})]}),(0,l.jsxs)(X.z,{variant:"outline",className:"h-8 w-8 p-0",onClick:()=>s.previousPage(),disabled:!s.getCanPreviousPage(),children:[(0,l.jsx)("span",{className:"sr-only",children:"Go to previous page"}),(0,l.jsx)(eC.wyc,{className:"h-4 w-4"})]}),(0,l.jsxs)(X.z,{variant:"outline",className:"h-8 w-8 p-0",onClick:()=>s.nextPage(),disabled:!s.getCanNextPage(),children:[(0,l.jsx)("span",{className:"sr-only",children:"Go to next page"}),(0,l.jsx)(eC.XCv,{className:"h-4 w-4"})]}),(0,l.jsxs)(X.z,{variant:"outline",className:"hidden h-8 w-8 p-0 lg:flex",onClick:()=>s.setPageIndex(s.getPageCount()-1),disabled:!s.getCanNextPage(),children:[(0,l.jsx)("span",{className:"sr-only",children:"Go to last page"}),(0,l.jsx)(eC.yr4,{className:"h-4 w-4"})]})]})]})]})}var eq=t(4063),eO=t(1413),eX=t(4008);function eK(e){let{column:s,title:t,options:a}=e,r=null==s?void 0:s.getFacetedUniqueValues(),n=new Set(null==s?void 0:s.getFilterValue());return(0,l.jsxs)(eO.J2,{children:[(0,l.jsx)(eO.xo,{asChild:!0,children:(0,l.jsxs)(X.z,{variant:"outline",size:"sm",className:"h-8 border-dashed",children:[(0,l.jsx)(eX.Yv7,{className:"mr-2 h-4 w-4"}),t,(null==n?void 0:n.size)>0&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(G.Z,{orientation:"vertical",className:"mx-2 h-4"}),(0,l.jsx)(ex.C,{variant:"secondary",className:"rounded-sm px-1 font-normal lg:hidden",children:n.size}),(0,l.jsx)("div",{className:"hidden space-x-1 lg:flex",children:n.size>2?(0,l.jsxs)(ex.C,{variant:"secondary",className:"rounded-sm px-1 font-normal",children:[n.size," s\xe9lectionn\xe9s"]}):a.filter(e=>n.has(e.value)).map(e=>(0,l.jsx)(ex.C,{variant:"secondary",className:"rounded-sm px-1 font-normal",children:e.label},e.value))})]})]})}),(0,l.jsx)(eO.yk,{className:"w-[200px] p-0",align:"start",children:(0,l.jsxs)(eq.mY,{children:[(0,l.jsx)(eq.sZ,{placeholder:t}),(0,l.jsxs)(eq.e8,{children:[(0,l.jsx)(eq.rb,{children:"Aucun r\xe9sultat"}),(0,l.jsx)(eq.fu,{children:a.map(e=>{let t=n.has(e.value);return(0,l.jsxs)(eq.di,{onSelect:()=>{t?n.delete(e.value):n.add(e.value);let l=Array.from(n);null==s||s.setFilterValue(l.length?l:void 0)},children:[(0,l.jsx)("div",{className:(0,i.cn)("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",t?"bg-primary text-primary-foreground":"opacity-50 [&_svg]:invisible"),children:(0,l.jsx)(eC.nQG,{className:(0,i.cn)("h-4 w-4")})}),e.icon&&(0,l.jsx)(e.icon,{className:"mr-2 h-4 w-4 text-muted-foreground"}),(0,l.jsx)("span",{children:e.label}),(null==r?void 0:r.get(e.value))&&(0,l.jsx)("span",{className:"ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs",children:r.get(e.value)})]},e.value)})}),n.size>0&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(eq.zz,{}),(0,l.jsx)(eq.fu,{children:(0,l.jsx)(eq.di,{onSelect:()=>null==s?void 0:s.setFilterValue(void 0),className:"justify-center text-center",children:"Supprimer les filtres"})})]})]})]})})]})}function eZ(e){let{table:s}=e;return(0,l.jsxs)(eg,{children:[(0,l.jsx)(ef.$F,{asChild:!0,children:(0,l.jsxs)(X.z,{variant:"outline",size:"sm",className:"hidden h-8 lg:flex ml-2",children:[(0,l.jsx)(eC.hsZ,{className:"mr-2 h-4 w-4"}),"Colonnes"]})}),(0,l.jsxs)(eN,{align:"end",className:"w-[180px]",children:[(0,l.jsx)(ey,{children:"Activer les colonnes"}),(0,l.jsx)(eS,{}),s.getAllColumns().filter(e=>void 0!==e.accessorFn&&e.getCanHide()).map(e=>(0,l.jsx)(ew,{checked:e.getIsVisible(),onCheckedChange:s=>e.toggleVisibility(!!s),children:e.id},e.id))]})]})}function eQ(e){let{table:s,globalFilter:t,setGlobalFilter:a}=e,{curriculums:r}=(0,b.M)();return(0,l.jsxs)("div",{className:"flex items-center justify-between",children:[(0,l.jsxs)("div",{className:"flex flex-1 items-center space-x-2",children:[(0,l.jsx)(S.I,{placeholder:"Filtrer",value:t,onChange:e=>a(e.target.value),className:"h-8 w-[150px] lg:w-[250px]"}),s.getColumn("curriculum")&&(0,l.jsx)(eK,{column:s.getColumn("curriculum"),title:"Cursus",options:r.map(e=>({value:e.id,label:e.name})).concat({value:"",label:"Aucun cursus"})})]}),(0,l.jsx)(eZ,{table:s})]})}function eG(e){var s;let{columns:t,data:r}=e,i=(0,j.useRouter)(),n=(0,j.useSearchParams)(),[d,c]=a.useState({}),[o,u]=a.useState({}),[m,x]=a.useState([]),[f,h]=a.useState(""),[p,g]=a.useState([]),v=n.get("userId"),N=(0,eU.b7)({data:r,columns:t,filterFns:{fuzzy:eF},state:{columnFilters:m,globalFilter:f,sorting:p,columnVisibility:o,rowSelection:d},enableRowSelection:!0,onRowSelectionChange:c,onSortingChange:g,onColumnFiltersChange:x,onColumnVisibilityChange:u,getCoreRowModel:(0,eR.sC)(),getFilteredRowModel:(0,eR.vL)(),getPaginationRowModel:(0,eR.G_)(),getSortedRowModel:(0,eR.tj)(),getFacetedRowModel:(0,eR.o6)(),getFacetedUniqueValues:(0,eR.JG)(),globalFilterFn:"fuzzy",onGlobalFilterChange:h});function b(e){N.getSelectedRowModel().rows.length&&c({});let s=e.original.id;if(s===v){let e=new URLSearchParams(Array.from(n.entries()));e.delete("userId");let s=e.toString();i.push("/admin?".concat(s));return}let t=new URLSearchParams(Array.from(n.entries()));t.set("userId",s);let l=t.toString();i.push("/admin?".concat(l)),e.toggleSelected(!0)}return a.useEffect(()=>{if(v&&!N.getIsSomeRowsSelected()){let e=r.findIndex(e=>e.id===v);if(-1!==e){let s=N.getRow(e.toString(),!0);s&&s.toggleSelected(!0)}}},[N.getRowModel().rows,v]),(0,l.jsxs)("div",{className:"space-y-4 w-full",children:[(0,l.jsx)(eQ,{table:N,globalFilter:f,setGlobalFilter:h}),(0,l.jsx)("div",{className:"rounded-md border",children:(0,l.jsxs)(eP,{children:[(0,l.jsx)(eI,{children:N.getHeaderGroups().map(e=>(0,l.jsx)(eE,{children:e.headers.map(e=>(0,l.jsx)(eM,{colSpan:e.colSpan,children:e.isPlaceholder?null:(0,eU.ie)(e.column.columnDef.header,e.getContext())},e.id))},e.id))}),(0,l.jsx)(eA,{children:(null===(s=N.getRowModel().rows)||void 0===s?void 0:s.length)?(0,l.jsxs)(l.Fragment,{children:[N.getSelectedRowModel().rows.filter(e=>!N.getRowModel().rows.includes(e)).map(e=>(0,l.jsx)(eE,{"data-state":"selected",onClick:()=>b(e),children:e.getVisibleCells().map(e=>(0,l.jsx)(eT,{children:(0,eU.ie)(e.column.columnDef.cell,e.getContext())},e.id))},e.id)),N.getRowModel().rows.map(e=>(0,l.jsx)(eE,{"data-state":e.getIsSelected()&&"selected",onClick:()=>b(e),children:e.getVisibleCells().map(e=>(0,l.jsx)(eT,{children:(0,eU.ie)(e.column.columnDef.cell,e.getContext())},e.id))},e.id))]}):(0,l.jsx)(eE,{children:(0,l.jsx)(eT,{colSpan:t.length,className:"h-24 text-center",children:"Pas de r\xe9sultat"})})})]})}),(0,l.jsx)(eL,{table:N})]})}let eB=()=>{let{users:e}=em();return(0,l.jsx)("div",{className:"flex items-center justify-center p-6 min-w-96",children:(0,l.jsx)(eG,{columns:eV,data:e})})};var eD=t(1322),eY=t(1505);let eH=e=>{let{className:s,...t}=e;return(0,l.jsx)(eY.eh,{className:(0,i.cn)("flex h-full w-full data-[panel-group-direction=vertical]:flex-col",s),...t})},eW=eY.s_,eJ=e=>{let{withHandle:s,className:t,...a}=e;return(0,l.jsx)(eY.OT,{className:(0,i.cn)("relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",t),...a,children:s&&(0,l.jsx)("div",{className:"z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border",children:(0,l.jsx)(eD.Z,{className:"h-2.5 w-2.5"})})})};var e$=t(9079),e0=()=>{let{setSize:e,size:s}=(0,e$.R)(),{user:t,isAdmin:r}=h(),{sellers:i}=p(),n=(0,j.useRouter)(),{status:d}=T();return(0,a.useEffect)(()=>{var e;if(!t)return;let s=null===(e=t.groups)||void 0===e?void 0:e.map(e=>e.id),l=null==s?void 0:s.some(e=>i.some(s=>s.group_id===e));r||l||n.push("/")},[r,n,i,t]),(0,a.useEffect)(()=>{(null==d?void 0:d.status)&&("onsite"===d.status?e(50):e(100))},[d,e]),(0,l.jsx)("main",{className:"grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-8",children:(0,l.jsx)(a.Suspense,{fallback:(0,l.jsx)("div",{children:"Loading..."}),children:d&&(0,l.jsx)(K.Zb,{children:"onsite"===d.status?(0,l.jsxs)(eH,{direction:"horizontal",children:[(0,l.jsx)(eW,{defaultSize:100-s,minSize:10,children:(0,l.jsx)(eB,{})}),(0,l.jsx)(eJ,{withHandle:!0}),(0,l.jsx)(eW,{defaultSize:s,minSize:10,onResize:e,children:(0,l.jsx)(eu,{status:d})})]}):(0,l.jsx)(eu,{status:d})})})})}}},function(e){e.O(0,[310,516,422,8,622,213,432,623,587,971,23,744],function(){return e(e.s=9261)}),_N_E=e.O()}]);