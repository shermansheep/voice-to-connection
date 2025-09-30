export interface User {
  userId: string;
  email: string;
  userType: 'elderly' | 'volunteer';
  profile: UserProfile;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  preferences: string[];
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  userType: 'elderly' | 'volunteer';
  profile: Omit<UserProfile, 'preferences'>;
}