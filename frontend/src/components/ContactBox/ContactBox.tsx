import { useState } from 'react';
import styles from './ContactBox.module.css';

const ContactBox = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Add your API call here
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Namn'
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type='email'
        placeholder='Emailaddress'
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <textarea
        placeholder='Skriv ditt meddelande här...'
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      ></textarea>
      <button type='submit'>Skicka</button>
    </form>
  );
};

export default ContactBox;
