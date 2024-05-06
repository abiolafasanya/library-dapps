"use client";
import { useConnectHook } from "@/hooks/connectHook";
import Header from "@/ui/connect-button";
import FileCards from "@/ui/file-card";
import { config } from "@/utils/constant";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MyFile() {
  const { getSigner } = useConnectHook();
  const [myFiles, setMyFiles] = useState<any[]>([]);

  useEffect(() => {
    getFiles();
  }, []);

  async function getFiles() {
    try {
      const signer = await getSigner();
      const { ABI, CONTRACT_ADDRESS } = config;
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.getMyFiles();
      console.log(tx);
      setMyFiles(tx);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast(error.shortMessage);
      }
    }
  }

  async function allFiles() {}
  return (
    <main className="w-full h-full min-h-screen">
      <article className="w-full min-h-screen bg-opacity-50 mix-blend-multiply backdrop-blur-md bg-white">
        <div className="max-w-6xl w-full mx-auto">
          <Header></Header>

          <section className="py-20 w-full grid grid-cols-3 xl:grid-cols-4 gap-4">
            <FileCards files={myFiles} />
          </section>
        </div>
      </article>
    </main>
  );
}
