import{w as g,x as u,y as S,Q as f,z as t,T as o,q as O,r as y,j as s,A as x}from"./index-DxBtr4UR.js";import{a as l,T as I}from"./item-Bh_p7c0B.js";import"./loader-CVlspoiJ.js";const b="/timeline/todos",E=async a=>await g.get(`${b}?${u.stringify(a)}`),k=a=>S({queryKey:[f.TIMELINE.GET_TIMELINE,a],queryFn:()=>E(a)});function T(a){const e={gte:t().toISOString(),lte:t().toISOString()};switch(a){case o.THIS_WEEK:e.gte=t().startOf("isoWeek").toISOString(),e.lte=t().add(1,"week").startOf("isoWeek").toISOString();break;case o.NEXT_WEEK:e.gte=t().add(1,"week").startOf("isoWeek").toISOString(),e.lte=t().add(1,"week").endOf("isoWeek").toISOString();break;case o.THIS_MONTH:e.gte=t().startOf("month").toISOString(),e.lte=t().endOf("month").toISOString();break;case o.NEXT_MONTH:e.gte=t().add(1,"month").startOf("month").toISOString(),e.lte=t().add(1,"month").endOf("month").toISOString();break}return{"deadline[$gte]":e.gte,"deadline[$lte]":e.lte}}function w(){const{timelineSlug:a}=O(),{data:e}=k({...T(a),sort:"deadline",status:[l.TODO,l.IN_PROGRESS,l.PENDING].join("|")}),c=y.useMemo(()=>{if(!e)return[];const n=e.todos.reduce((r,m)=>{const d=t(m.deadline).format("MM/DD/YYYY");return r[d]||(r[d]=[]),r[d].push(m),r},{});return Object.keys(n).map(r=>({date:r,todos:n[r]}))},[e]);return s.jsx(x,{type:"single",collapsible:!0,className:"flex flex-col gap-y-4 p-4",children:s.jsx("ol",{className:"relative border-s border-gray-200 dark:border-gray-700",children:c.map(i=>s.jsxs("li",{className:"mb-10 ms-4",children:[s.jsx("div",{className:"absolute w-3 h-3 bg-gray-300 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"}),s.jsx("time",{className:"mb-1 text-base font-medium leading-none text-gray-500 dark:text-gray-500",children:t(i.date).format("ll")}),s.jsx("div",{className:"flex flex-col gap-y-4 mt-4",children:i.todos.map(n=>s.jsx(I,{todo:n},n._id))})]}))})})}export{w as default};
