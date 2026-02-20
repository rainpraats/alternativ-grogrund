import { Link } from 'react-router';
import cornLogo from '../assets/corn.svg';
import logoutIcon from '../assets/logout.svg';
import type { User } from '../interfaces/User';

const Banner = ({ signedInUser }: { signedInUser?: User }) => {
  console.log(signedInUser);
  return (
    <header>
      <span>
        <Link to='/' title='Återgå till startsidan'>
          <img
            src={cornLogo}
            alt='alternativ grogrunds logo, a drawing of corn'
            height='64px'
            width='64px'
          />
        </Link>
      </span>
      {signedInUser ? (
        <>
          <p className='displayUsername'>
            Signed in as:{' '}
            <span>
              {signedInUser.firstName} {signedInUser.lastName}
            </span>
          </p>
          <button
            title='logga ut'
            className='logoutButton'
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
          >
            <img
              src={logoutIcon}
              alt='Log out button'
              height='24px'
              width='24px'
            />
          </button>
        </>
      ) : (
        <>
          <button
            title='Logga in'
            className='bannerLoginButton'
            onClick={() => {
              window.location.href = '/login ';
            }}
          >
            Logga in
          </button>
          <button
            title='Bli medlem'
            className='bannerBecomeMemberButton'
            onClick={() => {
              window.location.href = '/signup';
            }}
          >
            Bli medlem
          </button>
        </>
      )}
    </header>
  );
};

export default Banner;
