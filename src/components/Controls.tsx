import { useState } from 'react'
import { 
  FiRotateCcw, 
  FiMaximize, 
  FiCamera, 
  FiEye, 
  FiGrid,
  FiSun,
  FiMonitor,
  FiHelpCircle
} from 'react-icons/fi'
import { useViewer } from '../store/ViewerProvider'
import { KeyboardShortcuts } from '../utils/keyboardShortcuts'

export const Controls = () => {
  const [showHelp, setShowHelp] = useState(false)
  const {
    showControls,
    renderMode,
    showEnvironment,
    enableBloom,
    enableDepthOfField,
    enableToneMapping,
    setRenderMode,
    toggleEnvironment,
    toggleBloom,
    toggleDepthOfField,
    toggleToneMapping,
    resetCamera,
    fitToModel,
    toggleFullscreen,
    captureScreenshot,
    toggleControls
  } = useViewer()

  if (!showControls) {
    return (
      <button 
        className="control-button"
        style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}
        onClick={toggleControls}
      >
        <FiEye size={16} />
        Show Controls
      </button>
    )
  }

  return (
    <>
      <div className="controls-panel">
        {/* View Controls */}
        <div className="control-group">
          <h4>VIEW</h4>
          <button className="control-button" onClick={resetCamera}>
            <FiRotateCcw size={16} />
            Reset Camera
          </button>
          <button className="control-button" onClick={fitToModel}>
            <FiMaximize size={16} />
            Fit to Model
          </button>
          <button className="control-button" onClick={toggleFullscreen}>
            <FiMonitor size={16} />
            Fullscreen
          </button>
          <button className="control-button" onClick={captureScreenshot}>
            <FiCamera size={16} />
            Screenshot
          </button>
        </div>

        {/* Render Mode */}
        <div className="control-group">
          <h4>RENDER</h4>
          <button 
            className={`control-button ${renderMode === 'textured' ? 'active' : ''}`}
            onClick={() => setRenderMode('textured')}
          >
            <FiSun size={16} />
            Textured
          </button>
          <button 
            className={`control-button ${renderMode === 'solid' ? 'active' : ''}`}
            onClick={() => setRenderMode('solid')}
          >
            <FiEye size={16} />
            Solid
          </button>
          <button 
            className={`control-button ${renderMode === 'wireframe' ? 'active' : ''}`}
            onClick={() => setRenderMode('wireframe')}
          >
            <FiGrid size={16} />
            Wireframe
          </button>
        </div>

        {/* Environment */}
        <div className="control-group">
          <h4>ENVIRONMENT</h4>
          <button 
            className={`control-button ${showEnvironment ? 'active' : ''}`}
            onClick={toggleEnvironment}
          >
            Environment
          </button>
        </div>

        {/* Post-processing */}
        <div className="control-group">
          <h4>EFFECTS</h4>
          <button 
            className={`control-button ${enableBloom ? 'active' : ''}`}
            onClick={toggleBloom}
          >
            Bloom
          </button>
          <button 
            className={`control-button ${enableDepthOfField ? 'active' : ''}`}
            onClick={toggleDepthOfField}
          >
            Depth of Field
          </button>
          <button 
            className={`control-button ${enableToneMapping ? 'active' : ''}`}
            onClick={toggleToneMapping}
          >
            Tone Mapping
          </button>
        </div>

        {/* Help and Settings */}
        <div className="control-group">
          <h4>HELP</h4>
          <button 
            className="control-button"
            onClick={() => setShowHelp(true)}
          >
            <FiHelpCircle size={16} />
            Shortcuts
          </button>
          <button 
            className="control-button"
            onClick={toggleControls}
            style={{ opacity: 0.7 }}
          >
            <FiEye size={16} />
            Hide Controls
          </button>
        </div>
      </div>

      {/* Help Overlay */}
      {showHelp && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}
          onClick={() => setShowHelp(false)}
        >
          <KeyboardShortcuts visible={true} />
        </div>
      )}
    </>
  )
}
