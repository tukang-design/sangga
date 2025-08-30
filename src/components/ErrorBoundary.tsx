import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('3D Viewer Error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1 className="error-title">3D Viewer Error</h1>
          <p className="error-message">
            We encountered an error while loading the 3D viewer. This might be due to:
            <br />• WebGL not being supported by your browser
            <br />• Graphics drivers that need updating
            <br />• A corrupted 3D model file
            <br />• Network connectivity issues
          </p>
          <div className="error-details">
            {this.state.error && (
              <details>
                <summary>Technical Details</summary>
                <pre>{this.state.error.message}</pre>
              </details>
            )}
          </div>
          <button className="error-button" onClick={this.handleReset}>
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
