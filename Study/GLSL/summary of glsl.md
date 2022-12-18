# Summary of GLSL

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

```glsl

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

## Storage Qualifiers

- const : const type variable_identifier = value;
- attribute: attribute type variable_identifier;
- uniform: uniform type variable_identifier;
- varying: varying type variable_identifier;

```glsl

attribute vec2 pos ;   // pos.x = 0.5; pos.y = 0.0;
uniform float t ;

```

## Precision Qualifiers

- lowp
- mediump
- highp

## Shaders

- Vertex Shader
- Fragment Shader

### Vertex Shaders

```glsl

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

### Fragment Shaders

```glsl

void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // red
}

```