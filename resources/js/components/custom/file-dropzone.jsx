import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Info, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatByteUnits, isFileSizeTooLarge } from "@/utils/file-utils";
import { TooltipIcon } from "./tooltip-icon";
import {
    CONCERNS_ACCEPTING_ONLY_EXCEL_FORMAT,
    CONCERNS_REQUIRING_ATTACHMENT,
} from "@/constants/concern-type-constants";

const SUPPORTED_FILE_TYPES = {
    "text/csv": [".csv"],
    "image/png": [".png"],
    "image/gif": [".gif"],
    "image/apng": [".apng"],
    "image/avif": [".avif"],
    "image/webp": [".webp"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/svg+xml": [".svg"],
    "video/mp4": [".mp4"],
    "video/ogg": [".ogv"],
    "video/mpeg": [".mpeg"],
    "video/webm": [".webm"],
    "video/3gpp": [".3gp"],
    "video/3gpp2": [".3g2"],
    "video/x-msvideo": [".avi"],
    "application/pdf": [".pdf"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
    ],
};

const getAcceptedFileTypesTooltip = (concernType) => {
    if (CONCERNS_REQUIRING_ATTACHMENT.includes(concernType)) {
        return [".xls .xlsx"];
    }

    return Object.values(SUPPORTED_FILE_TYPES).flat().join(" ");
};

const getAcceptedFileTypes = (concernType) => {
    if (CONCERNS_ACCEPTING_ONLY_EXCEL_FORMAT.includes(concernType)) {
        return {
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
        };
    }

    return SUPPORTED_FILE_TYPES;
};

// const getThumbnail = (file) => {
//     switch (file.type) {
//         case "application/pdf":
//             return (
//                 <AspectRatio
//                     ratio={16 / 9}
//                     className="cursor-pointer flex justify-center items-center"
//                     onClick={() => window.open(file.preview, "_blank")}
//                 >
//                     <img
//                         src={PdfSvg}
//                         alt="image"
//                         className="cursor-pointer rounded-t-md object-cover pt-2 w-32 "
//                         // onLoad={() => URL.revokeObjectURL(file.preview)}
//                     />
//                 </AspectRatio>
//             );
//         case "video/mp4":
//             return (
//                 <AspectRatio ratio={16 / 9}>
//                     <video
//                         className="video-fluid z-depth-1 object-cover w-[300px] h-[150px]"
//                         controls
//                         muted
//                         onLoad={() => URL.revokeObjectURL(file.preview)}
//                     >
//                         <source src={file.preview} type="video/mp4" />
//                     </video>
//                 </AspectRatio>
//             );
//         default:
//             return (
//                 <AspectRatio
//                     ratio={16 / 9}
//                     className="cursor-pointer"
//                     onClick={() => window.open(file.preview, "_blank")}
//                 >
//                     <img
//                         src={file.preview}
//                         alt="image"
//                         className="rounded-t-md object-cover w-[250px] h-[150px]"
//                         // onLoad={() => URL.revokeObjectURL(file.preview)}
//                     />
//                 </AspectRatio>
//             );
//     }
// };

export const FileDropzone = ({
    className,
    concernType,
    files,
    setFiles,
    setError,
}) => {
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles?.length > 0) {
            setError(
                "attachments",
                `Uploaded ${rejectedFiles.length} file(s) with invalid type`
            );
        }

        if (acceptedFiles?.length > 0) {
            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        }
    }, []);

    const removeFile = (fileName) => {
        setFiles((currentFiles) => {
            const answer = currentFiles.filter(
                (file) => file.name !== fileName
            );

            return answer;
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: getAcceptedFileTypes(concernType),
        // maxSize: 1024 * 20 * 1024, // 20 MB
    });

    const totalFileSizeInBytes = files.reduce(
        (accu, { size }) => accu + size,
        0
    );

    return (
        <div className="flex flex-col w-full h-full items-center">
            <div
                {...getRootProps({
                    className: cn(
                        "flex justify-center items-center gap-3 cursor-pointer w-5/6 h-14 p-4 border-2 border-dashed border-gray-300 rounded-lg",
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

            <div className="flex justify-between mt-1 w-5/6 text-sm">
                <div className="flex gap-1 ">
                    <span>Accepted file types</span>
                    <TooltipIcon
                        icon={<Info size="20" color="white" fill="gray" />}
                        content={getAcceptedFileTypesTooltip(concernType)}
                    />
                </div>

                <span className="flex gap-1">
                    Total file size:
                    <span
                        className={
                            isFileSizeTooLarge(totalFileSizeInBytes, 20)
                                ? "text-rose-500 font-semibold"
                                : ""
                        }
                    >
                        {formatByteUnits(totalFileSizeInBytes) || 0}
                    </span>
                    / 20 MB
                </span>
            </div>

            <div
                id="thumbs"
                className="my-4 mx-2 flex flex-wrap gap-2 h-full w-full"
            >
                {files.map((file, index) => (
                    <div
                        key={`${index}-${file.name}`}
                        className="relative h-fit w-full rounded-lg flex items-center justify-between p-3 border-2"
                    >
                        {/* {getThumbnail(file)} */}
                        <div className="text-sm">
                            <p className="font-semibold text-ellipsis overflow-hidden">
                                {file.name}
                            </p>
                            <p className="text-inherit">
                                {formatByteUnits(file.size)}
                            </p>
                        </div>
                        <XCircle
                            color="white"
                            fill="red"
                            // className="cursor-pointer absolute -right-2 -top-2"
                            className="cursor-pointer"
                            onClick={() => removeFile(file.name)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
