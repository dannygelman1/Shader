precision mediump float;

varying float vElevation;
// varying float vRandom;

void main()
{
  vec4 color =  vec4(0.3, 0.8, 0.5, 1.0);
  color.rgb *= vElevation*1.5 +0.9;
  gl_FragColor= color;
}
