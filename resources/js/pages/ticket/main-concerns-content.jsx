import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * NOT USED FOR NOW
 */
const MainConcernsContent = () => {
    return (
        <Tabs defaultValue="details" className="flex flex-col">
            <TabsList className="my-2">
                <TabsTrigger
                    value="details"
                    {...(detailsTabHasError() && {
                        className:
                            "text-rose-700 data-[state=active]:text-rose-700",
                    })}
                >
                    Details
                </TabsTrigger>
                <TabsTrigger
                    value="more-details"
                    {...(errors.issue_details && {
                        className:
                            "text-rose-700 data-[state=active]:text-rose-700",
                    })}
                >
                    More Details
                </TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-full max-h-[45vh]">
                <TabsContent value="details" className="w-full p-3">
                    <div className="grid grid-cols-3 gap-5 h-full">
                        {getForm(selectedConcern)}
                    </div>
                </TabsContent>

                <TabsContent
                    value="more-details"
                    className="flex justify-center items-center align-center p-3"
                >
                    <FormField
                        required
                        label="Issue details"
                        htmlFor="issue_details"
                        error={errors.issue_details}
                        render={
                            <Textarea
                                id="issue_details"
                                value={data.issue_details}
                                helperText={getHelperText()}
                                className="mx-1"
                                {...(data.concern_type === "webtool" && {
                                    helperText2:
                                        "If for report generation, please specify the date range and status",
                                })}
                                placeholder="Enter more details regarding your request or concern.zz"
                                onChange={(e) => {
                                    setData("issue_details", e.target.value);
                                    clearErrors("issue_details");
                                }}
                            />
                        }
                    />
                </TabsContent>

                <TabsContent
                    value="attachments"
                    className="flex justify-center"
                >
                    <FileDropzone files={files} setFiles={setFiles} />
                </TabsContent>
            </ScrollArea>
        </Tabs>
    );
};

export default MainConcernsContent;
