
import React, { useState, FormEvent } from 'react';
import { sendContactEmail } from '../utils/emailService';

interface ContactFormProps {
  templateId: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ templateId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      setFormStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      const result = await sendContactEmail(name, email, message, templateId);
      
      if (result.success) {
        setFormStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.'
        });
        // Reset form
        setName('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Your Name</label>
        <input 
          type="text" 
          id="name" 
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Your Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea 
          id="message" 
          name="message" 
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      
      {formStatus.type && (
        <div className={`form-status ${formStatus.type}`}>
          {formStatus.message}
        </div>
      )}
      
      <button 
        type="submit" 
        className="btn primary" 
        disabled={isSending}
      >
        {isSending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
