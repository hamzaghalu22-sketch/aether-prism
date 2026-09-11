const menuToggle=document.getElementById('menuToggle');
const mobileMenu=document.getElementById('mobileMenu');
if(menuToggle)menuToggle.addEventListener('click',()=>mobileMenu.classList.toggle('open'));

document.querySelectorAll('.nav-links a,.mobile-menu a').forEach(link=>{
  link.addEventListener('click',e=>{
    const href=link.getAttribute('href');
    if(href&&href.startsWith('#')){
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({behavior:'smooth'});
      mobileMenu?.classList.remove('open');
    }
  });
});

window.addEventListener('scroll',()=>{
  const s=document.documentElement.scrollTop;
  const h=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  const bar=document.getElementById('progressBar');
  if(bar) bar.style.width=(s/h)*100+'%';
  const nav=document.getElementById('navbar');
  if(nav) nav.style.background=s>40?'rgba(5,5,5,0.95)':'rgba(5,5,5,0.8)';
});

// UNIFIED VIEWPORT + COUNTER + IMPACT BAR
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');

      // Counter
      entry.target.querySelectorAll?.('.counter:not(.counted)').forEach(c=>{
        c.classList.add('counted');
        const target=parseFloat(c.dataset.target);
        const suffix=c.dataset.suffix||''; const prefix=c.dataset.prefix||'';
        let cur=0; const inc=target/60; const isFloat=target%1!==0;
        const upd=()=>{cur+=inc; if(cur<target){c.textContent=prefix+(isFloat?cur.toFixed(2):Math.floor(cur))+suffix;requestAnimationFrame(upd);}else{c.textContent=prefix+target+suffix;}};
        upd();
      });

      // Impact bars - FIXED INSIDE OBSERVER
      entry.target.querySelectorAll?.('.impact-fill').forEach(b=>{
        b.style.setProperty('--w', b.dataset.width+'%');
        setTimeout(()=>b.style.width=b.dataset.width+'%',200);
      });
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal,.reveal-stagger,.telemetry,.portfolio,.about-grid,.contact-wrap,.impact-grid,.faq-grid').forEach(el=>obs.observe(el));

// active nav
const sections=document.querySelectorAll('section');
const navObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}});
},{threshold:0.6});
sections.forEach(s=>navObs.observe(s));

// form
const form=document.getElementById('contactForm');
if(form)form.addEventListener('submit',e=>{
  e.preventDefault();
  const btn=e.target.querySelector('button');
  btn.innerHTML='<span>signal transmitted âœ“</span>';
  setTimeout(()=>{btn.innerHTML='<span>transmit signal</span>';e.target.reset();},2500);
});




// FAQ ULTRA SIMPLE - NO CONFLICT
(function(){
  const qs = document.querySelectorAll('.faq-q');
  qs.forEach(b=>{
    b.addEventListener('click',()=>{
      const item = b.parentElement;
      const already = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(x=>x.classList.remove('active'));
      if(!already) item.classList.add('active');
    });
  });
})();
