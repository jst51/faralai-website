// Scroll timeline of the 3D hero, as fractions of the pinned section (0 to 1).
// Kept apart from the scene so the text overlay can use it without loading three.js.

export const STATIONS = 8;
export const FIRST_STOP = 0.1;
export const STOP_LENGTH = 0.09;
export const OUTRO_START = 0.835;

export const stopStart = (i: number) => FIRST_STOP + STOP_LENGTH * i;

// -1 is the opening plan, 0 to 7 the services, STATIONS the closing view.
export function sceneAt(p: number) {
  if (p < FIRST_STOP - 0.015) return -1;
  if (p >= OUTRO_START) return STATIONS;
  return Math.min(STATIONS - 1, Math.floor((p - FIRST_STOP + 0.015) / STOP_LENGTH));
}
