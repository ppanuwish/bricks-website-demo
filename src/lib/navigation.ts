export type NavigateFn = (key: string) => void;

export function goToPage(navigate: NavigateFn, key: string): void {
  navigate(key);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
