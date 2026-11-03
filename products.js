/* Specs only. NO prices here: see prices.js. */
globalThis.PRODUCTS = {
cpu:[
{id:"i5-12400f",brand:"Intel",name:"Core i5-12400F",specs:"6C/12T · LGA1700 · 65W · no iGPU",socket:"LGA1700",family:"i12",tdp:65,igpu:false},
{id:"i5-14400f",brand:"Intel",name:"Core i5-14400F",specs:"10C/16T · LGA1700 · 65W · no iGPU",socket:"LGA1700",family:"i14",tdp:65,igpu:false},
{id:"r5-5600",brand:"AMD",name:"Ryzen 5 5600",specs:"6C/12T · AM4 · 65W · no iGPU",socket:"AM4",family:"r5000",tdp:65,igpu:false},
{id:"r5-7600",brand:"AMD",name:"Ryzen 5 7600",specs:"6C/12T · AM5 · 65W · basic iGPU",socket:"AM5",family:"r7000",tdp:65,igpu:true},
{id:"r7-7800x3d",brand:"AMD",name:"Ryzen 7 7800X3D",specs:"8C/16T · AM5 · 120W · basic iGPU",socket:"AM5",family:"r7000",tdp:120,igpu:true}
],

motherboard:[
{id:"msi-b660m-a",brand:"MSI",name:"PRO B660M-A DDR4",specs:"LGA1700 · DDR4 · mATX · 2×M.2 · 4×SATA",socket:"LGA1700",ramType:"DDR4",form:"mATX",m2:2,sata:4,supports:["i12","i14"],bios:["i14"]},
{id:"gb-b550m",brand:"Gigabyte",name:"B550M DS3H",specs:"AM4 · DDR4 · mATX · 2×M.2 · 4×SATA",socket:"AM4",ramType:"DDR4",form:"mATX",m2:2,sata:4,supports:["r5000"],bios:[]},
{id:"asrock-b650m",brand:"ASRock",name:"B650M-HDV/M.2",specs:"AM5 · DDR5 · mATX · 1×M.2 · 4×SATA",socket:"AM5",ramType:"DDR5",form:"mATX",m2:1,sata:4,supports:["r7000"],bios:[]},
{id:"asus-tuf-b650",brand:"ASUS",name:"TUF Gaming B650-PLUS WIFI",specs:"AM5 · DDR5 · ATX · 2×M.2 · 4×SATA",socket:"AM5",ramType:"DDR5",form:"ATX",m2:2,sata:4,supports:["r7000"],bios:[]}
],

gpu:[
{id:"rx-7600",brand:"AMD",name:"Radeon RX 7600",specs:"8GB · 165W · 1×8-pin · ref. 204mm · PSU 550W",len:204,tgp:165,psu:550},
{id:"rtx-4070-fe",brand:"NVIDIA",name:"GeForce RTX 4070 Founders Edition",specs:"12GB · 200W · 16-pin · FE 244mm · PSU 650W",len:244,tgp:200,psu:650},
{id:"rx-7800xt",brand:"AMD",name:"Radeon RX 7800 XT",specs:"16GB · 263W · 2×8-pin · ref. 267mm · PSU 700W",len:267,tgp:263,psu:700}
],

ram:[
{id:"kf-16-d4",brand:"Kingston",name:"Fury Beast 16GB (2×8GB)",specs:"DDR4-3200",type:"DDR4"},
{id:"lpx-16-d4",brand:"Corsair",name:"Vengeance LPX 16GB (2×8GB)",specs:"DDR4-3200",type:"DDR4"},
{id:"kf-32-d5",brand:"Kingston",name:"Fury Beast 32GB (2×16GB)",specs:"DDR5-5600",type:"DDR5"},
{id:"gs-32-d5",brand:"G.Skill",name:"Ripjaws S5 32GB (2×16GB)",specs:"DDR5-6000",type:"DDR5"}
],

cooler:[
{id:"ak400",brand:"DeepCool",name:"AK400",specs:"Air · 155mm tall · Intel LGA1700 / AMD AM4, AM5",height:155,sockets:["LGA1700","AM4","AM5"]},
{id:"pa120se",brand:"Thermalright",name:"Peerless Assassin 120 SE",specs:"Air · 155mm tall · Intel LGA1700 / AMD AM4, AM5",height:155,sockets:["LGA1700","AM4","AM5"]},
{id:"nh-d15",brand:"Noctua",name:"NH-D15",specs:"Air · 165mm tall · Intel LGA1700 / AMD AM4, AM5",height:165,sockets:["LGA1700","AM4","AM5"]}
],

psu:[
{id:"mwe550",brand:"Cooler Master",name:"MWE 550 Bronze V2",specs:"550W · 80+ Bronze",watts:550},
{id:"cv650",brand:"Corsair",name:"CV650",specs:"650W · 80+ Bronze",watts:650}
],

ssd:[
{id:"nv2-1tb",brand:"Kingston",name:"NV3 1TB",specs:"M.2 NVMe PCIe 4.0",iface:"M.2"},
{id:"980-1tb",brand:"Samsung",name:"980 1TB",specs:"M.2 NVMe PCIe 3.0",iface:"M.2"},
{id:"mx500-1tb",brand:"Crucial",name:"MX500 1TB",specs:"M.2 Internal SSD",iface:"M.2"}
],

hdd:[
{id:"barracuda-2tb",brand:"Seagate",name:"BarraCuda 2TB",specs:"3.5\" SATA · 7200 RPM",iface:"SATA"},
{id:"wdblue-2tb",brand:"Western Digital",name:"Blue 2TB",specs:"3.5\" SATA · 7200 RPM",iface:"SATA"}
],

case:[
{id:"h510",brand:"NZXT",name:"H510",specs:"Mid tower · ATX/mATX/ITX · GPU ≤381mm · cooler ≤165mm",forms:["ATX","mATX","ITX"],maxGpu:381,maxCooler:165},
{id:"q300l",brand:"Cooler Master",name:"MasterBox Q300L",specs:"Mini tower · mATX/ITX · GPU ≤360mm · cooler ≤159mm",forms:["mATX","ITX"],maxGpu:360,maxCooler:159},
{id:"4000d",brand:"Corsair",name:"4000D Airflow",specs:"Mid tower · ATX/mATX/ITX · GPU ≤360mm · cooler ≤170mm",forms:["ATX","mATX","ITX"],maxGpu:360,maxCooler:170}
],

fans:[
{id:"p12",brand:"Arctic",name:"P12 PWM PST",specs:"120mm · PWM (priced and shown as ×2)"},
{id:"nfp12",brand:"Noctua",name:"NF-P12 redux-1700",specs:"120mm · PWM (priced and shown as ×2)"}
]
};