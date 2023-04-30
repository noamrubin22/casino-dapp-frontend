import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Coin from "./Coin";

interface CoinContainerProps {
  setIsFlipped: (isFlipped: boolean) => void;
  isFlipped: boolean;
}

const CoinContainer: React.FC<CoinContainerProps> = ({
  setIsFlipped,
  isFlipped,
}) => {
  return (
    <Canvas className="canvas">
      {" "}
      <Suspense fallback={null}>
        <spotLight position={[10, 10, 10]} angle={0.15} />
        <Coin isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
      </Suspense>
    </Canvas>
  );
};

export default CoinContainer;
