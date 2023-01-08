#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592

uniform vec2 u_resolution;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    vec2 coord = gl_FragCoord.xy/u_resolution;

    coord = coord*2.0 - 1.0 ;

    // atan은 두 변의 길이로부터 각을 구함

    float angle = atan(coord.y, coord.x);
    angle += PI+sin(u_time)*10. ;
    angle /= 2.* PI ;
    angle *= 50.;

    float dist = length(coord);

    vec3 color = hsb2rgb(vec3(angle, dist, 1.));

    gl_FragColor = vec4(color, 1.0);
}
