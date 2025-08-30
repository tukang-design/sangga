import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { useViewerStore } from '../store/ViewerStore'
import * as THREE from 'three'

const LaptopStand3D: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null)
  const { selectedColor, isRotating, rotationSpeed } = useViewerStore()
  
  // Auto-rotation
  useFrame((_, delta) => {
    if (meshRef.current && isRotating) {
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  // Color mapping for pastel colors
  const getColor = (color: string) => {
    switch (color) {
      case 'pink': return '#fce7f3'
      case 'blue': return '#dbeafe' 
      case 'green': return '#d1fae5'
      case 'peach': return '#fed7aa'
      default: return '#fce7f3'
    }
  }

  const materialColor = getColor(selectedColor)

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* Base of the laptop stand */}
      <RoundedBox
        args={[4, 0.3, 2.5]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color={materialColor}
          metalness={0.1}
          roughness={0.3}
          transparent={true}
          opacity={0.9}
        />
      </RoundedBox>

      {/* Vertical support */}
      <RoundedBox
        args={[0.4, 2, 0.4]}
        radius={0.05}
        smoothness={4}
        position={[0, 1, -0.8]}
      >
        <meshStandardMaterial
          color={materialColor}
          metalness={0.1}
          roughness={0.3}
          transparent={true}
          opacity={0.9}
        />
      </RoundedBox>

      {/* Laptop platform */}
      <RoundedBox
        args={[3.5, 0.2, 1.8]}
        radius={0.08}
        smoothness={4}
        position={[0, 2, 0]}
        rotation={[-0.15, 0, 0]}
      >
        <meshStandardMaterial
          color={materialColor}
          metalness={0.1}
          roughness={0.3}
          transparent={true}
          opacity={0.9}
        />
      </RoundedBox>

      {/* Ergonomic lip to prevent laptop sliding */}
      <RoundedBox
        args={[3.2, 0.15, 0.2]}
        radius={0.05}
        smoothness={4}
        position={[0, 2.1, 0.8]}
        rotation={[-0.15, 0, 0]}
      >
        <meshStandardMaterial
          color={materialColor}
          metalness={0.1}
          roughness={0.3}
          transparent={true}
          opacity={0.9}
        />
      </RoundedBox>

      {/* Side support arms */}
      <RoundedBox
        args={[0.3, 1.5, 0.3]}
        radius={0.05}
        smoothness={4}
        position={[-1.5, 1.2, -0.3]}
        rotation={[0, 0, 0.1]}
      >
        <meshStandardMaterial
          color={materialColor}
          metalness={0.1}
          roughness={0.3}
          transparent={true}
          opacity={0.9}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.3, 1.5, 0.3]}
        radius={0.05}
        smoothness={4}
        position={[1.5, 1.2, -0.3]}
        rotation={[0, 0, -0.1]}
      >
        <meshStandardMaterial
          color={materialColor}
          metalness={0.1}
          roughness={0.3}
          transparent={true}
          opacity={0.9}
        />
      </RoundedBox>
    </group>
  )
}

export default LaptopStand3D
