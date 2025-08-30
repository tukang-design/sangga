import React from 'react'
import { useViewerStore } from '../store/ViewerStore'

const CollapsibleColorSelector: React.FC = () => {
  const { 
    selectedColor, 
    setSelectedColor, 
    isColorSelectorExpanded, 
    toggleColorSelector 
  } = useViewerStore()

  const colorOptions = [
    { name: 'Warm Brown', value: 'brown', hex: '#8b5a3c' },
    { name: 'Earth Tan', value: 'tan', hex: '#8b6f47' },
    { name: 'Dark Wood', value: 'darkwood', hex: '#5d4e37' },
    { name: 'Natural Beige', value: 'beige', hex: '#a68b5b' },
  ]

  const selectedColorData = colorOptions.find(color => color.value === selectedColor) || colorOptions[0]

  return (
    <div className="collapsible-color-selector">
      {/* Toggle Button */}
      <button
        className="color-selector-toggle"
        onClick={toggleColorSelector}
        aria-label="Toggle color selector"
        style={{ backgroundColor: selectedColorData.hex }}
      >
        <span className="toggle-icon">
          {isColorSelectorExpanded ? '×' : '◉'}
        </span>
      </button>

      {/* Expanded Color Options */}
      {isColorSelectorExpanded && (
        <div className="color-options-expanded">
          <div className="color-options-grid">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                className={`color-option-compact ${selectedColor === color.value ? 'active' : ''}`}
                onClick={() => {
                  setSelectedColor(color.value)
                  toggleColorSelector()
                }}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.name}`}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CollapsibleColorSelector
