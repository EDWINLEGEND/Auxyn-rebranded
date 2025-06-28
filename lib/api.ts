// API utility functions for Auxyn backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

// Types
export interface User {
  id: number;
  email: string;
  user_type: 'startup' | 'investor';
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface Startup {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  followers: number;
}

export interface StartupRating {
  id: number;
  rating: number;
  review_text: string;
  user_id: number;
  created_at: string;
}

export interface RatingsResponse {
  ratings: StartupRating[];
  average_rating: number;
  total_ratings: number;
}

// Storage utilities
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auxyn_token');
};

const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auxyn_token', token);
  }
};

const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auxyn_token');
    localStorage.removeItem('auxyn_user');
  }
};

const setUser = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auxyn_user', JSON.stringify(user));
  }
};

const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('auxyn_user');
  return userStr ? JSON.parse(userStr) : null;
};

// API helper function
const apiRequest = async (
  endpoint: string, 
  options: RequestInit = {}
): Promise<any> => {
  const token = getToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  register: async (email: string, password: string, userType: 'startup' | 'investor'): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        user_type: userType,
      }),
    });
    
    if (response.token) {
      setToken(response.token);
      setUser(response.user);
    }
    
    return response;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    
    if (response.token) {
      setToken(response.token);
      setUser(response.user);
    }
    
    return response;
  },

  verifyToken: async (): Promise<{ user: User }> => {
    return await apiRequest('/auth/verify-token');
  },

  logout: (): void => {
    removeToken();
  },

  getCurrentUser: (): User | null => {
    return getUser();
  },

  isAuthenticated: (): boolean => {
    return !!getToken();
  },
};

// Startup API
export const startupAPI = {
  getAll: async (): Promise<Startup[]> => {
    return await apiRequest('/startups');
  },

  getById: async (id: number): Promise<Startup> => {
    return await apiRequest(`/startups/${id}`);
  },

  create: async (name: string, description: string, category: string): Promise<{ message: string; id: number }> => {
    return await apiRequest('/startups', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        category,
      }),
    });
  },
};

// Rating API
export const ratingAPI = {
  rateStartup: async (startupId: number, rating: number, reviewText?: string): Promise<{ message: string }> => {
    return await apiRequest(`/startups/${startupId}/rate`, {
      method: 'POST',
      body: JSON.stringify({
        rating,
        review_text: reviewText || '',
      }),
    });
  },

  getStartupRatings: async (startupId: number): Promise<RatingsResponse> => {
    return await apiRequest(`/startups/${startupId}/ratings`);
  },
};

// Follow API
export const followAPI = {
  followStartup: async (startupId: number): Promise<{ message: string }> => {
    return await apiRequest(`/startups/${startupId}/follow`, {
      method: 'POST',
    });
  },

  unfollowStartup: async (startupId: number): Promise<{ message: string }> => {
    return await apiRequest(`/startups/${startupId}/follow`, {
      method: 'DELETE',
    });
  },

  getFollowerCount: async (startupId: number): Promise<{ startup_id: number; follower_count: number }> => {
    return await apiRequest(`/startups/${startupId}/followers`);
  },
};

// Matching API
export const matchingAPI = {
  generateMatches: async (limit?: number, forceRegenerate?: boolean): Promise<any> => {
    return await apiRequest('/matches/generate', {
      method: 'POST',
      body: JSON.stringify({
        limit: limit || 10,
        force_regenerate: forceRegenerate || false,
      }),
    });
  },

  getMatches: async (userId: number, statusFilter?: string, limit?: number): Promise<any> => {
    const params = new URLSearchParams();
    if (statusFilter) params.append('status', statusFilter);
    if (limit) params.append('limit', limit.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return await apiRequest(`/matches/${userId}${query}`);
  },

  getMatchDetails: async (matchId: number): Promise<any> => {
    return await apiRequest(`/matches/${matchId}`);
  },

  updateMatchInterest: async (matchId: number, interest: 'interested' | 'not_interested' | 'pending'): Promise<any> => {
    return await apiRequest(`/matches/${matchId}/interest`, {
      method: 'PUT',
      body: JSON.stringify({ interest }),
    });
  },

  markMatchViewed: async (matchId: number): Promise<any> => {
    return await apiRequest(`/matches/${matchId}/view`, {
      method: 'POST',
    });
  },
};

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
};

// Export utilities for components
export { getToken, getUser, setUser, removeToken }; 