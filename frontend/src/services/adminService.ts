import API_BASE_URL from '../config/api';
import { type Credentials } from '../interfaces/Credentials';

export class AdminService {
  async createUser({
    firstName,
    lastName,
    role,
    password,
    email,
    phone,
    address,
    personnummer,
  }: Credentials) {
    const token = localStorage.getItem('JWT');

    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          role,
          password,
          email,
          phone,
          address,
          personnummer,
        }),
      });

      const { success } = await response.json();
      return success;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getUsers() {
    const token = localStorage.getItem('JWT');

    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const { data } = await response.json();
      return data.users;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteUser(email: string) {
    const token = localStorage.getItem('JWT');

    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        console.error('Network response was not ok');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async editUser(email: string, updatedUser: Credentials) {
    const token = localStorage.getItem('JWT');

    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, updatedUser }),
      });

      if (response.ok) {
        const { success } = await response.json();
        return success;
      } else {
        console.error('Network response was not ok');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
