import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HeaderAuth = () => {
  const { t, i18n } = useTranslation('common');

  return (
    <div className='header-auth'>
      <div>
        <Link to='/'>
          <span className='logo logo__md'>Quiz Test</span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderAuth;
