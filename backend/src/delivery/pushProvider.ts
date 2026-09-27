// Stub adapter — swap in FCM/APNs/web-push depending on target platforms.
export async function sendPush(userId: string, message: string) {
  console.log(`[push -> ${userId}] ${message}`);
  return { delivered: true };
}
