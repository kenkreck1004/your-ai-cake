"use client"

import useOwnNfts from "../hooks/useOwnNFTs";
import { useCurrentAccount } from "@mysten/dapp-kit";

export function ViewCharacteristic() {

  const dataOwnNFTs = useOwnNfts()

  const currentAccount = useCurrentAccount()

  if (!currentAccount) {
    window.location.href="/";
    return null;
  }

  if (dataOwnNFTs.isLoading) return <div>Still loading...</div>;

  return (
    <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {dataOwnNFTs?.data?.data.map((nft: any) => {
        const fields = nft.data?.content?.fields;
        const objectId = nft.data?.objectId;

        return (
          <div
            key={objectId}
            className="rounded-xl border p-4 shadow-md bg-white text-left"
          >
            <div className="text-xs text-gray-400 mb-1">ID: {objectId}</div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {fields?.name || "Không có tên"}
            </h2>
            <img
              src={fields?.image_url}
              alt={fields?.name}
              className="w-full h-48 object-cover rounded mb-2 border"
            />
            <p className="text-gray-700">{fields?.description}</p>
          </div>
        );
      })}
    </div>
  );
}
