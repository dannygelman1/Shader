uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
// attribute float aRandom;

// varying float vRandom;
varying float vElevation;

void main()
{
  vec4 modelPos = modelMatrix * vec4(position, 1.0);
  float elevation = sin(modelPos.x * uFrequency.x + uTime)*0.2;
  elevation+=sin(modelPos.y * uFrequency.y - uTime)*0.2;

  modelPos.z +=elevation;
  //  modelPos.z += aRandom*0.3;

  vec4 viewPos = viewMatrix * modelPos;
  vec4 projPos = projectionMatrix * viewPos;

  gl_Position = projPos;
  vElevation=elevation;
  // vRandom = aRandom;
}
