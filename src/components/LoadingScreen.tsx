import { useViewer } from '../store/ViewerProvider'

export const LoadingScreen = () => {
  const { isLoading, loadingProgress, loadingText } = useViewer()

  if (!isLoading) return null

  return (
    <div className="loading-overlay">
      <div className="loading-text">{loadingText}</div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${loadingProgress}%` }}
        />
      </div>
      <div style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.7 }}>
        {Math.round(loadingProgress)}%
      </div>
    </div>
  )
}
