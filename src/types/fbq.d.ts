// Extend Window interface for Meta Pixel
interface Window {
  fbq: ((...args: any[]) => void) | undefined;
}
