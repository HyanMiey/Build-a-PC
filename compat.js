/* Pure compatibility rules: no DOM. sel = {cpu, motherboard, gpu, ram, cooler, psu, ssd, hdd, case, fans} */
(function(g){
const REQUIRED=["cpu","motherboard","ram","psu","case"];
function checkBuild(s){
  const out=[],add=(level,msg,parts)=>out.push({level,msg,parts});
  const {cpu,motherboard:mb,gpu,ram,cooler,psu,ssd,hdd}=s,pc=s.case;
  if(cpu&&mb){
    if(cpu.socket!==mb.socket) add("red",`${cpu.name} is socket ${cpu.socket}, but ${mb.name} is socket ${mb.socket}.`,["cpu","motherboard"]);
    else if(!mb.supports.includes(cpu.family)) add("red",`${mb.name} does not support the ${cpu.name} generation.`,["cpu","motherboard"]);
    else if(mb.bios.includes(cpu.family)) add("yellow",`${mb.name} may need a BIOS update to run the ${cpu.name}. Verify before buying.`,["cpu","motherboard"]);
    else add("green","CPU and motherboard are compatible.",[]);
  }
  if(ram&&mb){
    if(ram.type!==mb.ramType) add("red",`${ram.name} is ${ram.type}, but ${mb.name} only takes ${mb.ramType}.`,["ram","motherboard"]);
    else add("green",`${ram.type} RAM matches the motherboard.`,[]);
  }
  if(mb&&pc){
    if(!pc.forms.includes(mb.form)) add("red",`${mb.name} is ${mb.form}, which does not fit the ${pc.name} (supports ${pc.forms.join("/")}).`,["motherboard","case"]);
    else add("green","Motherboard fits the case.",[]);
  }
  if(gpu&&pc){
    if(gpu.len>pc.maxGpu) add("red",`${gpu.name} (${gpu.len}mm) is longer than the ${pc.name} allows (${pc.maxGpu}mm).`,["gpu","case"]);
    else if(pc.maxGpu-gpu.len<20) add("yellow",`Tight GPU fit: only ${pc.maxGpu-gpu.len}mm spare. Partner-card lengths vary, so verify.`,["gpu","case"]);
    else add("green","GPU clears the case.",[]);
  }
  if(cooler&&cpu){
    if(!cooler.sockets.includes(cpu.socket)) add("red",`${cooler.name} does not support socket ${cpu.socket} (${cpu.name}).`,["cooler","cpu"]);
    else add("green","Cooler supports the CPU socket.",[]);
  }
  if(cooler&&pc){
    if(cooler.height>pc.maxCooler) add("red",`${cooler.name} (${cooler.height}mm) is taller than the ${pc.name} allows (${pc.maxCooler}mm).`,["cooler","case"]);
    else if(pc.maxCooler-cooler.height<5) add("yellow","Cooler height is within 5mm of the case limit. Verify.",["cooler","case"]);
  }
  if(cpu&&!cooler) add("yellow","No cooler selected. Check whether your CPU includes one (F-series Intel and some AMD boxes vary).",["cooler"]);
  if(cpu&&!gpu&&!cpu.igpu) add("red",`${cpu.name} has no integrated graphics and no GPU is selected, so there is no display output.`,["cpu","gpu"]);
  if(psu&&cpu){
    const est=cpu.tdp+(gpu?gpu.tgp:0)+100; // +100W for board, RAM, drives, fans (estimate)
    if(gpu&&psu.watts<gpu.psu) add("red",`${psu.name} (${psu.watts}W) is below the ${gpu.psu}W recommended for ${gpu.name}.`,["psu","gpu"]);
    else if(psu.watts<est*1.25) add("yellow",`${psu.watts}W leaves under 25% headroom over the estimated ${est}W draw.`,["psu"]);
    else add("green",`PSU wattage is sufficient (est. draw ${est}W).`,[]);
  }
  if(mb){
    const m2=[ssd,hdd].filter(d=>d&&d.iface==="M.2").length, sata=[ssd,hdd].filter(d=>d&&d.iface==="SATA").length;
    if(m2>mb.m2) add("red",`${mb.name} has only ${mb.m2} M.2 slot(s).`,["ssd","motherboard"]);
    else if(sata>mb.sata) add("red",`${mb.name} has only ${mb.sata} SATA port(s).`,["hdd","motherboard"]);
    else if(ssd||hdd) add("green","Storage interfaces are supported.",[]);
  }
  const missing=REQUIRED.filter(k=>!s[k]);
  if(!ssd&&!hdd) missing.push("storage (SSD or HDD)");
  const red=out.some(i=>i.level==="red"),yellow=out.some(i=>i.level==="yellow");
  return {issues:out,missing,status:red?"red":yellow?"yellow":"green",complete:!red&&missing.length===0};
}
g.checkBuild=checkBuild;
})(globalThis);
