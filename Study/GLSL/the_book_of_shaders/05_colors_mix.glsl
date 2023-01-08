#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

// 
vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct) {
  return smoothstep(pct-0.01, pct, st.y) -
        smoothstep(pct, pct+0.01, st.y);
}

// void main() {
//   vec3 color = vec3(0.);
//   float pct = abs(sin(u_time)); // 0~1 사이를 진동하는 값
//   // color = pct * colorB + (1.-pct) * colorA; 
//   // 위 코드 대신 아래와 같이 mix() 함수를 써도 된다(동일한 효과를 내지만, 좀더 편하다!)
//   // Mix uses pct (a value from 0-1) to mix the two colors
//   color = mix(colorA, colorB, pct);
//   // 지금은 시간(u_time)에 따라 동적으로 변하는 pct를 사용했지만,
//   // 단순하게 두 색깔을 섞는다면, 상수의 pct를 입력하면 된다.
//   // 예를 들어 두 색깔을 반반씩 섞는다면
//   // pct = 0.5; 
//   // color = mix(colorA, colorB, pct);
//   gl_FragColor = vec4(color, 1.);
// }

// void main() {
//   vec3 color = vec3(0.0);
//   float pct = abs(sin(u_time));
//   // color = colorB*pct + colorA*(1.-pct);
//   // color = mix(colorA, colorB, pct);
//   color = mix(colorA, colorB, 1.);

//   gl_FragColor = vec4(color, 1.0);
// }

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);

  vec3 pct = vec3(st.x);
  pct.r = smoothstep(0.0, 1.0, st.x);
  pct.g = sin(st.x * PI);
  pct.b = pow(st.x, 2.0);

  color = mix(colorA, colorB, pct);
  color = mix(color, vec3(1.0, 0.0, 0.0), plot(st, pct.r));
  color = mix(color, vec3(0.0, 1.0, 0.0), plot(st, pct.g));
  color = mix(color, vec3(0.0, 0.0, 1.0), plot(st, pct.b));

  gl_FragColor = vec4(color, 1.0);
}