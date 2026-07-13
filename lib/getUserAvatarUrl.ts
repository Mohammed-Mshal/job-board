export function getUserAvatarUrl(name: string, profileImageUrl?: string | null) {
  if (profileImageUrl?.trim()) return profileImageUrl;
  const initial = name.trim().charAt(0).toUpperCase() || "U";
  return `https://placehold.co/112x112/png?text=${encodeURIComponent(initial)}`;
}
