import RideCard from '@/components/rides/RideCard';
import PageHeader from '@/components/ui/PageHeader';
import { getAllRides } from '@/lib/rides';

export default function RidesPage() {
  const rides = getAllRides();

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <PageHeader
        title="Cycling Logs"
        description="Records of routes, miles, and life on two wheels."
      />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </div>
    </div>
  );
}