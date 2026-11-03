import type { AccordionItem } from "@/types";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const faq: AccordionItem[] = [
  { id: "join", title: "Is CAPP free to join?", content: <>CAPP is a non-profit organisation, and free to <a className="font-semibold text-indigo" href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">join the WhatsApp community</a>. Announcements, chat and subject channels all live there.</> },
  { id: "subjects", title: "Which subjects does CAPP cover?", content: <><Link className="font-semibold text-indigo" href="/tech">Tech</Link>, <Link className="font-semibold text-indigo" href="/business-finance">Business &amp; Finance</Link>, <Link className="font-semibold text-indigo" href="/engineering">Engineering</Link> and <Link className="font-semibold text-indigo" href="/law">Law</Link>, each with its own ambassadors, resources and events. We continue to look for opportunities to expand our subjects and ambassadors.</> },
  { id: "ambassador", title: "How do I become an ambassador?", content: <>CAPP runs applications for ambassador and committee roles on a rolling basis. Find the latest opportunities on our <Link className="font-semibold text-indigo" href="/get-involved">get involved page</Link>.</> },
  { id: "suggest", title: "Can I suggest an event or speaker?", content: <>If you have any suggestions for events or speakers, please get in touch via our <Link className="font-semibold text-indigo" href="/get-involved">get involved page</Link>.</> },
  { id: "volunteer-speaker", title: "Can I volunteer for an event at CAPP?", content: <>If you wish to volunteer for an event, please visit our <Link className="font-semibold text-indigo" href="/get-involved">get involved page</Link>.</> },
];