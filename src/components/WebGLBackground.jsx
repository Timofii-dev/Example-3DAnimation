import { useRef, useEffect } from 'react'

function WebGLBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    const startTime = Date.now()

    const vsSource = `
      attribute vec2 position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      float noise(in vec2 p) {
        return sin(p.x * 2.0) * sin(p.y * 2.0) * 0.5 + 0.5;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float t = u_time * 0.15;
        
        // Fluid simulation via sine-rotation layers
        float n = 0.0;
        vec2 st = uv * 2.5;
        
        // Layer 1
        float c1 = cos(t * 0.5), s1 = sin(t * 0.5);
        st = mat2(c1, -s1, s1, c1) * st;
        n += noise(st + vec2(t, -t));
        
        // Layer 2
        float c2 = cos(-t * 0.3), s2 = sin(-t * 0.3);
        st = mat2(c2, -s2, s2, c2) * st * 1.8;
        n += noise(st - vec2(-t, t)) * 0.5;
        
        // Layer 3
        float c3 = cos(t * 0.1), s3 = sin(t * 0.1);
        st = mat2(c3, -s3, s3, c3) * st * 1.5;
        n += noise(st + vec2(t * 0.5)) * 0.25;
        
        n /= 1.75;
        
        // Ambient Obsidian palette: deep graphite base with subtle bronze-gold reflections
        vec3 baseCol = vec3(0.025, 0.025, 0.027);
        vec3 flowCol = vec3(0.06, 0.055, 0.05);
        
        float spec = pow(n, 6.0) * 0.12;
        vec3 col = mix(baseCol, flowCol, n) + vec3(spec);
        
        gl_FragColor = vec4(col, 1.0);
      }
    `

    const createShader = (type, source) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource))
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const pos = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const timeLoc = gl.getUniformLocation(program, 'u_time')
    const resLoc = gl.getUniformLocation(program, 'u_resolution')

    let animationId

    const render = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(timeLoc, (Date.now() - startTime) / 1000)
      gl.uniform2f(resLoc, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div id="liquid-bg">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default WebGLBackground
