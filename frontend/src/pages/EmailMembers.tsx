import { useState } from 'react';
import { EmailService } from '../services/emailService';

const EmailMembers = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    scheduledAt: '',
    isSubmitting: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setFormData({ ...formData, isSubmitting: true });
    const { subject, message, scheduledAt } = formData;
    try {
      await new EmailService().sendEmailToAllMembers(
        subject,
        message,
        scheduledAt || new Date().toISOString(),
      );
      setFormData({ ...formData, subject: '', message: '', scheduledAt: '' });
    } catch (error) {
      setErrorMessage(
        'Kunde inte skicka meddelande. Vänligen försök igen senare.',
      );
    } finally {
      setFormData({ ...formData, isSubmitting: false });
    }
  };

  return (
    <main>
      <h2>Mailutskick till alla medlemmar</h2>
      <p>
        Här kan du skriva massutskick som levereras till alla medlemmar på deras
        mailadresser.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Titel'
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          disabled={formData.isSubmitting}
          required
        />
        <textarea
          placeholder='Skriv ditt meddelande här...'
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          disabled={formData.isSubmitting}
          required
        ></textarea>
        <article>
          <p>Schemalägg utskick</p>
          <p>
            Ange datum och tid för att schemalägga utskick. Har datumet redan
            passerat, eller om inget datum anges, skickas meddelandet
            omedelbart.
          </p>
        </article>
        <input
          type='datetime-local'
          value={formData.scheduledAt}
          onChange={(e) =>
            setFormData({ ...formData, scheduledAt: e.target.value })
          }
          disabled={formData.isSubmitting}
        />
        <button type='submit' disabled={formData.isSubmitting}>
          Skicka
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </main>
  );
};

export default EmailMembers;
