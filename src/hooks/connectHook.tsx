"use client";
import React, { useState } from "react";
// Import everything
import { ethers } from "ethers";

// Import just a few select items
import { BrowserProvider } from "ethers";

// Import from a specific export

import { toast } from "sonner";
import Cookies from "js-cookie";
import { config } from "@/utils/constant";

export function useConnectHook() {
  const [connected, setConnected] = useState<boolean>(() => {
    if (Cookies.get("wallet_status")?.includes("true")) return true;
    return false;
  });
  const [address, setAddress] = useState(() => {
    if (Cookies.get("ethereum_address") !== null) {
      return Cookies.get("ethereum_address") as string;
    } else {
      return "";
    }
  });


  function isConnected() {
    if (!connected) {
      toast("Please Connect wallet to continue");
      return;
    }
  }

  const getSigner = async () => {
    isConnected();

    if (!connected) return;
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    // console.log(await signer);
    return signer;
  };

  async function connectWallet(): Promise<string | null> {
    // Check if the MetaMask extension is installed
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Return the first account address
        setConnected(true);
        Cookies.set("ethereum_address", accounts[0], { expires: 1 });
        Cookies.set("wallet_status", "true", { expires: 1 });
        return accounts[0];
      } catch (error) {
        toast("User denied account access or an error occurred");
        console.log(error);
        setConnected(false);
        return null;
      }
    } else {
      setConnected(false);
      toast(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html",
        { dismissible: true }
      );
      await ethers.getDefaultProvider();
      return null;
    }
  }

  async function handleConnect() {
    const account = await connectWallet();
    if (account) {
      toast("Wallet connected");
      setConnected(true);
      setAddress(account);
      console.log("Connected with account:", account);
      // Perform additional logic with the connected account
    }
  }

  async function handleDisconnect() {
    if (window.ethereum) {
      // Reset the `window.ethereum` object
      toast("Wallet disconnected");
      console.log("Wallet disconnected");
      setConnected(false);
    } else {
      toast("No Ethereum wallet connected.");
      console.log("No Ethereum wallet connected.");
    }
    setAddress("");
    setConnected(false);
    Cookies.remove("ethereum_address");
    Cookies.remove("wallet_status");
  }

  return {
    handleConnect,
    handleDisconnect,
    address,
    getSigner,
    connected,
    isConnected,
  };
}
