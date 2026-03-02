import type { User } from '../interfaces/User';
import Navigation from './Navigation/Navigation';

const Header = ({ signedInUser }: { signedInUser?: User }) => {
  return (
    <header>
      <Navigation signedInUser={signedInUser} />
    </header>
  );
};

export default Header;
