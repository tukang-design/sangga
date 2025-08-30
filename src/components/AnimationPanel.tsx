import { useCallback, useEffect, useRef } from 'react'
import { FiPlay, FiPause, FiSquare, FiSkipBack, FiSkipForward } from 'react-icons/fi'
import { useViewer } from '../store/ViewerProvider'

export const AnimationPanel = () => {
  const {
    animations,
    currentAnimation,
    animationTime,
    isPlaying,
    animationSpeed,
    playAnimation,
    stopAnimation,
    setAnimationTime,
    setAnimationSpeed,
    togglePlayback
  } = useViewer()

  const timelineRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const currentAnimationClip = animations.find(anim => anim.name === currentAnimation)
  const duration = currentAnimationClip?.duration || 1
  const progress = Math.min((animationTime / duration) * 100, 100)

  const handleTimelineClick = useCallback((event: React.MouseEvent) => {
    if (!timelineRef.current || !currentAnimationClip) return
    
    const rect = timelineRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    const newTime = percentage * duration
    
    setAnimationTime(newTime)
  }, [currentAnimationClip, duration, setAnimationTime])

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    isDragging.current = true
    handleTimelineClick(event)
  }, [handleTimelineClick])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging.current) return
    if (!timelineRef.current || !currentAnimationClip) return
    
    const rect = timelineRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    const newTime = percentage * duration
    
    setAnimationTime(newTime)
  }, [currentAnimationClip, duration, setAnimationTime])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  if (animations.length === 0) return null

  return (
    <div className="animation-panel">
      {/* Animation Selection */}
      <select 
        value={currentAnimation || ''} 
        onChange={(e) => e.target.value ? playAnimation(e.target.value) : stopAnimation()}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          color: '#ffffff',
          padding: '4px 8px',
          fontSize: '0.9rem'
        }}
      >
        <option value="">Select Animation</option>
        {animations.map((anim) => (
          <option key={anim.name} value={anim.name}>
            {anim.name}
          </option>
        ))}
      </select>

      {/* Playback Controls */}
      <div className="animation-controls">
        <button 
          className="control-button"
          onClick={() => setAnimationTime(0)}
          disabled={!currentAnimation}
          style={{ opacity: currentAnimation ? 1 : 0.5 }}
        >
          <FiSkipBack size={16} />
        </button>
        
        <button 
          className="control-button"
          onClick={togglePlayback}
          disabled={!currentAnimation}
          style={{ opacity: currentAnimation ? 1 : 0.5 }}
        >
          {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
        </button>
        
        <button 
          className="control-button"
          onClick={stopAnimation}
          disabled={!currentAnimation}
          style={{ opacity: currentAnimation ? 1 : 0.5 }}
        >
          <FiSquare size={16} />
        </button>
        
        <button 
          className="control-button"
          onClick={() => setAnimationTime(duration)}
          disabled={!currentAnimation}
          style={{ opacity: currentAnimation ? 1 : 0.5 }}
        >
          <FiSkipForward size={16} />
        </button>
      </div>

      {/* Timeline */}
      {currentAnimation && (
        <>
          <div 
            ref={timelineRef}
            className="timeline-slider"
            onClick={handleTimelineClick}
            onMouseDown={handleMouseDown}
          >
            <div 
              className="timeline-progress" 
              style={{ width: `${progress}%` }}
            />
            <div 
              className="timeline-thumb"
              style={{ left: `${progress}%` }}
            />
          </div>

          {/* Time Display */}
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            {animationTime.toFixed(1)}s / {duration.toFixed(1)}s
          </div>
        </>
      )}

      {/* Speed Control */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Speed:</span>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
          style={{
            width: '80px',
            height: '4px',
            background: '#333',
            outline: 'none',
            borderRadius: '2px'
          }}
        />
        <span style={{ fontSize: '0.8rem', minWidth: '30px' }}>
          {animationSpeed.toFixed(1)}x
        </span>
      </div>
    </div>
  )
}
