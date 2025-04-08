
import emailjs from '@emailjs/browser';

// Initialize emailJS with your user ID (this would typically be done in a component or on app start)
export const initEmailJS = (userID: string) => {
  emailjs.init(userID);
};

export const sendContactEmail = async (
  name: string, 
  email: string, 
  message: string, 
  templateId: string
) => {
  try {
    const response = await emailjs.send(
      'service_ahmed', // Your Gmail service ID
      templateId, // Email template ID from emailJS
      {
        from_name: name,
        reply_to: email,
        message: message,
      }
    );
    
    return { success: true, response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
