/**
 * User Service
 * Manages username storage using localStorage
 * Username is set once on first app launch and cannot be changed unless app is reinstalled
 */

const USERNAME_KEY = 'anniversary_app_username';
const USER_SETUP_COMPLETE_KEY = 'anniversary_app_setup_complete';

class UserService {
  /**
   * Check if user has completed initial setup (set username)
   */
  isSetupComplete(): boolean {
    return localStorage.getItem(USER_SETUP_COMPLETE_KEY) === 'true';
  }

  /**
   * Get the stored username
   */
  getUsername(): string | null {
    return localStorage.getItem(USERNAME_KEY);
  }

  /**
   * Set username for the first time
   * This can only be called once - subsequent calls will be ignored
   */
  setUsername(username: string): boolean {
    // Check if already set
    if (this.isSetupComplete()) {
      console.warn('Username already set. Cannot change unless app is reinstalled.');
      return false;
    }

    // Validate username
    const trimmedUsername = username.trim();
    if (!trimmedUsername || trimmedUsername.length === 0) {
      throw new Error('Username cannot be empty');
    }

    if (trimmedUsername.length > 50) {
      throw new Error('Username must be less than 50 characters');
    }

    // Set username and mark setup as complete
    localStorage.setItem(USERNAME_KEY, trimmedUsername);
    localStorage.setItem(USER_SETUP_COMPLETE_KEY, 'true');
    
    return true;
  }

  /**
   * Check if username exists (for backward compatibility)
   */
  hasUsername(): boolean {
    return this.getUsername() !== null && this.isSetupComplete();
  }

  /**
   * Clear all user data (for testing/development only)
   * In production, this only happens when app is reinstalled
   */
  clearUserData(): void {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(USER_SETUP_COMPLETE_KEY);
  }
}

export const userService = new UserService();
