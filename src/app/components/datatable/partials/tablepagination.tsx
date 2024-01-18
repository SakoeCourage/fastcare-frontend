import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "../../form-components/button"
import Selectoption from "../../form-components/selectoption"

interface DataTablePaginationProps<TData> {
  tableData: IPaginatedData<TData>,
  getDataAsync: (url: string | null) => void,
  table: Table<TData>,

}

export function DataTablePagination<TData>({
  tableData,
  table,
  getDataAsync
}: DataTablePaginationProps<TData>) {
  return (
    <div className=" flex items-center justify-between px-2 py-2 !mt-auto">
      <div className="hidden flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className=" ml-auto flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Selectoption className="h-8 w-[70px]"
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
            placeholder="Select of rows"
            options={[
              { key: "10", value: "10" },
              { key: "20", value: "20" },
              { key: "30", value: "30" },
              { key: "40", value: "40" },
              { key: "50", value: "50" },
            ]}
          />

        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {tableData.current_page}
          {" of " + tableData.last_page}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => getDataAsync(tableData.first_page_url)}
            disabled={!tableData.first_page_url}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => getDataAsync(tableData.prev_page_url)}
            disabled={!tableData.first_page_url}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => getDataAsync(tableData.next_page_url)}
            disabled={!tableData.next_page_url}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => getDataAsync(tableData.last_page_url)}
            disabled={!tableData.last_page_url}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
