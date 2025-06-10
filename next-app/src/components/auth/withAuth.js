"use client";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent, options = {}) => {
  const { requireAuth = true, allowedRoles = ['user', 'admin'], redirectTo = '/login' } = options;

  return function AuthenticatedComponent(props) {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        // Check if authentication is required
        if (requireAuth && !isAuthenticated()) {
          router.push(redirectTo);
          return;
        }

        // Check role-based access
        if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          // Redirect based on user role
          const userRedirect = user.role === 'admin' ? '/dashboard-admin' : '/user';
          router.push(userRedirect);
          return;
        }
      }
    }, [user, loading, router]);

    // Show loading spinner while checking auth
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    // Show nothing while redirecting
    if (requireAuth && !isAuthenticated()) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      );
    }

    // Check role access
    if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-gray-600">Redirecting...</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;