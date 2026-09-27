import{exercises}from'./data';import{Duration,Exercise,Log,Position,RunMode}from'./types';export function recommend(position:Position,duration:Duration,run:RunMode,logs:Log[],lazy=false,equipment:'none'|'band'='none',painAreas:string[]=[]){const recent=logs.slice(-5).map(x=>x.exerciseId);const counts:Record<string,number>={};logs.filter(x=>Date.now()-new Date(x.at).getTime()<7*864e5).forEach(l=>l.muscles.forEach(m=>counts[m]=(counts[m]||0)+1));let pool=exercises.filter(e=>e.position.includes(position)&&e.seconds<=duration&&(equipment==='band'||e.equipment==='none'));if(lazy)pool=pool.filter(e=>e.difficulty===1&&e.seconds<=60);
const risky:Record<string,string[]>={
'목·어깨':['c8','c9','c10','b7','f2','f3','s3','s4','s7','s8'],
'허리':['c2','b1','f1','f2','s2','s5','s6'],
'손목·팔':['c8','c10','b7','f2','f3','s3','s4','s7'],
'고관절':['c2','c7','b1','b2','b3','b6','f2','f4','s2','s5','s6'],
'무릎':['c1','c2','b1','f2','f3','s2'],
'발목·발':['c5','c6','s1','s2','s5','s6']
};if(painAreas.length){const blocked=new Set(painAreas.flatMap(a=>risky[a]||[]));const safer=pool.filter(e=>!blocked.has(e.id));if(safer.length)pool=safer;}if(run==='long'||run==='recovery'||run==='hard')pool=pool.filter(e=>e.runningImpact!=='high'&&(run!=='recovery'||e.runningImpact!=='medium'));const score=(e:Exercise)=>e.muscles.reduce((s,m)=>s+(counts[m]||0),0)*2+(recent.includes(e.id)?5:0)+e.difficulty+(Math.random()*2);return pool.sort((a,b)=>score(a)-score(b))[0]||exercises.find(e=>e.position.includes(position))!;}