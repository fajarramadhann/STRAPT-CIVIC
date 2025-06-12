import { DropInfo } from "@/hooks/useOptimizedStraptDrop";
import { isExpired } from "./format-expiry-time";

// Check if a drop can be refunded
export const canRefund = (drop: DropInfo) => {
  return drop.isActive && isExpired(drop.expiryTime) && drop.remainingAmount > 0n;
};