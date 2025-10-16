import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import UsernamePrompt from './UsernamePrompt';

interface AppWrapperProps {
  children: React.ReactNode;
}

/**
 * AppWrapper component that handles first-time user setup
 * Shows username prompt on first launch, then displays the app
 */
const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already set up their username
    const checkSetup = () => {
      const setupComplete = userService.isSetupComplete();
      setIsSetupComplete(setupComplete);
      setIsLoading(false);
    };

    checkSetup();
  }, []);

  const handleUsernameSet = (username: string) => {
    console.log(`Welcome, ${username}!`);
    setIsSetupComplete(true);
  };

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-content-light dark:text-content-dark">Cargando...</p>
        </div>
      </div>
    );
  }

  // Show username prompt if setup not complete
  if (!isSetupComplete) {
    return <UsernamePrompt onComplete={handleUsernameSet} />;
  }

  // Show main app once setup is complete
  return <>{children}</>;
};

export default AppWrapper;
