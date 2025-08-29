/* facilities.js — improved: counter animation fixed, event filters, form UX (no cancel), modal handling */
document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const facilityDetailsModal = document.getElementById('facilityDetailsModal');
  const facilityDetailContent = document.getElementById('facilityDetailContent');
  const bookingModal = document.getElementById('bookingModal');
  const enrollModal = document.getElementById('enrollModal');
  const bookingForm = document.getElementById('bookingForm');
  const enrollForm = document.getElementById('enrollForm');
  const openBookingPrimary = document.getElementById('openBookingPrimary');
  const openEnroll = document.getElementById('openEnroll');
  const facilitySelect = document.getElementById('facilitySelect');
  const dateInput = document.getElementById('date');
  const footerYear = document.getElementById('year');

  // Footer year
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // Date min
  if (dateInput) {
    const t = new Date();
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, '0');
    const dd = String(t.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // Simple toast
  function showToast(msg, timeout = 2600) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    Object.assign(t.style, { position:'fixed', right:'20px', bottom:'20px', background:'rgba(20,184,166,0.95)', color:'#fff', padding:'10px 14px', borderRadius:'10px', zIndex:99999 });
    document.body.appendChild(t);
    setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateY(8px)'; }, timeout);
    setTimeout(()=> t.remove(), timeout + 380);
  }

  // Modal open/close
  function openModal(modal, opener) {
    if (!modal) return;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    modal.dataset.openerId = opener && opener.id ? opener.id : '';
    setTimeout(()=> {
      const f = modal.querySelector('input, select, textarea, button, [tabindex]:not([tabindex="-1"])');
      if (f) f.focus();
    }, 40);
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow='';
    const id = modal.dataset.openerId; if (id) { const op = document.getElementById(id); if (op) op.focus(); }
  }

  // Close buttons & outside click
  document.querySelectorAll('.modal').forEach(m => {
    m.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', () => closeModal(m)));
    m.addEventListener('click', e => { if (e.target === m) closeModal(m); });
  });

  // Wire CTAs
  if (openBookingPrimary) openBookingPrimary.addEventListener('click', e => openModal(bookingModal, e.currentTarget));
  if (openEnroll) openEnroll.addEventListener('click', e => openModal(enrollModal, e.currentTarget));

  // Facility detail mapping
  const DETAILS = {
    gym: { title:'Modern Gym', body:'<p>Functional rigs, free weights, cardio zones and coach support.</p>' },
    pool: { title:'Olympic Pool', body:'<p>50m lanes, coaching lanes and timing systems.</p>' },
    courts: { title:'Indoor Courts', body:'<p>Multipurpose courts for basketball, volleyball and badminton.</p>' },
    recovery: { title:'Recovery Suite', body:'<p>Sauna, ice baths, physio rooms and recovery tech.</p>' }
  };

  // Details button
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.facility-card') || e.currentTarget.closest('.card');
      const key = card && card.dataset.key;
      let html = '<p>Details not available.</p>';
      if (key && DETAILS[key]) {
        html = `<h2 id="facilityTitle">${DETAILS[key].title}</h2>${DETAILS[key].body}
          <div style="margin-top:12px;"><button class="learn-more-btn book-from-detail">Book this facility</button></div>`;
      }
      facilityDetailContent.innerHTML = html;
      openModal(facilityDetailsModal, e.currentTarget);

      const bookFrom = facilityDetailsModal.querySelector('.book-from-detail');
      if (bookFrom) bookFrom.addEventListener('click', () => {
        closeModal(facilityDetailsModal);
        openModal(bookingModal, bookFrom);
        setTimeout(() => { if (facilitySelect && key) facilitySelect.value = key; }, 60);
      }, { once: true });
    });
  });

  // Book buttons
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.facility-card') || e.currentTarget.closest('.card');
      const key = card && card.dataset.key;
      openModal(bookingModal, e.currentTarget);
      setTimeout(() => { if (facilitySelect && key) facilitySelect.value = key; }, 60);
    });
  });

  // Form helpers (inline errors)
  function showFieldError(input, msg) {
    if (!input) return;
    clearFieldError(input);
    input.classList.add('input-error');
    const parent = input.closest('label');
    if (!parent) return;
    const el = document.createElement('div'); el.className = 'field-error'; el.textContent = msg;
    parent.appendChild(el);
  }
  function clearFieldError(input) {
    if (!input) return;
    input.classList.remove('input-error');
    const parent = input.closest('label');
    if (!parent) return;
    parent.querySelectorAll('.field-error').forEach(n => n.remove());
  }

  // Booking validation + demo submit
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const facility = bookingForm.facility;
      const date = bookingForm.date;
      const time = bookingForm.time;
      [facility, date, time].forEach(clearFieldError);
      let ok = true;
      if (!facility || !facility.value) { showFieldError(facility, 'Select a facility'); ok = false; }
      if (!date || !date.value) { showFieldError(date, 'Pick a date'); ok = false; }
      if (!time || !time.value) { showFieldError(time, 'Pick a time'); ok = false; }
      if (!ok) { showToast('Please fix the errors'); return; }

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      submitBtn && (submitBtn.disabled = true);
      setTimeout(() => {
        const data = {
          facility: facility.value, date: date.value, time: time.value,
          duration: bookingForm.duration.value, createdAt: new Date().toISOString()
        };
        const arr = JSON.parse(localStorage.getItem('bookings') || '[]'); arr.push(data); localStorage.setItem('bookings', JSON.stringify(arr));
        submitBtn && (submitBtn.disabled = false);
        bookingForm.reset(); closeModal(bookingModal); showToast('Booking confirmed (demo).');
      }, 600);
    });
    bookingForm.querySelectorAll('input, select').forEach(inp => inp.addEventListener('input', () => clearFieldError(inp)));
  }

  // Enroll validation + demo submit
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || ''); }
  if (enrollForm) {
    enrollForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = enrollForm.name, email = enrollForm.email, type = enrollForm.type;
      [name, email, type].forEach(clearFieldError);
      let ok = true;
      if (!name || !name.value.trim()) { showFieldError(name, 'Enter your full name'); ok = false; }
      if (!email || !isEmail(email.value)) { showFieldError(email, 'Enter a valid email'); ok = false; }
      if (!type || !type.value) { showFieldError(type, 'Select a type'); ok = false; }
      if (!ok) { showToast('Please fix errors'); return; }

      const submitBtn = enrollForm.querySelector('button[type="submit"]');
      submitBtn && (submitBtn.disabled = true);
      setTimeout(() => {
        const data = { name: name.value.trim(), email: email.value.trim(), type: type.value, createdAt: new Date().toISOString() };
        const arr = JSON.parse(localStorage.getItem('enrollments') || '[]'); arr.push(data); localStorage.setItem('enrollments', JSON.stringify(arr));
        submitBtn && (submitBtn.disabled = false);
        enrollForm.reset(); closeModal(enrollModal); showToast('Enrollment submitted (demo).');
      }, 600);
    });
    enrollForm.querySelectorAll('input, select').forEach(inp => inp.addEventListener('input', () => clearFieldError(inp)));
  }

  // Event filters
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('.events-grid .event-card').forEach(card => {
        if (cat === 'all' || card.dataset.type === cat) card.style.display = '';
        else card.style.display = 'none';
      });
    });
  });

  // Counter animation (fixed): robust intersection observer + requestAnimationFrame easing
  function animateNumber(el, target) {
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('.number[data-target]');
  if (counterEls.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = Number(el.dataset.target) || 0;
          animateNumber(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.35 }); // fire when ~35% visible
    counterEls.forEach(el => obs.observe(el));
  }

  // Global Escape closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(m => closeModal(m));
  });
});
