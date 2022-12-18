// Uniform : CPU로부터 모든 GPU 쓰레드에 동일한 입력을 보냄. 읽기 전용.
// 즉, 각 쓰레드들은 동일한 데이터를 전달받으며, 이 데이터들은 읽을 수만 있고, 변경은 불가

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // 캔버스 사이즈(폭, 높이)
uniform vec2 u_mouse; // 스크린 픽셀에서의 마우스 위치
uniform float u_time; // 쉐이더로딩 후 경과된 시간(초 단위)

void main() {
  // gl_FragColor = vec4(abs(sin(u_time)), 0., 0., 1.);
  // 색깔 변화를 눈치 못챌 정도로 서서히 변화시키기
  // gl_FragColor = vec4(abs(sin(u_time))*0.1, 0., 0., 1.);
  // 3가지 색상 채널을 각각 다른 속도로 변화시켜보기
  gl_FragColor = vec4(abs(sin(u_time))*0.5, abs(sin(u_time))*0.75, abs(sin(u_time))*.25, 1.);
}