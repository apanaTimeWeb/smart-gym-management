// RESPONSIBILITY: Named Progress tab contract shared by module UI and state.
export const PROGRESS_TAB_IDS = ['individual', 'compare'] as const;
export type ProgressTab = (typeof PROGRESS_TAB_IDS)[number];
