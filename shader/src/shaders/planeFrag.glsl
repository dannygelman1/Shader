precision mediump float;

varying float vElevationX;
varying float vElevationY;
varying float vElevationZ;
varying vec3 vNormal;
varying vec3 lightDir;
// varying float vRandom;

void main()
{
  vec4 color =  vec4(vNormal.x, vNormal.y, vNormal.z, 1.0);
  float dotprod = dot(lightDir, vNormal);
  if (dotprod<0.0){
    color= vec4(0.4, 0.2, 0.1, 1.0);
  }
  if (dotprod<0.3 && dotprod>=0.0){
    color= vec4(1.0, 0.0, 0.0, 1.0);
  }
  if (dotprod<0.6 && dotprod>=0.3){
    color= vec4(0.0, 1.0, 0.0, 1.0);
  }
  if (dotprod<=1.0 && dotprod>=0.6){
    color= vec4(0.0, 0.0, 1.0, 1.0);
  }
  // color.rgb *= vElevationX*vElevationY*vElevationZ*5.0+0.5;
  gl_FragColor= color;
}
