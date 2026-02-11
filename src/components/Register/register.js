import { useState, useEffect } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

/* IMAGES */
import logo from "../../assets/logo.png";
import guardian1 from "../../assets/guardian.png";
import guardian2 from "../../assets/spotify.png";
import guardian3 from "../../assets/therapy.png";
import guardian4 from "../../assets/name.png";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    city: "",
    gender: "",
    interests: []
  });

  const [errors, setErrors] = useState({});

  const images = [guardian1, guardian2, guardian3, guardian4];
  const stepTitles = ["Create Account", "Personal Details", "Your Interests", "Complete Profile"];
  const stepDescriptions = [
    "Join us and start your wellness journey",
    "Tell us a bit about yourself for a personalized experience",
    "Select what matters most to your mental wellbeing",
    "Your safe space is ready! Let's get started"
  ];

  const interests = [
    { id: "mood", label: "Mood Tracking", icon: "📊" },
    { id: "therapy", label: "Therapy Sessions", icon: "🧠" },
    { id: "meditation", label: "Meditation", icon: "🧘" },
    { id: "sleep", label: "Sleep Tracking", icon: "😴" },
    { id: "journal", label: "Journaling", icon: "📔" },
    { id: "community", label: "Community Support", icon: "🤝" }
  ];

  useEffect(() => {
    const formSteps = document.querySelectorAll('.form-step');
    formSteps.forEach(step => step.classList.remove('active'));
    setTimeout(() => {
      const currentStep = document.querySelector(`.form-step[data-step="${step}"]`);
      if (currentStep) currentStep.classList.add('active');
    }, 10);
  }, [step]);

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    }
    
    if (step === 2) {
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.age) newErrors.age = "Age is required";
      else if (formData.age < 13 || formData.age > 120) newErrors.age = "Age must be between 13-120";
      if (!formData.city.trim()) newErrors.city = "City is required";
    }
    
    if (step === 3 && formData.interests.length === 0) {
      newErrors.interests = "Please select at least one interest";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep() && step < 4) {
      // Smooth transition
      const formContent = document.querySelector('.form-content');
      formContent.style.opacity = '0.7';
      formContent.style.transform = 'translateX(-10px)';
      
      setTimeout(() => {
        setStep(step + 1);
        formContent.style.opacity = '1';
        formContent.style.transform = 'translateX(0)';
      }, 200);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const toggleInterest = (id) => {
    setFormData(prev => {
      const updatedInterests = prev.interests.includes(id)
        ? prev.interests.filter(interest => interest !== id)
        : [...prev.interests, id];
      return { ...prev, interests: updatedInterests };
    });
    // Clear interest error if any selected
    if (errors.interests && (formData.interests.length > 0 || !formData.interests.includes(id))) {
      setErrors(prev => ({ ...prev, interests: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateStep()) {
      try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
  
        const data = await res.json();
  
        if (res.ok) {
          alert("Account created 🎉");
          navigate("/profile");
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
      }
    }
  };
  

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= step) {
      setStep(stepNumber);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        {/* ================= SIDEBAR ================= */}
        <div className="register-sidebar">
          <div className="sidebar-content">
            {/* LOGO */}
            <div className="logo-container">
              <img src={logo} alt="Calmind Logo" className="logo-img" />
              <div className="logo-text">
                <h1 className="logo-primary">Calmind</h1>
                <p className="logo-tagline">Your Mental Wellness Companion</p>
              </div>
            </div>

            {/* PROGRESS STEPS */}
            <div className="progress-section">
              <div className="step-counter">
                <span className="step-current">{step}</span>
                <span className="step-total">/4</span>
              </div>
              
              <div className="step-titles">
                <h3>{stepTitles[step - 1]}</h3>
                <p>{stepDescriptions[step - 1]}</p>
              </div>

              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(step - 1) * 33.33}%` }}
                  />
                </div>
                
                <div className="step-indicators">
                  {[1, 2, 3, 4].map((s) => (
                    <div 
                      key={s} 
                      className="step-indicator"
                      onClick={() => handleStepClick(s)}
                    >
                      <div className={`step-circle ${step >= s ? "active" : ""} ${step === s ? "current" : ""}`}>
                        {step > s ? "✓" : s}
                      </div>
                      <span className="step-label">
                        {s === 1 && "Account"}
                        {s === 2 && "Personal"}
                        {s === 3 && "Interests"}
                        {s === 4 && "Complete"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ILLUSTRATION - Fixed Size */}
            <div className="sidebar-illustration">
              <div className="illustration-container">
                <img 
                  src={images[step - 1]} 
                  alt="Step Illustration" 
                  className="illustration-img"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ================= FORM ================= */}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-content">
            {/* STEP 1 */}
            <div className={`form-step ${step === 1 ? 'active' : ''}`} data-step="1">
              <h2 className="form-step-title">Create Your Account</h2>
              
              <div className="input-group">
                <label htmlFor="fullName">Full Name *</label>
                <input 
                  type="text" 
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
              </div>
              
              <div className="input-group">
                <label htmlFor="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              
              <div className="input-group">
                <label htmlFor="password">Password *</label>
                <input 
                  type="password" 
                  id="password"
                  name="password"
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
                <div className="input-hint">
                  Use 8+ characters with letters, numbers & symbols
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div className={`form-step ${step === 2 ? 'active' : ''}`} data-step="2">
              <h2 className="form-step-title">Personal Information</h2>
              
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 123-4567" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>
                
                <div className="input-group">
                  <label htmlFor="age">Age *</label>
                  <input 
                    type="number" 
                    id="age"
                    name="age"
                    placeholder="25" 
                    min="13"
                    max="120"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={errors.age ? 'error' : ''}
                  />
                  {errors.age && <div className="error-message">{errors.age}</div>}
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="city">City *</label>
                <input 
                  type="text" 
                  id="city"
                  name="city"
                  placeholder="New York" 
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <div className="error-message">{errors.city}</div>}
              </div>
              
              <div className="input-group">
                <label>Gender (Optional)</label>
                <div className="gender-options">
                  {["Male", "Female", "Non-binary", "Prefer not to say"].map(gender => (
                    <button 
                      key={gender}
                      type="button"
                      className={`gender-option ${formData.gender === gender ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, gender }))}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div className={`form-step ${step === 3 ? 'active' : ''}`} data-step="3">
              <h2 className="form-step-title">Select Your Interests</h2>
              <p className="interests-description">Choose what you'd like to focus on. You can always change this later.</p>
              
              <div className="interests-grid">
                {interests.map(interest => (
                  <div 
                    key={interest.id}
                    className={`interest-card ${formData.interests.includes(interest.id) ? 'selected' : ''}`}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    <div className="interest-icon">{interest.icon}</div>
                    <div className="interest-label">{interest.label}</div>
                  </div>
                ))}
              </div>
              
              {errors.interests && <div className="error-message centered">{errors.interests}</div>}
              
              <div className="selection-summary">
                <span className="selection-count">{formData.interests.length}</span>
                <span className="selection-text">interests selected</span>
              </div>
            </div>

            {/* STEP 4 */}
            <div className={`form-step ${step === 4 ? 'active' : ''}`} data-step="4">
              <div className="completion-container">
                <div className="success-animation">
                  <div className="success-circle">
                    <span className="success-check">✓</span>
                  </div>
                </div>
                
                <h2 className="completion-title">Welcome to Calmind! 🎉</h2>
                <p className="completion-message">
                  Your personalized wellness space is ready. We're excited to accompany you on your journey to better mental health.
                </p>
                
                <div className="account-summary">
                  <h4>Account Summary</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span>Name</span>
                      <strong>{formData.fullName || "Not provided"}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Email</span>
                      <strong>{formData.email || "Not provided"}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Location</span>
                      <strong>{formData.city || "Not provided"}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Interests</span>
                      <strong>{formData.interests.length} selected</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM NAVIGATION */}
          <div className="form-navigation">
            <div className="nav-left">
              {step > 1 && (
                <button 
                  type="button"
                  className="nav-button prev-button" 
                  onClick={prevStep}
                >
                  ← Previous
                </button>
              )}
            </div>
            
            <div className="nav-center">
              <div className="step-dots">
                {[1, 2, 3, 4].map(s => (
                  <div 
                    key={s}
                    className={`step-dot ${step === s ? 'active' : ''}`}
                    onClick={() => handleStepClick(s)}
                  />
                ))}
              </div>
            </div>
            
            <div className="nav-right">
              {step < 4 ? (
                <button 
                  type="button"
                  className="nav-button next-button" 
                  onClick={nextStep}
                >
                  Continue →
                </button>
              ) : (
                <button 
                    type="submit"
                    className="nav-button submit-button"
                  >
                    Get Started ✓
                  </button>

              )}
            </div>
          </div>
          
          <div className="form-footer">
            <p>Already have an account? <a href="/login" className="footer-link">Sign in</a></p>
            <p className="privacy-note">
              By creating an account, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}