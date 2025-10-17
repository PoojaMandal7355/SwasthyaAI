"use client"

import { useEffect, useRef } from "react"

export function ThreeJsHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // @ts-ignore
    const THREE = window.THREE
    if (!THREE) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f1ed)

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.IcosahedronGeometry(1.2, 5)
    const material = new THREE.MeshPhongMaterial({
      color: 0xc67c4e, // Warm terracotta
      emissive: 0xa85a3a,
      shininess: 120,
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Sage green rings
    const ringGeometry = new THREE.TorusGeometry(1.8, 0.12, 16, 100)
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: 0x6b9e7f, // Sage green
      emissive: 0x5a8a6f,
    })
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial)
    ring1.rotation.x = Math.PI / 4
    scene.add(ring1)

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial)
    ring2.rotation.y = Math.PI / 3
    scene.add(ring2)

    const ring3 = new THREE.Mesh(ringGeometry, ringMaterial)
    ring3.rotation.z = Math.PI / 2.5
    scene.add(ring3)

    // Golden accent particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 80
    const positionArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      positionArray[i] = (Math.random() - 0.5) * 12
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0xd4a574, // Golden accent
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Enhanced lighting
    const light1 = new THREE.PointLight(0xffffff, 1.2, 100)
    light1.position.set(5, 5, 5)
    scene.add(light1)

    const light2 = new THREE.PointLight(0xd4a574, 0.8, 80)
    light2.position.set(-5, -5, 5)
    scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      sphere.rotation.x += 0.0008
      sphere.rotation.y += 0.0015

      ring1.rotation.x += 0.0025
      ring2.rotation.y += 0.003
      ring3.rotation.z += 0.0018

      particles.rotation.x += 0.00008
      particles.rotation.y += 0.00012

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
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl glow-effect" />
}
