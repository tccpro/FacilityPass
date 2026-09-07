import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-ink">Page not found</h1>
      <p className="max-w-xl leading-relaxed text-ink-muted">
        That address does not exist in FacilityPass. It may belong to a part of the product that has
        not been built yet.
      </p>
      <Link href="/" className="w-fit text-accent underline underline-offset-4">
        Return to the FacilityPass home page
      </Link>
    </div>
  );
}
