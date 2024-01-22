import { Icons } from "./icons";

export function RecentCalls() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Icons.bot className="h-6 w-6 text-muted-foreground" />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            2024-01-15 12:21 PM
          </p>
          <p className="text-sm text-muted-foreground">Product Info</p>
        </div>
        <div className="ml-auto font-medium">Automated</div>
      </div>
      <div className="flex items-center">
        <Icons.bot className="h-6 w-6 text-muted-foreground" />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">2024-01-14 7:40 PM</p>
          <p className="text-sm text-muted-foreground">Order Status</p>
        </div>
        <div className="ml-auto font-medium">Automated</div>
      </div>
      <div className="flex items-center">
        <Icons.phoneForward className="h-6 w-6 text-muted-foreground" />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">2024-01-14 1:45 PM</p>
          <p className="text-sm text-muted-foreground">Sales</p>
        </div>
        <div className="ml-auto font-medium">Transfered</div>
      </div>
      <div className="flex items-center">
        <Icons.bot className="h-6 w-6 text-muted-foreground" />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">2024-01-14 1:22 PM</p>
          <p className="text-sm text-muted-foreground">Return</p>
        </div>
        <div className="ml-auto font-medium">Automated</div>
      </div>
      <div className="flex items-center">
        <Icons.phoneForward className="h-6 w-6 text-muted-foreground" />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">2024-01-13 9:37 PM</p>
          <p className="text-sm text-muted-foreground">Sales</p>
        </div>
        <div className="ml-auto font-medium">Transfered</div>
      </div>
    </div>
  );
}
