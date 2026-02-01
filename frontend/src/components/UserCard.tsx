import { useState } from 'react';
import type { User } from '../interfaces/User';
import { AdminService } from '../services/adminService';
import type { UserRole } from '../interfaces/UserRole';

const UserCard = ({
  user,
  fetchUsers,
}: {
  user: User;
  fetchUsers: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({ ...user });
  const [newPassword, setNewPassword] = useState('');
  const [deleteStatus, setDeleteStatus] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const deleteUser = async () => {
    try {
      await new AdminService().deleteUser(user.email);
      await fetchUsers();
    } catch (error) {
      console.error(error);
      setDeleteStatus('Failed to delete user.');
    }
  };

  const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUser = {
      ...editedUser,
      ...(newPassword && { password: newPassword }),
    };

    try {
      await new AdminService().editUser(user.email, updatedUser);
      setIsEditing(false);
      await fetchUsers();
    } catch (error) {
      console.error(error);
      setEditStatus('Failed to save changes.');
    }
  };

  const displayTemplate = (
    <>
      <p>
        <strong>Name:</strong> {user.firstName} {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Personnummer:</strong> {user.personnummer}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Address:</strong> {user.address.addressLine1},{' '}
        {user.address.locality} {user.address.postalCode}
      </p>
      <p>
        <strong>Member Since:</strong> {user.memberSince.toString()}
      </p>
      <button
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Edit
      </button>
      <button onClick={deleteUser}>Delete</button>
      {deleteStatus && <p>{deleteStatus}</p>}
    </>
  );

  const editTemplate = (
    <form onSubmit={handleSaveEdit}>
      <input
        type='text'
        value={editedUser.firstName}
        onChange={(e) =>
          setEditedUser({ ...editedUser, firstName: e.target.value })
        }
        placeholder='First Name'
        required
      />
      <input
        type='text'
        value={editedUser.lastName}
        onChange={(e) =>
          setEditedUser({ ...editedUser, lastName: e.target.value })
        }
        placeholder='Last Name'
        required
      />
      <input
        type='email'
        value={editedUser.email}
        onChange={(e) =>
          setEditedUser({ ...editedUser, email: e.target.value })
        }
        placeholder='Email'
        required
      />
      <input
        type='tel'
        value={editedUser.phone}
        onChange={(e) =>
          setEditedUser({ ...editedUser, phone: e.target.value })
        }
        placeholder='Phone'
        required
      />
      <input
        type='text'
        value={editedUser.personnummer}
        onChange={(e) =>
          setEditedUser({ ...editedUser, personnummer: e.target.value })
        }
        placeholder='Personnummer'
        required
      />
      <select
        value={editedUser.role}
        onChange={(e) =>
          setEditedUser({ ...editedUser, role: e.target.value as UserRole })
        }
        required
      >
        <option value='user'>User</option>
        <option value='admin'>Admin</option>
      </select>
      <input
        type='text'
        value={editedUser.address.addressLine1}
        onChange={(e) =>
          setEditedUser({
            ...editedUser,
            address: { ...editedUser.address, addressLine1: e.target.value },
          })
        }
        placeholder='Address'
        required
      />
      <input
        type='text'
        value={editedUser.address.locality}
        onChange={(e) =>
          setEditedUser({
            ...editedUser,
            address: { ...editedUser.address, locality: e.target.value },
          })
        }
        placeholder='Locality'
        required
      />
      <input
        type='text'
        value={editedUser.address.postalCode}
        onChange={(e) =>
          setEditedUser({
            ...editedUser,
            address: { ...editedUser.address, postalCode: e.target.value },
          })
        }
        placeholder='Postal Code'
        required
      />
      <input
        type='password'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder='Password'
      />
      <button type='submit'>Save</button>
      <button
        onClick={() => {
          setIsEditing(false);
        }}
      >
        Cancel
      </button>
      {editStatus && <p>{editStatus}</p>}
    </form>
  );
  return isEditing ? editTemplate : displayTemplate;
};

export default UserCard;
