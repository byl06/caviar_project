const $=s=>document.querySelector(s),root=document.documentElement;root.classList.add('js');
try{const t=localStorage.getItem('theme');if(t)root.dataset.theme=t}catch(e){}
$('#theme').onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}};
$('.burger').onclick=()=>$('.nav').classList.toggle('open');
const fmt=n=>n.toLocaleString('fr-FR').replace(/[\u202f\u00a0]/g,' ')+' F CFA';
const dishes=[
 {n:'Spaghetti Pomodoro',d:'Spaghetti al dente, sauce tomate fraîche, basilic, ail et parmesan râpé.',p:4000,c:'pates',i:1},
 {n:'Lasagnes aux fruits de mer',d:'Lasagnes aux crevettes, épinards et béchamel crémeuse, gratinées au four.',p:6500,c:'lasagnes',i:2},
 {n:'Lasagnes crevettes Alfredo',d:'Fines couches de lasagnes, crevettes, sauce Alfredo et gratin de fromage.',p:7000,c:'lasagnes',i:3},
 {n:'Rigatoni all’Amatriciana',d:'Rigatoni dans une sauce tomate relevée, piment, parmesan et basilic frais.',p:5500,c:'pates',i:4},
 {n:'Pappardelle al Ragù',d:'Larges pappardelle, ragù de viande mijoté, parmesan et feuilles de basilic.',p:6000,c:'pates',i:5}
];
const list=$('#dishes');
function render(c='all'){if(!list)return;list.innerHTML=dishes.filter(x=>c==='all'||x.c===c).map(x=>`<li class="dish card"><div class="ph"><img src="images/dish${x.i}.jpg" alt="${x.n}"></div><div><h3>${x.n}</h3><p>${x.d}</p></div><span class="price">${fmt(x.p)}</span></li>`).join('')}
render();if($('#cat'))$('#cat').onchange=e=>{render(e.target.value);reveal()};
const R=[['“Un cadre cosy, un accueil chaleureux.”','“Cosy, assez calme, superbe hygiène, accueil chaleureux. J’y suis allé près d’une dizaine de fois avec ma conjointe. Zéro déception.”'],['“Beau cadre, belle ambiance.”','“Beau cadre, bel accueil et belle ambiance. Rapidité dans le service. Bravo à l’équipe !”'],['“Une cuisine vraiment très bonne.”','“J’ai énormément apprécié cet endroit. La nourriture y est vraiment très bonne et le cadre est super beau. Je recommande !”']];
let k=0;const go=n=>{k=(n+R.length)%R.length;const q=$('.quote');q.classList.add('swap');setTimeout(()=>{$('#qt').textContent=R[k][0];$('#qp').textContent=R[k][1];q.classList.remove('swap')},260)};
if($('.next')){$('.next').onclick=()=>go(k+1);$('.prev').onclick=()=>go(k-1)}
const f=$('#form');if(f){f.date.min=new Date().toISOString().split('T')[0];
 f.onsubmit=e=>{e.preventDefault();const m=$('#msg');
  if(!f.nom.value.trim()||!f.tel.value.trim()||!f.pers.value||!f.date.value||!f.heure.value){m.textContent='Merci de remplir les champs obligatoires.';return}
  const t=encodeURIComponent(`Bonjour, je souhaite réserver une table.\nNom : ${f.nom.value}\nPersonnes : ${f.pers.value}\nDate : ${f.date.value}\nHeure : ${f.heure.value}`);
  m.textContent='Ouverture de WhatsApp pour confirmer…';window.open('https://wa.me/2290191114848?text='+t,'_blank');f.reset()}}

// animations
const sc=$('.scroll'),mob=matchMedia('(max-width:900px)');
let io;
function reveal(){
 if(io)io.disconnect();
 io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{root:mob.matches?null:sc,threshold:.08,rootMargin:'0px 0px -4% 0px'});
 const els=[...document.querySelectorAll('.scroll>*:not(ul),.scroll .dish,.scroll form>*')];
 els.forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=(Math.min(i,8)*70)+'ms';io.observe(el)});
}
if(sc)reveal();
// rating counter
const n=$('.note');if(n){const t=4.7,s=performance.now();(function f(now){const p=Math.min((now-s-700)/1100,1);if(p<0){n.textContent='0,0';return requestAnimationFrame(f)}n.textContent=(t*(1-Math.pow(1-p,3))).toFixed(1).replace('.',',');if(p<1)requestAnimationFrame(f)})(s)}
// page transitions
document.addEventListener('click',e=>{const a=e.target.closest('a[href$=".html"]');if(!a||a.target||e.metaKey||e.ctrlKey)return;e.preventDefault();document.body.classList.add('leave');setTimeout(()=>location.href=a.href,300)});
addEventListener('pageshow',()=>document.body.classList.remove('leave'));
