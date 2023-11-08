import Video from "../components/Video";
// import Events from "./Events";
import Music from "./Music";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.homecont}>
      <Video />
      {/* <Events onHome={true} /> */}
      <Music onHome={true} />
    </div>
  );
};

export default Home;
