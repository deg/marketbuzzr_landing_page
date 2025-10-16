import React from 'react'
import DashboardMock from './DashboardMock.jsx'

const Nav = () => (
  <nav>
    <div className="container nav-inner">
      <div className="brand">
        <div className="brand-badge">M</div>
        MarketBuzzr
      </div>
      <div className="nav-actions">
        <a href="#contact">Contact Us</a>
        <a href="#book" className="primary">Book a Demo</a>
      </div>
    </div>
  </nav>
)

const Hero = () => (
  <header className="hero container">
    <span className="kicker">Market Intelligence for B2B SaaS</span>
    <h1>Always know what's up</h1>
    <p className="sub">Track competitor posts, industry webinars & podcasts. Neatly summarized, ready for decision-making.</p>
    <a href="#get" className="cta">Get your MarketBuzzr</a>
    <DashboardMock />
  </header>
)

const SectionTitle = ({title, lead}) => (
  <>
    <h2>{title}</h2>
    {lead ? <p className="lead">{lead}</p> : null}
  </>
)

const Features = () => (
  <section className="section container" id="features">
    <SectionTitle title="Track all relevant market activities" lead="Never miss out on competitor activities and market trends" />
    <div className="grid">
      {[
        {
          h: 'Competitor Blog Posts',
          p: 'Analyze competitor content to detect themes, gaps, and opportunities. Our AI automates the monitoring and surfaces what matters.',
          a: 'Start tracking competitor blog posts'
        },
        {
          h: 'Webinars',
          p: 'Follow industry leaders, topics, and key takeaways in real-time to inform GTM and positioning decisions.',
          a: 'Start tracking industry webinars'
        },
        {
          h: 'Podcasts',
          p: 'Capture expert opinions, pain points, and evolving narratives from industry podcasts — summarized for quick review.',
          a: 'Start tracking industry podcasts'
        },
        {
          h: 'Social Posts',
          p: 'Monitor LinkedIn and other channels to see what leaders are saying, trending concerns, and shifting industry priorities.',
          a: 'Start tracking social posts'
        }
      ].map((item, i) => (
        <div key={i} className="card">
          <div className="icon" />
          <h3>{item.h}</h3>
          <p>{item.p}</p>
          <a href="#">{item.a}</a>
        </div>
      ))}
    </div>
  </section>
)

const ProblemCards = () => (
  <section className="section container" id="problems">
    <SectionTitle title="Turn Market Buzz into Signals" lead="Surface tailored market trends and insights for Marketers in B2B SaaS" />
    <div className="grid">
      {[
        {h:'Keeping track of competitors is a mess?', a:'Track competitors, fully automated!'},
        {h:'Afraid to miss out on new market trends?', a:'Stay on top of market trends — never miss out!'},
        {h:'Too busy to watch webinars and listen to podcasts?', a:'Get tailored takeaways — from all your favorite events!'},
        {h:'Your CEO is asking you about the market?', a:'Get tailored reports — all the time!'}
      ].map((c, i) => (
        <div key={i} className="card">
          <div className="icon" />
          <h3>{c.h}</h3>
          <a href="#">{c.a}</a>
        </div>
      ))}
    </div>
    <div className="cta-panel" id="book">
      <h3>Tailored Intelligence, built for your Business</h3>
      <p>Harness the power of data and qualitative insights. MarketBuzzr delivers actionable intelligence calibrated to your industry, audience, and goals.</p>
      <p><a className="cta" href="#contact">Book a Demo</a></p>
    </div>
  </section>
)

const Footer = () => (
  <footer id="contact">
    <div className="container footer-grid">
      <div>
        <div className="footer-brand">
          <div className="brand-badge">M</div>
          MarketBuzzr
        </div>
        <p className="footer-note">© 2025 MarketBuzzr — All rights reserved.</p>
      </div>
      <div>
        <h4>Contact</h4>
        <div>contact@marketbuzzr.com</div>
        <div>sales@marketbuzzr.com</div>
      </div>
      <div>
        <h4>Careers</h4>
        <div>careers@marketbuzzr.com</div>
        <div><a href="#" style={{color:'#86d5ff'}}>Terms and Conditions</a> · <a href="#" style={{color:'#86d5ff'}}>Privacy Policy</a></div>
      </div>
    </div>
  </footer>
)

const App = () => (
  <>
    <Nav />
    <Hero />
    <Features />
    <ProblemCards />
    <Footer />
  </>
)

export default App
