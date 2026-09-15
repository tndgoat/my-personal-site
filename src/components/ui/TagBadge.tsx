interface TagBadgeProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
  variant?: 'button' | 'label';
}

export default function TagBadge({
  tag,
  active = false,
  onClick,
  variant = 'label',
}: TagBadgeProps) {
  const displayTag = tag.startsWith('#') ? tag : `#${tag}`;

  if (variant === 'button' && onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`rounded-full px-3 py-1 font-sans text-sm transition-colors ${
          active
            ? 'bg-white font-semibold text-black'
            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
        }`}
      >
        {displayTag}
      </button>
    );
  }

  return (
    <span className="rounded bg-zinc-800/50 px-2 py-0.5 font-sans text-xs text-zinc-400">
      {displayTag}
    </span>
  );
}
