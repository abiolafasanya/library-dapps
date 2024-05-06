import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { client } from "@/utils/client";
import { convertIpfsUrl, formatDateWithNoTime } from "@/utils/formatter";
import React from "react";
import { MediaRenderer } from "thirdweb/react";

export function FileCard({ file, id }: { file: any; id: number }) {
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          //   files: [file[2]],
          url: convertIpfsUrl(file[2]),
          title: file[1],
          text: "Check out this file",
        });
        console.log("File shared successfully");
      } catch (error) {
        console.error("Error sharing the file:", error);
      }
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
  };

  return (
    <Card key={id}>
      <CardContent className="truncate p-2 flex flex-col gap-3">
        <MediaRenderer
          client={client}
          src={file[2]}
          width="250px"
          height="250"
          alt="uploaded-file"
          className="rounded object-center object-cover w-auto h-auto"
        />
        <div className="flex justify-between items-center">
          <CardDescription className="flex">{file[1]}</CardDescription>
          <Button variant={"ghost"} onClick={share}>
            Share
          </Button>
        </div>
        <CardDescription className="space-x-2">
          <span>Upload Date:</span> <span>{formatDateWithNoTime(file[3])}</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default function FileCards({ files }: { files: any[] }) {
  return (
    <>
      {files.map((file, id) => (
        <FileCard file={file} id={id} key={id} />
      ))}
    </>
  );
}
