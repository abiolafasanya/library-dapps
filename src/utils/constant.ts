import library from "@/data/library.json";

const gateway = `https://${process.env.NEXT_PUBLIC_SECRET_KEY}.ipfscdn.io/ipfs/`;
export const config = {
  CONTRACT_ADDRESS: "0xAC186510cccb6DdC3125819c2E8C8d9A4C623A9E",
  ABI: library.abi,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  gateway,
};
