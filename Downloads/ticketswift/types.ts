
export type Role = 'user' | 'model';

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
  groundingLinks?: GroundingLink[];
}

export interface GroundingLink {
  title: string;
  uri: string;
}

export interface SupportAction {
  label: string;
  icon: string;
  query: string;
}

export interface OrderDetails {
  orderId: string;
  status: string;
  estimatedDelivery: string;
}
