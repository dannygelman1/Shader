import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useThree, Canvas } from "@react-three/fiber";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  BufferAttribute,
  Mesh,
  PlaneGeometry,
  RawShaderMaterial,
  Vector2,
} from "three";
import { DoubleSide, HemisphereLight, PointLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import fragment from "../shaders/planeFrag.glsl";
import vertex from "../shaders/planeVert.glsl";

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
        <Plane />
      </Canvas>
    </div>
  );
};

const Plane = (): ReactElement => {
  const { clock, camera, scene } = useThree();
  const shaderRef = useRef<RawShaderMaterial | null>(null);
  const pointLightRef = useRef<PointLight>(null);
  scene.add(camera);
  if (pointLightRef.current) camera.add(pointLightRef.current);
  const { nodes } = useGLTF("/Shader/bunny.gltf");

  const [perch] = useState<Mesh | null>(
    nodes.defaultMaterial instanceof Mesh ? nodes.defaultMaterial : null
  );
  useFrame(() => {
    if (shaderRef.current)
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <group>
      <pointLight intensity={1} ref={pointLightRef} position={[1, 1, 1]} />
      <mesh
        position={[0, -5, 0]}
        geometry={perch?.geometry}
        scale={0.2}
        onUpdate={(self) => {
          const count = self.geometry.attributes.position.count;
          const randoms = new Float32Array(count);
          for (let i = 0; i < count; i++) {
            randoms[i] = Math.random();
          }
          self.geometry.setAttribute(
            "aRandom",
            new BufferAttribute(randoms, 1)
          );
        }}
      >
        <rawShaderMaterial
          ref={shaderRef}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={{
            uFrequency: { value: new Vector2(3, 2) },
            uTime: { value: clock.getElapsedTime() },
          }}
          // onUpdate={(self) => {
          //   console.log("1", clock.getElapsedTime());
          //   self.uniforms.uTime.value = clock.getElapsedTime();
          // }}
        />
      </mesh>
    </group>
    // <mesh position={[0, 0, 0]}>
    //   <boxGeometry
    //     args={[5, 5, 5, 100, 100, 100]}
    //     onUpdate={(self) => {
    //       const count = self.attributes.position.count;
    //       const randoms = new Float32Array(count);
    //       for (let i = 0; i < count; i++) {
    //         randoms[i] = Math.random();
    //       }
    //       self.setAttribute("aRandom", new BufferAttribute(randoms, 1));
    //     }}
    //   />
    //   <rawShaderMaterial
    //     ref={shaderRef}
    //     vertexShader={vertex}
    //     fragmentShader={fragment}
    //     uniforms={{
    //       uFrequency: { value: new Vector2(3, 2) },
    //       uTime: { value: clock.getElapsedTime() },
    //     }}
    //     // onUpdate={(self) => {
    //     //   console.log("1", clock.getElapsedTime());
    //     //   self.uniforms.uTime.value = clock.getElapsedTime();
    //     // }}
    //   />
    //   <bufferAttribute />
    // </mesh>
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
