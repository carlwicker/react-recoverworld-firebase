import css from "./ParalaxBackground.module.css";

export default function ParalaxBackground() {
  let randomNum: number = Math.random() * (9000 - 2000) + 2000;

  return (
    <img
      src="./img/massiveBack.png"
      style={{
        width: "100%",
        position: "absolute",
        left: "0px",
        top: `-${randomNum}px`,
        zIndex: "-1",
        opacity: "1",
        height: "fit-content",
        transformStyle: "preserve-3d",
        transform: "translateZ(-10px) scale(2)",
        overflowX: "hidden",
      }}
    />
  );
}
