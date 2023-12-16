import styles from "./home.module.css";
import Events from "./Events";
import Music from "./Music";
import video from "../assets/lighthaus_.mp4";
import logoImage from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpotify,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <video className={styles.backgroundVideo} autoPlay muted loop>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.socialMediaIcons}>
        <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon
            icon={faSpotify}
            style={{ fontSize: "36px", color: "green" }}
          />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            style={{ fontSize: "36px", color: "white" }}
          />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon
            icon={faYoutube}
            style={{ fontSize: "32px", color: "red" }}
          />
        </a>
      </div>
      <div className={styles.logo}>
        <img src={logoImage} alt="Logo" />
      </div>

      <div id={styles.cont} className="mx-auto max-w-7xl">
        <Events onHome={true} />
        <Music />
      </div>
    </div>
  );
};

export default Home;
