import { useState } from "react";
import "./mainStyle.css";
import myPojects from "./data";
import { AnimatePresence, motion } from "framer-motion";

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
