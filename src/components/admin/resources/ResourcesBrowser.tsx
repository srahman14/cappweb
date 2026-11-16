"use client";

import { useMemo, useState } from "react";
import { FileText, Plus, Search } from "lucide-react";

import { AdminDialog } from "@/components/admin/AdminDialog";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { FilterMenu, type FilterGroup } from "@/components/admin/FilterMenu";
import { inputClass } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";
import { resourceGroups } from "@/data/resources";
import { cn } from "@/lib/cn";
import type { AdminResource } from "@/lib/services/resource.service";
import type { ResourceGroup } from "@/types";

import { ResourceCard } from "./ResourceCard";
import { ResourceForm } from "./ResourceForm";

type GroupFilter = "all" | ResourceGroup;
type StatusFilter = "all" | "published" | "drafts";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "drafts", label: "Drafts" },
];

const matchesStatus = (resource: AdminResource, status: StatusFilter) =>
  status === "all" || (status === "published" ? resource.isPublished : !resource.isPublished);

/**
 * The resources admin: one Add button, a search box, group tabs, filters and a grid of
 * cards. Everything is filtered in the browser, so it responds instantly.
 */
export function ResourcesBrowser({ resources, categories }: { resources: AdminResource[]; categories: string[] }) {
  const [group, setGroup] = useState<GroupFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);

  // Display order within each group, used by the "move" buttons.
  const idsByGroup = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const resource of resources) {
      map.set(resource.group, [...(map.get(resource.group) ?? []), resource.id]);
    }
    return map;
  }, [resources]);

  const search = query.trim().toLowerCase();
  const inGroup = (resource: AdminResource) => group === "all" || resource.group === group;
  const matchesSearch = (resource: AdminResource) =>
    !search ||
    [resource.title, resource.description, resource.category].some((text) => text.toLowerCase().includes(search));

  const scoped = resources.filter((resource) => inGroup(resource) && matchesSearch(resource));
  const visible = scoped.filter(
    (resource) => matchesStatus(resource, status) && (category === "all" || resource.category === category),
  );

  const groups: FilterGroup[] = [
    {
      id: "status",
      label: "Status",
      value: status,
      defaultValue: "all",
      options: STATUS_OPTIONS.map((option) => ({
        ...option,
        count: scoped.filter((resource) => matchesStatus(resource, option.value)).length,
      })),
    },
    {
      id: "category",
      label: "Category",
      value: category,
      defaultValue: "all",
      options: [
        { value: "all", label: "All categories", count: scoped.length },
        ...categories.map((name) => ({
          value: name,
          label: name,
          count: scoped.filter((resource) => resource.category === name).length,
        })),
      ],
    },
  ];

  const clearFilters = () => {
    setStatus("all");
    setCategory("all");
  };
  const clearAll = () => {
    clearFilters();
    setGroup("all");
    setQuery("");
  };

  const published = resources.filter((resource) => resource.isPublished).length;
  const filtered = status !== "all" || category !== "all" || group !== "all" || search !== "";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" size="sm" className="h-11 flex-1 gap-2 sm:flex-none" onClick={() => setAdding(true)}>
          <Plus aria-hidden="true" className="size-4" />
          Add resource
        </Button>
        <FilterMenu
          groups={groups}
          onChange={(groupId, value) => (groupId === "status" ? setStatus(value as StatusFilter) : setCategory(value))}
          onClear={clearFilters}
        />
        <p className="w-full text-sm text-muted sm:ml-auto sm:w-auto">
          {resources.length} {resources.length === 1 ? "resource" : "resources"} · {published} published ·{" "}
          {resources.length - published} {resources.length - published === 1 ? "draft" : "drafts"}
        </p>
      </div>

      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search resources"
          aria-label="Search resources"
          className={cn(inputClass, "pl-10")}
        />
      </div>

      {/* Scrolls sideways on narrow screens; each pill is a comfortable tap target. */}
      <div role="group" aria-label="Filter by group" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ id: "all" as const, label: "All" }, ...resourceGroups].map((item) => {
          const selected = group === item.id;
          const count = resources.filter((resource) => item.id === "all" || resource.group === item.id).length;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setGroup(item.id)}
              className={cn(
                "focus-ring inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                selected
                  ? "border-navy-ink bg-navy-ink text-white"
                  : "border-line bg-white text-navy-ink hover:border-muted-soft",
              )}
            >
              {item.label}
              <span className={cn("text-xs tabular-nums", selected ? "text-white/70" : "text-muted")}>{count}</span>
            </button>
          );
        })}
      </div>

      {resources.length === 0 ? (
        <AdminEmptyState
          icon={FileText}
          title="No resources yet"
          description="Add your first resource. It stays a draft until you publish it."
          action={
            <Button type="button" size="sm" className="h-11 gap-2" onClick={() => setAdding(true)}>
              <Plus aria-hidden="true" className="size-4" />
              Add resource
            </Button>
          }
        />
      ) : visible.length === 0 ? (
        <AdminEmptyState
          icon={FileText}
          title="No resources match"
          description="Try a different search or filter."
          action={
            filtered ? (
              <Button type="button" variant="secondary" size="sm" className="h-11" onClick={clearAll}>
                Clear everything
              </Button>
            ) : undefined
          }
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((resource) => {
            const ids = idsByGroup.get(resource.group) ?? [];
            return (
              <li key={resource.id}>
                <ResourceCard
                  resource={resource}
                  index={ids.indexOf(resource.id)}
                  groupIds={ids}
                  categories={categories}
                />
              </li>
            );
          })}
        </ul>
      )}

      <AdminDialog
        open={adding}
        onOpenChange={setAdding}
        title="Add a resource"
        description="It stays a draft unless you publish it now."
      >
        <ResourceForm
          categories={categories}
          defaultGroup={group === "all" ? undefined : group}
          onDone={() => setAdding(false)}
          onCancel={() => setAdding(false)}
        />
      </AdminDialog>
    </div>
  );
}

