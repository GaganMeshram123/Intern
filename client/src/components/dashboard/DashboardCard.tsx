// We want one reusable card component.

// Instead of writing four completely different cards:

// Total Prompts card
// Favorite card
// Categories card
// Recently Added card
interface DashboardCardProps {
  title: string;
  value: number;
  icon: string;
}

function DashboardCard({
  title,
  value,
  icon,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;