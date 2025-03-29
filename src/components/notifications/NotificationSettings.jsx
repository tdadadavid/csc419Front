import React, { useState, useEffect } from 'react';
import api from '../../services/axios';
import { toast } from 'react-toastify';
import './NotificationSettings.css';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email_enabled: true,
    email_timing: 'same_day_morning',
    email_template: '',
    sms_enabled: true,
    sms_timing: 'same_day_morning',
    sms_template: '',
    admin_reminders: true,
    weekly_digest: false
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [testEmail, setTestEmail] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [sendingTestEmail, setSendingTestEmail] = useState(false);
  const [sendingTestSms, setSendingTestSms] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await api.get('/notifications/settings');
        setSettings(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching notification settings:', err);
        setError('Failed to load notification settings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      await api.post('/notifications/settings', settings);
      toast.success('Notification settings updated successfully');
    } catch (error) {
      console.error('Error saving notification settings:', error);
      toast.error('Failed to update notification settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSendTestEmail = async (e) => {
    e.preventDefault();
    
    if (!testEmail) {
      toast.error('Please enter an email address');
      return;
    }
    
    try {
      setSendingTestEmail(true);
      await api.post('/notifications/test-email', { email: testEmail });
      toast.success('Test email sent successfully');
      setTestEmail('');
    } catch (error) {
      console.error('Error sending test email:', error);
      toast.error('Failed to send test email');
    } finally {
      setSendingTestEmail(false);
    }
  };

  const handleSendTestSms = async (e) => {
    e.preventDefault();
    
    if (!testPhone) {
      toast.error('Please enter a phone number');
      return;
    }
    
    try {
      setSendingTestSms(true);
      await api.post('/notifications/test-sms', { phone: testPhone });
      toast.success('Test SMS sent successfully');
      setTestPhone('');
    } catch (error) {
      console.error('Error sending test SMS:', error);
      toast.error('Failed to send test SMS');
    } finally {
      setSendingTestSms(false);
    }
  };

  if (loading) {
    return (
      <div className="settings-loading">
        <div className="loading-spinner"></div>
        <p>Loading notification settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="settings-error">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="notification-settings-container">
      <div className="notification-settings-header">
        <h1>Notification Settings</h1>
        <p>Configure how and when birthday notifications are sent to staff members.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-grid">
          {/* Email Notifications */}
          <div className="settings-card">
            <div className="card-header">
              <h2>Email Notifications</h2>
              <div className="toggle-container">
                <label className="toggle">
                  <input
                    type="checkbox"
                    name="email_enabled"
                    checked={settings.email_enabled}
                    onChange={handleChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="card-content">
              <div className="form-group">
                <label>Email Timing</label>
                <select
                  name="email_timing"
                  value={settings.email_timing}
                  onChange={handleChange}
                  disabled={!settings.email_enabled}
                  className="form-control"
                >
                  <option value="same_day_morning">On birthday (Morning)</option>
                  <option value="same_day_afternoon">On birthday (Afternoon)</option>
                  <option value="day_before_morning">Day before (Morning)</option>
                  <option value="day_before_afternoon">Day before (Afternoon)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Default Email Template</label>
                <textarea
                  name="email_template"
                  value={settings.email_template}
                  onChange={handleChange}
                  disabled={!settings.email_enabled}
                  className="form-control"
                  rows="4"
                  placeholder="Use [name] as a placeholder for the staff member's name"
                ></textarea>
                <div className="template-hint">
                  <i className="fas fa-info-circle"></i>
                  <span>Use [name] as a placeholder for the staff member's name</span>
                </div>
              </div>
              
              <div className="test-notification">
                <h3>Send Test Email</h3>
                <div className="test-form">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="Enter email address"
                    disabled={sendingTestEmail || !settings.email_enabled}
                    className="form-control"
                  />
                  <button
                    type="button"
                    onClick={handleSendTestEmail}
                    disabled={sendingTestEmail || !settings.email_enabled || !testEmail}
                    className="test-button"
                  >
                    {sendingTestEmail ? (
                      <>
                        <div className="button-spinner"></div> Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i> Send
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* SMS Notifications */}
          <div className="settings-card">
            <div className="card-header">
              <h2>SMS Notifications</h2>
              <div className="toggle-container">
                <label className="toggle">
                  <input
                    type="checkbox"
                    name="sms_enabled"
                    checked={settings.sms_enabled}
                    onChange={handleChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="card-content">
              <div className="form-group">
                <label>SMS Timing</label>
                <select
                  name="sms_timing"
                  value={settings.sms_timing}
                  onChange={handleChange}
                  disabled={!settings.sms_enabled}
                  className="form-control"
                >
                  <option value="same_day_morning">On birthday (Morning)</option>
                  <option value="same_day_afternoon">On birthday (Afternoon)</option>
                  <option value="day_before_morning">Day before (Morning)</option>
                  <option value="day_before_afternoon">Day before (Afternoon)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Default SMS Template</label>
                <textarea
                  name="sms_template"
                  value={settings.sms_template}
                  onChange={handleChange}
                  disabled={!settings.sms_enabled}
                  className="form-control"
                  rows="4"
                  placeholder="Use [name] as a placeholder for the staff member's name"
                ></textarea>
                <div className="template-hint">
                  <i className="fas fa-info-circle"></i>
                  <span>Keep SMS messages under 160 characters</span>
                </div>
              </div>
              
              <div className="test-notification">
                <h3>Send Test SMS</h3>
                <div className="test-form">
                  <input
                    type="tel"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    placeholder="Enter phone number"
                    disabled={sendingTestSms || !settings.sms_enabled}
                    className="form-control"
                  />
                  <button
                    type="button"
                    onClick={handleSendTestSms}
                    disabled={sendingTestSms || !settings.sms_enabled || !testPhone}
                    className="test-button"
                  >
                    {sendingTestSms ? (
                      <>
                        <div className="button-spinner"></div> Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-comment-dots"></i> Send
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* System Notifications */}
          <div className="settings-card full-width">
            <div className="card-header">
              <h2>System Notifications</h2>
            </div>
            
            <div className="card-content system-settings">
              <div className="system-setting-item">
                <div className="setting-info">
                  <h3>Admin Birthday Reminders</h3>
                  <p>Send daily reminders to administrators about today's birthdays</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle">
                    <input
                      type="checkbox"
                      name="admin_reminders"
                      checked={settings.admin_reminders}
                      onChange={handleChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="system-setting-item">
                <div className="setting-info">
                  <h3>Weekly Birthday Digest</h3>
                  <p>Send a weekly summary of upcoming birthdays (sent every Monday)</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle">
                    <input
                      type="checkbox"
                      name="weekly_digest"
                      checked={settings.weekly_digest}
                      onChange={handleChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            className="save-settings-button"
            disabled={saving}
          >
          {saving ? (
              <>
                <div className="button-spinner"></div> Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i> Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;