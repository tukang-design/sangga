import React from 'react'
import { useViewerStore } from '../store/ViewerStore'

const ColorSelector: React.FC = () => {
  const { selectedColor, setSelectedColor } = useViewerStore()

  const colorOptions = [
    { name: 'Soft Pink', value: 'pink', hex: '#fce7f3' },
    { name: 'Sky Blue', value: 'blue', hex: '#dbeafe' },
    { name: 'Mint Green', value: 'green', hex: '#d1fae5' },
    { name: 'Warm Peach', value: 'peach', hex: '#fed7aa' },
  ]

  return (
    <div className="color-selector">
      <h3>Choose Your Color</h3>
      <div className="color-options">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            className={`color-option ${selectedColor === color.value ? 'active' : ''}`}
            onClick={() => setSelectedColor(color.value)}
            style={{ backgroundColor: color.hex }}
            aria-label={`Select ${color.name}`}
          >
            <span className="color-name">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorSelector
