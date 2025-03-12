import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

const UserStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      setUserName(user);
    }
  }, []);
  return (
    <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
      <span className="font-mono text-xl">
        {isLoggedIn ? userName : t('connect')}
      </span>
    </div>
  );
};

export default UserStatus;