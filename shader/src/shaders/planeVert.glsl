uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
// attribute float aRandom;

// varying float vRandom;
varying float vElevationX;
varying float vElevationY;
varying float vElevationZ;

void main()
{
  vec4 modelPos = modelMatrix * vec4(position, 1.0);

  float elevationY = sin(modelPos.x * uFrequency.x + uTime)*0.2;
  elevationY+=sin(modelPos.z * uFrequency.y - uTime)*0.2;

  modelPos.y +=elevationY;

  float elevationX = sin(modelPos.y * uFrequency.y + uTime)*0.2;
  elevationX+=sin(modelPos.z * uFrequency.x - uTime)*0.2;

  modelPos.x +=elevationX;

  float elevationZ = sin(modelPos.x * uFrequency.x + uTime)*0.2;
  elevationZ+=sin(modelPos.y * uFrequency.y - uTime)*0.2;

  modelPos.z +=elevationZ;

  //  modelPos.z += aRandom*0.3;

  vec4 viewPos = viewMatrix * modelPos;
  vec4 projPos = projectionMatrix * viewPos;

  gl_Position = projPos;

  vElevationX=elevationX;
  vElevationY=elevationY;
  vElevationZ=elevationZ;
  // vRandom = aRandom;
}
