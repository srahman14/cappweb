/**
 * Required header block for every page: the same navy gradient panel as the
 * landing hero, left-aligned, with breadcrumb, title, description and buttons.
 * `aside` is an optional card on the right (e.g. <NextEventCard />).
 *
 * Usage:
 *   <PageHeader
 *     breadcrumb={[{ label: "Subjects", href: "/" }, { label: "Tech" }]}
 *     title={<><HandDrawnUnderline>Tech</HandDrawnUnderline> at CAPP</>}
 *     description="..."
 *     actions={<Button href="#" variant="onDark">Join</Button>}
 *   />
 */
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { GradientPanel } from "./GradientPanel";

export interface BreadcrumbItem {
  label: string;
  /** Leave out on the current page (the last item). */
  href?: string;
}

export interface PageHeaderProps {
  breadcrumb?: BreadcrumbItem[];
  title: ReactNode;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
}

export function PageHeader({ breadcrumb, title, description, actions, aside }: PageHeaderProps) {
  return (
    <div className="px-3 pt-6 md:px-6">
      <GradientPanel glow="indigo" className="flex flex-col gap-10 px-6 py-16 md:px-20 md:py-24 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex flex-[1.3] flex-col items-start gap-6">
          {breadcrumb && (
            <nav aria-label="Breadcrumb" className="text-[15px] text-on-dark/80">
              <ol className="flex items-center gap-1.5">
                {breadcrumb.map((item, i) => (
                  <Fragment key={item.label}>
                    {i > 0 && <li aria-hidden="true">/</li>}
                    <li>
                      {item.href ? (
                        <Link href={item.href} className="hover:text-white">{item.label}</Link>
                      ) : (
                        <span aria-current="page" className="font-bold text-gold-light">{item.label}</span>
                      )}
                    </li>
                  </Fragment>
                ))}
              </ol>
            </nav>
          )}
          <h1 className="text-5xl font-extrabold leading-none tracking-[-0.04em] md:text-[96px]">{title}</h1>
          <p className="max-w-xl text-lg leading-relaxed text-on-dark md:text-[21px]">{description}</p>
          {actions && <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
        {aside && <div className="flex-1">{aside}</div>}
      </GradientPanel>
    </div>
  );
}