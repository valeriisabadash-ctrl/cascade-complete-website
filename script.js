const businessPhone = '(971) 344-1026';
const businessEmail = 'quotes@cascadecleaningpdx.com';

(function makeSteam(){
  const field = document.getElementById('steamField');
  if (!field || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 14; i++) {
    const s = document.createElement('div');
    s.className = 'steam';
    const size = 40 + Math.random() * 120;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDuration = 9 + Math.random() * 10 + 's';
    s.style.animationDelay = Math.random() * -18 + 's';
    field.appendChild(s);
  }
})();

function sendQuote(){
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const service = document.getElementById('f-service').value;
  const city = document.getElementById('f-city').value.trim();
  const message = document.getElementById('f-msg').value.trim();

  if (!name || !phone) {
    alert('Add your name and phone so the team can reach you.');
    return;
  }

  const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nCity: ${city || 'Not provided'}\nService: ${service}\n\nDetails:\n${message || 'Not provided'}`);
  window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent('Free Estimate Request - ' + service)}&body=${body}`;
}

function toggleChat(){
  const panel = document.getElementById('chatPanel');
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) document.getElementById('chatInput').focus();
}

function quickAsk(question){
  document.getElementById('chatInput').value = question;
  sendChat();
}

function addMsg(text, who){
  const body = document.getElementById('chatBody');
  const div = document.createElement('div');
  div.className = 'msg ' + who;
  div.textContent = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function botReply(raw){
  const text = raw.toLowerCase();
  const quoteLine = `For a free estimate, call ${businessPhone} or use the quote form on this page.`;

  if (text.includes('price') || text.includes('cost') || text.includes('how much')) {
    return 'Pricing depends on the service, square footage, stain level, access, and job type. ' + quoteLine;
  }
  if (text.includes('pet') || text.includes('urine') || text.includes('odor') || text.includes('smell')) {
    return 'Yes. Pet stain and odor removal is available with enzyme treatment and hot-water extraction to target the source instead of masking it. ' + quoteLine;
  }
  if (text.includes('commercial') || text.includes('office') || text.includes('warehouse') || text.includes('janitorial')) {
    return 'Yes. Cascade handles commercial janitorial, office cleans, warehouse floor care, post-construction cleanup, and recurring contracts. ' + quoteLine;
  }
  if (text.includes('area') || text.includes('serve') || text.includes('location') || text.includes('city')) {
    return 'Service areas include Gresham, Portland, Troutdale, Fairview, Wood Village, Happy Valley, Clackamas, Sandy, Damascus, Milwaukie, and the Portland metro.';
  }
  if (text.includes('dry') || text.includes('drying')) {
    return 'Carpets can dry in as little as 4 hours with the Dry-Master system. Dry time depends on airflow, humidity, and carpet condition.';
  }
  if (text.includes('tile') || text.includes('grout')) {
    return 'Tile and grout cleaning is available using high-heat steam and extraction to lift grime from grout lines. ' + quoteLine;
  }
  if (text.includes('window') || text.includes('pressure')) {
    return 'Yes. Window cleaning and pressure washing are available for homes, storefronts, offices, and commercial properties. ' + quoteLine;
  }

  return 'Cascade can help with carpet, upholstery, tile and grout, rugs, pet odor, commercial janitorial, post-construction cleaning, windows, and pressure washing. What service do you need and what city is the job in?';
}

function sendChat(){
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  const quick = document.getElementById('chatQuick');
  if (quick) quick.style.display = 'none';
  addMsg(text, 'user');
  setTimeout(() => addMsg(botReply(text), 'bot'), 300);
}
