import API_BASE_URL from '../config/api';

interface ApiResponse<T> {
  statusCode: number;
  data?: T;
}

export class EmailService {
  async sendEmailToAllMembers(
    subject: string,
    message: string,
    scheduledAt?: string,
  ) {
    const token = localStorage.getItem('JWT');

    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/email/`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, message, scheduledAt }),
      });

      const result: ApiResponse<null> = await response.json();

      if (response.ok) {
        return { statusCode: result.statusCode };
      }
      return { statusCode: result.statusCode };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async contactRequest(contactRequestData: {
    name: string;
    emailAddress: string;
    message: string;
  }) {
    try {
      const response = await fetch(`${API_BASE_URL}/email/contact-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactRequestData),
      });

      const result: ApiResponse<null> = await response.json();

      if (response.ok) {
        return { statusCode: result.statusCode };
      }
      return { statusCode: result.statusCode };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
