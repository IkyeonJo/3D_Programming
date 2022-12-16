# three.js Basics

## Scene Graph

- Renderer: Scene과 Camera 객체를 넘겨받아, 카메라 절두체 안 3D 씬의 일부를 2차원 평면 이미지로 렌더링해 줌(그려줌)

- Mesh: Material + Geometry

> Meatrial과 Geometry는 다른 Mesh에서 재사용 가능

- Geometry: 기하학 객체의 정점 데이터

- Material: 기하학 객체를 그리는 데 사용되는 표면 속성. 색이나 밝기 등 지정

> 하나의 Material은 여러 개의 Texture를 사용할 수 있음

- Texture: 이미지나 파일에서 로드한 이미지, canvas로 생성한 이미지 또는 다른 Scene 객체에서 렌더링한 결과물에 해당

## 애니메이션

- requestAnimationFrame() 함수: 매개변수로 넘겨받은 함수에 페이지가 로드된 이후의 시간값을 밀리초 단위로 넘겨 줌
