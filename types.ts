// types.ts

export type Product = {
  title: string;
  category: string;
  price: number;
};

// CPU come prodotto
export type CPU = {
  id: number;
  title: string;
  category: string;
  price: number,
  brand: "Intel" | "AMD";
  model: string;
  cores: number;
  threads: number;
  baseClockGHz: number;
  turboClockGHz?: number;
};

// GPU come prodotto
export type GPU = {
  id: number;
  title: string;
  category: string;
  price: number,
  brand: "Nvidia" | "AMD" | "Intel";
  model: string;
  vramGB: number;
  dedicated: boolean;
};

// Storage come prodotto
export type Storage = {
  id: number;
  title: string;
  category: string;
  price: number,
  type: "SSD" | "HDD" | "NVMe";
  capacityGB: number;
};

// Schermo come prodotto
export type Screen = {
  id: number;
  title: string;
  category: string;
  price: number,
  sizeInches: number;
  resolution: "1920x1080" | "2560x1440" | "3840x2160";
  refreshRateHz: number;
  panelType: "IPS" | "TN" | "VA" | "OLED";
};

// Peripheral come prodotto
export type Peripheral = {
  id: number;
  title: string;
  category: string;
  price: number,
  brand: string;
  type: "Monitor" | "Keyboard" | "Mouse" | "Printer" | "Webcam";
  wireless: boolean;
};


// Laptop come prodotto composto
export type Laptop = {
  id: number;
  title: string;
  category: string;
  price: number,
  brand: string;
  cpu: CPU;
  gpu: GPU;
  ramGB: number;
  storage: Storage[];
  screen: Screen;
};

/* // Union type di tutti i prodotti
export type Device =
  | CPU
  | GPU
  | Storage
  | Screen
  | Peripheral
  | OSProduct
  | Laptop;
 */