import { useState } from "react";
import "./mainStyle.css";
import image1 from "../../../public/images/Admin-Dashboard.jpg";
import image2 from "../../../public/images/React-Ecommerce-Project-With-Backend.jpg";
import image4 from "../../../public/images/Travel-Site.png";
import image5 from "../../../public/images/Product-Management-System.png";
import image6 from "../../../public/images/image-ed.png";
import image7 from "../../../public/images/hang-man.png";
import image8 from "../../../public/images/iphone-store.png";
import image9 from "../../../public/images/Kasper.png";
import image10 from "../../../public/images/bondi.png";
import image11 from "../../../public/images/leone.png";
import baytAlebaaTask from "../../../public/images/baytAlebaaTask.png";
import valorantStore from "../../../public/images/valorantStore.png";
import ocean from "../../../public/images/ocean.png";
import digitalMarketplace from "../../../public/images/Digital Marketplace.png";

import fitnessApplication from "../../../public/images/Fitness Application.png";

import { AnimatePresence, motion } from "framer-motion";
const myPojects = [
  {
    id: 1,
    projectTitle: "Digital Marketplace",
    subTitle:
      "Digital Marketplace focusing on user experience, and performance optimization with Next.js 14, TypeScript , React, tRPC, Tailwind Css, MongoDB, Payload ",
    categry: "Next",
    imgPath: digitalMarketplace,

    linkGhup: "https://github.com/Abdullahhosny58/Digital-Marketplace",
    link: "https://github.com/Abdullahhosny58/Digital-Marketplace",
  },

  {
    id: 2,
    projectTitle: "React Ecommerce, Backend",
    subTitle:
      "E-commerce app, focusing on user experience, and performance optimization Frontend In: React.js, MUI, Redux, Framer Motion Backend In: Strapi framework",
    categry: "react",
    imgPath: image2,
    linkGhup:
      "https://github.com/Abdullahhosny58/React-E-commerce-project-with-Backend",
    link: "https://github.com/Abdullahhosny58/React-E-commerce-project-with-Backend",
  },

  {
    id: 3,
    projectTitle: "Animation AirPods",
    subTitle:
      "Animation AirPodsfocusing on user experience, and performance optimization Frontend In: React.js, MUI, , Framer Motion ",
    categry: "react",
    imgPath: baytAlebaaTask,

    linkGhup: "https://github.com/Abdullahhosny58/baytAlebaaTask",
    link: "https://bayt-alebaa-task.vercel.app/",
  },

  {
    id: 4,
    projectTitle: "Ocean landing page",
    subTitle:
      "Ocean landing page on user experience, and performance optimization Frontend In: Next.js 14, TypeScript ,Tailwind Css ,Framer Motion ",
    categry: "Next",
    imgPath: ocean,

    linkGhup: "https://github.com/Abdullahhosny58/Ocean",
    link: "https://ocean-sigma.vercel.app/",
  },

  // ================================================

  {
    id: 5,
    projectTitle: "Fitness Application",
    subTitle:
      "Fitness Application on user experience, and performance optimization Frontend In: React.js,TypeScript, Tailwind Css, , Framer Motion ",
    categry: "react",
    imgPath: fitnessApplication,

    linkGhup: "https://github.com/Abdullahhosny58/FitnessApplication",
    link: "https://fitness-application-ashy.vercel.app/",
  },

  {
    id: 6,
    projectTitle: "Admin Dashboard",
    subTitle:
      "Admin dashboard with user-friendly interface, Nivo charts fordynamic data visualization, and FullCalendar for scheduling and event management",
    categry: "react",
    imgPath: image1,

    linkGhup: "https://github.com/Abdullahhosny58/AdminDashboard",
    link: "https://admin-dashboard-tan-alpha.vercel.app/",
  },

  {
    id: 7,
    projectTitle: "Valorant Store",
    subTitle:
      "Valorant Store, focusing on user experience, and performance optimization Frontend In: React.js, MUI",
    categry: "react",
    imgPath: valorantStore,
    linkGhup: "https://github.com/Abdullahhosny58/valorantStore",
    link: "https://valorant-store-ten.vercel.app/",
  },

  {
    id: 8,
    projectTitle: "Travel Site",
    subTitle:
      " Vanilla JavaScript, HTML, CSS, Bootstrap,inviting users to explore and plan their next adventure with ease   resulting in a stunning and user-friendly interface With a focus on simplicity and efficiency  ",
    categry: "js",
    imgPath: image4,
    linkGhup: "https://github.com/Abdullahhosny58/Travel-Site",
    link: "https://abdullahhosny58.github.io/Travel-Site/",
  },
  {
    id: 9,
    projectTitle: "Product Management System ",
    subTitle:
      "This product management system is expertly developed using a combination of js, HTML, CSS, and Bootstrap.You can add element,subtract,repeated,you can search",
    categry: "js",
    imgPath: image5,
    linkGhup: "https://github.com/Abdullahhosny58/Product-Management-System",
    link: "https://abdullahhosny58.github.io/Product-Management-System/",
  },

  {
    id: 10,
    projectTitle: "Image Editors",
    subTitle:
      "This Image Editors expertly developed using a combination of JS, HTML, CSS, Bootstrap, Offering a range of editing features such as Saturation, Contrast, Brightness, Grayscale, Blur, and Hue Rotate.",
    categry: "js",
    imgPath: image6,
    linkGhup: "https://github.com/Abdullahhosny58/Image-Editor-JS",
    link: "https://abdullahhosny58.github.io/Image-Editor-JS/Index.html",
  },
  {
    id: 11,
    projectTitle: "Hangman Game",
    subTitle:
      "This  Hangman game expertly developed using a combination of JS, HTML, CSS, Bootstrap The Hangman game Provides players with a fun and challenging time",
    categry: "js",
    imgPath: image7,
    linkGhup: "https://github.com/Abdullahhosny58/Hangman-Game",
    link: "https://abdullahhosny58.github.io/Hangman-Game/inde.html",
  },
  {
    id: 12,
    projectTitle: "IPHONE STORE",
    subTitle:
      "This IPHONE STORE expertly developed using a combination of JS, HTML, CSS,Bootstrap attractive user interface,providing a seamless experience to users",
    categry: "js",
    imgPath: image8,
    linkGhup: "https://github.com/Abdullahhosny58/IPHONE-STORE",
    link: "https://abdullahhosny58.github.io/IPHONE-STORE/",
  },
  {
    id: 13,
    projectTitle: "Kasper website ",
    subTitle:
      "This Kasper website expertly developed using a combination of  HTML, CSS,Bootstrap attractive user interface,providing a seamless experience to users",
    categry: "css",
    imgPath: image9,
    linkGhup: "https://github.com/Abdullahhosny58/Kasper-web2",
    link: "https://abdullahhosny58.github.io/Kasper-web2/",
  },
  {
    id: 14,
    projectTitle: "bondi website ",
    subTitle:
      "This  bondi website expertly developed using a combination of  HTML, CSS,Bootstrap attractive user interface,providing a seamless experience to users",
    categry: "css",
    imgPath: image10,
    linkGhup: "https://github.com/Abdullahhosny58/Creativit-web",
    link: "https://abdullahhosny58.github.io/Creativit-web/",
  },
  {
    id: 15,
    projectTitle: "Loen website ",
    subTitle:
      "This Loen website expertly developed using a combination of  HTML, CSS,Bootstrap attractive user interface,providing a seamless experience to users",
    categry: "css",
    imgPath: image11,
    linkGhup: "https://github.com/Abdullahhosny58/new-wepsite-Loen-Template-1",
    link: "https://abdullahhosny58.github.io/new-wepsite-Loen-Template-1/",
  },
];

