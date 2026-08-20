import Canvas from "../Canvas";
import TunicaLayers from "../BloodVessel/TunicaLayers";
import styles from "./TunicaDivider.module.scss";

type Props = {
  mode: "top" | "bottom";
};

function TunicaDivider({ mode }: Props) {
  return (
    <Canvas className={styles.canvas}>
      <TunicaLayers mode={mode} grayscale static />
    </Canvas>
  );
}

export default TunicaDivider;
