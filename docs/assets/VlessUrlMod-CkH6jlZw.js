import{i as w,j as T,k as f,l as m,m as B,a as $,n as y,p as S,q as J,s as F,v as Q,x as X,y as Y,z as Z,A as ee,B as te,C as z,c as N,D as M,E as oe,F as E,G as re,H as ne,I as se,J as le,b as j,e as R,o as V,K as k,g as i,w as d,u,L as C,h as v,r as ae}from"./index-svrsSQgz.js";import{N as _}from"./Input-CN-7Bgkc.js";function ie(e,t="default",o=[]){const a=e.$slots[t];return a===void 0?o:a()}const l="0!important",A="-1px!important";function b(e){return f(`${e}-type`,[m("& +",[w("button",{},[f(`${e}-type`,[B("border",{borderLeftWidth:l}),B("state-border",{left:A})])])])])}function x(e){return f(`${e}-type`,[m("& +",[w("button",[f(`${e}-type`,[B("border",{borderTopWidth:l}),B("state-border",{top:A})])])])])}const de=w("button-group",`
 flex-wrap: nowrap;
 display: inline-flex;
 position: relative;
`,[T("vertical",{flexDirection:"row"},[T("rtl",[w("button",[m("&:first-child:not(:last-child)",`
 margin-right: ${l};
 border-top-right-radius: ${l};
 border-bottom-right-radius: ${l};
 `),m("&:last-child:not(:first-child)",`
 margin-left: ${l};
 border-top-left-radius: ${l};
 border-bottom-left-radius: ${l};
 `),m("&:not(:first-child):not(:last-child)",`
 margin-left: ${l};
 margin-right: ${l};
 border-radius: ${l};
 `),b("default"),f("ghost",[b("primary"),b("info"),b("success"),b("warning"),b("error")])])])]),f("vertical",{flexDirection:"column"},[w("button",[m("&:first-child:not(:last-child)",`
 margin-bottom: ${l};
 margin-left: ${l};
 margin-right: ${l};
 border-bottom-left-radius: ${l};
 border-bottom-right-radius: ${l};
 `),m("&:last-child:not(:first-child)",`
 margin-top: ${l};
 margin-left: ${l};
 margin-right: ${l};
 border-top-left-radius: ${l};
 border-top-right-radius: ${l};
 `),m("&:not(:first-child):not(:last-child)",`
 margin: ${l};
 border-radius: ${l};
 `),x("default"),f("ghost",[x("primary"),x("info"),x("success"),x("warning"),x("error")])])])]),ue={size:{type:String,default:void 0},vertical:Boolean},U=$({name:"ButtonGroup",props:ue,setup(e){const{mergedClsPrefixRef:t,mergedRtlRef:o}=S(e);return J("-button-group",de,t),Q(X,e),{rtlEnabled:F("ButtonGroup",o,t),mergedClsPrefix:t}},render(){const{mergedClsPrefix:e}=this;return y("div",{class:[`${e}-button-group`,this.rtlEnabled&&`${e}-button-group--rtl`,this.vertical&&`${e}-button-group--vertical`],role:"group"},this.$slots)}});function ce(){const e=Z(ee,null);return e===null&&Y("use-message","No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}const fe=Object.assign(Object.assign({},z.props),{align:String,justify:{type:String,default:"start"},inline:Boolean,vertical:Boolean,reverse:Boolean,size:{type:[String,Number,Array],default:"medium"},wrap:{type:Boolean,default:!0}}),L=$({name:"Flex",props:fe,setup(e){const{mergedClsPrefixRef:t,mergedRtlRef:o}=S(e),r=z("Flex","-flex",void 0,re,e,t);return{rtlEnabled:F("Flex",o,t),mergedClsPrefix:t,margin:N(()=>{const{size:n}=e;if(Array.isArray(n))return{horizontal:n[0],vertical:n[1]};if(typeof n=="number")return{horizontal:n,vertical:n};const{self:{[M("gap",n)]:p}}=r.value,{row:c,col:s}=oe(p);return{horizontal:E(s),vertical:E(c)}})}},render(){const{vertical:e,reverse:t,align:o,inline:r,justify:a,margin:n,wrap:p,mergedClsPrefix:c,rtlEnabled:s}=this,g=te(ie(this),!1);return g.length?y("div",{role:"none",class:[`${c}-flex`,s&&`${c}-flex--rtl`],style:{display:r?"inline-flex":"flex",flexDirection:e&&!t?"column":e&&t?"column-reverse":!e&&t?"row-reverse":"row",justifyContent:a,flexWrap:!p||e?"nowrap":"wrap",alignItems:o,gap:`${n.vertical}px ${n.horizontal}px`}},g):null}}),pe=w("text",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[f("strong",`
 font-weight: var(--n-font-weight-strong);
 `),f("italic",{fontStyle:"italic"}),f("underline",{textDecoration:"underline"}),f("code",`
 line-height: 1.4;
 display: inline-block;
 font-family: var(--n-font-famliy-mono);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-sizing: border-box;
 padding: .05em .35em 0 .35em;
 border-radius: var(--n-code-border-radius);
 font-size: .9em;
 color: var(--n-code-text-color);
 background-color: var(--n-code-color);
 border: var(--n-code-border);
 `)]),ge=Object.assign(Object.assign({},z.props),{code:Boolean,type:{type:String,default:"default"},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}}),P=$({name:"Text",props:ge,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=S(e),r=z("Typography","-text",pe,le,e,t),a=N(()=>{const{depth:p,type:c}=e,s=c==="default"?p===void 0?"textColor":`textColor${p}Depth`:M("textColor",c),{common:{fontWeightStrong:g,fontFamilyMono:h,cubicBezierEaseInOut:I},self:{codeTextColor:O,codeBorderRadius:H,codeColor:K,codeBorder:W,[s]:q}}=r.value;return{"--n-bezier":I,"--n-text-color":q,"--n-font-weight-strong":g,"--n-font-famliy-mono":h,"--n-code-border-radius":H,"--n-code-text-color":O,"--n-code-color":K,"--n-code-border":W}}),n=o?ne("text",N(()=>`${e.type[0]}${e.depth||""}`),a,e):void 0;return{mergedClsPrefix:t,compitableTag:se(e,["as","tag"]),cssVars:o?void 0:a,themeClass:n?.themeClass,onRender:n?.onRender}},render(){var e,t,o;const{mergedClsPrefix:r}=this;(e=this.onRender)===null||e===void 0||e.call(this);const a=[`${r}-text`,this.themeClass,{[`${r}-text--code`]:this.code,[`${r}-text--delete`]:this.delete,[`${r}-text--strong`]:this.strong,[`${r}-text--italic`]:this.italic,[`${r}-text--underline`]:this.underline}],n=(o=(t=this.$slots).default)===null||o===void 0?void 0:o.call(t);return this.code?y("code",{class:a,style:this.cssVars},this.delete?y("del",null,n):n):this.delete?y("del",{class:a,style:this.cssVars},n):y(this.compitableTag||"span",{class:a,style:this.cssVars},n)}}),me={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},G=$({name:"CloseRound",render:function(t,o){return V(),j("svg",me,o[0]||(o[0]=[R("path",{d:"M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z",fill:"currentColor"},null,-1)]))}}),he={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},ve=$({name:"ContentCopyRound",render:function(t,o){return V(),j("svg",he,o[0]||(o[0]=[R("path",{d:"M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1zm5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2zm-2 0H9V4h9v12z",fill:"currentColor"},null,-1)]))}});function D(e){const t=new URL(e),o=t.hostname,r=t.hash?t.hash.substring(1):"";return{hostName:o,name:r}}function be(e){return e.split(/(?=vless:\/\/)/i).map(t=>t.trim()).filter(t=>t!=="")}function xe(e,t){const o=new URL(e);return o.hash=`#${t}`,o.toString()}async function ye(e){const{hostName:t}=D(e),o=await fetch(`http://ip-api.com/json/${t}?fields=countryCode`);if(!o.ok)throw new Error("Failed to fetch geolocation data");return(await o.json()).countryCode}async function we(e){const t=be(e);return(await Promise.all(t.map(async r=>{const{name:a}=D(r),n=await ye(r),p=a?`${a}(${n})`:`${n}`;return xe(r,p)}))).join(`

`)}const $e={class:"p-4 text-left"},Ce={class:"flex flex-row gap-2 items-center text-left mb-4"},ze=$({__name:"VlessUrlMod",setup(e){const t=ce(),o=k(""),r=k(""),a=k(!1);async function n(){a.value=!0;try{const c=await we(o.value);r.value=c}catch(c){t.error(`Error occurred during conversion: ${c}`)}finally{a.value=!1}}function p(){navigator.clipboard.writeText(r.value),t.success("Copied to clipboard")}return(c,s)=>{const g=ae("n-icon");return V(),j("div",$e,[R("div",Ce,[i(u(L),{class:"flex-1",justify:"end"},{default:d(()=>[i(u(U),{size:"tiny"},{default:d(()=>[i(u(C),{type:"error",disabled:o.value?.length==0,onClick:s[0]||(s[0]=h=>o.value="")},{icon:d(()=>[i(g,null,{default:d(()=>[i(u(G))]),_:1})]),default:d(()=>[s[4]||(s[4]=v(" Clear "))]),_:1},8,["disabled"])]),_:1}),i(u(_),{value:o.value,"onUpdate:value":s[1]||(s[1]=h=>o.value=h),type:"textarea",placeholder:"original vless urls, can contain multiple urls. each url starts with vless://",rows:"20"},null,8,["value"])]),_:1}),i(u(C),{disabled:a.value||o.value?.length==0,loading:a.value,type:"primary",onClick:n},{default:d(()=>s[5]||(s[5]=[v("Convert")])),_:1},8,["disabled","loading"]),i(u(L),{class:"flex-1",justify:"end"},{default:d(()=>[i(u(U),{size:"tiny"},{default:d(()=>[i(u(C),{type:"error",disabled:r.value?.length==0,onClick:s[2]||(s[2]=h=>r.value="")},{icon:d(()=>[i(g,null,{default:d(()=>[i(u(G))]),_:1})]),default:d(()=>[s[6]||(s[6]=v(" Clear "))]),_:1},8,["disabled"]),i(u(C),{disabled:r.value?.length==0,onClick:p},{icon:d(()=>[i(g,null,{default:d(()=>[i(u(ve))]),_:1})]),default:d(()=>[s[7]||(s[7]=v(" Copy "))]),_:1},8,["disabled"])]),_:1}),i(u(_),{value:r.value,"onUpdate:value":s[3]||(s[3]=h=>r.value=h),type:"textarea",placeholder:"modified url",rows:"20"},null,8,["value"])]),_:1})]),i(u(P),{type:"info"},{default:d(()=>s[8]||(s[8]=[v(" This tool looks up the geolocation of the vless server, and append the geolocation to the name of the server. e.g. vless://uuid@ip:port?remarks=server1 will be converted to vless://uuid@ip:port?remarks=server1(US). ")])),_:1}),R("p",null,[i(u(P),{type:"warning"},{default:d(()=>s[9]||(s[9]=[v(" Note: please use http to run this tool, since the api to look up geolocation is accessed via http")])),_:1})])])}}});export{ze as default};
