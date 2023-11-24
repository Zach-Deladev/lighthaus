import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

// Define interfaces for user data and credentials
interface UserData {
  name?: string;
  email: string;
  password: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

// Type the props of DataProvider
interface DataProviderProps {
  children: ReactNode;
}

interface UserProfileData {
  // Add properties for user profile data
}

// Define and export the DataContext type
export type DataContextType = {
  userData: UserData | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  authUser: (credentials: UserCredentials) => Promise<any>;
  logoutUser: () => void;
  registerUser: (userData: UserData) => Promise<any>;
  updateUserProfile: (profileData: UserProfileData) => Promise<any>;
};

const initialContext: DataContextType = {
  userData: null,
  isAuthenticated: false,
  setIsAuthenticated: () => {
    // Placeholder function
  },
  authUser: async (credentials: UserCredentials) => {},
  logoutUser: () => {},
  registerUser: async (userData: UserData) => {},
  updateUserProfile: async (profileData: UserProfileData) => {},
};

const DataContext = createContext<DataContextType>(initialContext);

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }: DataProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUserData = async () => {
    try {
      const jwt = Cookies.get("jwt");
      console.log("JWT from cookie:", jwt);

      if (jwt) {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.error(
            "Profile API Request failed with status:",
            response.status
          );
        } else {
          const userData = await response.json();
          console.log("UserData:", userData);
          setUserData(userData);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      setUserData(null);
      setIsAuthenticated(false);
    }
  };

  const authUser = async (credentials: UserCredentials) => {
    try {
      console.log(
        "Sending authentication request with credentials:",
        credentials
      );

      const response = await fetch("http://localhost:5000/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log("Received response from authentication API:", response);

      const data = await response.json();

      console.log("Authentication response data:", data);

      if (data.token) {
        Cookies.set("jwt", data.token, { expires: 7 });
        console.log("JWT token stored in cookies");
        fetchUserData();
      }

      return data;
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };

  const logoutUser = () => {
    Cookies.remove("jwt");
    setUserData(null);
    setIsAuthenticated(false);
  };

  const registerUser = async (userData: UserData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (profileData: UserProfileData) => {
    try {
      const jwt = Cookies.get("jwt");
      if (jwt) {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(profileData),
          }
        );

        const data = await response.json();
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const setIsAuthenticatedState = (value: boolean) => {
    setIsAuthenticated(value);
  };
  return (
    <DataContext.Provider
      value={{
        userData,
        isAuthenticated,
        authUser,
        setIsAuthenticated: setIsAuthenticatedState,
        logoutUser,
        registerUser,
        updateUserProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
