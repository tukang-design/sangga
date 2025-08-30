import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useViewer } from '../store/ViewerProvider'

export const Hotspots = () => {
  const { camera, size } = useThree()
  const { hotspots, activeHotspot, setActiveHotspot } = useViewer()

  const getScreenPosition = (position: THREE.Vector3) => {
    const vector = position.clone()
    vector.project(camera)

    const x = (vector.x * 0.5 + 0.5) * size.width
    const y = (vector.y * -0.5 + 0.5) * size.height

    return { x, y, z: vector.z }
  }

  return (
    <>
      {hotspots.map((hotspot) => {
        if (!hotspot.visible) return null

        const screenPos = getScreenPosition(hotspot.position)
        
        // Don't render if behind camera
        if (screenPos.z > 1) return null

        return (
          <Html
            key={hotspot.id}
            position={hotspot.position}
            distanceFactor={10}
            occlude
            className="hotspot-container"
          >
            <div
              className={`hotspot ${activeHotspot === hotspot.id ? 'active' : ''}`}
              onClick={() => setActiveHotspot(
                activeHotspot === hotspot.id ? null : hotspot.id
              )}
            >
              {activeHotspot === hotspot.id && (
                <div className="hotspot-tooltip">
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>
                    {hotspot.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>
                    {hotspot.description}
                  </p>
                </div>
              )}
            </div>
          </Html>
        )
      })}
    </>
  )
}
