import React, { useState, useEffect } from "react";
import "./session.css";
import Sidebar from "../Sidebar/sidebar";
import { 
  FaBrain, 
  FaCalendarAlt, 
  FaClock, 
  FaVideo,
  FaLink,
  FaCopy,
  FaCheck,
  FaRobot,
  FaUserMd,
  FaPlus,
  FaRegCalendar,
  FaRegClock,
  FaMicrophone,
  FaComments,
  FaArrowRight,
  FaLock,
  FaShieldAlt,
  FaLeaf
} from "react-icons/fa";

const SessionsPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [sessionType, setSessionType] = useState("ai");
  const [sessionMode, setSessionMode] = useState("instant");
  const [sessionTopic, setSessionTopic] = useState("");
  const [sessionDuration, setSessionDuration] = useState("30");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [scheduledSessions, setScheduledSessions] = useState([]);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [aiPersonality, setAiPersonality] = useState("empathetic");
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Generate random meeting link
  const generateMeetingLink = () => {
    const randomId = Math.random().toString(36).substring(2, 10);
    const randomHash = Math.random().toString(36).substring(2, 8);
    return `https://calmind.meet/ai-session-${randomId}-${randomHash}`;
  };

  // Handle create session
  const handleCreateSession = (e) => {
    e.preventDefault();
    
    const newSession = {
      id: Date.now(),
      type: sessionType,
      mode: sessionMode,
      topic: sessionTopic,
      duration: sessionDuration,
      date: sessionMode === "scheduled" ? sessionDate : new Date().toISOString().split('T')[0],
      time: sessionMode === "scheduled" ? sessionTime : new Date().toLocaleTimeString(),
      link: generateMeetingLink(),
      status: "ready",
      aiPersonality: aiPersonality,
      voiceEnabled: voiceEnabled,
      createdAt: new Date().toISOString()
    };

    if (sessionMode === "scheduled") {
      setScheduledSessions([...scheduledSessions, newSession]);
      // Reset form
      setSessionTopic("");
      setSessionDate("");
      setSessionTime("");
    } else {
      setGeneratedLink(newSession.link);
      setShowLinkModal(true);
    }
  };

  // Copy link to clipboard
  const copyToClipboard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Start session
  const startSession = (link) => {
    window.open(link, '_blank');
  };

  // Delete scheduled session
  const deleteSession = (sessionId) => {
    setScheduledSessions(scheduledSessions.filter(s => s.id !== sessionId));
  };

  // AI Personalities
  const personalities = [
    { id: "empathetic", name: "Empathetic Listener", description: "Warm and understanding", icon: "❤️" },
    { id: "analytical", name: "Analytical Guide", description: "Logical and structured", icon: "📊" },
    { id: "mindful", name: "Mindfulness Coach", description: "Calm and meditative", icon: "🧘" },
    { id: "motivational", name: "Motivational Speaker", description: "Encouraging and uplifting", icon: "⚡" }
  ];

  return (
    <div className="sessions-container">
      <Sidebar />
      
      <main className="sessions-content">
        {/* Header Section */}
        <div className="sessions-header">
          <div className="header-left">
            <h1 className="page-title">
              <FaBrain className="title-icon" />
              AI Sessions
            </h1>
            <p className="page-subtitle">
              Create instant AI therapy sessions or schedule them for later. Your safe space for mental wellness.
            </p>
          </div>
          <div className="header-right">
            <div className="stats-badge">
              <span className="stat-item">
                <FaVideo />
                {scheduledSessions.length} Scheduled
              </span>
              <span className="stat-item">
                <FaRobot />
                24/7 Available
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="sessions-grid">
          {/* Left Column - Create Session */}
          <div className="create-session-card">
            <div className="card-header">
              <h2>
                <FaPlus className="header-icon" />
                Create New Session
              </h2>
              <div className="session-tabs">
                <button 
                  className={`tab-btn ${activeTab === "create" ? "active" : ""}`}
                  onClick={() => setActiveTab("create")}
                >
                  Create
                </button>
                <button 
                  className={`tab-btn ${activeTab === "schedule" ? "active" : ""}`}
                  onClick={() => setActiveTab("schedule")}
                >
                  Schedule
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateSession} className="session-form">
              {/* Session Type Selector */}
              <div className="form-group">
                <label>Session Type</label>
                <div className="type-selector">
                  <button
                    type="button"
                    className={`type-btn ${sessionType === "ai" ? "active" : ""}`}
                    onClick={() => setSessionType("ai")}
                  >
                    <FaRobot className="type-icon" />
                    <div className="type-info">
                      <span className="type-name">AI Therapist</span>
                      <span className="type-desc">24/7 AI-powered sessions</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`type-btn ${sessionType === "therapist" ? "active" : ""}`}
                    onClick={() => setSessionType("therapist")}
                  >
                    <FaUserMd className="type-icon" />
                    <div className="type-info">
                      <span className="type-name">Human Therapist</span>
                      <span className="type-desc">Connect with professionals</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Session Mode */}
              <div className="form-group">
                <label>Session Mode</label>
                <div className="mode-selector">
                  <button
                    type="button"
                    className={`mode-btn ${sessionMode === "instant" ? "active" : ""}`}
                    onClick={() => setSessionMode("instant")}
                  >
                    <FaVideo className="mode-icon" />
                    <span>Instant Session</span>
                  </button>
                  <button
                    type="button"
                    className={`mode-btn ${sessionMode === "scheduled" ? "active" : ""}`}
                    onClick={() => setSessionMode("scheduled")}
                  >
                    <FaCalendarAlt className="mode-icon" />
                    <span>Schedule for Later</span>
                  </button>
                </div>
              </div>

              {/* Session Topic */}
              <div className="form-group">
                <label htmlFor="topic">What would you like to discuss?</label>
                <div className="topic-input-wrapper">
                  <FaComments className="input-icon" />
                  <input
                    type="text"
                    id="topic"
                    placeholder="e.g., Anxiety management, Stress relief, Work-life balance..."
                    value={sessionTopic}
                    onChange={(e) => setSessionTopic(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* AI Personality (only for AI sessions) */}
              {sessionType === "ai" && (
                <div className="form-group">
                  <label>AI Personality</label>
                  <div className="personality-grid">
                    {personalities.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        className={`personality-btn ${aiPersonality === p.id ? "active" : ""}`}
                        onClick={() => setAiPersonality(p.id)}
                      >
                        <span className="personality-emoji">{p.icon}</span>
                        <span className="personality-name">{p.name}</span>
                        <span className="personality-desc">{p.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Session Duration */}
              <div className="form-group">
                <label>Session Duration</label>
                <div className="duration-selector">
                  {["15", "30", "45", "60"].map(duration => (
                    <button
                      key={duration}
                      type="button"
                      className={`duration-btn ${sessionDuration === duration ? "active" : ""}`}
                      onClick={() => setSessionDuration(duration)}
                    >
                      {duration} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Enabled (for AI sessions) */}
              {sessionType === "ai" && (
                <div className="form-group voice-toggle">
                  <label className="toggle-label">
                    <FaMicrophone className="toggle-icon" />
                    Enable Voice Conversation
                  </label>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      id="voice-toggle"
                      checked={voiceEnabled}
                      onChange={(e) => setVoiceEnabled(e.target.checked)}
                    />
                    <label htmlFor="voice-toggle" className="switch-label">
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              )}

              {/* Scheduled Date & Time */}
              {sessionMode === "scheduled" && (
                <div className="scheduled-fields">
                  <div className="form-group half">
                    <label htmlFor="date">Date</label>
                    <div className="date-input-wrapper">
                      <FaRegCalendar className="input-icon" />
                      <input
                        type="date"
                        id="date"
                        value={sessionDate}
                        onChange={(e) => setSessionDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group half">
                    <label htmlFor="time">Time</label>
                    <div className="time-input-wrapper">
                      <FaRegClock className="input-icon" />
                      <input
                        type="time"
                        id="time"
                        value={sessionTime}
                        onChange={(e) => setSessionTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="create-session-btn">
                {sessionMode === "instant" ? (
                  <>
                    <FaVideo />
                    Create & Start Session
                  </>
                ) : (
                  <>
                    <FaCalendarAlt />
                    Schedule Session
                  </>
                )}
                <FaArrowRight className="btn-arrow" />
              </button>
            </form>
          </div>

          {/* Right Column - Scheduled Sessions & Quick Actions */}
          <div className="sessions-sidebar">
            {/* Scheduled Sessions */}
            <div className="scheduled-sessions-card">
              <div className="card-header">
                <h2>
                  <FaCalendarAlt className="header-icon" />
                  Upcoming Sessions
                </h2>
                <span className="session-count">{scheduledSessions.length}</span>
              </div>

              {scheduledSessions.length > 0 ? (
                <div className="scheduled-list">
                  {scheduledSessions.map(session => (
                    <div key={session.id} className="scheduled-item">
                      <div className="session-icon">
                        {session.type === "ai" ? <FaRobot /> : <FaUserMd />}
                      </div>
                      <div className="session-details">
                        <h4>{session.topic}</h4>
                        <div className="session-meta">
                          <span>
                            <FaRegCalendar />
                            {new Date(session.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span>
                            <FaRegClock />
                            {session.time}
                          </span>
                          <span className="duration-badge">
                            {session.duration} min
                          </span>
                        </div>
                      </div>
                      <div className="session-actions">
                        <button 
                          className="start-btn"
                          onClick={() => startSession(session.link)}
                        >
                          Start
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => deleteSession(session.id)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FaCalendarAlt className="empty-icon" />
                  <p>No scheduled sessions</p>
                  <span>Schedule a session to see it here</span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-card">
              <h3>Quick Actions</h3>
              <div className="actions-grid">
                <button className="action-btn">
                  <FaBrain />
                  <span>Guided Meditation</span>
                </button>
                <button className="action-btn">
                  <FaComments />
                  <span>Journal Entry</span>
                </button>
                <button className="action-btn">
                  <FaLock />
                  <span>Private Notes</span>
                </button>
                <button className="action-btn">
                  <FaShieldAlt />
                  <span>Crisis Support</span>
                </button>
              </div>
            </div>

            {/* Security Badge */}
            <div className="security-badge">
              <FaShieldAlt className="security-icon" />
              <div className="security-info">
                <h4>End-to-End Encrypted</h4>
                <p>Your sessions are private and secure</p>
              </div>
              <FaLeaf className="leaf-icon" />
            </div>
          </div>
        </div>

        {/* AI Tips Section */}
        <div className="ai-tips-section">
          <div className="tips-header">
            <h3>
              <FaBrain />
              Tips for your AI session
            </h3>
            <p>Make the most out of your therapy session</p>
          </div>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-number">1</span>
              <h4>Be Open</h4>
              <p>Share your thoughts freely - the AI is here to listen without judgment</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">2</span>
              <h4>Set Intentions</h4>
              <p>Know what you want to achieve from this session</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">3</span>
              <h4>Take Notes</h4>
              <p>Write down insights and coping strategies you learn</p>
            </div>
            <div className="tip-card">
              <span className="tip-number">4</span>
              <h4>Follow Up</h4>
              <p>Schedule regular sessions for consistent support</p>
            </div>
          </div>
        </div>
      </main>

      {/* Session Link Modal */}
      {showLinkModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <FaVideo className="modal-icon" />
              <h2>Your Session is Ready!</h2>
              <button 
                className="close-modal"
                onClick={() => setShowLinkModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="session-ready-info">
                <div className="ready-badge">
                  <FaCheck />
                  Session Created Successfully
                </div>
                
                <div className="session-link-container">
                  <label>Meeting Link</label>
                  <div className="link-box">
                    <FaLink className="link-icon" />
                    <input 
                      type="text" 
                      value={generatedLink} 
                      readOnly 
                    />
                    <button 
                      className={`copy-btn ${copied ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(generatedLink)}
                    >
                      {copied ? <FaCheck /> : <FaCopy />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="session-details-preview">
                  <h3>Session Details</h3>
                  <div className="detail-row">
                    <span>Type:</span>
                    <strong>{sessionType === 'ai' ? 'AI Therapist' : 'Human Therapist'}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Topic:</span>
                    <strong>{sessionTopic}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Duration:</span>
                    <strong>{sessionDuration} minutes</strong>
                  </div>
                  {sessionType === 'ai' && (
                    <div className="detail-row">
                      <span>AI Personality:</span>
                      <strong>{personalities.find(p => p.id === aiPersonality)?.name}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="start-now-btn"
                onClick={() => startSession(generatedLink)}
              >
                <FaVideo />
                Start Session Now
              </button>
              <button 
                className="copy-link-btn"
                onClick={() => copyToClipboard(generatedLink)}
              >
                <FaCopy />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionsPage;