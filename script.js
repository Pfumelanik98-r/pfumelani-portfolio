// Set current year
document.addEventListener('DOMContentLoaded', function(){
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;

  // Theme toggle: persist in localStorage
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved) root.setAttribute('data-theme', saved);
  toggle && toggle.addEventListener('click', function(){
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current === 'dark' ? 'dark' : '');
    localStorage.setItem('theme', current === 'dark' ? 'dark' : '');
    toggle.textContent = current === 'dark' ? '☀️' : '🌙';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  })
});

// Additional interactions
document.addEventListener('DOMContentLoaded', function(){
  // Project filtering
  const filters = document.querySelectorAll('.project-filters button');
  const projects = document.querySelectorAll('.project');
  filters.forEach(btn=>btn.addEventListener('click', function(){
    filters.forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const f = this.dataset.filter;
    projects.forEach(p=>{
      if(f==='all' || p.dataset.type === f) p.style.display = '';
      else p.style.display = 'none';
    })
  }));

  // Back to top
  const back = document.getElementById('backToTop');
  window.addEventListener('scroll', function(){
    if(window.scrollY>400) back.style.display = 'block'; else back.style.display = 'none';
  });
  back && back.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Simple typing animation for headline
  const headline = document.querySelector('.headline');
  if(headline){
    const text = headline.textContent;
    headline.textContent = '';
    let i=0;
    const t = setInterval(()=>{
      headline.textContent += text.charAt(i);
      i++;
      if(i>=text.length) clearInterval(t);
    },20);
  }

  // Contact form placeholder submit (no backend)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      if(!name || !email){
        alert('Please enter name and email.');
        return;
      }
      alert('Thanks '+name+' — message saved locally. Implement server endpoint to send emails.');
      form.reset();
    })
  }

  // CV download fallback: if cv.pdf not present, link to LinkedIn
  const cv = document.getElementById('download-cv');
  if(cv){
    fetch('cv.pdf', {method:'HEAD'}).then(r=>{ if(!r.ok) cv.setAttribute('href','https://linkedin.com/in/pfumelani-rikhotso?utm_source=chatgpt.com'); }).catch(()=>{cv.setAttribute('href','https://linkedin.com/in/pfumelani-rikhotso?utm_source=chatgpt.com')});
  }
});
