import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import LaptopStand3D from './LaptopStand3D'
import { useViewerStore } from '../store/ViewerStore'

const Scene3D: React.FC = () => {
  const { cameraPosition, cameraTarget, enableOrbitControls, setRotating } = useViewerStore()
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    setRotating(false) // Pause rotation on hover
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotating(true) // Resume rotation when not hovering
  }

  return (
    <div className="scene-container">
      <Canvas
        camera={{
          position: [cameraPosition.x, cameraPosition.y, cameraPosition.z],
          fov: 45,
        }}
        shadows
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Environment */}
          <Environment preset="studio" />
          
          {/* Main 3D model */}
          <LaptopStand3D />
          
          {/* Ground shadows */}
          <ContactShadows
            opacity={0.3}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
            color="#000000"
          />
          
          {/* Controls */}
          {enableOrbitControls && (
            <OrbitControls
              target={[cameraTarget.x, cameraTarget.y, cameraTarget.z]}
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={15}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D
