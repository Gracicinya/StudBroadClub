// AI was fundamental to the implementation of this JS code
// My understanding how this code was used was also aided by AI

/* ====================================================
  REQUEST 1: Hamburger Menu
  ==================================================== */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav-menu');

if (hamburger && nav) {
  function closeMenu() {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    nav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      nav.querySelector('a')?.focus();
    } else {
      hamburger.focus();
    }
  });

  // Close menu when a nav link is clicked

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ====================================================
  REQUEST 2: Form Validation with Error Messages
  ==================================================== */
const applicationForm = document.getElementById('application-form');

if (applicationForm) {
  const validateForm = () => {
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const interestsInput = document.getElementById('interests'); 
    

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    document.querySelectorAll('.error-field').forEach(field => field.classList.remove('error-field'));

    // Validate name
    if (nameInput && nameInput.value.trim() === '') {
      isValid = false;
      showError(nameInput, 'Name is required');
    }

    // Validate email
    if (emailInput && emailInput.value.trim() === '') {
      isValid = false;
      showError(emailInput, 'Email is required');
    } else if (emailInput && !isValidEmail(emailInput.value)) {
      isValid = false;
      showError(emailInput, 'Please enter a valid email address');
    }

    // Validate interests
    if (interestsInput && interestsInput.value.trim() === '') {
    isValid = false;
    showError(interestsInput, 'Please tell us about your interests');
    } else if (interestsInput && interestsInput.value.trim().length < 10) {
    isValid = false;
    showError(interestsInput, 'Please write at least 10 characters');
    }
    return isValid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showError = (field, message) => {
    field.classList.add('error-field');
    const errorMsg = document.createElement('span');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    field.parentNode.insertBefore(errorMsg, field.nextSibling);
  };

  // Clear error on input
  applicationForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      const errorMsg = field.parentNode.querySelector('.error-message');
      if (errorMsg) errorMsg.remove();
      field.classList.remove('error-field');
    });
  });

  applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      const existing = applicationForm.querySelector('.form-success');
      if (existing) existing.remove();
      const successMsg = document.createElement('div');
      successMsg.className = 'form-success';
      successMsg.textContent = "Thanks! We'll get back to you soon.";
      applicationForm.insertBefore(successMsg, applicationForm.firstChild);
      applicationForm.reset();
      setTimeout(() => successMsg.remove(), 3000);
    }
  });
}

/* ====================================================
  REQUEST 3: Back to Top Button
   ==================================================== */
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ====================================================
  REQUEST 4: Dynamic Content Rendering
  REQUEST 6: Live Filtering by Category
   ==================================================== */
const roles = [
  {
    name: "Director / Producer",
    category: "production",
    description: "Oversee the creative vision and production process.",
    details: "Plan and coordinate projects, manage teams, and ensure the final product meets the club's standards."
  },
  {
    name: "Cinematographer / Camera Operator",
    category: "production",
    description: "Handle the camera work and visual storytelling.",
    details: "Capture the action, frame the shots, and work closely with the director to bring the vision to life."
  },
  {
    name: "Editor",
    category: "post-production",
    description: "Assemble and edit footage into a polished final product.",
    details: "Use editing software to cut, arrange, and enhance footage by adding effects, music, and sound."
  },
  {
    name: "Audio Engineer",
    category: "audio",
    description: "Manage the audio aspects of productions.",
    details: "Record, mix, and enhance audio to ensure clear and high-quality sound in all broadcasts and productions."
  },
  {
    name: "Livestream Technician",
    category: "production",
    description: "Set up and manage live broadcasts.",
    details: "Handle the technical aspects of livestreaming, including equipment setup, managing feeds, and troubleshooting."
  },
  {
    name: "Graphic Designer",
    category: "post-production",
    description: "Create visual content for broadcasts, events, and social media.",
    details: "Design promotional materials, graphics, and branding elements to support the club's activities."
  },
  {
    name: "Social Media Manager",
    category: "marketing",
    description: "Manage the club's social media presence.",
    details: "Create and schedule posts, engage with followers, and promote club activities on various platforms."
  },
  {
    name: "Scriptwriter",
    category: "pre-production",
    description: "Write scripts for films, documentaries, and other productions.",
    details: "Develop compelling narratives and dialogue that align with the club's vision and goals."
  },
  {
    name: "On Air Talent",
    category: "production",
    description: "Participate in live broadcasts and events.",
    details: "Act as a host, anchor, or guest on live shows and events, bringing energy and personality to the broadcast."
  },
  {
    name: "Podcast Producer",
    category: "audio",
    description: "Produce and edit podcast episodes.",
    details: "Plan episode structure, conduct interviews, edit audio, and publish episodes to streaming platforms."
  }
];

