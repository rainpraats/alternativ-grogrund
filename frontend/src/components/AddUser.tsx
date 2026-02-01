import { useRef, useState } from 'react';
import { AdminService } from '../services/adminService';
import { type Credentials } from '../interfaces/Credentials';
import { type UserRole } from '../interfaces/UserRole';

const AddUser = ({ fetchUsers }: { fetchUsers: () => void }) => {
  const [status, setStatus] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const createNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newUser: Credentials = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      personnummer: formData.get('personnummer') as string,
      role: formData.get('role') as UserRole,
      password: formData.get('password') as string,
      address: {
        addressLine1: formData.get('addressLine1') as string,
        locality: formData.get('locality') as string,
        postalCode: formData.get('postalCode') as string,
      },
    };

    try {
      const user = await new AdminService().createUser(newUser);

      if (!user) {
        setStatus('A problem occurred when creating a user.');
        return;
      }
      await fetchUsers();
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
      setStatus('A problem occurred when creating a user.');
    }
  };

  return (
    <form className='addUserForm' onSubmit={createNewUser} ref={formRef}>
      <h2>Add users:</h2>
      <div>
        <label htmlFor='firstName'>First Name:</label>
        <input type='text' name='firstName' required />
      </div>
      <div>
        <label htmlFor='lastName'>Last Name:</label>
        <input type='text' name='lastName' required />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input type='email' name='email' required />
      </div>
      <div>
        <label htmlFor='phone'>Phone:</label>
        <input type='tel' name='phone' required />
      </div>
      <div>
        <label htmlFor='personnummer'>Personnummer:</label>
        <input type='text' name='personnummer' required />
      </div>
      <div>
        <label htmlFor='role'>Role:</label>
        <select name='role' required>
          <option value=''>Select a role</option>
          <option value='user'>User</option>
          <option value='admin'>Admin</option>
        </select>
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input type='text' name='password' required />
      </div>
      <div>
        <label htmlFor='addressLine1'>Address:</label>
        <input type='text' name='addressLine1' required />
      </div>
      <div>
        <label htmlFor='locality'>Locality:</label>
        <input type='text' name='locality' required />
      </div>
      <div>
        <label htmlFor='postalCode'>Postal Code:</label>
        <input type='text' name='postalCode' required />
      </div>
      <button type='submit'>Add User</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default AddUser;
