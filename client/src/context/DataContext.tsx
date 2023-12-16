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

// Define interface for user profile data
interface UserProfileData {}

// Define an interface for Event data
interface EventData {
  _id: string;
  user: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  startTime: string;
  endTime: string;
  ticketLink: string;
}

// Type the props of DataProvider
interface DataProviderProps {
  children: ReactNode;
}

// Define and export the DataContext type
export type DataContextType = {
  // User-related properties and methods
  userData: UserData | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  authUser: (credentials: UserCredentials) => Promise<void>;
  logoutUser: () => void;
  registerUser: (userData: UserData) => Promise<void>;
  updateUserProfile: (profileData: UserProfileData) => Promise<void>;

  // Event-related properties and methods
  events: EventData[];
  fetchEvents: () => Promise<void>;
  createEvent: (eventData: EventData) => Promise<void>;
  updateEvent: (eventId: string, eventData: EventData) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
};

// Initialize the context with default values
const initialContext: DataContextType = {
  // User related initializations
  userData: null,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  authUser: async () => {},
  logoutUser: () => {},
  registerUser: async () => {},
  updateUserProfile: async () => {},

  // Event related initializations
  events: [],
  fetchEvents: async () => {},
  createEvent: async () => {},
  updateEvent: async () => {},
  deleteEvent: async () => {},
};

// Create the DataContext
const DataContext = createContext<DataContextType>(initialContext);

// Hook to use DataContext in functional components
export function useData() {
  return useContext(DataContext);
}

// DataProvider component that provides data to its children
export function DataProvider({ children }: DataProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);

  // Function to fetch user data
  const fetchUserData = async () => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setIsAuthenticated(true);
      } else {
        setUserData(null);
        setIsAuthenticated(false);
      }
    }
  };

  // Function to authenticate user
  const authUser = async (credentials: UserCredentials) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const data = await response.json();
        Cookies.set("jwt", data.token, { expires: 7 });
        await fetchUserData();
        setIsAuthenticated(true);
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setIsAuthenticated(false);
    }
  };

  // Function to logout user
  const logoutUser = () => {
    Cookies.remove("jwt");
    setUserData(null);
    setIsAuthenticated(false);
  };

  // Function to register a new user
  const registerUser = async (userData: UserData) => {
    const response = await fetch("http://localhost:5000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const data = await response.json();
      Cookies.set("jwt", data.token, { expires: 7 });
      fetchUserData();
    }
  };

  // Function to update user profile
  const updateUserProfile = async (profileData: UserProfileData) => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        fetchUserData();
      }
    }
  };

  // Function to fetch events
  const fetchEvents = async () => {
    const response = await fetch("http://localhost:5000/api/events");
    if (response.ok) {
      const eventsData = await response.json();
      setEvents(eventsData);
    }
  };

  // Function to create a new event
  const createEvent = async (eventData: EventData) => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        fetchEvents();
      }
    }
  };

  // Function to update an existing event
  const updateEvent = async (eventId: string, eventData: EventData) => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      console.log(
        `Updating event at URL: http://localhost:5000/api/events/${eventId}`
      );

      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(eventData),
        }
      );
      if (response.ok) {
        const updatedEventData = await response.json();
        console.log("Updated Event:", updatedEventData); // Log the updated event data
        fetchEvents();
      }
    }
  };

  // Function to delete an event
  const deleteEvent = async (eventId: string) => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.ok) {
        fetchEvents();
      }
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        // User-related data and methods
        userData,
        isAuthenticated,
        authUser,
        setIsAuthenticated,
        logoutUser,
        registerUser,
        updateUserProfile,

        // Event-related data and methods
        events,
        fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
