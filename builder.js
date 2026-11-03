"use strict";
(function(){
const P=PRODUCTS,PR=globalThis.PRICES||{},$=id=>document.getElementById(id);
const CATS=[["cpu","CPU"],["motherboard","Motherboard"],["gpu","GPU"],["ram","RAM"],["cooler","CPU Cooler"],["psu","PSU"],["ssd","SSD"],["hdd","HDD"],["case","PC Case"],["fans","Case Fans"]];
const LBL=Object.fromEntries(CATS),st={sel:{},active:"cpu"};
let res,bad=new Set();
const esc=s=>String(s).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
const peso=n=>"₱"+n.toLocaleString("en-PH");
const offers=p=>{const v=PR[p.id];return Number.isFinite(v)?[{price:v}]:[]};

function tabs(){
  $("pb-tabs").innerHTML=CATS.map(([c,l])=>{const p=st.sel[c];
    return `<button class="pb-tab ${st.active===c?"act ":""}${bad.has(c)?"bad":""}" data-tab="${c}"><b>${l}</b><span>${p?esc(p.name)+(offers(p)[0]?" · "+peso(offers(p)[0].price):""):"— choose —"}</span></button>`}).join("");
}
const BL=[...Array(7).keys()].map(i=>`<ellipse cx="0" cy="-12" rx="5" ry="10" transform="rotate(${(i*51.4).toFixed(1)})"/>`).join("");
const fan=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="23" class="ring"/><g class="bl">${BL}</g><circle r="5" class="hub"/></g>`;
const FINS=(x,y,w,n)=>Array.from({length:n},(_,i)=>`M${x} ${y+i*8}h${w}`).join("");
function part(c,hits,art,ghost,gx,gy){
  const p=st.sel[c],[x,y,w,h]=hits[0];
  return `<g class="pb-part ${p?"on ":""}${st.active===c?"act ":""}${bad.has(c)?"bad":""}" data-cat="${c}"><title>${esc(LBL[c])}${p?": "+esc(p.brand+" "+p.name):""}</title><g class="art">${art}</g>`+
    hits.map(([a,b,d,e])=>`<rect class="hit" x="${a}" y="${b}" width="${d}" height="${e}" rx="4"/>`).join("")+
    (p?"":`<text class="gh" x="${gx??x+w/2}" y="${gy??y+h/2}">${ghost}</text>`)+`</g>`;
}
function pc(){
  bad=new Set(res.issues.filter(i=>i.level==="red").flatMap(i=>i.parts));
  const ssd=st.sel.ssd,m2=!ssd||ssd.iface==="M.2";
  $("pb-svg").innerHTML=
  `<defs><linearGradient id="mt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9edf5"/><stop offset="1" stop-color="#8d96ab"/></linearGradient></defs>`+
  part("case",[[20,10,380,440]],`<rect x="20" y="10" width="380" height="440" rx="14" fill="#12172e" stroke="#3a4a7a" stroke-width="3"/><rect x="34" y="24" width="352" height="412" rx="8" fill="#0a0d1c" stroke="#26365f"/><polygon points="34,24 150,24 80,436 34,436" fill="rgba(255,255,255,.05)"/><rect x="48" y="450" width="50" height="6" fill="#3a4a7a"/><rect x="322" y="450" width="50" height="6" fill="#3a4a7a"/>`,"PC CASE",210,22)+
  part("motherboard",[[70,32,280,290]],`<rect x="70" y="32" width="280" height="290" rx="4" fill="#0d2b2e" stroke="#1e8c84" stroke-width="2"/><path d="M80 250h120v-30h60M90 295h200M300 60v120h40M255 100h40v50" stroke="#1e8c84" fill="none" opacity=".5"/><rect x="74" y="36" width="40" height="70" fill="#2a3150"/><rect x="120" y="34" width="96" height="14" fill="#2a3150"/><path d="${FINS(78,46,32,4)}" stroke="#4a5686"/><rect x="262" y="262" width="34" height="34" fill="#2a3150" stroke="#4a5686"/><rect x="95" y="231" width="200" height="6" fill="#0a0a0a"/><rect x="100" y="268" width="130" height="5" fill="#0a0a0a"/>`,"MOTHERBOARD",210,306)+
  part("cpu",[[120,70,70,70]],`<rect x="120" y="70" width="70" height="70" rx="3" fill="#1b1f38" stroke="#4b5a8c"/><rect x="130" y="80" width="50" height="50" rx="3" fill="url(#mt)"/><path d="M138 95h34M138 105h34M138 115h34" stroke="#6c758c"/>`,"CPU")+
  part("cooler",[[108,60,94,90]],`<rect x="108" y="60" width="94" height="90" rx="8" fill="#252c4a" stroke="#5565a0"/><path d="${FINS(112,66,86,10)}" stroke="#3b4672"/>${fan(155,105,1.3)}`,"COOLER")+
  part("ram",[[222,50,38,120]],[224,244].map((x,i)=>`<rect x="${x}" y="50" width="14" height="120" rx="2" fill="#1b2140" stroke="#44507f"/><rect x="${x+4}" y="56" width="6" height="100" fill="${i?"#00eaff":"#ff416c"}"/>`).join(""),"RAM")+
  part("gpu",[[82,181,258,50]],`<rect x="90" y="185" width="250" height="42" rx="5" fill="#1a1f38" stroke="#5565a0"/><rect x="82" y="185" width="8" height="46" fill="url(#mt)"/><rect x="95" y="188" width="240" height="2" fill="#00eaff"/><rect x="110" y="227" width="100" height="4" fill="#d4a017"/><rect x="300" y="181" width="30" height="6" fill="#111"/>${fan(135,207,.7)}${fan(215,207,.7)}${fan(295,207,.7)}`,"GPU")+
  (m2?part("ssd",[[120,152,64,14]],`<rect x="120" y="152" width="64" height="14" rx="2" fill="#222a44" stroke="#8b5cf6"/><rect x="126" y="155" width="14" height="8" fill="#111"/><rect x="146" y="155" width="14" height="8" fill="#111"/>`,"M.2")
   :part("ssd",[[240,334,110,14]],`<rect x="240" y="334" width="110" height="14" rx="3" fill="#2a3150" stroke="#8b5cf6"/><rect x="250" y="338" width="40" height="6" fill="#8b5cf6"/>`,"SSD"))+
  part("hdd",[[240,352,110,66]],`<rect x="240" y="352" width="110" height="66" rx="4" fill="url(#mt)" stroke="#555"/><circle cx="272" cy="385" r="22" fill="#1a1f38" stroke="#777"/><circle cx="272" cy="385" r="5" fill="#ccc"/><path d="M272 385L322 372" stroke="#333" stroke-width="3"/><rect x="300" y="398" width="40" height="14" fill="#fff" opacity=".8"/>`,"HDD")+
  part("psu",[[40,345,170,85]],`<path d="M60 345C40 280 46 200 66 120M150 345C175 310 120 290 112 232" stroke="#3b4260" stroke-width="6" fill="none"/><rect x="40" y="345" width="170" height="85" rx="6" fill="#181c30" stroke="#5565a0"/>${fan(92,388,1.45)}<path d="M140 358h60M140 368h60M140 378h60" stroke="#3b4672"/><rect x="140" y="396" width="60" height="22" rx="2" fill="#ffd900" opacity=".85"/>`,"PSU")+
  part("fans",[[24,64,34,34],[360,60,32,32],[360,100,32,32]],`<rect x="24" y="64" width="34" height="34" rx="4" fill="#12172e" stroke="#4b5a8c"/>${fan(41,81,.6)}<rect x="360" y="60" width="32" height="32" rx="4" fill="#12172e" stroke="#4b5a8c"/>${fan(376,76,.58)}<rect x="360" y="100" width="32" height="32" rx="4" fill="#12172e" stroke="#4b5a8c"/>${fan(376,116,.58)}`,"FAN",41,112);
}
function card(p,c){
  const on=st.sel[c]&&st.sel[c].id===p.id,o=offers(p);
  return `<div class="pb-card${on?" on":""}"><div class="pb-img">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.name)}">`:esc(LBL[c])}</div><div><b>${esc(p.brand)} ${esc(p.name)}</b><small>${esc(p.specs)}</small>`+
   (o.length?`<small class="pb-price">${peso(o[0].price)}</small>`:`<small class="pb-na">Price unavailable</small>`)+
   `<button data-pick="${esc(p.id)}">${on?"REMOVE":"SELECT"}</button></div></div>`;
}
function products(){
  const c=st.active;
  $("pb-products").innerHTML=`<h3 class="section-title">▶ ${esc(LBL[c].toUpperCase())}</h3>`+P[c].map(p=>card(p,c)).join("");
}
function status(){
  const r=res,sel=CATS.filter(([c])=>st.sel[c]);
  let sum=0,miss=0;
  sel.forEach(([c])=>{const o=offers(st.sel[c])[0];o?sum+=o.price*(c==="fans"?2:1):miss++});
  $("pb-total").innerHTML=`<div>TOTAL: <b>${sel.length&&miss===sel.length?"Price unavailable":peso(sum)}</b></div>`+
    (miss?`<small>${miss} selected part(s) have no verified price and are excluded.</small>`:"")+`<button data-clear>CLEAR BUILD</button>`;
  const head=r.status==="red"?"✖ INCOMPATIBLE: not a valid build":r.complete?(r.status==="yellow"?"⚠ COMPLETE: verify warnings":"✓ VALID BUILD"):"… BUILD INCOMPLETE";
  $("pb-status").innerHTML=`<div class="pb-banner ${r.status}">${head}</div>`+
    (r.missing.length?`<div class="pb-issue yellow">Still needed: ${esc(r.missing.join(", "))}</div>`:"")+
    [...r.issues].sort((a,b)=>"redyellowgreen".indexOf(a.level)-"redyellowgreen".indexOf(b.level)).map(i=>`<div class="pb-issue ${i.level}">${esc(i.msg)}</div>`).join("");
}
function summary(){
  const r=res,c0=st.sel.cpu,g0=st.sel.gpu;let sum=0,miss=0,n=0;
  $("pbs-parts").innerHTML=CATS.map(([c,l])=>{const p=st.sel[c];
    if(!p)return `<tr><td>${l}</td><td>—</td><td></td></tr>`;
    n++;const o=offers(p)[0],q=c==="fans"?2:1;o?sum+=o.price*q:miss++;
    return `<tr><td>${l}</td><td>${esc(p.brand+" "+p.name)}${q>1?" ×2":""}</td><td>${o?peso(o.price*q):"Price unavailable"}</td></tr>`}).join("");
  $("pbs-total").textContent=n&&miss===n?"Price unavailable":peso(sum)+(miss?" + "+miss+" unpriced":"");
  const est=(c0?c0.tdp:0)+(g0?g0.tgp:0)+(c0||g0?100:0);
  $("pbs-power").textContent=est?est+"W":"—";
  $("pbs-psu").textContent=est?Math.max(Math.ceil(est*1.25/50)*50,g0?g0.psu:0)+"W or higher":"—";
  const a=$("pbs-alert"),red=r.status==="red",warn=r.status==="yellow"||r.missing.length>0;
  a.className="pbs-alert "+(red?"red":warn?"yellow":"green");
  a.textContent=red?"Potential compatibility issue detected.":r.missing.length?"Build is incomplete.":warn?"Build has warnings to verify.":"No compatibility issues detected.";
  $("pbs-issues").innerHTML=(r.missing.length?[`<li>Still needed: ${esc(r.missing.join(", "))}</li>`]:[]).concat(r.issues.filter(i=>i.level!=="green").map(i=>`<li>${esc(i.msg)}</li>`)).join("");
  $("pbs-date").textContent=new Date().toLocaleDateString("en-PH",{year:"numeric",month:"long",day:"numeric"});
}
function update(){res=checkBuild(st.sel);bad=new Set(res.issues.filter(i=>i.level==="red").flatMap(i=>i.parts));tabs();pc();products();status();summary();}

$("pc-builder-2d").addEventListener("click",e=>{
  const t=e.target.closest("[data-tab],[data-cat],[data-pick],[data-clear]");
  if(!t)return;
  if(t.dataset.tab||t.dataset.cat)st.active=t.dataset.tab||t.dataset.cat;
  else if(t.dataset.clear!==undefined)st.sel={};
  else{const c=st.active,p=P[c].find(x=>x.id===t.dataset.pick);
    if(st.sel[c]&&st.sel[c].id===p.id)delete st.sel[c];else st.sel[c]=p;}
  update();
});
$("pbs-print").addEventListener("click",()=>window.print());
update();
})();
