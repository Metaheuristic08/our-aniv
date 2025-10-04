import React from 'react';
import { Link, useLocation } from 'react-router';

const NavigationFooter: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      icon: 'photo_library',
      label: 'Photos',
      exact: true
    },
    {
      path: '/timeline',
      icon: 'timeline',
      label: 'Timeline',
      exact: false
    },
    {
      path: '/mosaic',
      icon: 'grid_view',
      label: 'Mosaic',
      exact: false
    },
    {
      path: '/support',
      icon: 'favorite',
      label: 'Support',
      exact: false
    }
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <footer className="sticky bottom-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-subtle-light/20 dark:border-subtle-dark/20 safe-area-inset-bottom">
      <nav className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => {
          const active = isActive(item.path, item.exact);
          return (
            <Link
              key={item.path}
              className={`flex flex-col items-center gap-1 touch-manipulation min-w-0 flex-1 transition-colors ${
                active
                  ? 'text-primary'
                  : 'text-content-light/60 dark:text-content-dark/60 hover:text-content-light dark:hover:text-content-dark'
              }`}
              to={item.path}
            >
              <span className="material-symbols-outlined text-xl">
                {item.icon}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default NavigationFooter;