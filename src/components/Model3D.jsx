import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Model3D() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ 
    x: 0, 
    y: 0, 
    lastX: 0,
    lastY: 0,
    isDown: false,
    rotationX: 0,
    rotationY: 0,
    targetRotationX: 0,
    targetRotationY: 0
  })

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    // Проверяем, это мобильное устройство
    const isMobile = window.innerWidth < 768
    const isSmallMobile = window.innerWidth < 480

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0e0e0e)

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, isMobile ? 1 : 1.5, isSmallMobile ? 5 : 4)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 5)
    scene.add(directionalLight)

    // Load model
    let model = null
    let time = 0
    let animationId = null

    const loader = new GLTFLoader()
    loader.load(`${import.meta.env.BASE_URL}3dAnimation/2021_porsche_panamera_turbo_s_sport_turismo.glb`, (gltf) => {
      console.log('✓ Модель загружена успешно!')
      
      model = gltf.scene
      
      // Масштабирование
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 3 / maxDim
      model.scale.multiplyScalar(scale)
      
      const center = box.getCenter(new THREE.Vector3())
      model.position.sub(center.multiplyScalar(scale))
      model.position.y += 0.5

      scene.add(model)

      // Запуск анимации
      const animate = () => {
        animationId = requestAnimationFrame(animate)
        
        if (model) {
          // Плавная интерполяция вращения (lerp)
          mouseRef.current.rotationY += (mouseRef.current.targetRotationY - mouseRef.current.rotationY) * 0.08
          mouseRef.current.rotationX += (mouseRef.current.targetRotationX - mouseRef.current.rotationX) * 0.08
          
          // Применяем вращение
          model.rotation.y = mouseRef.current.rotationY
          model.rotation.x = mouseRef.current.rotationX
          
          // Плавающая анимация
          model.position.y = 0.5 + Math.sin(time) * 0.15
          time += 0.01
        }

        renderer.render(scene, camera)
      }
      animate()
    }, undefined, (error) => {
      console.error('✗ Ошибка загрузки модели:', error)
    })

    // Mouse events для вращения
    const handleMouseMove = (e) => {
      const currentX = e.clientX
      const currentY = e.clientY
      
      if (mouseRef.current.isDown) {
        // Вычисляем дельту (разницу) в движении
        const deltaX = currentX - mouseRef.current.lastX
        const deltaY = currentY - mouseRef.current.lastY
        
        // Применяем вращение к целевому углу (сенсивность 0.01 радиан на пиксель)
        mouseRef.current.targetRotationY += deltaX * 0.01
        mouseRef.current.targetRotationX += deltaY * 0.01
      }
      
      // Обновляем последнюю позицию
      mouseRef.current.lastX = currentX
      mouseRef.current.lastY = currentY
    }

    const handleMouseDown = (e) => {
      if (e.button === 0) { // 0 = левая кнопка мыши
        mouseRef.current.isDown = true
        mouseRef.current.lastX = e.clientX
        mouseRef.current.lastY = e.clientY
      }
    }

    const handleMouseUp = () => {
      mouseRef.current.isDown = false
    }

    // Touch events для мобильных
    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.isDown = true
        mouseRef.current.lastX = e.touches[0].clientX
        mouseRef.current.lastY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e) => {
      if (!mouseRef.current.isDown || e.touches.length === 0) return
      
      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      
      // Вычисляем дельту (разницу) в движении
      const deltaX = currentX - mouseRef.current.lastX
      const deltaY = currentY - mouseRef.current.lastY
      
      // Применяем вращение к целевому углу
      mouseRef.current.targetRotationY += deltaX * 0.01
      mouseRef.current.targetRotationX += deltaY * 0.01
      
      // Обновляем последнюю позицию
      mouseRef.current.lastX = currentX
      mouseRef.current.lastY = currentY
    }

    const handleTouchEnd = () => {
      mouseRef.current.isDown = false
    }

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)
      if (animationId) cancelAnimationFrame(animationId)
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
}

export default Model3D
