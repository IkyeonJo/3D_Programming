

// gain() 함수의 형태
// 색보정 등에 활용됨
// 참고: https://iquilezles.org/articles/functions/
float gain(float x, float k) 
{
    const float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
    return (x<0.5)?a:1.0-a;
}
