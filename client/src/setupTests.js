import '@testing-library/jest-dom';

// Optional: mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
