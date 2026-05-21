import React, { useState } from 'react';
import { 
  FaSave, FaUndo, FaPlus, FaTrash, FaEdit,
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCalendarAlt, FaFileAlt, FaCheckCircle,
  FaExclamationCircle, FaArrowRight, FaUpload
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './AdvancedDynamicForm.css';

const AdvancedDynamicForm = () => {
  const initialFormState = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: ''
    },
    addressInfo: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    professionalInfo: {
      occupation: '',
      company: '',
      experience: '',
      skills: []
    },
    additionalInfo: {
      newsletter: false,
      termsAccepted: false
    }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const steps = [
    { id: 1, name: 'Personal Info', icon: FaUser },
    { id: 2, name: 'Address', icon: FaMapMarkerAlt },
    { id: 3, name: 'Professional', icon: FaFileAlt },
    { id: 4, name: 'Review', icon: FaCheckCircle }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.personalInfo.firstName) newErrors.firstName = 'First name required';
      if (!formData.personalInfo.lastName) newErrors.lastName = 'Last name required';
      if (!formData.personalInfo.email) newErrors.email = 'Email required';
      else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) newErrors.email = 'Invalid email';
      if (!formData.personalInfo.phone) newErrors.phone = 'Phone required';
      if (!formData.personalInfo.dateOfBirth) newErrors.dateOfBirth = 'Date of birth required';
    }
    
    if (step === 2) {
      if (!formData.addressInfo.street) newErrors.street = 'Street required';
      if (!formData.addressInfo.city) newErrors.city = 'City required';
      if (!formData.addressInfo.zipCode) newErrors.zipCode = 'Zip code required';
    }

    if (step === 3) {
      if (!formData.professionalInfo.occupation) newErrors.occupation = 'Occupation required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (validateStep(3)) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(initialFormState);
        setCurrentStep(1);
      }, 3000);
    }
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    // Clear error dynamically when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.professionalInfo.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        professionalInfo: {
          ...prev.professionalInfo,
          skills: [...prev.professionalInfo.skills, newSkill.trim()]
        }
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        skills: prev.professionalInfo.skills.filter(skill => skill !== skillToRemove)
      }
    }));
  };

  const handleReset = () => {
    if (window.confirm('Reset all form data?')) {
      setFormData(initialFormState);
      setCurrentStep(1);
      setErrors({});
    }
  };

  return (
    <div className="dynamic-form-page">
      <div className="form-container">
        {/* Header */}
        <div className="form-header">
          <h1 className="form-title">Advanced Dynamic Form</h1>
          <p className="form-subtitle">Multi-step form with validation and dynamic fields</p>
        </div>

        {/* Progress Steps */}
        <div className="form-steps">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div key={step.id} className={`step ${currentStep === step.id ? 'active' : currentStep > step.id ? 'completed' : ''}`}>
                <div className="step-number">
                  {currentStep > step.id ? <FaCheckCircle /> : <StepIcon />}
                </div>
                <div className="step-name">{step.name}</div>
                {index < steps.length - 1 && <div className="step-line"></div>}
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <GlassCard className="form-card">
          {submitted ? (
            <div className="success-message">
              <FaCheckCircle />
              <h3>Form Submitted Successfully!</h3>
              <p>Thank you for completing the form.</p>
            </div>
          ) : (
            <form onSubmit={currentStep === 4 ? handleSubmit : (e) => e.preventDefault()}>
              
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="form-step">
                  <h2 className="step-title">Personal Information</h2>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>First Name *</label>
                      <Input
                        value={formData.personalInfo.firstName}
                        onChange={(e) => handleChange('personalInfo', 'firstName', e.target.value)}
                        placeholder="Enter first name"
                        icon={FaUser}
                        error={errors.firstName}
                      />
                    </div>
                    <div className="form-field">
                      <label>Last Name *</label>
                      <Input
                        value={formData.personalInfo.lastName}
                        onChange={(e) => handleChange('personalInfo', 'lastName', e.target.value)}
                        placeholder="Enter last name"
                        icon={FaUser}
                        error={errors.lastName}
                      />
                    </div>
                    <div className="form-field">
                      <label>Email *</label>
                      <Input
                        type="email"
                        value={formData.personalInfo.email}
                        onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                        placeholder="Enter email"
                        icon={FaEnvelope}
                        error={errors.email}
                      />
                    </div>
                    <div className="form-field">
                      <label>Phone *</label>
                      <Input
                        value={formData.personalInfo.phone}
                        onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                        placeholder="Enter phone number"
                        icon={FaPhone}
                        error={errors.phone}
                      />
                    </div>
                    <div className="form-field">
                      <label>Date of Birth *</label>
                      <Input
                        type="date"
                        value={formData.personalInfo.dateOfBirth}
                        onChange={(e) => handleChange('personalInfo', 'dateOfBirth', e.target.value)}
                        icon={FaCalendarAlt}
                        error={errors.dateOfBirth}
                      />
                    </div>
                    <div className="form-field">
                      <label>Gender</label>
                      <select
                        value={formData.personalInfo.gender}
                        onChange={(e) => handleChange('personalInfo', 'gender', e.target.value)}
                        className="form-select"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address Info */}
              {currentStep === 2 && (
                <div className="form-step">
                  <h2 className="step-title">Address Information</h2>
                  <div className="form-grid">
                    <div className="form-field full-width">
                      <label>Street Address *</label>
                      <Input
                        value={formData.addressInfo.street}
                        onChange={(e) => handleChange('addressInfo', 'street', e.target.value)}
                        placeholder="Enter street address"
                        error={errors.street}
                      />
                    </div>
                    <div className="form-field">
                      <label>City *</label>
                      <Input
                        value={formData.addressInfo.city}
                        onChange={(e) => handleChange('addressInfo', 'city', e.target.value)}
                        placeholder="Enter city"
                        error={errors.city}
                      />
                    </div>
                    <div className="form-field">
                      <label>State</label>
                      <Input
                        value={formData.addressInfo.state}
                        onChange={(e) => handleChange('addressInfo', 'state', e.target.value)}
                        placeholder="Enter state"
                      />
                    </div>
                    <div className="form-field">
                      <label>ZIP Code *</label>
                      <Input
                        value={formData.addressInfo.zipCode}
                        onChange={(e) => handleChange('addressInfo', 'zipCode', e.target.value)}
                        placeholder="Enter ZIP code"
                        error={errors.zipCode}
                      />
                    </div>
                    <div className="form-field">
                      <label>Country</label>
                      <select
                        value={formData.addressInfo.country}
                        onChange={(e) => handleChange('addressInfo', 'country', e.target.value)}
                        className="form-select"
                      >
                        <option value="">Select country</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Professional Info */}
              {currentStep === 3 && (
                <div className="form-step">
                  <h2 className="step-title">Professional Information</h2>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Occupation *</label>
                      <Input
                        value={formData.professionalInfo.occupation}
                        onChange={(e) => handleChange('professionalInfo', 'occupation', e.target.value)}
                        placeholder="Enter occupation"
                        error={errors.occupation}
                      />
                    </div>
                    <div className="form-field">
                      <label>Company</label>
                      <Input
                        value={formData.professionalInfo.company}
                        onChange={(e) => handleChange('professionalInfo', 'company', e.target.value)}
                        placeholder="Enter company name"
                      />
                    </div>
                    <div className="form-field full-width">
                      <label>Skills</label>
                      <div className="skills-input-group">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          className="form-input-raw"
                        />
                        <button type="button" onClick={addSkill} className="add-skill-btn">
                          <FaPlus /> Add
                        </button>
                      </div>
                      <div className="skills-tags">
                        {formData.professionalInfo.skills.map(skill => (
                          <span key={skill} className="skill-tag">
                            {skill} <FaTrash onClick={() => removeSkill(skill)} />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review Details */}
              {currentStep === 4 && (
                <div className="form-step review-step">
                  <h2 className="step-title">Review Details</h2>
                  <div className="review-box">
                    <p><strong>Name:</strong> {formData.personalInfo.firstName} {formData.personalInfo.lastName}</p>
                    <p><strong>Email:</strong> {formData.personalInfo.email}</p>
                    <p><strong>City:</strong> {formData.addressInfo.city}</p>
                    <p><strong>Occupation:</strong> {formData.professionalInfo.occupation}</p>
                  </div>
                </div>
              )}

              {/* Navigation Action Controls */}
              <div className="form-actions">
                <Button type="button" variant="secondary" onClick={handleReset} icon={FaUndo}>
                  Reset
                </Button>
                <div className="right-actions">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={handlePrevious}>
                      Back
                    </Button>
                  )}
                  {currentStep < 4 ? (
                    <Button type="button" variant="primary" onClick={handleNext} icon={FaArrowRight}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" variant="success" icon={FaSave}>
                      Submit System
                    </Button>
                  )}
                </div>
              </div>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default AdvancedDynamicForm;