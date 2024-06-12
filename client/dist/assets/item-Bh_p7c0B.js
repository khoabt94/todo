import{c as a,j as e,C as f,X as k,E,r as b,G as v,H as C,J as D,z as d,B as x,K as M,L as O,M as P,S as T,l as w,m as L,o as S,p as B,N as I,O as _}from"./index-DxBtr4UR.js";import{L as R}from"./loader-CVlspoiJ.js";/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=a("BellOff",[["path",{d:"M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5",key:"o7mx20"}],["path",{d:"M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7",key:"16f1lm"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=a("BellRing",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}],["path",{d:"M4 2C2.8 3.7 2 5.7 2 8",key:"tap9e0"}],["path",{d:"M22 8c0-2.3-.8-4.3-2-6",key:"5bb3ad"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=a("Dot",[["circle",{cx:"12.1",cy:"12.1",r:"1",key:"18d7e5"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=a("LayoutList",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}],["path",{d:"M14 4h7",key:"3xa0d5"}],["path",{d:"M14 9h7",key:"1icrd9"}],["path",{d:"M14 15h7",key:"1mj8o2"}],["path",{d:"M14 20h7",key:"11slyb"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=a("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]);var H=(s=>(s.TODO="TODO",s.IN_PROGRESS="IN_PROGRESS",s.PENDING="PENDING",s.COMPLETED="COMPLETED",s.CANCELED="CANCELED",s))(H||{});const h=[{value:"TODO",label:"To Do",icon:e.jsx(F,{strokeWidth:1.8,size:16,color:"#686D76"}),className:"text-[#686D76] bg-[#686D76]"},{value:"IN_PROGRESS",label:"In Progress",icon:e.jsx(R,{strokeWidth:1.8,size:16,color:"#10439F"}),className:"text-[#10439F] bg-[#10439F]"},{value:"PENDING",label:"Pending",icon:e.jsx(W,{strokeWidth:1.8,size:16,color:"#10439F"}),className:"text-[#10439F] bg-[#10439F]"},{value:"COMPLETED",label:"Completed",icon:e.jsx(f,{strokeWidth:1.8,size:16,color:"#41B06E"}),className:"text-[#41B06E] bg-[#41B06E]"},{value:"CANCELED",label:"Canceled",icon:e.jsx(k,{strokeWidth:1.8,size:16,color:"#41B06E"}),className:"text-[#41B06E] bg-[#41B06E]"}];function q({todo:s}){const{_id:l,deadline:o,description:p,should_notify:c,title:m,priority:u,status:i}=s,{open:j}=E(),g=()=>{j(_,{initialValue:s,projectId:s.project._id})},r=b.useMemo(()=>h.find(t=>t.value===i),[i]),{mutate:n}=v(),y=t=>{n({todo_id:l,status:t,project:s.project._id})},N=()=>{n({todo_id:l,should_notify:!c,project:s.project._id})};return e.jsxs(C,{value:l,className:"rounded-lg shadow px-4 bg-white relative",children:[e.jsx(D,{className:"hover:no-underline gap-x-2 ",children:e.jsxs("div",{className:"flex-1 flex items-center  justify-between",children:[e.jsxs("div",{className:"w-[300px]",children:[e.jsxs("div",{className:"flex items-center gap-x-1",children:[r?e.jsx("i",{children:r.icon}):null,e.jsx(G,{className:"p-0",size:16,color:"#61677A"}),e.jsx("p",{className:"text-left truncate",children:m})]}),e.jsxs("p",{className:"text-xs text-gray-500 text-left",children:[d(o).format("HH:mm")," ",e.jsx("span",{className:"font-medium text-gray-600",children:d(o).format("DD/MM/YYYY")})]})]}),e.jsx(x,{variant:"ghost",type:"button",onClick:t=>{t.stopPropagation(),N()},className:"px-1",children:c?e.jsx(A,{fill:""}):e.jsx(z,{})})]})}),e.jsx("div",{className:M("bg-slate-500 absolute top-0 bottom-0 left-0 w-[6px] rounded-tl-lg rounded-bl-lg",O[u].className)}),e.jsxs(P,{children:[p,e.jsxs("div",{className:"flex gap-x-4 mt-3 justify-end h-8 items-center w-full",children:[e.jsxs(T,{onValueChange:y,defaultValue:s.status,children:[e.jsx(w,{className:"w-[150px] h-full rounded-lg",children:e.jsx(L,{placeholder:"Select a verified email to display"})}),e.jsx(S,{children:h.map(t=>e.jsx(B,{value:t.value,className:"",children:e.jsxs("div",{className:"flex gap-x-2 items-center",children:[e.jsx("i",{children:t.icon}),e.jsx("p",{className:`font-medium !bg-transparent ${t.className}`,children:t.label})]})},t.value))})]}),e.jsx(x,{type:"button",variant:"ghost",className:"p-0 h-full",onClick:g,children:e.jsx(I,{strokeWidth:1.5})})]})]})]})}export{h as S,q as T,H as a};
