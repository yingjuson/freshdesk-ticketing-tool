import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const DashboardCard = ({ title, description, content }) => (
    <Card className="flex flex-col justify-between bg-purple-100">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-5xl font-bold text-primary">
            {content}
        </CardContent>
    </Card>
);

export default function Dashboard({ auth }) {
    const {
        newTicketsThisWeek,
        resolvedTicketsThisWeek,
        pendingTickets,
        unassignedTickets,
    } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-7 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="grid grid-cols-4 gap-4 w-full">
                            <DashboardCard
                                title="New tickets"
                                description="Newly opened tickets this week"
                                content={newTicketsThisWeek}
                            />

                            <DashboardCard
                                title="Pending tickets"
                                description="Number of tickets that are currently in
                                        Pending status"
                                content={pendingTickets}
                            />

                            <DashboardCard
                                title="Unassigned tickets"
                                description="Number of tickets without an assignee"
                                content={unassignedTickets}
                            />

                            <DashboardCard
                                title="Resolved tickets"
                                description="Number of tickets Resolved this week"
                                content={resolvedTicketsThisWeek}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
