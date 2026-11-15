/**
 * Site-wide constants. Keep every "one true value" here so it is changed in ONE place.
 * (Placeholder values: replace before launch.)
 */
export const SITE = {
  name: "CAPP",
  fullName: "Careers and People's Progression",
  /** The one WhatsApp join link used by every "Join" button (see WhatsAppButton). */
  whatsappUrl: "https://chat.whatsapp.com/REPLACE_ME",
  volunteerPanelUrl: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__XN-R9JUM1BHRFBPTUJCUkFIV0VITFhTTlQzUU1SWC4u",
  ambassadorRoleUrl: "https://forms.gle/moriEm8d2GQwasZHA",
  committeeRoleUrl: "https://forms.gle/LbQzgkP3DLsYQjWh6",
  /** Shown in the hero. Keep it approximate: "Around 800 members". */
  memberStat: "Around 800 members across four subjects",
} as const;
