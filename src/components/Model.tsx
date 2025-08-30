import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'
import { useViewer } from '../store/ViewerProvider'

interface ModelProps {
  renderMode: 'solid' | 'wireframe' | 'textured'
}

export const Model = ({ renderMode }: ModelProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const {
    setModel,
    animations,
    currentAnimation,
    animationTime,
    isPlaying,
    animationSpeed,
    setAnimations,
    addHotspot
  } = useViewer()

  // Create demo animations
  useEffect(() => {
    if (groupRef.current) {
      setModel(groupRef.current)
      
      // Create sample animation clips
      const rotationTrack = new THREE.VectorKeyframeTrack(
        '.rotation[y]',
        [0, 2, 4],
        [0, Math.PI, Math.PI * 2]
      )
      
      const scaleTrack = new THREE.VectorKeyframeTrack(
        '.scale[x]',
        [0, 1, 2],
        [1, 1.2, 1]
      )
      
      const positionTrack = new THREE.VectorKeyframeTrack(
        '.position[y]',
        [0, 1, 2],
        [0, 0.5, 0]
      )

      const rotationClip = new THREE.AnimationClip('Rotate', 4, [rotationTrack])
      const scaleClip = new THREE.AnimationClip('Scale', 2, [scaleTrack])
      const bounceClip = new THREE.AnimationClip('Bounce', 2, [positionTrack])

      setAnimations([rotationClip, scaleClip, bounceClip])
      
      // Add sample hotspots
      addHotspot({
        id: 'feature-1',
        position: new THREE.Vector3(1, 1, 0),
        title: 'Main Feature',
        description: 'This is the primary feature of the product',
        visible: true
      })
      
      addHotspot({
        id: 'detail-1',
        position: new THREE.Vector3(-1, 0, 1),
        title: 'Detail View',
        description: 'Important detail worth highlighting',
        visible: true
      })
    }
  }, [setModel, setAnimations, addHotspot])

  // Animation playback
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const actionRef = useRef<THREE.AnimationAction | null>(null)

  useEffect(() => {
    if (groupRef.current && animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(groupRef.current)
      
      if (currentAnimation) {
        const clip = animations.find(anim => anim.name === currentAnimation)
        if (clip) {
          actionRef.current = mixerRef.current.clipAction(clip)
          actionRef.current.setLoop(THREE.LoopRepeat, Infinity)
          actionRef.current.clampWhenFinished = true
        }
      }
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction()
      }
    }
  }, [animations, currentAnimation])

  useEffect(() => {
    if (actionRef.current) {
      if (isPlaying) {
        actionRef.current.play()
        actionRef.current.timeScale = animationSpeed
      } else {
        actionRef.current.stop()
      }
    }
  }, [isPlaying, animationSpeed])

  useEffect(() => {
    if (actionRef.current && !isPlaying) {
      actionRef.current.time = animationTime
      if (mixerRef.current) {
        mixerRef.current.update(0)
      }
    }
  }, [animationTime, isPlaying])

  useFrame((_, delta) => {
    if (mixerRef.current && isPlaying) {
      mixerRef.current.update(delta * animationSpeed)
    }
  })

  // Materials based on render mode
  const materials = useMemo(() => {
    const baseColor = '#4f46e5'
    const metalColor = '#94a3b8'
    const accentColor = '#ef4444'

    switch (renderMode) {
      case 'wireframe':
        return {
          main: new THREE.MeshBasicMaterial({ 
            color: baseColor, 
            wireframe: true,
            transparent: true,
            opacity: 0.8
          }),
          metal: new THREE.MeshBasicMaterial({ 
            color: metalColor, 
            wireframe: true,
            transparent: true,
            opacity: 0.6
          }),
          accent: new THREE.MeshBasicMaterial({ 
            color: accentColor, 
            wireframe: true,
            transparent: true,
            opacity: 0.7
          })
        }
      
      case 'solid':
        return {
          main: new THREE.MeshLambertMaterial({ color: baseColor }),
          metal: new THREE.MeshLambertMaterial({ color: metalColor }),
          accent: new THREE.MeshLambertMaterial({ color: accentColor })
        }
      
      case 'textured':
      default:
        return {
          main: new THREE.MeshStandardMaterial({ 
            color: baseColor,
            metalness: 0.1,
            roughness: 0.3,
            envMapIntensity: 1.0
          }),
          metal: new THREE.MeshStandardMaterial({ 
            color: metalColor,
            metalness: 0.8,
            roughness: 0.2,
            envMapIntensity: 1.5
          }),
          accent: new THREE.MeshStandardMaterial({ 
            color: accentColor,
            metalness: 0.0,
            roughness: 0.7,
            envMapIntensity: 0.8
          })
        }
    }
  }, [renderMode])

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main body */}
      <Box 
        args={[2, 1, 0.5]} 
        position={[0, 0.5, 0]}
        material={materials.main}
        castShadow
        receiveShadow
      />
      
      {/* Metallic accent */}
      <Torus 
        args={[0.8, 0.1, 16, 32]} 
        position={[0, 1.2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.metal}
        castShadow
      />
      
      {/* Detail spheres */}
      <Sphere 
        args={[0.2]} 
        position={[1, 1, 0]}
        material={materials.accent}
        castShadow
      />
      
      <Sphere 
        args={[0.15]} 
        position={[-1, 0.8, 0.3]}
        material={materials.accent}
        castShadow
      />
      
      <Sphere 
        args={[0.1]} 
        position={[0.5, 0.2, 0.4]}
        material={materials.metal}
        castShadow
      />
      
      {/* Base platform */}
      <Box 
        args={[3, 0.1, 3]} 
        position={[0, -0.05, 0]}
        material={materials.metal}
        receiveShadow
      />
    </group>
  )
}
