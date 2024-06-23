import Lottie from "lottie-react";
import "./hero.css";
import devAnimation from "../../animation/dev/dev.json";
import { useRef } from "react";
import { motion } from "framer-motion";
import image from "./image/me.png";

const Hero = () => {
  const lottieRef = useRef();
  return (
    <section className="hero flex">
      <div className="left-section">
        <div className="parent-avtar flex">
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1.1)" }}
            transition={{ damping: 6, type: "spring", stiffness: 100 }}
            src={image}
            className="avtar"
            alt=""
          />
          <div className="icon-verified"></div>
        </div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="title"
        >
          Software Developer | Frontend Developer React js || Next js
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="subTitle"
        >
          Im Abdullah Hosny, a React.js software developer with 1 years of
          experience , based in Egypt. Im passionate about crafting visually
          appealing and responsive web applications, leveraging my expertise in
          front-end development and proficiency in technologies like React.js,
          Next.js, TypeScript, Redux, Material-UI, React Bootstrap, and Tailwind
          CSS. My focus areas include consistent styling, layout and grid
          systems, typography, color schemes, component libraries, animation and
          transitions, and the use of high-quality images and icons.
        </motion.p>
        <link></link>
        <div className="all-icons flex">
          <a href="/">
            <i className="icon icon-twitter"></i>
          </a>

          <a href="https://www.instagram.com/yoneee6/">
            <i className="icon icon-instagram"></i>
          </a>

          <a href="https://github.com/Abdullahhosny58">
            <i className="icon icon-github"></i>
          </a>

          <a href="https://www.linkedin.com/in/abdalluh-hosny-4a0852233/">
            <i className="icon icon-linkedin"></i>
          </a>
        </div>
      </div>

      <div className="right-section animation ">
        <Lottie
          lottieRef={lottieRef}
          className=""
          onLoadedImages={() => {
            // @ts-ignore
            // https://lottiereact.com/
            lottieRef.current.setSpeed(0.5);
          }}
          animationData={devAnimation}
        />
      </div>
    </section>
  );
};

export default Hero;
