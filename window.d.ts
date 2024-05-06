// window.d.ts

// global.d.ts
declare global {
  interface Window {
    ethereum?: import("ethers").providers.ExternalProvider;
  }
}

// This line is necessary to treat this file as a module and include it in the TypeScript compilation.
export {};
