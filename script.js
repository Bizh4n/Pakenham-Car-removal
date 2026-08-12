
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

document.querySelectorAll('.menu-toggle').forEach(menuBtn => {
  const nav = menuBtn.closest('.nav-wrap')?.querySelector('.nav');
  if (!nav) return;
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
});

// Forms submit normally to FormSubmit so enquiries reach the business email.
// SMS cannot be sent silently by a static website; the mobile browser requires
// the visitor to open their messaging app and press Send.
document.querySelectorAll('.lead-form').forEach(form => {
  const helper = document.createElement('button');
  helper.type = 'button';
  helper.className = 'sms-both-link';
  helper.textContent = 'Prefer SMS? Text this quote';
  helper.addEventListener('click', () => {
    const data = new FormData(form);
    const service = data.get('service') || 'Car Removal';
    const name = data.get('name') || '';
    const phone = data.get('phone') || '';
    const vehicle = data.get('vehicle') || '';
    const condition = data.get('condition') || '';
    const suburb = data.get('suburb') || '';
    const body =
`Hi Pakenham Car Removal, I'd like a quote.
Service: ${service}
Name: ${name}
My phone: ${phone}
Vehicle: ${vehicle}
Condition: ${condition}
Pickup suburb: ${suburb}`;

    // Multiple-recipient SMS support varies by device/browser.
    // On supported phones this addresses both business numbers.
    const recipients = '0451756048,0481823119';
    const isApple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
    const sep = isApple ? '&' : '?';
    window.location.href = `sms:${recipients}${sep}body=${encodeURIComponent(body)}`;
  });
  const small = form.querySelector('small');
  if (small) small.insertAdjacentElement('afterend', helper);
  else form.appendChild(helper);
});
