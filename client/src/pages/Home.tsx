import styles from "./home.module.css";
import Footer from "../components/Footer";
import Events from "./Events";
import Music from "./Music";
const Home = () => {
  return (
    <>
      <div className={styles.homecont}>
        <Events onHome={true} />
        <Music onHome={true} />
      </div>

      <Footer />
    </>
  );
};

export default Home;
