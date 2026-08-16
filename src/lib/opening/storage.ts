export const INVITATION_OPENED_KEY = "cecilia_invitation_opened_v1";
export const INVITATION_OPENED_VALUE = "true";
export const INVITATION_OPENED_EVENT = "cecilia-invitation-opened";

export function isInvitationOpened(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return (
      window.localStorage.getItem(INVITATION_OPENED_KEY) ===
      INVITATION_OPENED_VALUE
    );
  } catch {
    return false;
  }
}

export function saveInvitationOpened(): void {
  try {
    window.localStorage.setItem(INVITATION_OPENED_KEY, INVITATION_OPENED_VALUE);
    window.dispatchEvent(new Event(INVITATION_OPENED_EVENT));
  } catch {
    // Private mode or blocked storage should not block opening.
  }
}

export function subscribeInvitationOpened(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(INVITATION_OPENED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(INVITATION_OPENED_EVENT, onStoreChange);
  };
}
