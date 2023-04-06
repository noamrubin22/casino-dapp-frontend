import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";

interface CoinProps {
  isFlipped: boolean;
  setIsFlipped: (isFlipped: boolean) => void;
}

const Coin: React.FC<CoinProps> = (props: any) => {
  const { isFlipped, setIsFlipped } = props;

  useEffect(() => {
    console.log(isFlipped);
  }, [isFlipped]);

  const texture = useLoader(TextureLoader, "/eth-coin-gold.png");
  const myMesh = useRef<THREE.Mesh>();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (myMesh && myMesh.current && myMesh.current.rotation) {
      if (!isFlipped) {
        normalRythm(myMesh);
      } else {
        flipRythm(myMesh);
      }
    }
  });

  const flipRythm = (myMesh: any) => {
    myMesh.current.rotation.z += 0.35;
    myMesh.current.rotation.y += 0.15;
  };

  const normalRythm = (myMesh: any) => {
    myMesh.current.rotation.x += 0.01;
  };

  return (
    <mesh {...props} ref={myMesh} onClick={() => setIsFlipped(false)}>
      <cylinderBufferGeometry attach="geometry" args={[2, 2, 0.4]} />
      <meshStandardMaterial
        attach="material"
        map={texture}
        displacementScale={1}
      />
    </mesh>
  );
};

export default Coin;
