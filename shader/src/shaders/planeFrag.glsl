precision mediump float;

varying float vElevationX;
varying float vElevationY;
varying float vElevationZ;
// varying float vRandom;

void main()
{
  vec4 color =  vec4(0.3, 0.8, 0.5, 1.0);
  color.rgb *= vElevationX*vElevationY*vElevationZ*5.0+0.5;
  gl_FragColor= color;
}