function capitalize(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const filterBar = document.getElementById('role-filters');
const container = document.getElementById('dynamic-roles');

if (filterBar && container && roles.length > 0) {
  const categories = ['all', ...new Set(roles.map(r => r.category))];

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === 'all' ? ' active' : '');
    btn.textContent = cat === 'all' ? 'All Roles' : capitalize(cat);
    btn.dataset.filter = cat;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRoles(cat);
    });
    filterBar.appendChild(btn);
  });

  function renderRoles(filter) {
    container.innerHTML = '';

    const filtered = filter === 'all' ? roles : roles.filter(r => r.category === filter);

    if (filtered.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'no-roles';
      empty.textContent = 'No roles found for this category.';
      container.appendChild(empty);
      return;
    }

    const ul = document.createElement('ul');
    ul.className = 'cards';

    filtered.forEach(role => {
      const li = document.createElement('li');
      li.className = 'role-card';

      const h3 = document.createElement('h3');
      h3.className = 'role-name';
      h3.textContent = role.name;

      const desc = document.createElement('p');
      desc.className = 'role-description';
      desc.textContent = role.description;

      const details = document.createElement('p');
      details.className = 'role-details';
      details.textContent = role.details;

      const badge = document.createElement('span');
      badge.className = 'role-badge';
      badge.textContent = capitalize(role.category);

      li.appendChild(h3);
      li.appendChild(desc);
      li.appendChild(details);
      li.appendChild(badge);
      ul.appendChild(li);
    });

    container.appendChild(ul);
  }
    renderRoles('all');  
}

/* ====================================================
  REQUEST 5: Tabbed Content
  ==================================================== */
const tabBtns = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab');

if (tabBtns.length > 0 && tabPanes.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabPanes.forEach(pane => pane.classList.remove('active'));
      const tabId = btn.dataset.tab;
      const activePane = document.getElementById(tabId);
      if (activePane) activePane.classList.add('active');
    });
  });
  tabBtns[0].click();
}

/* ====================================================
  REQUEST 7: Fetch Quote from Quotable API
  Heavy AI Usage
  ==================================================== */
const quoteText   = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const refreshBtn  = document.getElementById('refresh-quote');

if (quoteText && quoteAuthor && refreshBtn) {
  async function fetchQuote() {
    quoteText.textContent = 'Loading quote...';
    quoteText.className = 'quote-loading';
    quoteAuthor.textContent = '';
    refreshBtn.disabled = true;

    // Anthropic Claude AI was used to format the code for inserting a proper quote
    // Before and whilst consulting Claude AI, none of what I tried to make this quote work was working
    // Had to use dummy.json.com because all else that I tried failed
    try {
      const res = await fetch('https://dummyjson.com/quotes/random');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      quoteText.textContent = `"${data.quote}"`;
      quoteText.className = '';
      quoteAuthor.textContent = `— ${data.author}`;
    } catch (err) {
      quoteText.textContent = 'Could not load a quote right now. Please try again later!';
      quoteText.className = 'quote-error';
      quoteAuthor.textContent = '';
    } finally {
      refreshBtn.disabled = false;
      quoteText.classList.remove('quote-loading');
    }
  }
  
  fetchQuote();
  refreshBtn.addEventListener('click', fetchQuote);
}
