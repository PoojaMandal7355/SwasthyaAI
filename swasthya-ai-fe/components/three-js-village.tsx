"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeJsVillage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f1e8)
    scene.fog = new THREE.Fog(0xf5f1e8, 100, 1000)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 15, 30)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowShadowMap
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(50, 50, 50)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(200, 200)
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x8b9d6f })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // Create village houses
    const createHouse = (x: number, z: number, color: number) => {
      const group = new THREE.Group()

      // House body
      const bodyGeometry = new THREE.BoxGeometry(8, 8, 8)
      const bodyMaterial = new THREE.MeshStandardMaterial({ color })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      body.position.y = 4
      body.castShadow = true
      body.receiveShadow = true
      group.add(body)

      // Roof
      const roofGeometry = new THREE.ConeGeometry(6, 6, 4)
      const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xc67c4e })
      const roof = new THREE.Mesh(roofGeometry, roofMaterial)
      roof.position.y = 10
      roof.castShadow = true
      group.add(roof)

      // Door
      const doorGeometry = new THREE.BoxGeometry(2, 4, 0.5)
      const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x6b4423 })
      const door = new THREE.Mesh(doorGeometry, doorMaterial)
      door.position.set(0, 2, 4.25)
      door.castShadow = true
      group.add(door)

      // Windows
      for (let i = 0; i < 2; i++) {
        const windowGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.3)
        const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb })
        const window = new THREE.Mesh(windowGeometry, windowMaterial)
        window.position.set(-2 + i * 4, 6, 4.25)
        window.castShadow = true
        group.add(window)
      }

      group.position.set(x, 0, z)
      return group
    }

    // Add houses
    scene.add(createHouse(-20, -20, 0xd4a574))
    scene.add(createHouse(20, -20, 0xc67c4e))
    scene.add(createHouse(-20, 20, 0xb8956a))
    scene.add(createHouse(20, 20, 0xd4a574))

    // Create trees
    const createTree = (x: number, z: number) => {
      const group = new THREE.Group()

      // Trunk
      const trunkGeometry = new THREE.CylinderGeometry(1.5, 2, 10, 8)
      const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x6b4423 })
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
      trunk.position.y = 5
      trunk.castShadow = true
      group.add(trunk)

      // Foliage
      const foliageGeometry = new THREE.SphereGeometry(8, 8, 8)
      const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x6b9e7f })
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial)
      foliage.position.y = 15
      foliage.castShadow = true
      group.add(foliage)

      group.position.set(x, 0, z)
      return group
    }

    // Add trees
    scene.add(createTree(-30, 0))
    scene.add(createTree(30, 0))
    scene.add(createTree(0, -30))
    scene.add(createTree(0, 30))

    // Create fields (crops)
    const createField = (x: number, z: number) => {
      const group = new THREE.Group()
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          const cropGeometry = new THREE.ConeGeometry(0.3, 2, 4)
          const cropMaterial = new THREE.MeshStandardMaterial({ color: 0x9acd32 })
          const crop = new THREE.Mesh(cropGeometry, cropMaterial)
          crop.position.set(i * 1.5 - 15, 1, j * 1.5 - 15)
          crop.castShadow = true
          group.add(crop)
        }
      }
      group.position.set(x, 0, z)
      return group
    }

    scene.add(createField(-50, -50))
    scene.add(createField(50, -50))

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate scene slowly
      scene.rotation.y += 0.0002

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-screen" />
}
