import { Icons } from "./icons";

interface RecentCallsProps {
  calls: [];
}

export function RecentCalls({ calls }: RecentCallsProps) {
  return (
    <div className="space-y-8">
      {calls.map((call, index) => (
        <div className="flex items-center" key={index}>
          {call[1] === "automated" ? (
            <Icons.bot className="h-6 w-6 text-muted-foreground" />
          ) : (
            <Icons.phoneForward className="h-6 w-6 text-muted-foreground" />
          )}
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{call[0]}</p>
            <p className="text-sm text-muted-foreground">
              {call[2]}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {call[1] === "automated" ? "Automated" : "Transferred"}
          </div>
        </div>
      ))}
    </div>
  );
}
