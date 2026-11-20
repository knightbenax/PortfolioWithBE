import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { api, getSession, saveSession } from "./api";

const services = [
  {
    title: "Web Development",
    text: "Responsive websites and web applications built with modern JavaScript and React.",
    icon: "01"
  },
  {
    title: "Mobile Applications",
    text: "Native iOS applications with thoughtful interfaces, platform integrations and polished user experiences.",
    icon: "02"
  },
  {
    title: "Software Product Development",
    text: "From product concept and architecture to implementation, testing and deployment.",
    icon: "03"
  },
  {
    title: "UI & UX Design",
    text: "Simple, purposeful interfaces that make complex software easier to understand and use.",
    icon: "04"
  }
];

function App() {
  const [session, setSession] = useState(() => getSession());

  function updateSession(nextSession) {
    saveSession(nextSession);
    setSession(nextSession);
  }

  return (
    <div className="site-shell">
      <Header session={session} onSignout={() => updateSession(null)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education session={session} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<AuthForm mode="signin" onSession={updateSession} />} />
          <Route path="/signup" element={<AuthForm mode="signup" onSession={updateSession} />} />
          <Route path="/admin" element={<AdminDashboard session={session} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Header({ session, onSignout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    ["Home", "/"],
    ["About Me", "/about"],
    ["Projects", "/projects"],
    ["Education", "/education"],
    ["Services", "/services"],
    ["Contact Me", "/contact"],
    ...(session?.user?.role === 'admin' ? [["Manage", "/admin"]] : [])
  ];

  return (
    <header className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="logo-mark">RA</span>
          <span className="brand-name">Reuben Ashefor</span>
        </NavLink>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "x" : "☰"}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          {session ? <button className="nav-action" onClick={onSignout}>Sign out</button> : <NavLink to="/signin" onClick={() => setMenuOpen(false)}>Sign in</NavLink>}
        </nav>
      </div>
    </header>
  );
}

function PageIntro({ eyebrow, title, text }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="intro-copy">{text}</p>
    </section>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">SOFTWARE DEVELOPER · BUILDER · CREATOR</p>
          <h1>
            Building software
            <span> with purpose.</span>
          </h1>
          <p className="hero-copy">
            Hello, I'm Reuben Ashefor. I build software products that combine
            thoughtful design, useful technology and a clear user experience.
          </p>
          <div className="button-row">
            <button className="button primary" onClick={() => navigate("/about")}>
              About Me →
            </button>
            <button className="button secondary" onClick={() => navigate("/projects")}>
              View Projects
            </button>
          </div>
        </div>

        <div className="hero-card" aria-label="Developer introduction">
          <div className="hero-grid">
            <span>REACT</span>
            <span>JAVASCRIPT</span>
            <span>iOS</span>
            <span>PRODUCT</span>
          </div>
          <div className="hero-monogram">BA</div>
          <p>Turning ideas into working software.</p>
        </div>
      </section>

      <section className="mission section">
        <div>
          <p className="eyebrow">MISSION</p>
          <h2>Make technology feel useful, simple and human.</h2>
        </div>
        <p>
          I enjoy solving problems through software - from a first product idea
          to the interface people actually use. My goal is to create products
          that are practical, understandable and enjoyable to interact with.
        </p>
      </section>

      <section className="home-cards section">
        <InfoCard number="01" title="Build" text="Turn ideas and requirements into functional software." />
        <InfoCard number="02" title="Design" text="Create interfaces that communicate clearly and feel intentional." />
        <InfoCard number="03" title="Improve" text="Iterate through testing, feedback and continuous refinement." />
      </section>
    </>
  );
}

function InfoCard({ number, title, text }) {
  return (
    <article className="info-card">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function About() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="ABOUT ME"
        title="A developer who likes building things."
        text="A short introduction to the person behind the projects."
      />

      <section className="about-layout section">
        <div className="profile-photo">
          <img src="https://www.knightbenax.dev/assets/me.jpg" alt="Profile Picture for Reuben Ashefor" />
        </div>

        <div className="about-copy">
          <p className="lead">
            My name is <strong>Reuben Ashefor</strong>. I am a software
            developer and product builder interested in creating useful digital
            experiences across web, mobile and AI-powered applications.
          </p>
          <p>
            I enjoy working across the full product process: understanding a
            problem, planning the experience, writing the software and refining
            the result. My projects reflect an interest in practical tools,
            clean interfaces and technology that solves real problems.
          </p>
          <p>
            This portfolio highlights selected work, my education and the
            services I can provide as a developer.
          </p>

          <a className="button primary inline-button" href="/Reuben Bezaleel Ashefor_Resume_Plain.pdf" target="_blank" rel="noreferrer">
            View Resume ↗
          </a>
        </div>
      </section>
    </div>
  );
}

function Projects() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api('/projects').then(setItems).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <PageIntro
        eyebrow="PROJECTS"
        title="Selected work."
        text="A few software products that demonstrate my interests, skills and approach to building."
      />

      <section className="project-list section">
        {loading && <p>Loading projects…</p>}
        {error && <p className="form-error">{error}</p>}
        {!loading && !error && items.length === 0 && <p>No projects have been published yet.</p>}
        {items.map((project, index) => (
          <article className="project-card" key={project.title}>
            <div className="project-visual" aria-label={`${project.title} project graphic`}>
              <div className="project-number">0{index + 1}</div>
              <div className="project-icon">{project.icon}</div>
              <div className="project-lines" />
            </div>

            <div className="project-content">
              <p className="project-type">{project.type || 'Project'}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>

              <div className="project-details">
                <div>
                  <strong>My Role</strong>
                  <span>{project.role || '—'}</span>
                </div>
                <div>
                  <strong>Outcome</strong>
                  <span>{project.outcome || project.description}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function Education({ session }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api('/educations').then(setItems).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <PageIntro
        eyebrow="EDUCATION"
        title="Education & qualifications."
        text="A place to document academic and professional qualifications."
      />

      <section className="timeline section">
        {loading && <p>Loading education…</p>}
        {error && <p className="form-error">{error}</p>}
        {!loading && !error && items.length === 0 && <p>No education records have been published yet.</p>}
        {items.map((education) => <article className="timeline-item" key={education._id}>
          <span className="timeline-dot" />
          <div>
            <p className="timeline-date">{education.completion ? new Date(education.completion).getFullYear() : 'EDUCATION'}</p>
            <h2>{education.title}</h2>
            <p>{education.description}</p>
          </div>
        </article>)}
      </section>
      {session?.user?.role === 'admin' && <p className="admin-hint">Manage education records from the <NavLink to="/admin">admin page</NavLink>.</p>}
    </div>
  );
}

function Services() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="SERVICES"
        title="What I can build."
        text="Software development services focused on useful products and clear digital experiences."
      />

      <section className="service-grid section">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <span className="service-number">{service.icon}</span>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
            <span className="service-arrow">↗</span>
          </article>
        ))}
      </section>

      <section className="services-banner section">
        <div>
          <p className="eyebrow">LET'S BUILD</p>
          <h2>Have an idea that needs to become software?</h2>
        </div>
        <NavLink className="button primary" to="/contact">
          Get in Touch →
        </NavLink>
      </section>
    </div>
  );
}

