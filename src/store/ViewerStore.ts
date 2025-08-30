import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import * as THREE from 'three'

export interface ViewerState {
  // Loading state
  isLoading: boolean
  loadingProgress: number
  loadingText: string
  
  // Model state
  selectedColor: string
  
  // Camera and controls
  cameraTarget: THREE.Vector3
  cameraPosition: THREE.Vector3
  enableOrbitControls: boolean
  
  // Animation
  isRotating: boolean
  rotationSpeed: number
  
  // UI state
  isColorSelectorExpanded: boolean
  
  // Error state
  error: string | null
}

export interface ViewerActions {
  // Loading actions
  setLoading: (isLoading: boolean) => void
  setLoadingProgress: (progress: number) => void
  setLoadingText: (text: string) => void
  
  // Model actions
  setSelectedColor: (color: string) => void
  
  // Camera actions
  setCameraTarget: (target: THREE.Vector3) => void
  setCameraPosition: (position: THREE.Vector3) => void
  resetCamera: () => void
  
  // Animation actions
  setRotating: (rotating: boolean) => void
  setRotationSpeed: (speed: number) => void
  
  // UI actions
  toggleColorSelector: () => void
  setColorSelectorExpanded: (expanded: boolean) => void
  
  // Error actions
  setError: (error: string | null) => void
}

const initialState: ViewerState = {
  // Loading state
  isLoading: true,
  loadingProgress: 0,
  loadingText: 'Loading your Sangga...',
  
  // Model state
  selectedColor: 'brown',
  
  // Camera and controls
  cameraTarget: new THREE.Vector3(0, 0, 0),
  cameraPosition: new THREE.Vector3(0, 0, 5),
  enableOrbitControls: true,
  
  // Animation
  isRotating: true,
  rotationSpeed: 0.2,
  
  // UI state
  isColorSelectorExpanded: false,
  
  // Error state
  error: null,
}

export const useViewerStore = create<ViewerState & ViewerActions>()(
  subscribeWithSelector((set) => ({
    ...initialState,
    
    // Loading actions
    setLoading: (isLoading: boolean) => set({ isLoading }),
    setLoadingProgress: (progress: number) => set({ loadingProgress: progress }),
    setLoadingText: (text: string) => set({ loadingText: text }),
    
    // Model actions
    setSelectedColor: (color: string) => set({ selectedColor: color }),
    
    // Camera actions
    setCameraTarget: (target: THREE.Vector3) => set({ cameraTarget: target }),
    setCameraPosition: (position: THREE.Vector3) => set({ cameraPosition: position }),
    resetCamera: () => set({ 
      cameraPosition: new THREE.Vector3(0, 0, 5),
      cameraTarget: new THREE.Vector3(0, 0, 0)
    }),
    
    // Animation actions
    setRotating: (rotating: boolean) => set({ isRotating: rotating }),
    setRotationSpeed: (speed: number) => set({ rotationSpeed: speed }),
    
    // UI actions
    toggleColorSelector: () => set((state) => ({ isColorSelectorExpanded: !state.isColorSelectorExpanded })),
    setColorSelectorExpanded: (expanded: boolean) => set({ isColorSelectorExpanded: expanded }),
    
    // Error actions
    setError: (error: string | null) => set({ error }),
  }))
)
