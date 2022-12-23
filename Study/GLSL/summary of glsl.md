# Summary of GLSL

## GLSL이란?
- OpenGL Shader Language
- Shader: GPU 상에서 동작하는 그림을 그리기 위한 작은 프로그램
- 정점별 / 픽셀(=fragment)별로 병렬 수행되어 성능을 높임
- GLSL: OpenGL에서 shader를 작성하기 위해 제공하는 C 기반 언어

## Basic Types

- int
- float
- bool

```glsl

int c = int(true); // c=1
float d = float(2); // d=2.0
float e = float(false) // e=0.0

```

## VECTORS & MATRICES

### VEC

- vec2, vec3, vec4
- 벡터의 원소 접근:
   - x, y, z, w 인덱스 사용
   - swizzling 가능
    - 얻어오고 싶은 인덱스를 연속으로 쓰기
    - .xyz => vec3
  - rgba, stpq도 동일한 방식으로 사용 가능

```glsl
vec2 someVec;
vec4 differentVec = someVec.xyxx;
vec3 anotherVec = differentVec.zyw;
vec4 otherVec = someVec.xxxx + anotherVec.yxzy ;
```
- 벡터 초기값 선언
  - 생성자 선언
  - 다른 벡터을 섞어서 사용 가능


```glsl

vec2 vect = ve2(0.5, 0.7);
vec4 result = vec4(vect, 0.0, 0.0);
vec4 otherResult = vec4(result.xyz, 1.0);

vec2 vectA = vec2(1.0, 6.0);
vec3 vectC = vec3(0.0); // vec3 vectC = vec3(0.0. 0.0, 0.0) 과 동일한 표현

vec4 vect = vec4(1.0, 2.0, 3.0, 4.0);

float a1 = vect.x; // 1.0
float a2 = vect.y; // 2.0
float a3 = vect.z; // 3.0
float a4 = vect.w; // 4.0

//
vec3 vectD = vec3(1.0, 2.0, 3.0);
vec2 vectB = vectD.xz;   // vectB = vec2(1.0, 3.0);

```

### MATRICES

- mat2, mat3, mat4: 모두 정방행렬

```glsl
mat2 matA = mat2(1, 1, false, false);
mat3 matB = mat3(7.0, 4.0, 5.0, 0.0, 2.0, 5.0, 1.0, 3.0, 7.0); // 첫 번째 원소 3개가 첫 열을 구성...

vec3 vectC1 = matB[0]; // vec3(7.0, 4.0, 5.0)
matB[2][2] = 100.0 ; // (3행,3열) 원소인 7.0을 100.0 으로 대체

```

## Samplers

- sampler2D
- samplerCube

## Arrays

```glsl

float arrayA[7];

arrayA[0] = 20.O ; // 첫 번째 원소를 20.0으로 설정
float a = arrayA[6] ; // arrayA의 7번째 원소를 a에 할당

```

## Structures

```glsl

struct myType {
  int c1;
  vec3 c2 ;
};

myType a;

a.c1 = 10;
vec3 vect = a.c2;

```

## Control Flow Statements(제어흐름 구문)

```glsl

if(condition1) {
  // Do something
} else if(condition2) {
  // Do something else
} else {
  // Do something else
}

for (int i=0; i < 10; i++) {
  // Do something
}

```

## Function

```glsl

float funcA(int a, vec2 b) {
  // Stuff to do
  return 1.0 ;
}

void funcB(vec3 vect) {
  // Stuff to do
  // No return
}

```

## Storage Qualifiers(한정자)

- const : const type variable_identifier = value;
- attribute: attribute type variable_identifier;
   - (예) VERTEX ATTRIBUTES
      - 하나의 vertex가 가지는 정보는 여러가지일 수 있다
      - position(위치)
      - normal(노멀)
      - tangent
      - color(색상)
      - texture coordinates
  ...
- uniform: uniform type variable_identifier;
  - shader에 전달 가능한 global value
  - 병렬로 수행되는 모든 shader thread들이 동일한 값을 전달받는다
  - 변수 선언 앞에 uniform type qualifier를 써서 선언
- varying: varying type variable_identifier;

```glsl

attribute vec2 pos ;   // pos.x = 0.5; pos.y = 0.0;
uniform float t ;

```

## Precision Qualifiers

- lowp
- mediump
- highp

## Shaders의 종류

- Vertex Shader
- Fragment Shader

### Vertex Shaders

- 각 정점 별로 설정된 vertex attribute를 입력받는다
- 반드시 정점의 출력 위치 gl_Position값을 계산해줘야 함

```glsl

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

### Fragment Shaders

- 각 픽셀의 실제 색상 값(gl_FragColor)이 출력되어야 함

```glsl

void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // red
}

```