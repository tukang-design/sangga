import { useEffect, useState } from 'react'
import { useViewer } from '../store/ViewerProvider'

export const PerformanceMonitor = () => {
  const { showPerformance, fps, renderTime, triangles } = useViewer()
  const [memoryUsage, setMemoryUsage] = useState(0)

  useEffect(() => {
    const updateMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        setMemoryUsage(Math.round(memory.usedJSHeapSize / 1024 / 1024))
      }
    }

    const interval = setInterval(updateMemory, 1000)
    updateMemory()

    return () => clearInterval(interval)
  }, [])

  if (!showPerformance) return null

  const getFPSColor = (fps: number) => {
    if (fps >= 50) return '#10b981' // green
    if (fps >= 30) return '#f59e0b' // yellow
    return '#ef4444' // red
  }

  return (
    <div className="performance-monitor">
      <div className="performance-stat">
        <span>FPS:</span>
        <span style={{ color: getFPSColor(fps) }}>
          {fps.toFixed(0)}
        </span>
      </div>
      
      <div className="performance-stat">
        <span>Render:</span>
        <span>{renderTime.toFixed(1)}ms</span>
      </div>
      
      <div className="performance-stat">
        <span>Triangles:</span>
        <span>{triangles.toLocaleString()}</span>
      </div>
      
      {memoryUsage > 0 && (
        <div className="performance-stat">
          <span>Memory:</span>
          <span>{memoryUsage}MB</span>
        </div>
      )}
      
      <div className="performance-stat">
        <span>WebGL:</span>
        <span style={{ color: '#10b981' }}>✓</span>
      </div>
    </div>
  )
}
