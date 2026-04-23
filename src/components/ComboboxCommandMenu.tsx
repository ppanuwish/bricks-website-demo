import type { HTMLAttributes, ReactNode } from "react";
import reactLogo from "../assets/react.svg";
import { ComboboxMenuItem } from "./ComboboxMenuItem";
import { ComboboxSearch, type ComboboxSearchProps } from "./ComboboxSearch";

/**
 * Figma `Combobox CommandMenu` (26764:7593) — `Varaint` in file: Simple, Avatars, Groups, Multiselect.
 */
export type ComboboxCommandMenuVariant = "simple" | "avatars" | "groups" | "multiselect";

export type ComboboxCommandMenuProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  variant?: ComboboxCommandMenuVariant;
  /** Merged with defaults on the top `ComboboxSearch`. */
  searchProps?: ComboboxSearchProps;
  showSearch?: boolean;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const itemFill = "w-full max-w-none";

const shell = cx(
  "flex w-full min-w-0 max-w-[250px] flex-col items-stretch overflow-clip border border-border bg-popover text-popover-foreground shadow-md"
);

/**
 * Figma `Command / Input/Command/Menu Heading` (345:8645) — `text-xs` label above grouped rows.
 */
export function ComboboxCommandMenuHeading({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  return (
    <div
      className={cx("w-full min-w-0 px-[var(--spacing-2)] py-1.5", className)}
      data-slot="combobox-command-menu-heading"
      {...rest}
    >
      <p className="h-4 w-full min-w-0 truncate font-body text-xs font-semibold leading-4 text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

function ComboboxCommandMenuGroup({
  withBottomBorder,
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  withBottomBorder?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "w-full p-[var(--spacing-1)]",
        withBottomBorder && "border-b border-border",
        className
      )}
      data-slot="combobox-command-menu-group"
      {...rest}
    >
      {children}
    </div>
  );
}

function SimpleContent() {
  return (
    <ComboboxCommandMenuGroup>
      <ComboboxMenuItem type="simple" className={itemFill} state="hover" selected>
        Backlog
      </ComboboxMenuItem>
      {Array.from({ length: 4 }, (_, i) => (
        <ComboboxMenuItem key={i} type="simple" className={itemFill}>
          Backlog
        </ComboboxMenuItem>
      ))}
      <ComboboxMenuItem type="simple" className={itemFill}>
        Backlog
      </ComboboxMenuItem>
    </ComboboxCommandMenuGroup>
  );
}

function AvatarsContent() {
  return (
    <>
      <ComboboxCommandMenuGroup withBottomBorder>
        <ComboboxMenuItem
          type="avatar"
          className={itemFill}
          state="hover"
          selected
          avatarSrc={reactLogo}
          avatarAlt=""
        >
          Backlog
        </ComboboxMenuItem>
        {Array.from({ length: 4 }, (_, i) => (
          <ComboboxMenuItem key={i} type="avatar" className={itemFill} avatarSrc={reactLogo} avatarAlt="">
            Backlog
          </ComboboxMenuItem>
        ))}
      </ComboboxCommandMenuGroup>
      <ComboboxCommandMenuGroup>
        <ComboboxMenuItem type="icon" className={itemFill}>
          Add new
        </ComboboxMenuItem>
      </ComboboxCommandMenuGroup>
    </>
  );
}

function MultiselectContent() {
  return (
    <ComboboxCommandMenuGroup>
      {Array.from({ length: 5 }, (_, i) => (
        <ComboboxMenuItem
          key={i}
          type="checkbox"
          className={itemFill}
          state={i === 0 ? "hover" : "default"}
          selected={i === 0}
          onCheckedChange={() => undefined}
        >
          Backlog
        </ComboboxMenuItem>
      ))}
    </ComboboxCommandMenuGroup>
  );
}

function GroupsContent() {
  return (
    <>
      <ComboboxCommandMenuGroup withBottomBorder>
        <ComboboxCommandMenuHeading>Heading Text</ComboboxCommandMenuHeading>
        <ComboboxMenuItem type="simple" className={itemFill} state="hover" selected>
          Backlog
        </ComboboxMenuItem>
        {Array.from({ length: 5 }, (_, i) => (
          <ComboboxMenuItem key={i} type="simple" className={itemFill}>
            Backlog
          </ComboboxMenuItem>
        ))}
      </ComboboxCommandMenuGroup>
      <ComboboxCommandMenuGroup withBottomBorder>
        <ComboboxCommandMenuHeading>Heading Text</ComboboxCommandMenuHeading>
        {Array.from({ length: 6 }, (_, i) => (
          <ComboboxMenuItem key={i} type="simple" className={itemFill}>
            Backlog
          </ComboboxMenuItem>
        ))}
      </ComboboxCommandMenuGroup>
      <ComboboxCommandMenuGroup>
        <ComboboxMenuItem type="icon" className={itemFill}>
          Add new
        </ComboboxMenuItem>
      </ComboboxCommandMenuGroup>
    </>
  );
}

function VariantBody({ variant }: { variant: ComboboxCommandMenuVariant }) {
  switch (variant) {
    case "simple":
      return <SimpleContent />;
    case "avatars":
      return <AvatarsContent />;
    case "groups":
      return <GroupsContent />;
    case "multiselect":
      return <MultiselectContent />;
    default:
      return <SimpleContent />;
  }
}

/**
 * Full combobox command surface (Figma `Combobox CommandMenu`, 26764:7593): `ComboboxSearch` plus
 * list regions using `ComboboxMenuItem` rows, `shadow-md`, and `border border-border` on a 250px-wide popover.
 */
export function ComboboxCommandMenu({
  variant = "simple",
  className,
  searchProps,
  showSearch = true,
  ...rest
}: ComboboxCommandMenuProps) {
  const { className: searchClassName, ...searchRest } = searchProps ?? {};
  return (
    <div
      {...rest}
      className={cx(shell, className)}
      data-slot="combobox-command-menu"
      data-variant={variant}
    >
      {showSearch ? (
        <ComboboxSearch
          placeholder="Search"
          {...searchRest}
          className={cx("w-full max-w-none", searchClassName)}
        />
      ) : null}
      <VariantBody variant={variant} />
    </div>
  );
}
