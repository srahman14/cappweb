/**
 * Site-wide constants. Keep every "one true value" here so it is changed in ONE place.
 * (Placeholder values: replace before launch.)
 */
export const SITE = {
  name: "CAPP",
  fullName: "Careers and People's Progression",
  /** Contact address used in the Privacy policy and Terms. REPLACE before launch (brackets show highlighted on those pages until then). */
  contactEmail: "cappmain@outlook.com",
  /** The one WhatsApp join link used by every "Join" button (see WhatsAppButton). */
  whatsappUrl: "https://chat.whatsapp.com/GryLuh7Vk5CGaT5jE8FdCI",
  volunteerPanelUrl: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__XN-R9JUM1BHRFBPTUJCUkFIV0VITFhTTlQzUU1SWC4u",
  ambassadorRoleUrl: "https://forms.gle/moriEm8d2GQwasZHA",
  committeeRoleUrl: "https://forms.gle/LbQzgkP3DLsYQjWh6",
  /** Shown in the hero. Keep it approximate: "Around 800 members". */
  memberStat: "Around 800 members across four subjects",
} as const;
