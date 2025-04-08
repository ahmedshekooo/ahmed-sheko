
import React, { useEffect } from "react";
import { initEmailJS } from "../utils/emailService";
import ContactForm from "../components/ContactForm";

const Index = () => {
  useEffect(() => {
    // Initialize EmailJS when component mounts
    // Replace with your actual user ID from EmailJS
    initEmailJS("YOUR_USER_ID");
  }, []);

  return (
    <div className="app-container">
      {/* The index.html content is served directly */}
      {/* Add this at the end of the contact form section in index.html: */}
      {/*
        <script type="text/javascript">
          document.getElementById('root').style.display = 'block';
        </script>
      */}
    </div>
  );
};

export default Index;
