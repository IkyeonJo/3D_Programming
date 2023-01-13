#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// 사각형 하나를 그리는 함수 정의
float bar(vec2 loc, vec2 size, vec2 coord){
  vec2 sw = loc - size/2. ;
  vec2 ne = loc + size/2. ;
  vec2 ret = step(sw, coord) - step(ne, coord);
  return ret.x * ret.y ;
}

// (사각형 2개가 겹쳐진 것이 십자가 모양이므로, 사각형 함수를 바탕으로) 십자가 모양 만드는 함수 정의
float cross(vec2 loc, vec2 size, vec2 coord) {
  float b1 = bar(loc, size, coord);
  float b2 = bar(loc, vec2(size.y, size.x), coord);

  return max(b1, b2);
}

void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution.xy ;
  coord.x *= u_resolution.x / u_resolution.y;

  //--- 방법1: 십자가의 좌표를 옮기는 방법
  // coord = coord*2.0 -1.;
  // float rad = 0.5 ;  // 원의 반경을 조정하기 위한 상수
  // vec2 loc = vec2(0.) ;
  // // 십자가 위치 변경: 원을 그리기 위해서는 x좌표쪽에 sin() 함수(또는 cos() 함수), y좌표쪽에 cos() 함수(또는 sin() 함수)를 이용하면 됨
  // loc = loc + vec2(sin(u_time)*rad, cos(u_time)*rad);
  // vec3 col = vec3(cross(loc, vec2(0.30, 0.03), coord)) ;

  //-- 방법2: 십자가의 위치는 그대로 두고, 좌표계의 원점을 옮기는 방법
  coord = coord*2.0 -1.;

  float rad = 0.5 ;
  vec2 loc = vec2(0.) + vec2(sin(u_time)*rad, cos(u_time)*rad);
  // 좌표계를 위치이동: 좌표계 이동시, 십자가는 반대방향으로 움직인다.
  coord += loc;
  vec3 col = vec3(cross(vec2(0.), vec2(0.30, 0.03), coord)) ;

  gl_FragColor = vec4(col, 1.0);
}
