import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  useProgress,
  PerspectiveCamera
} from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, ToneMapping } from '@react-three/postprocessing'
import { useViewer } from '../store/ViewerProvider'
import { Hotspots } from './Hotspots'
import { Model } from './Model'

export const Scene = () => {
  const { gl, camera } = useThree()
  const controlsRef = useRef<any>()
  
  const {
    renderMode,
    showEnvironment,
    enableBloom,
    enableDepthOfField,
    enableToneMapping,
    cameraTarget,
    cameraPosition,
    enableOrbitControls,
    setLoading,
    setLoadingProgress,
    setLoadingText,
    updatePerformance,
    setError
  } = useViewer()

  // Performance monitoring
  const performanceRef = useRef({
    frameCount: 0,
    lastTime: performance.now(),
    fps: 0
  })

  useFrame(() => {
    const now = performance.now()
    const perf = performanceRef.current
    
    perf.frameCount++
    const elapsed = now - perf.lastTime
    
    if (elapsed >= 1000) {
      perf.fps = (perf.frameCount * 1000) / elapsed
      perf.frameCount = 0
      perf.lastTime = now
      
      // Get render info
      const info = gl.info
      const triangles = info.render.triangles
      const renderTime = gl.info.render.frame
      
      updatePerformance(perf.fps, renderTime, triangles)
    }
  })

  // Loading progress tracking
  const { progress } = useProgress()
  
  useEffect(() => {
    setLoadingProgress(progress)
    if (progress === 100) {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [progress, setLoading, setLoadingProgress])

  // Camera controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.copy(cameraTarget)
      controlsRef.current.update()
    }
  }, [cameraTarget])

  useEffect(() => {
    if (camera) {
      camera.position.copy(cameraPosition)
    }
  }, [camera, cameraPosition])

  // Initialize demo content
  useEffect(() => {
    setLoadingText('Loading 3D environment...')
    
    // Simulate loading steps
    const steps = [
      { text: 'Initializing WebGL...', delay: 200 },
      { text: 'Loading shaders...', delay: 300 },
      { text: 'Preparing materials...', delay: 400 },
      { text: 'Setting up lighting...', delay: 300 },
      { text: 'Optimizing performance...', delay: 200 }
    ]

    let currentStep = 0
    const processStep = () => {
      if (currentStep < steps.length) {
        setLoadingText(steps[currentStep].text)
        setTimeout(() => {
          currentStep++
          processStep()
        }, steps[currentStep].delay)
      }
    }

    processStep()
  }, [setLoadingText])

  // Post-processing effects
  const postProcessing = useMemo(() => {
    const effects = []
    
    if (enableBloom) {
      effects.push(
        <Bloom 
          key="bloom"
          intensity={0.5}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.025}
        />
      )
    }
    
    if (enableDepthOfField) {
      effects.push(
        <DepthOfField
          key="dof"
          focusDistance={0.02}
          focalLength={0.025}
          bokehScale={3}
        />
      )
    }
    
    if (enableToneMapping) {
      effects.push(
        <ToneMapping 
          key="tone"
          adaptive
          resolution={256}
          middleGrey={0.6}
          maxLuminance={16}
          averageLuminance={1}
          adaptationRate={1}
        />
      )
    }
    
    return effects.length > 0 ? (
      <EffectComposer>{effects}</EffectComposer>
    ) : null
  }, [enableBloom, enableDepthOfField, enableToneMapping])

  // Error handling for WebGL
  useEffect(() => {
    if (!gl.getContext()) {
      setError('WebGL is not supported in this browser')
      return
    }

    const canvas = gl.domElement
    const handleContextLost = (event: Event) => {
      event.preventDefault()
      setError('WebGL context was lost. Please refresh the page.')
    }

    canvas.addEventListener('webglcontextlost', handleContextLost)
    return () => canvas.removeEventListener('webglcontextlost', handleContextLost)
  }, [gl, setError])

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[5, 5, 5]}
        fov={60}
        near={0.1}
        far={1000}
      />

      {/* Controls */}
      {enableOrbitControls && (
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          dampingFactor={0.05}
          enableDamping={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={1}
          maxDistance={50}
        />
      )}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />

      {/* Environment */}
      {showEnvironment && (
        <Environment preset="sunset" background />
      )}

      {/* Ground */}
      <ContactShadows
        opacity={0.4}
        scale={20}
        blur={1}
        far={20}
        resolution={256}
        color="#000000"
      />

      {/* Model */}
      <Model renderMode={renderMode} />

      {/* Hotspots */}
      <Hotspots />

      {/* Post-processing */}
      {postProcessing}

      {/* Helper grid (only in wireframe mode) */}
      {renderMode === 'wireframe' && (
        <gridHelper args={[20, 20, '#444444', '#444444']} />
      )}
    </>
  )
}
