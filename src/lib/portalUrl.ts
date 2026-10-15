export function getOperatorPortalUrl(): string {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5173';
  }
  return 'https://operator.accessbelt.org';
}
