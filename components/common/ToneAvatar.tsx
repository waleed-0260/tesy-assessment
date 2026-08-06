import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import { avatarToneClasses, type AvatarTone } from "@/components/common/AvatarTone";

interface ToneAvatarProps {
  initials: string;
  tone: AvatarTone;
  size?: "default" | "sm" | "lg";
  online?: boolean;
  className?: string;
}

/** Color-coded initials avatar — the one avatar look used everywhere in the app. */
export function ToneAvatar({
  initials,
  tone,
  size = "default",
  online,
  className,
}: ToneAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      <AvatarFallback className={avatarToneClasses[tone]}>{initials}</AvatarFallback>
      {online && <AvatarBadge className="bg-emerald-500" />}
    </Avatar>
  );
}
