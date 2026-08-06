export type AvatarTone =
  | "rose"
  | "amber"
  | "emerald"
  | "sky"
  | "violet"
  | "orange";

export const avatarToneClasses: Record<AvatarTone, string> = {
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  emerald:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  violet:
    "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  orange:
    "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
};
