import { useState, useEffect } from 'react';

const UserStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

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
        {isLoggedIn ? userName : 'Se connecter'}
      </span>
    </div>
  );
};

export default UserStatus;