import React from 'react'

const DashboardMock = () => (
  <div className="dash-wrap">
    <div className="dash-head">
      <div className="dot red" />
      <div className="dot yellow" />
      <div className="dot green" />
      <div className="dash-title">MarketBuzzr</div>
      <div className="dash-actions">
        <span>Contact Us</span>
        <span className="pill">Book a Demo</span>
      </div>
    </div>
    <div className="dash-body">
      <svg className="chart" viewBox="0 0 800 240" role="img" aria-label="demo chart">
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopOpacity="0.35" stopColor="#7bd0ff" />
            <stop offset="100%" stopOpacity="0" stopColor="#7bd0ff" />
          </linearGradient>
        </defs>
        <path d="M0,190 C80,150 140,210 200,170 C260,130 320,180 380,160 C440,140 500,180 560,150 C620,120 680,170 740,160 C780,150 800,160 800,160 L800,240 L0,240 Z"
          fill="url(#g)"/>
        <path d="M0,190 C80,150 140,210 200,170 C260,130 320,180 380,160 C440,140 500,180 560,150 C620,120 680,170 740,160 C780,150 800,160 800,160"
          fill="none" stroke="#78c8ff" strokeWidth="4" strokeLinecap="round"/>
      </svg>
      <div className="stat-bubble">20,342,952</div>
    </div>
  </div>
)

export default DashboardMock
