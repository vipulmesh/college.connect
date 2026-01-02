/* ============================================
   SponsorLink - JavaScript
   College Club Sponsorship Platform
   ============================================ */

// ============================================
// DATA MANAGEMENT
// ============================================

const STORAGE_KEY = 'College.connect_events';

// Initial dummy data
const initialEvents = [
  {
    id: '1',
    name: 'TechFest 2024',
    description: 'Annual technology festival featuring hackathons, workshops, and tech talks from industry leaders.',
    date: '2024-03-15',
    clubName: 'Computer Science Society',
    expectedAudience: 500,
    sponsorshipGoal: 5000,
    sponsorshipRaised: 3200,
    benefits: 'Logo on banners, Stage mention, Booth space, Social media promotion',
    status: 'approved',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Cultural Night',
    description: 'A celebration of diversity with performances, food stalls, and art exhibitions.',
    date: '2024-04-20',
    clubName: 'International Students Association',
    expectedAudience: 800,
    sponsorshipGoal: 8000,
    sponsorshipRaised: 4500,
    benefits: 'Naming rights, VIP seating, Product sampling, Brand activation zone',
    status: 'approved',
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Startup Summit',
    description: 'Connect with aspiring entrepreneurs, pitch competitions, and networking sessions.',
    date: '2024-05-10',
    clubName: 'Entrepreneurship Club',
    expectedAudience: 300,
    sponsorshipGoal: 10000,
    sponsorshipRaised: 2000,
    benefits: 'Keynote speaking slot, Judging panel seat, Exclusive networking dinner',
    status: 'pending',
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'Sports Carnival',
    description: 'Inter-college sports competition with various athletic events.',
    date: '2024-06-05',
    clubName: 'Athletics Club',
    expectedAudience: 1200,
    sponsorshipGoal: 15000,
    sponsorshipRaised: 0,
    benefits: 'Jersey branding, Stadium banners, Award ceremony presence, Live stream ads',
    status: 'pending',
    createdAt: '2024-01-25',
  },
];

// Get events from localStorage
function getEvents() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with dummy data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEvents));
  return initialEvents;
}

// Save events to localStorage
function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

// Add a new event
function addEvent(eventData) {
  const events = getEvents();
  const newEvent = {
    ...eventData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
    status: 'pending',
    sponsorshipRaised: 0,
  };
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
}

// Update event status
function updateEventStatus(id, status) {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index !== -1) {
    events[index].status = status;
    saveEvents(events);
  }
}

// Sponsor an event
function sponsorEvent(id, amount) {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index !== -1) {
    events[index].sponsorshipRaised += amount;
    saveEvents(events);
  }
}

// Get statistics
function getStats() {
  const events = getEvents();
  return {
    totalEvents: events.length,
    pendingEvents: events.filter(e => e.status === 'pending').length,
    approvedEvents: events.filter(e => e.status === 'approved').length,
    totalFundsRequested: events.reduce((sum, e) => sum + e.sponsorshipGoal, 0),
    totalFundsRaised: events.reduce((sum, e) => sum + e.sponsorshipRaised, 0),
  };
}

// ============================================
// ICONS (SVG strings)
// ============================================

