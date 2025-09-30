import { Amplify, Auth } from 'aws-amplify';
import { User, LoginCredentials, RegisterData } from '../types/auth';

// AWS Amplify 配置
const amplifyConfig = {
  Auth: {
    region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    mandatorySignIn: true
  }
};

Amplify.configure(amplifyConfig);

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const cognitoUser = await Auth.signIn(credentials.email, credentials.password);
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      
      localStorage.setItem('authToken', token);
      
      // 獲取用戶詳細資料
      const userAttributes = await Auth.currentUserInfo();
      
      return {
        userId: cognitoUser.username,
        email: credentials.email,
        userType: userAttributes.attributes['custom:userType'],
        profile: {
          name: userAttributes.attributes.name,
          phone: userAttributes.attributes.phone_number,
          address: userAttributes.attributes['custom:address'],
          location: JSON.parse(userAttributes.attributes['custom:location'] || '{}'),
          preferences: JSON.parse(userAttributes.attributes['custom:preferences'] || '[]')
        },
        createdAt: userAttributes.attributes.created_at,
        updatedAt: userAttributes.attributes.updated_at
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('登入失敗，請檢查您的帳號密碼');
    }
  },

  async register(data: RegisterData): Promise<User> {
    try {
      const { user } = await Auth.signUp({
        username: data.email,
        password: data.password,
        attributes: {
          email: data.email,
          name: data.profile.name,
          phone_number: data.profile.phone,
          'custom:userType': data.userType,
          'custom:address': data.profile.address,
          'custom:location': JSON.stringify(data.profile.location)
        }
      });

      // 註冊成功後自動登入
      return await this.login({
        email: data.email,
        password: data.password
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('註冊失敗，請稍後再試');
    }
  },

  async logout(): Promise<void> {
    try {
      await Auth.signOut();
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const userAttributes = await Auth.currentUserInfo();
      
      return {
        userId: cognitoUser.username,
        email: userAttributes.attributes.email,
        userType: userAttributes.attributes['custom:userType'],
        profile: {
          name: userAttributes.attributes.name,
          phone: userAttributes.attributes.phone_number,
          address: userAttributes.attributes['custom:address'],
          location: JSON.parse(userAttributes.attributes['custom:location'] || '{}'),
          preferences: JSON.parse(userAttributes.attributes['custom:preferences'] || '[]')
        },
        createdAt: userAttributes.attributes.created_at,
        updatedAt: userAttributes.attributes.updated_at
      };
    } catch (error) {
      return null;
    }
  },

  async resetPassword(email: string): Promise<void> {
    try {
      await Auth.forgotPassword(email);
    } catch (error) {
      console.error('Reset password error:', error);
      throw new Error('密碼重置失敗');
    }
  }
};