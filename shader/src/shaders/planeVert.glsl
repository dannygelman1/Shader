uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;
uniform vec3 uLightPos;

attribute vec3 position;

attribute vec3 normal;
// attribute float aRandom;

// varying float vRandom;
varying float vElevationX;
varying float vElevationY;
varying float vElevationZ;
varying vec3 vNormal;
varying vec3 lightDir;

void main()
{
  vec4 modelPos = modelMatrix * vec4(position, 1.0);
  vec4 viewPos = viewMatrix * modelPos;
  vec4 projPos = projectionMatrix * viewPos;

  gl_Position = projPos;

  vNormal=normal;
  lightDir=uLightPos;
  // vRandom = aRandom;
}
