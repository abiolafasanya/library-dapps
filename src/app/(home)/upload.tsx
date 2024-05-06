"use client";
// import { ThirdwebProvider } from "@thirdweb-dev/react";
import React, { useMemo, useState } from "react";
import { upload } from "thirdweb/storage";
import { client } from "@/utils/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { MediaRenderer } from "thirdweb/react";
import { useConnectHook } from "@/hooks/connectHook";
import { ethers } from "ethers";
import { config } from "@/utils/constant";
import { v4 as uuid } from "uuid";
import { DownloadCloud, UploadCloud } from "lucide-react";

type Status = "uploading" | "upload" | "uploaded" | "retry" | "failed";

export default function UploadComponent() {
  const [file, setFile] = useState<unknown>(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [status, setStatus] = useState<Status>("upload");
  const fileToUpload = file as unknown as FileList;

  const { getSigner, connected, isConnected } = useConnectHook();
  const { ABI, CONTRACT_ADDRESS } = config;

  async function uploadFileContract(hash: string, fileName: string) {
    try {
      const signer = await getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const date = new Date(Date.now());
      const createdAt = date.toDateString();
      const tx = await contract.uploadFile(fileName, hash, createdAt);
      console.log(tx);
    } catch (error) {
      if (error instanceof Error) {
        toast(error.shortMessage);
        console.log(error);
      }
    }
  }

  const uploadToIpfs = async () => {
    // console.log(file)
    isConnected();
    if (!connected) return;

    if (!file) {
      toast("Please select a file to continue");
      return;
    }
    setStatus("uploading");
    try {
      const fileName = `${
        fileToUpload[0]?.name
      }-${new Date().getMilliseconds()}`;
      const uri = await upload({
        client,
        files: [new File([fileToUpload[0]], fileToUpload[0]?.name)],
      });
      // console.log(uri);
      const uriResult = await uri.replace("ipfs://", "https://ipfs.io/ipfs/");
      setIpfsHash(uriResult);
      await uploadFileContract(uri, fileName);
      toast("File uploaded");
      if (uri) {
        setStatus("uploaded");
        setTimeout(() => {
          setStatus("upload");
        }, 3000);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast(`Error: ${error.message}`);
        setStatus("failed");
        setTimeout(() => {
          setStatus("upload");
        }, 3000);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Upload File <UploadCloud className="inline" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 my-4">
          <Input type="file" onChange={(e) => setFile(e.target.files)} />
          <Button
            onClick={uploadToIpfs}
            className="capitalize"
            disabled={status === "uploading"}
          >
            {status}
          </Button>
        </div>

        {ipfsHash && (
          <div>
            <CardDescription className="truncate max-w-sm w-full">
              Hash: <span>{ipfsHash}</span>
            </CardDescription>
            <MediaRenderer
              client={client}
              src={ipfsHash}
              width="250px"
              height="250"
              alt="uploaded-file"
              className="rounded object-center object-cover w-auto h-auto"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