function Contact() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSending(true);
    setError('');
    try {
      await api('/contacts', { method: 'POST', body: {
        firstname: form.get('firstName'), lastname: form.get('lastName'),
        phone: form.get('phone'), email: form.get('email'), message: form.get('message')
      }});
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  function resetForm() {
    setSubmitted(false);
  }

  return (
    <div className="page">
      <PageIntro
        eyebrow="CONTACT ME"
        title="Let's start a conversation."
        text="Use the form to send a message or use the contact details below."
      />

      <section className="contact-layout section">
        <aside className="contact-panel">
          <p className="eyebrow">CONTACT INFORMATION</p>
          <div className="contact-item">
            <span>Email</span>
            <a href="mailto:rashefor@my.centennialcollege.ca">rashefor@my.centennialcollege.ca</a>
          </div>
          <div className="contact-item">
            <span>Phone</span>
            <a href="tel:+10000000000">+1 (000) 000-0000</a>
          </div>
          <div className="contact-item">
            <span>Location</span>
            <strong>Ontario, Canada</strong>
          </div>
        </aside>

        <div className="form-wrap">
          {submitted ? (
            <div className="success-box">
              <span className="success-icon">✓</span>
              <h2>Message captured.</h2>
              <p>
                Thank you for your message. For this assignment, the submitted
                information has been captured and the visitor can return home.
              </p>
              <div className="button-row">
                <button className="button primary" onClick={() => navigate("/")}>
                  Return Home
                </button>
                <button className="button secondary" onClick={resetForm}>
                  Send Another
                </button>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  First Name
                  <input name="firstName" required placeholder="First name" />
                </label>
                <label>
                  Last Name
                  <input name="lastName" required placeholder="Last name" />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Contact Number
                  <input name="phone" type="tel" required placeholder="+1 (000) 000-0000" />
                </label>
                <label>
                  Email Address
                  <input name="email" type="email" required placeholder="you@example.com" />
                </label>
              </div>

              <label>
                Message
                <textarea name="message" rows="7" required placeholder="How can I help?" />
              </label>

              <button className="button primary submit-button" type="submit">
                {sending ? 'Sending…' : 'Send Message →'}
              </button>
              {error && <p className="form-error" role="alert">{error}</p>}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function AuthForm({ mode, onSession }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const signup = mode === 'signup';

  async function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true);
    setError('');
    try {
      if (signup) await api('/users', { method: 'POST', body: values });
      const result = await api('/auth/signin', { method: 'POST', body: { email: values.email, password: values.password } });
      onSession(result);
      navigate(result.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return <div className="page">
    <PageIntro eyebrow={signup ? 'CREATE ACCOUNT' : 'WELCOME BACK'} title={signup ? 'Join the portfolio.' : 'Sign in.'} text={signup ? 'Create an account to view portfolio content.' : 'Sign in to your portfolio account.'} />
    <form className="contact-form auth-form" onSubmit={submit}>
      {signup && <label>Name<input name="name" required autoComplete="name" /></label>}
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Password<input name="password" type="password" required minLength="6" autoComplete={signup ? 'new-password' : 'current-password'} /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button primary" disabled={busy}>{busy ? 'Please wait…' : signup ? 'Create account' : 'Sign in'}</button>
      <p>{signup ? 'Already have an account?' : 'New here?'} <NavLink to={signup ? '/signin' : '/signup'}>{signup ? 'Sign in' : 'Create an account'}</NavLink></p>
    </form>
  </div>;
}

function AdminDashboard({ session }) {
  const [data, setData] = useState({ projects: [], educations: [], contacts: [] });
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [refresh, setRefresh] = useState(0);
  const token = session?.token;
  const admin = session?.user?.role === 'admin';

  useEffect(() => {
    if (!admin) return;
    Promise.all([api('/projects'), api('/educations'), api('/contacts')])
      .then(([projectsData, educationsData, contactsData]) => setData({ projects: projectsData, educations: educationsData, contacts: contactsData }))
      .catch((err) => setError(err.message));
  }, [admin, refresh]);

  if (!admin) return <div className="page"><PageIntro eyebrow="ADMIN" title="Admin access required." text="Sign in with an administrator account to manage portfolio records." /><NavLink className="button primary" to="/signin">Sign in</NavLink></div>;

  async function remove(resource, id) {
    try { await api(`/${resource}/${id}`, { method: 'DELETE', token }); setRefresh((value) => value + 1); setNotice('Record deleted.'); setError(''); }
    catch (err) { setError(err.message); }
  }

  async function save(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    const { resource, id } = draft;
    const body = resource === 'projects' || resource === 'contacts' ? fields : {
      ...fields, firstname: session.user.name.split(' ')[0], lastname: session.user.name.split(' ').slice(1).join(' ') || session.user.name,
      email: session.user.email
    };
    try {
      await api(`/${resource}${id ? `/${id}` : ''}`, { method: id ? 'PUT' : 'POST', body, token });
      setDraft(null); setRefresh((value) => value + 1); setNotice('Record saved.'); setError('');
    } catch (err) { setError(err.message); }
  }

  return <div className="page">
    <PageIntro eyebrow="ADMIN" title="Manage portfolio content." text="Create, edit, and remove projects and education records; review contact messages." />
    {error && <p className="form-error" role="alert">{error}</p>}{notice && <p className="form-notice">{notice}</p>}
    <button className="button primary" onClick={() => { setDraft({ resource: 'projects' }); setError(''); }}>Add project</button>{' '}
    <button className="button secondary" onClick={() => { setDraft({ resource: 'educations' }); setError(''); }}>Add education</button>
    {draft && <form className="contact-form admin-form" onSubmit={save}>
      <h2>{draft.id ? 'Edit' : 'New'} {draft.resource === 'projects' ? 'project' : draft.resource === 'contacts' ? 'contact' : 'education'}</h2>
      {draft.resource !== 'contacts' && <label>Title<input name="title" defaultValue={draft.title || ''} required /></label>}
      {draft.resource === 'projects' ? <>
        <label>Type<input name="type" defaultValue={draft.type || ''} /></label>
        <label>Description<textarea name="description" defaultValue={draft.description || ''} required /></label>
        <label>My role<input name="role" defaultValue={draft.role || ''} /></label>
        <label>Outcome<input name="outcome" defaultValue={draft.outcome || ''} /></label>
        <label>Icon<input name="icon" defaultValue={draft.icon || ''} /></label>
      </> : draft.resource === 'contacts' ? <>
        <label>First name<input name="firstname" defaultValue={draft.firstname || ''} required /></label>
        <label>Last name<input name="lastname" defaultValue={draft.lastname || ''} required /></label>
        <label>Email<input name="email" type="email" defaultValue={draft.email || ''} required /></label>
        <label>Phone<input name="phone" defaultValue={draft.phone || ''} /></label>
        <label>Message<textarea name="message" defaultValue={draft.message || ''} required /></label>
      </> : <>
        <label>Completion date<input name="completion" type="date" defaultValue={draft.completion ? draft.completion.slice(0, 10) : ''} required /></label>
        <label>Description<textarea name="description" defaultValue={draft.description || ''} required /></label>
      </>}
      <div className="button-row"><button className="button primary">Save</button><button type="button" className="button secondary" onClick={() => setDraft(null)}>Cancel</button></div>
    </form>}
    <section className="admin-section"><h2>Projects</h2>{data.projects.map((record) => <AdminRecord key={record._id} record={record} onEdit={() => setDraft({ resource: 'projects', id: record._id, ...record })} onDelete={() => remove('projects', record._id)} />)}</section>
    <section className="admin-section"><h2>Education</h2>{data.educations.map((record) => <AdminRecord key={record._id} record={record} onEdit={() => setDraft({ resource: 'educations', id: record._id, ...record })} onDelete={() => remove('educations', record._id)} />)}</section>
    <section className="admin-section"><h2>Contact messages</h2><button className="button secondary" onClick={() => setDraft({ resource: 'contacts' })}>Add contact</button>{data.contacts.map((record) => <article className="admin-record" key={record._id}><div><strong>{record.firstname} {record.lastname}</strong><p>{record.email} · {record.phone}</p><p>{record.message}</p></div><div className="button-row"><button className="button secondary" onClick={() => setDraft({ resource: 'contacts', id: record._id, ...record })}>Edit</button><button className="button secondary" onClick={() => remove('contacts', record._id)}>Delete</button></div></article>)}</section>
  </div>;
}

function AdminRecord({ record, onEdit, onDelete }) {
  return <article className="admin-record"><div><strong>{record.title}</strong><p>{record.description}</p></div><div className="button-row"><button className="button secondary" onClick={onEdit}>Edit</button><button className="button secondary" onClick={onDelete}>Delete</button></div></article>;
}

function Footer() {
  return (
    <footer className="footer">

<iframe data-testid="embed-iframe"  src="https://open.spotify.com/embed/playlist/1aL6dFocQkHcoiMUPY5YCd?utm_source=generator&si=3766740065ff4dfb" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

      <div className="inner-footer">
        <div>
        <strong>RA</strong>
        <span>© {new Date().getFullYear()} Reuben Ashefor</span>
      </div>
      <span>React Portfolio · COMP229</span>
      </div>
    </footer>
  );
}

export default App;
