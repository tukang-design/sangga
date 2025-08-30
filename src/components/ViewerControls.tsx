import React from 'react'
import { useViewerStore } from '../store/ViewerStore'

const ViewerControls: React.FC = () => {
  const { isRotating, setRotating } = useViewerStore()

  return (
    <div className="viewer-controls">
      <button
        className={`control-button ${isRotating ? 'active' : ''}`}
        onClick={() => setRotating(!isRotating)}
      >
        {isRotating ? '⏸️ Pause Rotation' : '▶️ Auto Rotate'}
      </button>
      <p className="control-hint">
        Drag to rotate • Scroll to zoom
      </p>
    </div>
  )
}

export default ViewerControls
