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

  // Color mapping for new vibrant palette
  const getColorFromSelection = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      // New color palette
      black: '#2c2c2c',
      'olive green': '#6b8e23',
      sage: '#9caf88',
      pink: '#ffc0cb',
      'baby blue': '#87ceeb',
      green: '#4caf50',
      orange: '#ff7043',
      // Fallback to old colors for backward compatibility
      brown: '#8b5a3c',
      tan: '#8b6f47', 
      darkwood: '#5d4e37',
      beige: '#a68b5b'
    }
    return colorMap[colorName] || '#2c2c2c'
  }

  const materialColor = getColorFromSelection(selectedColor)

  return (
    <group ref={meshRef} position={[0, -0.8, 0]} scale={1.4}>
      {/* Base of the laptop stand */}
      <RoundedBox
        args={[4, 0.3, 2.5]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color={materialColor}
          metalness={0.0}
          roughness={0.8}
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
          metalness={0.0}
          roughness={0.8}
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
          metalness={0.0}
          roughness={0.8}
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
          metalness={0.0}
          roughness={0.8}
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
          metalness={0.0}
          roughness={0.8}
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
          metalness={0.0}
          roughness={0.8}
        />
      </RoundedBox>
    </group>
  )
}

export default LaptopStand3D
