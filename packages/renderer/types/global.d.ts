interface Window {
  // Expose some Api through preload script
  fs: typeof import('fs')
  ipcRenderer: import('electron').IpcRenderer
  loading: { remove: () => void }
}
