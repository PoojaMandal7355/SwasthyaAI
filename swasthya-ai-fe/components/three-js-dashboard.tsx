"use client"

import { useEffect, useRef } from "react"

export function ThreeJsDashboard() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // @ts-ignore
    const THREE = window.THREE
    if (!THREE) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xfafafa)

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 4

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Create multiple cubes representing data points
    const cubes: THREE.Mesh[] = []
    const colors = [0x2563eb, 0x16a34a, 0xf59e0b, 0xef4444]

    for (let i = 0; i < 4; i++) {
      const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6)
      const material = new THREE.MeshPhongMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 0.3,
      })
      const cube = new THREE.Mesh(geometry, material)
      cube.position.x = (i - 1.5) * 1.2
      cube.position.y = Math.sin(i) * 0.5
      cubes.push(cube)
      scene.add(cube)
    }

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(5, 5, 5)
    scene.add(light)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.005
        cube.rotation.y += 0.008
        cube.position.y = Math.sin(Date.now() * 0.001 + index) * 0.8
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-64 rounded-lg overflow-hidden" />
}
