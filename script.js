/* =================================================================
   Deck controller: scaling, navigation, keyboard, fullscreen
   ================================================================= */
(function(){
  const deck    = document.getElementById('deck');
  const slides  = Array.from(document.querySelectorAll('.slide'));
  const total   = slides.length;
  const curEl   = document.getElementById('cur');
  const totalEl = document.getElementById('total');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const fsBtn   = document.getElementById('fs');
  const progress= document.getElementById('progress');

  let index = 0;

  totalEl.textContent = total;

  // ---- generative grid signature (cover + closing slide) ----
  document.querySelectorAll('.gen-field').forEach(genField => {
    for(let i=0;i<99;i++){
      const cell=document.createElement('div');
      cell.className='gen-cell'+(Math.random()<.22?' on':'');
      cell.style.animationDelay=(Math.random()*5).toFixed(2)+'s';
      genField.appendChild(cell);
    }
  });

  // ---- fit deck to viewport (contain) ----
  function fit(){
    const W = deck.offsetWidth  || 1280;
    const H = deck.offsetHeight || 720;
    const scale = Math.min(window.innerWidth / W, window.innerHeight / H);
    deck.style.setProperty('--scale', scale);
  }
  window.addEventListener('resize', fit);
  fit();

  // ---- show a slide ----
  function show(i){
    index = Math.max(0, Math.min(total-1, i));
    slides.forEach((s,n)=>s.classList.toggle('is-active', n===index));
    curEl.textContent = index+1;
    progress.style.width = ((index+1)/total*100)+'%';
    prevBtn.disabled = index===0;
    nextBtn.disabled = index===total-1;
    prevBtn.style.opacity = index===0 ? .35 : 1;
    nextBtn.style.opacity = index===total-1 ? .35 : 1;
  }
  const next = ()=>show(index+1);
  const prev = ()=>show(index-1);

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  // ---- keyboard ----
  window.addEventListener('keydown', e=>{
    if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){e.preventDefault();next();}
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();prev();}
    else if(e.key==='Home'){show(0);}
    else if(e.key==='End'){show(total-1);}
    else if(e.key==='f'||e.key==='F'){toggleFs();}
  });

  // ---- fullscreen ----
  function toggleFs(){
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen?.();
    }else{
      document.exitFullscreen?.();
    }
  }
  fsBtn.addEventListener('click', toggleFs);
  document.addEventListener('fullscreenchange', ()=>{ setTimeout(fit,60); });

  // ---- basic swipe (touch) ----
  let x0=null;
  window.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
  window.addEventListener('touchend',e=>{
    if(x0===null)return;
    const dx=e.changedTouches[0].clientX-x0;
    if(Math.abs(dx)>50){ dx<0 ? next() : prev(); }
    x0=null;
  },{passive:true});

  // ---- inline pagers (e.g. "Princípios" slide) ----
  document.querySelectorAll('.principles-pager').forEach(pager=>{
    const cards   = Array.from(pager.querySelectorAll('.principle-card'));
    const dots    = Array.from(pager.querySelectorAll('.principles-pager__dot'));
    const pPrev   = pager.querySelector('.principles-pager__arrow--prev');
    const pNext   = pager.querySelector('.principles-pager__arrow--next');
    let pIndex = 0;
    function renderPager(){
      cards.forEach((c,n)=>c.classList.toggle('is-active', n===pIndex));
      dots.forEach((d,n)=>d.classList.toggle('is-active', n===pIndex));
      pPrev.disabled = pIndex===0;
      pNext.disabled = pIndex===cards.length-1;
    }
    pPrev.addEventListener('click', ()=>{ if(pIndex>0){ pIndex--; renderPager(); } });
    pNext.addEventListener('click', ()=>{ if(pIndex<cards.length-1){ pIndex++; renderPager(); } });
    dots.forEach((d,n)=>d.addEventListener('click', ()=>{ pIndex=n; renderPager(); }));
    renderPager();
  });

  // ---- deep-link via #hash (e.g. #4) ----
  const fromHash = parseInt(location.hash.replace('#',''),10);
  show(Number.isFinite(fromHash) ? fromHash-1 : 0);
  window.addEventListener('hashchange',()=>{
    const h=parseInt(location.hash.replace('#',''),10);
    if(Number.isFinite(h)) show(h-1);
  });
})();
