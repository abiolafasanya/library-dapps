declare global {
  interface Error {
    shortMessage: string;
  }
}

// This line is necessary to treat this file as a module and include it in the TypeScript compilation.
export {};