const icons = {
  zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  megaphone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
  handshake: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  building: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
  trendingUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  target: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  calendarPlus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><line x1="19" x2="19" y1="16" y2="22"/><line x1="16" x2="22" y1="19" y2="19"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  dollarSign: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Format currency
function formatCurrency(amount) {
  return '$' + amount.toLocaleString();
}

// Show toast notification
function showToast(title, message, type = 'success') {
  const container = document.getElementById('toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-title">${title}</div>
    <div class="toast-message">${message}</div>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

// ============================================
// COMPONENT GENERATORS
// ============================================

// Generate event card HTML
function generateEventCard(event, variant = 'default') {
  const progressPercent = Math.min((event.sponsorshipRaised / event.sponsorshipGoal) * 100, 100);
  
  let actions = '';
  if (variant === 'sponsor' && event.status === 'approved') {
    actions = `
      <button class="btn btn-accent btn-block" onclick="openSponsorModal('${event.id}')">Sponsor Now</button>
      <button class="btn btn-secondary btn-block interested-btn" onclick="toggleInterestedForm('${event.id}')" style="margin-top: 0.5rem;">
        ${icons.handshake} Interested
      </button>
      <div class="interested-form-dropdown" id="interested-form-${event.id}">
        <div class="interested-form-content">
          <h4 class="interested-form-title">Contact Club</h4>
          <p class="interested-form-subtitle">Send a message before sponsoring</p>
          <div class="form-group">
            <label class="form-label">Your Name</label>
            <input type="text" class="form-input" id="interested-name-${event.id}" placeholder="Enter your name">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="interested-email-${event.id}" placeholder="Enter your email">
          </div>
          <div class="form-group">
            <label class="form-label">Message</label>
            <textarea class="form-textarea" id="interested-message-${event.id}" rows="3" placeholder="Tell the club about your interest..."></textarea>
          </div>
          <button class="btn btn-hero btn-block" onclick="submitInterestedForm('${event.id}')">
            Connect
          </button>
        </div>
      </div>
    `;
  } else if (variant === 'admin' && event.status === 'pending') {
    actions = `
      <div class="event-actions">
        <button class="btn btn-success" style="flex: 1;" onclick="approveEvent('${event.id}')">Approve</button>
        <button class="btn btn-destructive" style="flex: 1;" onclick="rejectEvent('${event.id}')">Reject</button>
      </div>
    `;
  }
  
  return `
    <div class="card event-card">
      <div class="card-header-accent"></div>
      <div class="card-body">
        <div class="event-card-header">
          <span class="event-status ${event.status}">${event.status.charAt(0).toUpperCase() + event.status.slice(1)}</span>
          <span class="event-date-created">Created ${event.createdAt}</span>
        </div>
        
        <h3 class="event-title">${event.name}</h3>
        
        <div class="event-club">
          ${icons.building}
          <span>${event.clubName}</span>
        </div>
        
        <p class="event-description">${event.description}</p>
        
        <div class="event-meta">
          <div class="event-meta-item">
            <span class="primary">${icons.calendar}</span>
            <span>${formatDate(event.date)}</span>
          </div>
          <div class="event-meta-item">
            <span class="accent">${icons.users}</span>
            <span>${event.expectedAudience} expected</span>
          </div>
        </div>
        
        <div class="progress-section">
          <div class="progress-header">
            <div class="progress-label">
              ${icons.target}
              <span>Sponsorship Goal</span>
            </div>
            <span class="progress-amount">${formatCurrency(event.sponsorshipRaised)} / ${formatCurrency(event.sponsorshipGoal)}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercent}%"></div>
          </div>
          <p class="progress-percent">${progressPercent.toFixed(0)}% funded</p>
        </div>
        
        <div class="event-benefits">
          <p class="event-benefits-label">Sponsorship Benefits:</p>
          <p class="event-benefits-text">${event.benefits}</p>
        </div>
        
        ${actions}
      </div>
    </div>
  `;
}

// Generate stats card HTML
function generateStatsCard(title, value, iconName, variant = 'default', trend = null) {
  return `
    <div class="stats-card ${variant}">
      <div class="stats-card-content">
        <div>
          <p class="stats-title">${title}</p>
          <p class="stats-value">${value}</p>
          ${trend ? `<p class="stats-trend">${trend}</p>` : ''}
        </div>
        <div class="stats-icon ${variant}">
          ${icons[iconName] || icons.calendar}
        </div>
      </div>
    </div>
  `;
}

// ============================================
// PAGE-SPECIFIC FUNCTIONS
// ============================================

// CLUB DASHBOARD
let formOpen = false;

function toggleCreateForm() {
  formOpen = !formOpen;
  const form = document.getElementById('create-form');
  const toggleBtn = document.getElementById('toggle-form-btn');
  
  if (formOpen) {
    form.classList.add('open');
    toggleBtn.innerHTML = 'Cancel';
    toggleBtn.className = 'btn btn-secondary';
  } else {
    form.classList.remove('open');
    toggleBtn.innerHTML = `${icons.plus} New Event`;
    toggleBtn.className = 'btn btn-hero';
  }
}

function handleEventSubmit(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('event-name').value,
    clubName: document.getElementById('club-name').value,
    date: document.getElementById('event-date').value,
    expectedAudience: parseInt(document.getElementById('expected-audience').value) || 0,
    sponsorshipGoal: parseInt(document.getElementById('sponsorship-goal').value) || 0,
    benefits: document.getElementById('benefits').value,
    description: document.getElementById('description').value,
  };
  
  if (!formData.name || !formData.clubName || !formData.date) {
    showToast('Missing fields', 'Please fill in all required fields.', 'error');
    return;
  }
  
  addEvent(formData);
  
  // Reset form
  e.target.reset();
  toggleCreateForm();
  
  // Refresh events
  renderClubEvents();
  
  showToast('Event Created!', 'Your event has been submitted for approval.');
}

function renderClubEvents() {
  const events = getEvents();
  const container = document.getElementById('events-container');
  
  if (!container) return;
  
  if (events.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          ${icons.calendarPlus}
        </div>
        <h3 class="empty-title">No events yet</h3>
        <p class="empty-text">Create your first event to start attracting sponsors.</p>
        <button class="btn btn-hero" onclick="toggleCreateForm()">
          ${icons.plus} Create Event
        </button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="events-grid">
        ${events.map(event => generateEventCard(event, 'default')).join('')}
      </div>
    `;
  }
}

// SPONSOR DASHBOARD
let searchTerm = '';

function handleSearch(e) {
  searchTerm = e.target.value.toLowerCase();
  renderSponsorEvents();
}

function renderSponsorEvents() {
  const events = getEvents().filter(e => e.status === 'approved');
  const filtered = events.filter(e => 
    e.name.toLowerCase().includes(searchTerm) ||
    e.clubName.toLowerCase().includes(searchTerm)
  );
  
  const container = document.getElementById('events-container');
  const countEl = document.getElementById('events-count');
  
  if (!container) return;
  
  if (countEl) countEl.textContent = `${filtered.length} events available`;
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          ${icons.search}
        </div>
        <h3 class="empty-title">No events found</h3>
        <p class="empty-text">Try adjusting your search or check back later for new events.</p>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="events-grid">
        ${filtered.map(event => generateEventCard(event, 'sponsor')).join('')}
      </div>
    `;
  }
}

function renderSponsorStats() {
  const stats = getStats();
  const approvedEvents = getEvents().filter(e => e.status === 'approved').length;
  const container = document.getElementById('sponsor-stats');
  
  if (!container) return;
  
  const fundedPercent = stats.totalFundsRequested > 0 
    ? ((stats.totalFundsRaised / stats.totalFundsRequested) * 100).toFixed(0) 
    : 0;
  
  container.innerHTML = `
    ${generateStatsCard('Available Events', approvedEvents, 'building', 'primary')}
    ${generateStatsCard('Total Funds Requested', formatCurrency(stats.totalFundsRequested), 'dollarSign', 'accent')}
    ${generateStatsCard('Funds Raised So Far', formatCurrency(stats.totalFundsRaised), 'dollarSign', 'success', `${fundedPercent}% of goal`)}
  `;
}

let selectedEventId = null;

function openSponsorModal(eventId) {
  selectedEventId = eventId;
  const event = getEvents().find(e => e.id === eventId);
  
  if (!event) return;
  
  const modal = document.getElementById('sponsor-modal');
  const modalTitle = document.getElementById('modal-event-name');
  const modalClub = document.getElementById('modal-club-name');
  const modalGoal = document.getElementById('modal-goal');
  const modalRaised = document.getElementById('modal-raised');
  
  modalTitle.textContent = `Sponsor ${event.name}`;
  modalClub.textContent = `Support ${event.clubName} by contributing to their event.`;
  modalGoal.textContent = formatCurrency(event.sponsorshipGoal);
  modalRaised.textContent = formatCurrency(event.sponsorshipRaised);
  
  document.getElementById('sponsor-amount').value = '';
  modal.classList.add('open');
}

function closeSponsorModal() {
  document.getElementById('sponsor-modal').classList.remove('open');
  selectedEventId = null;
}

function confirmSponsorship() {
  const amount = parseInt(document.getElementById('sponsor-amount').value);
  
  if (!amount || amount <= 0) {
    showToast('Invalid amount', 'Please enter a valid sponsorship amount.', 'error');
    return;
  }
  
  const event = getEvents().find(e => e.id === selectedEventId);
  
  if (event) {
    sponsorEvent(selectedEventId, amount);
    closeSponsorModal();
    renderSponsorEvents();
    renderSponsorStats();
    showToast('Sponsorship Confirmed!', `You've contributed ${formatCurrency(amount)} to ${event.name}.`);
  }
}

// INTERESTED FORM FUNCTIONS
function toggleInterestedForm(eventId) {
  const form = document.getElementById(`interested-form-${eventId}`);
  
  // Close all other open forms first
  document.querySelectorAll('.interested-form-dropdown.open').forEach(openForm => {
    if (openForm.id !== `interested-form-${eventId}`) {
      openForm.classList.remove('open');
    }
  });
  
  // Toggle the clicked form
  if (form) {
    form.classList.toggle('open');
  }
}

function submitInterestedForm(eventId) {
  const name = document.getElementById(`interested-name-${eventId}`).value.trim();
  const email = document.getElementById(`interested-email-${eventId}`).value.trim();
  const message = document.getElementById(`interested-message-${eventId}`).value.trim();
  
  // Basic validation
  if (!name) {
    showToast('Missing Name', 'Please enter your name.', 'error');
    return;
  }
  
  if (!email) {
    showToast('Missing Email', 'Please enter your email.', 'error');
    return;
  }
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Invalid Email', 'Please enter a valid email address.', 'error');
    return;
  }
  
  if (!message) {
    showToast('Missing Message', 'Please enter a message.', 'error');
    return;
  }
  
  const event = getEvents().find(e => e.id === eventId);
  
  // In a real app, this would send to a backend
  // For demo, we'll store in localStorage and show success
  const inquiries = JSON.parse(localStorage.getItem('College.connect_inquiries') || '[]');
  inquiries.push({
    id: Date.now().toString(),
    eventId,
    eventName: event ? event.name : 'Unknown Event',
    clubName: event ? event.clubName : 'Unknown Club',
    sponsorName: name,
    sponsorEmail: email,
    message,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem('College.connect_inquiries', JSON.stringify(inquiries));
  
  // Clear form and close dropdown
  document.getElementById(`interested-name-${eventId}`).value = '';
  document.getElementById(`interested-email-${eventId}`).value = '';
  document.getElementById(`interested-message-${eventId}`).value = '';
  toggleInterestedForm(eventId);
  
  showToast('Message Sent!', `Your interest in ${event ? event.name : 'this event'} has been sent to the club.`);
}

// ADMIN PANEL
function approveEvent(eventId) {
  updateEventStatus(eventId, 'approved');
  renderAdminPage();
  showToast('Event Approved', 'The event is now visible to sponsors.');
}

function rejectEvent(eventId) {
  updateEventStatus(eventId, 'rejected');
  renderAdminPage();
  showToast('Event Rejected', 'The event has been rejected.', 'error');
}

function renderAdminStats() {
  const stats = getStats();
  const container = document.getElementById('admin-stats');
  
  if (!container) return;
  
  container.innerHTML = `
    ${generateStatsCard('Total Events', stats.totalEvents, 'calendar', 'default')}
    ${generateStatsCard('Pending Approval', stats.pendingEvents, 'clock', 'accent')}
    ${generateStatsCard('Approved Events', stats.approvedEvents, 'checkCircle', 'success')}
    ${generateStatsCard('Total Funds Requested', formatCurrency(stats.totalFundsRequested), 'dollarSign', 'primary')}
  `;
}

function renderAdminEvents() {
  const events = getEvents();
  const pendingEvents = events.filter(e => e.status === 'pending');
  const approvedEvents = events.filter(e => e.status === 'approved');
  
  const pendingContainer = document.getElementById('pending-events');
  const approvedContainer = document.getElementById('approved-events');
  const pendingCount = document.getElementById('pending-count');
  const approvedCount = document.getElementById('approved-count');
  
  if (pendingCount) pendingCount.textContent = `${pendingEvents.length} events waiting for review`;
  if (approvedCount) approvedCount.textContent = `${approvedEvents.length} events currently active`;
  
  if (pendingContainer) {
    if (pendingEvents.length === 0) {
      pendingContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon success">
            ${icons.checkCircle}
          </div>
          <h3 class="empty-title">All caught up!</h3>
          <p class="empty-text">No events pending approval at the moment.</p>
        </div>
      `;
    } else {
      pendingContainer.innerHTML = `
        <div class="events-grid">
          ${pendingEvents.map(event => generateEventCard(event, 'admin')).join('')}
        </div>
      `;
    }
  }
  
  if (approvedContainer) {
    if (approvedEvents.length === 0) {
      approvedContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            ${icons.calendar}
          </div>
          <h3 class="empty-title">No approved events</h3>
          <p class="empty-text">Approve some pending events to see them here.</p>
        </div>
      `;
    } else {
      approvedContainer.innerHTML = `
        <div class="events-grid">
          ${approvedEvents.map(event => generateEventCard(event, 'default')).join('')}
        </div>
      `;
    }
  }
}

function renderAdminPage() {
  renderAdminStats();
  renderAdminEvents();
}

// ============================================
// NAVIGATION
// ============================================

function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  const menuBtn = document.getElementById('mobile-menu-btn');
  
  mobileNav.classList.toggle('open');
  
  if (mobileNav.classList.contains('open')) {
    menuBtn.innerHTML = icons.x;
  } else {
    menuBtn.innerHTML = icons.menu;
  }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize data if needed
  getEvents();
  
  // Page-specific initialization
  const page = document.body.dataset.page;
  
  switch (page) {
    case 'club':
      renderClubEvents();
      break;
    case 'sponsor':
      renderSponsorStats();
      renderSponsorEvents();
      break;
    case 'admin':
      renderAdminPage();
      break;
  }
  
  // Close modal on overlay click
  const modalOverlay = document.getElementById('sponsor-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeSponsorModal();
      }
    });
  }
});
