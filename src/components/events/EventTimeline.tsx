"use client";

import { useState } from "react";
import type { Event } from "@/data/events";
import { EventImage } from "./EventImage";

export function EventTimeline({ events }: { events: Event[] }) {
  const [openId, setOpenId] = useState<number | null>(events[0]?.id ?? null);

  return (
    <ol className="relative ml-3 list-none border-l-2 border-indigo p-0">
      {events.map((event) => {
        const open = openId === event.id;
        const panelId = `event-panel-${event.id}`;
        const buttonId = `event-button-${event.id}`;
        return (
          <li
            key={event.id}
            className="relative ml-5 border-b border-line"
          >
            <span
              aria-hidden="true"
              className="absolute top-7 left-[-28px] h-3 w-3 rounded-full border-2 border-white bg-indigo shadow-[0_0_0_1px_var(--color-indigo)]"
            />
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : event.id)}
                className="flex min-h-[88px] w-full cursor-pointer items-center gap-3 rounded-[7px] border-0 bg-transparent py-[10px] pr-3 text-left font-sans text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo sm:gap-[18px]"
              >
                {/* Thumbnail only while closed, so the image shows once */}
                <div
                  className={`shrink-0 overflow-hidden transition-[width,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    open ? "w-0 opacity-0" : "w-[76px] opacity-100 sm:w-[125px]"
                  }`}
                  aria-hidden="true"
                >
                  <EventImage
                    src={event.image}
                    className="h-[58px] w-[76px] sm:h-[68px] sm:w-[125px]"
                    sizes="125px"
                  />
                </div>
                <span className="flex flex-1 flex-col gap-[9px] text-[12px] sm:text-[14px]">
                  <strong>{event.title}</strong>
                  <span className="text-[12px] text-muted">▦ &nbsp; {event.date}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`text-[27px] text-navy transition-transform duration-200 motion-reduce:transition-none ${
                    open ? "rotate-90" : ""
                  }`}
                >
                  ›
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              inert={!open}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 gap-[14px] pb-[18px] sm:grid-cols-[minmax(180px,0.9fr)_1fr] sm:gap-6">
                  <EventImage
                    src={event.image}
                    alt={event.alt ?? event.title}
                    className="min-h-[180px] sm:min-h-[210px]"
                    sizes="(min-width: 640px) 45vw, 100vw"
                  />
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-[20px] bg-indigo-soft px-[11px] py-[6px] text-[11px] font-extrabold text-indigo">
                        {event.category}
                      </span>
                      <span className="text-[12px] text-muted">{event.date}</span>
                    </div>
                    <h4 className="my-3 text-[21px] font-bold">{event.title}</h4>
                    <p className="m-0 text-[13px] leading-[1.7] text-muted">
                      {event.description}
                    </p>
                    <div className="mt-[14px] flex flex-wrap gap-2">
                      {["CAPP Community", "Past Event"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[20px] bg-indigo-soft px-[11px] py-[7px] text-[11px] text-navy"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
