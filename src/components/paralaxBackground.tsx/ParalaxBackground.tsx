import css from "./ParalaxBackground.module.css";

export default function ParalaxBackground() {
  let randomNum: number = Math.random() * (9000 - 4500) + 4500;

  return (
    <img
      src="./img/massiveBack.png"
      style={{
        display: "flex",
        width: "100%",
        position: "absolute",
        left: "0px",
        top: `-${randomNum}px`,
        zIndex: "-1",
        opacity: "0.65",
        height: "fit-content",
        transformStyle: "preserve-3d",
        transform: "translateZ(-10px) scale(2)",
        overflowX: "hidden",
      }}
    />
  );
}
