export interface Inventory {
  position: number;
  product: { imagePath: string; category: string; name: string; color: string };
  status: string;
  incoming: number;
  available: number;
}
