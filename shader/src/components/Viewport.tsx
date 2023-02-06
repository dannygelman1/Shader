import { useThree, Canvas } from "@react-three/fiber";
import React, { ReactElement, useEffect, useRef } from "react";
import { DoubleSide, HemisphereLight, PointLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// import fragment from "@/shaders/planeFrag.glsl";
// import vertex from "@/shaders/planeVert.glsl";

export const Viewport = (): ReactElement => {
  return (
    <div className="flex h-full w-full bg-red-400 absolute">
      <Canvas
        shadows={true}
        camera={{
          fov: 75,
          position: [8, 0, 8],
          far: 1600,
        }}
        className="bg-gray-100"
      >
        <CameraController />
        <hemisphereLight intensity={10} />
        <mesh>
          <planeGeometry args={[10,10]}/>
          <rawShaderMaterial
            vertexShader={
            `uniform mat4 projectionMatrix;
            uniform mat4 viewMatrix;
            uniform mat4 modelMatrix;

            attribute vec3 position;

            void main()
            {
              gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
            }`}
            fragmentShader={
              `precision mediump float;

              void main()
              {
                gl_FragColor= vec4(1.0, 0.0, 0.0, 1.0);
              }`}
          />
        </mesh>
      </Canvas>
    </div>
  );
};

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
