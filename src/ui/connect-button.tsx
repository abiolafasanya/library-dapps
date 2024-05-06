"use client";
import { Button } from "@/components/ui/button";
import { useConnectHook } from "@/hooks/connectHook";
import { limitTextLength } from "@/utils/formatter";
import React from "react";
import Link from "next/link";

const menus = [
  { id: 1, name: "My Files", url: "/my-files" },
  { id: 2, name: "Files", url: "/files" },
];

export default function Header() {
  const { address, handleConnect, handleDisconnect } = useConnectHook();
  return (
    <header className="w-full py-5 flex-col md:flex-row flex justify-between items-center">
      <Link href={"/"} className="text-2xl font-semibold">
        DeLibrary
      </Link>
      <menu className="space-x-5 capitalize">
        {menus.map((menu, i) => (
          <Link key={i} href={menu.url} className="text-pretty font-semibold">
            {menu.name}
          </Link>
        ))}
      </menu>
      <WalletButton
        address={address}
        connect={handleConnect}
        disconnect={handleDisconnect}
      />
    </header>
  );
}

type Props = {
  address: string;
  connect: () => void;
  disconnect: () => void;
};

function WalletButton({ address, connect, disconnect }: Props) {
  return (
    <>
      {!address ? (
        <Button onClick={connect}>Connect Wallet</Button>
      ) : (
        <Button onClick={disconnect}>{limitTextLength(address, 12)}</Button>
      )}
    </>
  );
}
