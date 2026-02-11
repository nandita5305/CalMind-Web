import React, { useEffect, useState } from "react";
import "./profile.css";
import Sidebar from "../Sidebar/sidebar";
import { 
  FaBrain, 
  FaUserMd, 
  FaChartLine, 
  FaCalendarAlt, 
  FaClock,
  FaLeaf,
  FaHeart,
  FaCommentDots
} from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data for sessions and activity
  const aiSessions = 28;
  const therapistSessions = 12;
  const weeklyActivity = 85;

  const sessions = [
    { id: 1, type: "AI", title: "Anxiety Management", date: "2024-01-15", time: "10:30 AM", duration: "45 min" },
    { id: 2, type: "Therapist", title: "Dr. Smith - Check-in", date: "2024-01-14", time: "2:00 PM", duration: "60 min" },
    { id: 3, type: "AI", title: "Meditation Guide", date: "2024-01-13", time: "9:15 AM", duration: "30 min" },
    { id: 4, type: "Therapist", title: "Dr. Johnson - Progress", date: "2024-01-12", time: "11:00 AM", duration: "50 min" },
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  

  return (
    <div className="profile-container">
      <Sidebar />
      
      <main className="profile-content">
        {/* Header Section */}
        <div className="profile-header">
          <div className="header-left">
            <h1 className="greeting">
              Welcome back, <span className="highlight">{user?.fullName}</span>
            </h1>
            <p className="subtitle">
              Your journey to calmness continues. Here's your progress overview.
            </p>
          </div>
          <div className="header-right">
            <div className="mindfulness-tip">
              <FaLeaf className="tip-icon" />
              <p>"Breathe deeply, peace begins within"</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon ai-icon">
              <FaBrain />
            </div>
            <div className="stat-info">
              <h3>AI Sessions</h3>
              <p className="stat-number">{aiSessions}</p>
              <span className="stat-trend">↑ 12% this week</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon therapist-icon">
              <FaUserMd />
            </div>
            <div className="stat-info">
              <h3>Therapist Sessions</h3>
              <p className="stat-number">{therapistSessions}</p>
              <span className="stat-trend">Next: Jan 20</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon activity-icon">
              <FaChartLine />
            </div>
            <div className="stat-info">
              <h3>Weekly Activity</h3>
              <p className="stat-number">{weeklyActivity}%</p>
              <span className="stat-trend">↑ 5% from last week</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon calendar-icon">
              <FaCalendarAlt />
            </div>
            <div className="stat-info">
              <h3>Consistency</h3>
              <p className="stat-number">18 days</p>
              <span className="stat-trend">Current streak</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Calendar Section */}
          <div className="calendar-section">
            <div className="section-header">
              <h2>
                <FaCalendarAlt className="section-icon" />
                Calendar
              </h2>
              <button className="view-all-btn">View All</button>
            </div>
            
            <div className="calendar">
              <div className="calendar-header">
                <h3>{currentMonth} {currentYear}</h3>
                <div className="calendar-nav">
                  <button>&lt;</button>
                  <button>&gt;</button>
                </div>
              </div>
              
              <div className="weekdays">
                {weekDays.map(day => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              
              <div className="days-grid">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i + 1;
                  const hasSession = [5, 12, 15, 18, 22].includes(day);
                  return (
                    <div 
                      key={i} 
                      className={`day ${hasSession ? 'has-session' : ''} ${day === 15 ? 'today' : ''}`}
                    >
                      <span className="day-number">{day}</span>
                      {hasSession && <span className="session-indicator">●</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="upcoming-sessions">
              <h3>Upcoming Sessions</h3>
              <div className="session-list">
                <div className="session-item">
                  <div className="session-time">
                    <FaClock />
                    <span>2:00 PM</span>
                  </div>
                  <div className="session-details">
                    <h4>Therapy Session - Dr. Smith</h4>
                    <span className="session-type therapist">Virtual</span>
                  </div>
                </div>
                <div className="session-item">
                  <div className="session-time">
                    <FaClock />
                    <span>4:30 PM</span>
                  </div>
                  <div className="session-details">
                    <h4>AI Meditation Guide</h4>
                    <span className="session-type ai">Self-guided</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Sessions Section */}
          <div className="recent-sessions-section">
            <div className="section-header">
              <h2>
                <FaCommentDots className="section-icon" />
                Recent Sessions
              </h2>
              <button className="view-all-btn">View All</button>
            </div>
            
            <div className="sessions-list">
              {sessions.map(session => (
                <div key={session.id} className="session-card">
                  <div className={`session-type-icon ${session.type.toLowerCase()}`}>
                    {session.type === "AI" ? <FaBrain /> : <FaUserMd />}
                  </div>
                  <div className="session-content">
                    <h4>{session.title}</h4>
                    <div className="session-meta">
                      <span>
                        <FaCalendarAlt /> {session.date}
                      </span>
                      <span>
                        <FaClock /> {session.time}
                      </span>
                      <span className="duration">{session.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="weekly-activity">
          <div className="section-header">
            <h2>
              <FaChartLine className="section-icon" />
              Weekly Activity
            </h2>
            <div className="activity-legend">
              <span><span className="dot ai-dot"></span> AI Sessions</span>
              <span><span className="dot therapist-dot"></span> Therapist Sessions</span>
            </div>
          </div>
          
          <div className="activity-chart">
            {weekDays.map((day, index) => (
              <div key={day} className="chart-column">
                <div className="bars">
                  <div 
                    className="bar ai-bar" 
                    style={{ height: `${Math.random() * 60 + 20}px` }}
                  ></div>
                  <div 
                    className="bar therapist-bar" 
                    style={{ height: `${Math.random() * 40 + 10}px` }}
                  ></div>
                </div>
                <span className="day-label">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mindful Moments */}
        <div className="mindful-moments">
          <div className="section-header">
            <h2>
              <FaHeart className="section-icon" />
              Mindful Moments
            </h2>
            <button className="add-moment-btn">+ Add Moment</button>
          </div>
          
          <div className="moments-grid">
            <div className="moment-card">
              <FaLeaf className="moment-icon" />
              <h4>Morning Meditation</h4>
              <p>15 minutes of mindfulness</p>
              <span className="moment-time">Today, 8:00 AM</span>
            </div>
            <div className="moment-card">
              <FaLeaf className="moment-icon" />
              <h4>Gratitude Journal</h4>
              <p>3 things I'm grateful for</p>
              <span className="moment-time">Yesterday, 9:30 PM</span>
            </div>
            <div className="moment-card">
              <FaLeaf className="moment-icon" />
              <h4>Breathing Exercise</h4>
              <p>5-minute deep breathing</p>
              <span className="moment-time">Jan 14, 3:15 PM</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;