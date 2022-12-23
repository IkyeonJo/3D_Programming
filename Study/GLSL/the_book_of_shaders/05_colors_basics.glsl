#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  st.x *= u_resolution.x / u_resolution.y;
  // example1: Making yellow
  // vec3 color = vec3(0., 0., 0.);
  // // color.b = 1.0;
  // // color.z = 1.0;
  // color.p = 1.0;
  // gl_FragColor = vec4(color, 1.); 

  // vec3 yellow, magenta, green ;
  // yellow.rg = vec2(1.); // yellow의 3번째 원소는 자동으로 0으로 부여. 즉 yellow는 vec3(1.0, 1.0, 0.0)
  // gl_FragColor = vec4(yellow, 1.);

  // // example2: making magenta
  // vec3 yellow, magenta, green ;
  // yellow.rg = vec2(1.0);
  // magenta = yellow.rbg;
  // // magenta = yellow.rrr;
  // // magenta = yellow.bbb;
  // // magenta = yellow.bgr;
  // gl_FragColor = vec4(magenta, 1.);

  // examplee: making green
  vec3 yellow, magenta, green ;
  yellow.rg = vec2(1.0); // vec3(1.0, 1.0, 0.0)
  green = yellow.bgb;
  // green = yellow.brb; // 동일하게 green이 나옴
  gl_FragColor = vec4(green, 1.);
}