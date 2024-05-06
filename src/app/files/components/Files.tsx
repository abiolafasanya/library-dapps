"use client";

import { useConnectHook } from "@/hooks/connectHook";

import FileCards from "@/ui/file-card";
import { config } from "@/utils/constant";
import { ethers } from "ethers";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Files() {
  const { getSigner } = useConnectHook();
  const [files, setFiles] = useState<any[]>([]);
  console.log(files);
  useEffect(() => {
    getFiles();
  }, []);

  async function getFiles() {
    try {
      const signer = await getSigner();
      const { ABI, CONTRACT_ADDRESS } = config;
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.getAllFiles();
      console.log(tx);
      setFiles(tx);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast(error.shortMessage);
      }
    }
  }
  return (
    <div>
      <section className="max-w-6xl mx-auto w-full grid grid-cols-3 xl:grid-cols-4 gap-4">
        <FileCards files={files} />
      </section>
    </div>
  );
}
