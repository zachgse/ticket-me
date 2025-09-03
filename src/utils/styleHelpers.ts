import clsx from "clsx"

export const statusBadge = (variant: "pending" | "processing" | "completed" | undefined) => 
    clsx(
        "rounded-full text-white text-center capitalize",
        variant === "pending" && "bg-blue-500 border-1 border-blue-500",
        variant === "processing" && "bg-yellow-500 border-1 border-yellow-500",
        variant === "completed" && "bg-green-500 border-1 border-green-500",
        variant === undefined && ""
    );