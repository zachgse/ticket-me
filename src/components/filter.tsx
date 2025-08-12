import {Table} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"

interface FilterProps <TData> {
    table: Table<TData>;
    sort: string;
}

export const Filter = <TData,>({table,sort}: FilterProps<TData>) => {
    return (
        <Input
            placeholder={`Filter ${sort} ...`}
            value={(table.getColumn(`${sort}`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn(`${sort}`)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"/>
    )    
}