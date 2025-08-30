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
    { name: 'Black', value: 'black', hex: '#2c2c2c' },
    { name: 'Olive Green', value: 'olive', hex: '#6b8e23' },
    { name: 'Sage', value: 'sage', hex: '#9caf88' },
    { name: 'Pink', value: 'pink', hex: '#ffc0cb' },
    { name: 'Baby Blue', value: 'babyblue', hex: '#87ceeb' },
    { name: 'Green', value: 'green', hex: '#4caf50' },
    { name: 'Orange', value: 'orange', hex: '#ff7043' },
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
