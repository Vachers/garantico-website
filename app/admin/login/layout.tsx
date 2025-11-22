// Login page has its own layout to bypass admin layout
// This prevents the redirect loop
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
