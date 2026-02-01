import { Link, useOutletContext } from 'react-router';
import type { User } from '../interfaces/User';

const Navigation = () => {
  const { signedInUser } = useOutletContext<{ signedInUser: User }>();
  const role = signedInUser.role;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/account">Account</Link>
        </li>
        {(role === 'admin') && (
          <li>
            <Link to="/manage-users">Manage Users</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
