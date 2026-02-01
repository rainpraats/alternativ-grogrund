import { Link } from 'react-router';
import cornLogo from '../assets/corn.svg';
import logoutIcon from '../assets/logout.svg';
import type { User } from '../interfaces/User';

const Banner = ({ signedInUser }: { signedInUser: User }) => {
  console.log(signedInUser);
  return (
    <header>
      <span>
        <Link to='/' title='Return to homepage'>
          <img
            src={cornLogo}
            alt='alternativ grogrunds logo, a drawing of corn'
            height='64px'
            width='64px'
          />
        </Link>
      </span>
      <p className='displayUsername'>
        Signed in as:{' '}
        <span>
          {signedInUser.firstName} {signedInUser.lastName}
        </span>
      </p>
      <button
        title='log out'
        className='logoutButton'
        onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}
      >
        <img src={logoutIcon} alt='Log out button' height='24px' width='24px' />
      </button>
    </header>
  );
};

export default Banner;
