import { useState } from 'react';
import styles from './ContactBox.module.css';
import { EmailService } from '../../services/emailService';

const ContactBox = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
    message: '',
    isSubmitting: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setFormData({ ...formData, isSubmitting: true });
    console.log(formData);
    const { name, emailAddress, message } = formData;
    try {
      await new EmailService().contactRequest({ name, emailAddress, message });
      setFormData({ ...formData, name: '', emailAddress: '', message: '' });
    } catch (error) {
      setErrorMessage(
        'Kunde inte skicka meddelande. Vänligen försök igen senare.',
      );
    } finally {
      setFormData({ ...formData, isSubmitting: false });
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Ditt namn'
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        disabled={formData.isSubmitting}
      />
      <input
        type='email'
        placeholder='Emailadress'
        onChange={(e) =>
          setFormData({ ...formData, emailAddress: e.target.value })
        }
        disabled={formData.isSubmitting}
      />
      <textarea
        placeholder='Skriv ditt meddelande här...'
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        disabled={formData.isSubmitting}
      ></textarea>
      <button type='submit' disabled={formData.isSubmitting}>
        Skicka
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default ContactBox;
