import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/authentication';
import { useNavigate } from 'react-router-dom';
import { setAuthenticated } from '../toolkit/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';

const WithAuth = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { authenticated } = useSelector((store) => store.authSlice);

  useEffect(() => {
    let isMounted = true; // ✅ prevent state updates if component unmounts
    
    const checkAuth = async () => {
      try {
        const user = await getUserData();
        if (isMounted && user) {
          dispatch(setAuthenticated(true));
        } else {
          navigate('/login', { replace: true });
        }
      } catch (err) {
        if (isMounted) {
          navigate('/login', { replace: true });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <span className="w-10 h-10 rounded-full border-4 border-indigo-600 border-l-transparent animate-spin"></span>
      </div>
    );
  }

  if (!authenticated) return null; // redirect in useEffect, so no flicker

  return <>{children}</>;
};

export default WithAuth;
