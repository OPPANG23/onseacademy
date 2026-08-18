(() => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  const toast = document.getElementById('toast');
  const form = document.getElementById('contact-form-element');
  const formNote = document.getElementById('form-note');

  const setHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  const setMenu = (open) => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  mobileLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMenu(false);
  });

  const revealItems = document.querySelectorAll('.reveal, .image-reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealItems.forEach(el => observer.observe(el));

  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', () => {
      const message = button.dataset.videoMessage || 'Add a local video file here.';
      showToast(message);
    });
  });

  form?.addEventListener('submit', e => {
    e.preventDefault();
    form.reset();
    formNote.textContent = 'Inquiry captured locally. Connect this form to your preferred email or form service before launch.';
    showToast('Thanks — your inquiry form is ready to be connected.');
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3600);
  }

  // Add stagger to nearby reveal elements without requiring a library.
  document.querySelectorAll('.why-list, .benefit-grid, .steps, .faq-list, .event-list').forEach(group => {
    [...group.children].forEach((child, index) => {
      if (child.classList.contains('reveal')) {
        child.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;
      }
    });
  });
})();
