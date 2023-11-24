import { useData } from "../context/DataContext";
import LoginForm from "../components/LoginForm";
import styles from "./home.module.css";
import Footer from "../components/Footer";

const Home = () => {
  const { userData, isAuthenticated, setIsAuthenticated } = useData();
  // Define the function to handle successful login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  return (
    <>
      <div className={styles.homecont}>
        {/* Check if the user is authenticated */}
        {isAuthenticated ? (
          <div>
            {/* Display user data */}
            <div>
              <h2>User Profile:</h2>
              <pre>{JSON.stringify(userData, null, 2)}</pre>
            </div>
          </div>
        ) : (
          <div>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            {/* Display a message prompting the user to log in */}
            <h1>Please log in to view user data.</h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
