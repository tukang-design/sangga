import { useEffect } from 'react'
import { useViewer } from '../store/ViewerProvider'

export const useKeyboardShortcuts = () => {
  const {
    resetCamera,
    fitToModel,
    togglePlayback,
    captureScreenshot,
    toggleFullscreen,
    toggleControls,
    togglePerformance,
    setRenderMode,
    renderMode
  } = useViewer()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent shortcuts when typing in inputs
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement || 
          event.target instanceof HTMLSelectElement) {
        return
      }

      switch (event.code) {
        case 'KeyR':
          if (event.ctrlKey || event.metaKey) return // Don't interfere with browser refresh
          resetCamera()
          break
          
        case 'KeyF':
          if (event.ctrlKey || event.metaKey) return // Don't interfere with browser find
          fitToModel()
          break
          
        case 'Space':
          event.preventDefault()
          togglePlayback()
          break
          
        case 'KeyC':
          if (event.ctrlKey || event.metaKey) return // Don't interfere with copy
          captureScreenshot()
          break
          
        case 'Escape':
          if (document.fullscreenElement) {
            toggleFullscreen()
          }
          break
          
        case 'KeyH':
          toggleControls()
          break
          
        case 'KeyP':
          togglePerformance()
          break
          
        case 'Digit1':
          setRenderMode('textured')
          break
          
        case 'Digit2':
          setRenderMode('solid')
          break
          
        case 'Digit3':
          setRenderMode('wireframe')
          break
          
        case 'Tab':
          // Cycle through render modes
          event.preventDefault()
          const modes: Array<'textured' | 'solid' | 'wireframe'> = ['textured', 'solid', 'wireframe']
          const currentIndex = modes.indexOf(renderMode)
          const nextIndex = (currentIndex + 1) % modes.length
          setRenderMode(modes[nextIndex])
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    resetCamera,
    fitToModel,
    togglePlayback,
    captureScreenshot,
    toggleFullscreen,
    toggleControls,
    togglePerformance,
    setRenderMode,
    renderMode
  ])
}

// Keyboard shortcuts help component
export const KeyboardShortcuts = ({ visible }: { visible: boolean }) => {
  if (!visible) return null

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '24px',
      color: '#ffffff',
      zIndex: 1000,
      minWidth: '400px'
    }}>
      <h3 style={{ margin: '0 0 16px 0', textAlign: 'center' }}>Keyboard Shortcuts</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', fontSize: '0.9rem' }}>
        <kbd style={kbdStyle}>R</kbd>
        <span>Reset camera view</span>
        
        <kbd style={kbdStyle}>F</kbd>
        <span>Fit model to screen</span>
        
        <kbd style={kbdStyle}>Space</kbd>
        <span>Toggle animation playback</span>
        
        <kbd style={kbdStyle}>C</kbd>
        <span>Capture screenshot</span>
        
        <kbd style={kbdStyle}>H</kbd>
        <span>Toggle controls panel</span>
        
        <kbd style={kbdStyle}>P</kbd>
        <span>Toggle performance monitor</span>
        
        <kbd style={kbdStyle}>1</kbd>
        <span>Textured render mode</span>
        
        <kbd style={kbdStyle}>2</kbd>
        <span>Solid render mode</span>
        
        <kbd style={kbdStyle}>3</kbd>
        <span>Wireframe render mode</span>
        
        <kbd style={kbdStyle}>Tab</kbd>
        <span>Cycle render modes</span>
        
        <kbd style={kbdStyle}>Esc</kbd>
        <span>Exit fullscreen</span>
      </div>
      
      <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.8rem', opacity: 0.7 }}>
        Press any key to close
      </div>
    </div>
  )
}

const kbdStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '4px',
  padding: '4px 8px',
  fontFamily: 'monospace',
  fontSize: '0.8rem',
  display: 'inline-block',
  minWidth: '24px',
  textAlign: 'center'
}
