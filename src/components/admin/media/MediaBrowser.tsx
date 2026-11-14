"use client";

import { useState } from "react";
import { ImageOff, Search } from "lucide-react";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { FilterMenu, type FilterGroup } from "@/components/admin/FilterMenu";
import { inputClass } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { SLOT_GROUPS, getSlotGroup, type SlotGroupId } from "@/lib/media/slot-groups";
import type { MediaSlot } from "@/lib/services/media.service";

import { MediaSlotGroup } from "./MediaSlotGroup";

type GroupFilter = "all" | SlotGroupId;
type StatusFilter = "all" | "empty" | "filled";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "empty", label: "Needs an image" },
  { value: "filled", label: "Has an image" },
];

const matchesStatus = (slot: MediaSlot, status: StatusFilter) =>
  status === "all" || (status === "empty" ? !slot.blob_url : Boolean(slot.blob_url));

/**
 * The media admin: search, page pills and a status filter, so you can jump straight
 * to the image you want instead of scrolling through every section.
 */
export function MediaBrowser({ slots }: { slots: MediaSlot[] }) {
  const [group, setGroup] = useState<GroupFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");

  const search = query.trim().toLowerCase();
  const matchesSearch = (slot: MediaSlot) =>
    !search || [slot.label, slot.slot_key, slot.description].some((text) => text?.toLowerCase().includes(search));
  const inGroup = (slot: MediaSlot) => group === "all" || getSlotGroup(slot.slot_key) === group;

  const scoped = slots.filter((slot) => inGroup(slot) && matchesSearch(slot));
  const visible = scoped.filter((slot) => matchesStatus(slot, status));

  const sections = SLOT_GROUPS.map((item) => ({
    group: item,
    slots: visible.filter((slot) => getSlotGroup(slot.slot_key) === item.id),
  })).filter((section) => section.slots.length > 0);

  const filters: FilterGroup[] = [
    {
      id: "status",
      label: "Status",
      value: status,
      defaultValue: "all",
      options: STATUS_OPTIONS.map((option) => ({
        ...option,
        count: scoped.filter((slot) => matchesStatus(slot, option.value)).length,
      })),
    },
  ];

  const empty = slots.filter((slot) => !slot.blob_url).length;
  const clearAll = () => {
    setGroup("all");
    setStatus("all");
    setQuery("");
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 basis-56">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search images"
            aria-label="Search images"
            className={cn(inputClass, "pl-10")}
          />
        </div>
        <FilterMenu groups={filters} onChange={(_id, value) => setStatus(value as StatusFilter)} onClear={() => setStatus("all")} />
        <p className="w-full text-sm text-muted sm:w-auto">
          {slots.length - empty}/{slots.length} filled
          {empty > 0 ? <span className="text-gold-ink"> · {empty} need an image</span> : null}
        </p>
      </div>

      <div
        role="group"
        aria-label="Filter by page"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {[{ id: "all" as const, label: "All" }, ...SLOT_GROUPS].map((item) => {
          const selected = group === item.id;
          const inItem = slots.filter((slot) => item.id === "all" || getSlotGroup(slot.slot_key) === item.id);
          const missing = inItem.filter((slot) => !slot.blob_url).length;
          if (item.id !== "all" && inItem.length === 0) return null;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setGroup(item.id)}
              className={cn(
                "focus-ring inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                selected ? "border-navy-ink bg-navy-ink text-white" : "border-line bg-white text-navy-ink hover:border-muted-soft",
              )}
            >
              {item.label}
              <span className={cn("text-xs tabular-nums", selected ? "text-white/70" : "text-muted")}>{inItem.length}</span>
              {missing > 0 ? (
                <span
                  className={cn("size-2 rounded-full", selected ? "bg-gold-light" : "bg-gold")}
                  title={`${missing} need an image`}
                >
                  <span className="sr-only">{missing} need an image</span>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {slots.length === 0 ? (
        <AdminEmptyState
          icon={ImageOff}
          title="No media slots yet"
          description="Slots are created by a developer in Supabase."
        />
      ) : visible.length === 0 ? (
        <AdminEmptyState
          icon={ImageOff}
          title="No images match"
          description="Try a different search or filter."
          action={
            <Button type="button" variant="secondary" size="sm" className="h-11" onClick={clearAll}>
              Clear everything
            </Button>
          }
        />
      ) : (
        <div>
          {sections.map((section) => (
            <MediaSlotGroup key={section.group.id} group={section.group} slots={section.slots} />
          ))}
        </div>
      )}
    </div>
  );
}
