import React from "react";
import { cn } from "../../lib/utils";

const Checkbox = React.forwardRef(
    ({ className, ...props }, ref) => {
        return (
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    className={cn(
                        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <div className="absolute w-4 h-4 flex items-center justify-center pointer-events-none text-primary-foreground peer-data-[state=checked]:opacity-100 opacity-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
            </div>
        );
    }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
