import{R as y,U as v,r as N,a as I,V as A,W as S,j as a,F as U,Y as w,Z as k,_ as C,h as n,i as l,k as c,$ as i,a0 as m,B as E,a1 as R}from"./index-DxBtr4UR.js";import{u as M}from"./user-DFNFXPrf.js";import{L as V}from"./loader-CVlspoiJ.js";function z(){const{user:e}=y(),{toastSuccess:d,toastError:x}=v(),{mutateAsync:u}=M(),r=N.useRef(null),t=I({defaultValues:{name:e==null?void 0:e.name,email:e==null?void 0:e.email,avatar:e==null?void 0:e.avatar},resolver:A(R),shouldFocusError:!1}),{uploadFile:h,isUploading:f}=S(),p=t.watch("avatar"),j=async s=>{try{await u(s),d("Update info successfully!")}catch(o){x(o.message)}},b=()=>{r&&r.current&&r.current.click()},g=async s=>{if(s.target.files){const o=s.target.files[0];await h(o,F=>t.setValue("avatar",F))}};return a.jsxs("div",{className:"p-4 bg-gray-100 min-h-screen",children:[a.jsxs("h3",{className:"text-xl text-center",children:["Hello ",a.jsx("span",{className:"font-bold capitalize",children:e==null?void 0:e.name}),"!"]}),a.jsx(U,{...t,children:a.jsxs("form",{onSubmit:t.handleSubmit(j),className:"flex flex-col gap-y-4 mt-4",children:[a.jsx(w,{className:"mx-auto w-[80px] h-[80px] border-2 border-white shadow flex justify-center items-center",onClick:b,children:f?a.jsx(V,{}):a.jsxs(a.Fragment,{children:[a.jsx(k,{src:p}),a.jsx(C,{className:"bg-gray-300",children:e==null?void 0:e.name[0]})]})}),a.jsx(n,{control:t.control,name:"name",render:({field:s})=>a.jsxs(l,{children:[a.jsx(c,{children:a.jsx(i,{placeholder:"Your name",...s,className:"text-base h-[50px]"})}),a.jsx(m,{})]})}),a.jsx(n,{control:t.control,name:"email",render:({field:s})=>a.jsxs(l,{children:[a.jsx(c,{children:a.jsx(i,{placeholder:"Your email",disabled:!0,...s,className:"text-base h-[50px]"})}),a.jsx(m,{})]})}),a.jsx(E,{type:"submit",className:"mt-5",disabled:t.formState.isSubmitting,children:"Update Info"})]})}),a.jsx("input",{type:"file",ref:r,className:"hidden",onChange:g})]})}export{z as default};
