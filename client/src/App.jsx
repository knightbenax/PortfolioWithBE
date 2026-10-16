import { useState } from "react";
import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";

const projects = [
  {
    title: "Blark",
    type: "iOS Application",
    description:
      "A monochrome camera experience designed around black-and-white photography, custom film looks, RAW/DNG capture and a focused shooting workflow.",
    role: "Product design, iOS development and product direction.",
    outcome:
      "Built and published as a real iOS product with camera, editing and Apple platform integrations.",
    icon: "B"
  },
  {
    title: "Plomer",
    type: "Web & Apple Platform Application",
    description:
      "A website monitoring product for tracking uptime, SSL expiry, domain expiry, content changes and infrastructure alerts.",
    role: "Product architecture, interface design and software development.",
    outcome:
      "Created a monitoring workflow that gives users a single place to understand website status and incidents.",
    icon: "P"
  },
  {
    title: "Litur",
    type: "Color Library and picker app",
    description:
      "A color picker app that allows you pick and save colors. Also comes with Color Intelligence backed by Apple Foundation Models that allow you ask Litur for color tips, suggestions and palettes",
    role: "Product design, iOS development and product direction.",
    outcome:
      "Built and published as a real iOS app",
    icon: "L"
  }
];

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
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    ["Home", "/"],
    ["About Me", "/about"],
    ["Projects", "/projects"],
    ["Education", "/education"],
    ["Services", "/services"],
    ["Contact Me", "/contact"]
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
  return (
    <div className="page">
      <PageIntro
        eyebrow="PROJECTS"
        title="Selected work."
        text="A few software products that demonstrate my interests, skills and approach to building."
      />

      <section className="project-list section">
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            <div className="project-visual" aria-label={`${project.title} project graphic`}>
              <div className="project-number">0{index + 1}</div>
              <div className="project-icon">{project.icon}</div>
              <div className="project-lines" />
            </div>

            <div className="project-content">
              <p className="project-type">{project.type}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>

              <div className="project-details">
                <div>
                  <strong>My Role</strong>
                  <span>{project.role}</span>
                </div>
                <div>
                  <strong>Outcome</strong>
                  <span>{project.outcome}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function Education() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="EDUCATION"
        title="Education & qualifications."
        text="A place to document academic and professional qualifications."
      />

      <section className="timeline section">
        <div className="timeline-item">
          <span className="timeline-dot" />
          <div>
            <p className="timeline-date">CURRENT</p>
            <h2>Diploma / Degree Information</h2>
            <p>
              Software Eng. with Artifical Intelligence (Co-OP): 2026
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <span className="timeline-dot" />
          <div>
            <p className="timeline-date">2012 - 2017</p>
            <h2>Previous Education</h2>
            <p>
              Computer Science - University of Ibadan, Nigeria
            </p>
            <p>
              High School - King's College, Lagos
            </p>
          </div>
        </div>
      </section>
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

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
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
                Send Message →
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
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