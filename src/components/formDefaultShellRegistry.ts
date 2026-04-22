/** Lets default-shell form controls (Input, Textarea) reset each other when another is pressed or focused. */
const defaultShellInteractionClearers = new Map<string, () => void>();

export function registerDefaultShellInteractionClearer(id: string, clear: () => void) {
  defaultShellInteractionClearers.set(id, clear);
  return () => {
    defaultShellInteractionClearers.delete(id);
  };
}

export function clearDefaultShellInteractionExcept(keepId: string) {
  for (const [id, clear] of defaultShellInteractionClearers) {
    if (id !== keepId) clear();
  }
}
