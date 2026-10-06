/**
 * @description Defines the external prop contract for the manager-wide command palette.
 * @dependencies No runtime dependencies; consumed only by the ManagerCommandPalette presentation layer.
 * @edge-case The open request is optional so the command palette remains keyboard-first while supporting an explicit shell trigger.
 */
export interface ManagerCommandPaletteProps {
  requestedOpen?: boolean;
  onRequestedOpenHandled?: () => void;
}
