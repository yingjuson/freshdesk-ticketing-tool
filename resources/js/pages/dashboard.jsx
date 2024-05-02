import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-7 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <Card>
                                <CardHeader>
                                    <CardTitle>New tickets</CardTitle>
                                    <CardDescription>
                                        Newly opened tickets this week
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-5xl font-bold">
                                    05
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Open tickets</CardTitle>
                                    <CardDescription>
                                        Number of tickets that are currently "In
                                        Progress"
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-5xl font-bold">
                                    13
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Unassigned tickets</CardTitle>
                                    <CardDescription>
                                        Number of tickets without an assignee
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-5xl font-bold">
                                    02
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Closed tickets</CardTitle>
                                    <CardDescription>
                                        Number of tickets closed this week
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-5xl font-bold">
                                    07
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