const Main = () => {
  const [currentActive, setcurrentActive] = useState("all");
  const [arr, setArr] = useState(myPojects);
  return (
    <main className="flex">
      <section className=" flex left-section">
        <button
          onClick={() => {
            setcurrentActive("all");
            setArr(myPojects);
          }}
          className={currentActive === "all" ? "active" : null}
        >
          {" "}
          all projects{" "}
        </button>
        <button
          onClick={() => {
            setcurrentActive("Next");
            const newArr4 = myPojects.filter((item) => {
              return item.categry === "Next";
            });
            setArr(newArr4);
          }}
          className={currentActive === "Next" ? "active" : null}
        >
          {" "}
          Next js
        </button>
        {/* ////////////////////////// */}

        <button
          onClick={() => {
            setcurrentActive("react");

            const newArr = myPojects.filter((item) => {
              return item.categry === "react";
            });
            setArr(newArr);
          }}
          className={currentActive === "react" ? "active" : null}
        >
          React & MUI
        </button>

        <button
          onClick={() => {
            setcurrentActive("js");
            const newArr2 = myPojects.filter((item) => {
              return item.categry == "js";
            });
            setArr(newArr2);
          }}
          className={currentActive === "js" ? "active" : null}
        >
          Java Script
        </button>

        <button
          onClick={() => {
            setcurrentActive("css");
            const newArr3 = myPojects.filter((item) => {
              return item.categry === "css";
            });
            setArr(newArr3);
          }}
          className={currentActive === "css" ? "active" : null}
        >
          {" "}
          HTML & CSS
        </button>

        {/* <button
          onClick={() => {
            setcurrentActive("mern");
            const newArr5 = myPojects.filter((item) => {
              return item.categry === "mern";
            });
            setArr(newArr5);
          }}
          className={currentActive === "mern" ? "active" : null}
        >
          {" "}
          MERN Stack
        </button> */}
      </section>

      <section className="flex right-section">
        <AnimatePresence>
          {arr.map((item) => {
            return (
              <motion.article
                layout
                initial={{ transform: "scale(0.4)" }}
                animate={{ transform: "scale(1)" }}
                transition={{ type: "spring", damping: 8, stiffness: 50 }}
                key={item.id}
                className="card"
              >
                <img width={266} src={item.imgPath} alt="" />
                <div style={{ width: "266px" }} className="box">
                  <h1 className="title">{item.projectTitle}</h1>
                  <p className="sub-title">{item.subTitle}</p>
                  <div className="flex icons">
                    <div style={{ gap: "11px" }} className="flex">
                      <a className="icon-link" href={item.link} />
                      <a className="icon-github" href={item.linkGhup} />
                    </div>
                    <a className="link flex" href="">
                      more
                      <span
                        style={{ alignSelf: "end" }}
                        className="icon-arrow-right"
                      ></span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default Main;
