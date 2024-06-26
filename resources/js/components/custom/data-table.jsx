import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { router, useForm } from "@inertiajs/react";

import FormField from "./form-field";
import { FileExport } from "./file-export";
import InputWithIcon from "./input-with-icon";

export function DataTable({ columns, data, links: paginationLinks }) {
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // onSortingChange: setSorting,
        // getSortedRowModel: getSortedRowModel(),
        // onColumnFiltersChange: setColumnFilters,
        // getFilteredRowModel: getFilteredRowModel(),
        // onColumnVisibilityChange: setColumnVisibility,
        // state: {
        //     sorting,
        //     columnFilters,
        //     columnVisibility,
        // },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <InputWithIcon
                    placeholder="Search for ticket subject, ID, or concern type"
                    onChange={(event) =>
                        router.get(
                            route("tickets.index"),
                            { search: event.target.value },
                            { preserveState: true, replace: true }
                        )
                    }
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id.replaceAll("_", " ")}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>

                <FileExport />
            </div>

            {/* Main table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            // className="text-center"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    className={
                                        (index + 1) % 2 === 0
                                            ? "bg-slate-100"
                                            : ""
                                    }
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Pagination>
                    <PaginationContent>
                        {paginationLinks.map((paginationLink, index) => {
                            const httpsPaginationLink = paginationLink.url
                                ? paginationLink.url.replace(
                                      "http://",
                                      "https://"
                                  )
                                : null;

                            if (index === 0) {
                                return (
                                    <PaginationPrevious
                                        key={index}
                                        preserveState
                                        href={httpsPaginationLink}
                                        disabled={!httpsPaginationLink}
                                    />
                                );
                            }

                            if (index === paginationLinks.length - 1) {
                                return (
                                    <PaginationNext
                                        key={index}
                                        preserveState
                                        href={httpsPaginationLink}
                                        disabled={!httpsPaginationLink}
                                    />
                                );
                            }

                            return (
                                <PaginationLink
                                    key={index}
                                    preserveState
                                    href={httpsPaginationLink}
                                >
                                    {paginationLink.label}
                                </PaginationLink>
                            );
                        })}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
