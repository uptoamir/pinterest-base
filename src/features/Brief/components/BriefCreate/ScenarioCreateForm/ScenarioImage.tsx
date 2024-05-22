import { useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import React, { FC } from "react";

export type ScenarioImageProps = {
	file: FileObject;
    removeImage: (id: string) => void;
};
export type RemovableImageProps = {
	src: string;
    id?: string;
    removeImage: (id: string) => void;
};

const RemovableImage: FC<RemovableImageProps> = ({ src, id, removeImage }) => {
	return (
				<Image src={src} alt="uploading file" fill unoptimized={true} />
	);
};

const ScenarioImage: FC<ScenarioImageProps> = ({ file, removeImage }) => {
	const theme = useTheme();

	return (
		<div className="relative m-4 p-4 min-h-40 min-w-40 max-h-92 max-w-92 md:h-unset md:w-unset md:pb-1/4 rounded-md w-full md:max-w-1/4">
			<div className="absolute inset-0 flex justify-center items-center">
			<div className="absolute right-0 top-0 bg-white z-10 px-2" onClick={() => {
                file.objectId && removeImage(file.objectId);
            }}>
                <div className="right-0" style={{color: theme.palette.primary.main}}>
                    ✘
                </div>
            </div>
				{file.file ? (
					<RemovableImage src={file.file} id={file.objectId} removeImage={removeImage} />
				) : (
					<CircularProgress value={file.progress} variant="determinate" />
				)}
			</div>
		</div>
	);
};
export default ScenarioImage;
