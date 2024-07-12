import image from "./notfound.png";
import styles from "./Page.module.css";

function Page404() {
  return (
    <div className={styles.container}>
      <img className={styles.notfound} src={image} alt="Not-Found" />
    </div>
  );
}

export default Page404;
