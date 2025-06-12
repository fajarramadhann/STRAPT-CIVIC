// Format expiry time
export const formatExpiryTime = (expiryTime: bigint) => {
  const expiryTimeNum = Number(expiryTime);
  if (expiryTimeNum <= 0) return 'No expiration';

  const expiryDate = new Date(expiryTimeNum * 1000);
  const now = new Date();

  if (expiryDate <= now) {
    return 'Expired';
  }

  // Calculate time difference in hours
  const diffInHours = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'Expires in less than an hour';
  }

  if (diffInHours === 1) {
    return 'Expires in 1 hour';
  }

  return `Expires in ${diffInHours} hours`;
};

 // Check if a drop is expired
export const isExpired = (expiryTime: bigint) => {
  const expiryTimeNum = Number(expiryTime);
  return expiryTimeNum > 0 && expiryTimeNum * 1000 < Date.now();
};