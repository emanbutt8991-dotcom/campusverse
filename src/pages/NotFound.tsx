import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export default function NotFound() {
  return (
    <div className="py-10">
      <EmptyState icon={<Compass size={26} aria-hidden />} title="Page not found" description="This corner of the CampusVerse doesn't exist yet." action={<Link to="/home" className="inline-flex h-11 items-center rounded-xl bg-uni-primary px-4 text-sm font-semibold text-uni-onprimary">Back to Home</Link>} />
    </div>
  );
}
