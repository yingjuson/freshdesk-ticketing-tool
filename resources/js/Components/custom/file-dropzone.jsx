import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Info, XCircle } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { cn } from "@/lib/utils";
import { formatByteUnits } from "@/Utils/fileUtils";
import PdfSvg from "../../../assets/pdf-svg.png";
import { TooltipIcon } from "./tooltip-icon";

const getThumbnail = (file) => {
    switch (file.type) {
        case "application/pdf":
            return (
                <AspectRatio
                    ratio={16 / 9}
                    className="cursor-pointer flex justify-center items-center"
                    onClick={() => window.open(file.preview, "_blank")}
                >
                    <img
                        src={PdfSvg}
                        alt="image"
                        className="cursor-pointer rounded-t-md object-cover pt-2 w-32 "
                        // onLoad={() => URL.revokeObjectURL(file.preview)}
                    />
                </AspectRatio>
            );
        case "video/mp4":
            return (
                <AspectRatio ratio={16 / 9}>
                    <video
                        className="video-fluid z-depth-1 object-cover w-[300px] h-[150px]"
                        controls
                        muted
                        onLoad={() => URL.revokeObjectURL(file.preview)}
                    >
                        <source src={file.preview} type="video/mp4" />
                    </video>
                </AspectRatio>
            );
        default:
            return (
                <AspectRatio
                    ratio={16 / 9}
                    className="cursor-pointer"
                    onClick={() => window.open(file.preview, "_blank")}
                >
                    <img
                        src={file.preview}
                        alt="image"
                        className="rounded-t-md object-cover w-[250px] h-[150px]"
                        // onLoad={() => URL.revokeObjectURL(file.preview)}
                    />
                </AspectRatio>
            );
    }
};

export const FileDropzone = ({ className, files, setFiles }) => {
    const onDrop = useCallback((acceptedFiles) => {
        // add preview property to each file
        if (acceptedFiles?.length > 0) {
            setFiles((prevFiles) => [
                ...prevFiles,
                ...acceptedFiles.map((file) => {
                    return Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    });
                }),
            ]);
        }
    }, []);

    const removeFile = (fileName) => {
        setFiles((currentFiles) =>
            currentFiles.filter((file) => file.name !== fileName)
        );
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "video/mp4": [".mp4"],
            "application/pdf": [".pdf"],
        },
    });

    return (
        <div className="flex flex-col w-full h-full items-center">
            <div
                {...getRootProps({
                    className: cn(
                        "w-3/4 h-14 p-4 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center gap-3",
                        className
                    ),
                })}
            >
                <input {...getInputProps()} />

                <>
                    <Upload color="#9CA3AF" size="16" />
                    <p className="text-sm text-center text-gray-600">
                        Drag and drop files here or click to select files
                    </p>
                </>
            </div>
            <div className="flex items-center gap-1 mt-1">
                <p className="text-xs text-gray-400 font-thin">
                    Accepted file types
                </p>
                <TooltipIcon
                    icon={<Info size="16" color="blue" strokeWidth={2.5} />}
                    content=".jpg .jpeg .png .pdf .mp4" // TO DO: add more
                />
            </div>

            <div id="thumbs" className="my-4 mx-2 flex flex-wrap gap-2 h-full">
                {files.map((file, index) => (
                    <div
                        key={`${index}-${file.name}`}
                        className="relative w-[250px] max-w-[300px] h-[250px] rounded-lg flex flex-col border-2"
                    >
                        {getThumbnail(file)}
                        <div className="text-sm p-6">
                            <p className="font-bold text-ellipsis overflow-hidden">
                                {file.name}
                            </p>
                            <p className="text-sm">
                                {formatByteUnits(file.size)}
                            </p>
                        </div>
                        <XCircle
                            color="white"
                            fill="red"
                            className="cursor-pointer absolute -right-2 -top-2"
                            onClick={() => removeFile(file.name)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
