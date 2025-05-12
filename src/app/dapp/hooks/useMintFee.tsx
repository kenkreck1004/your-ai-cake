import { useSuiClientQuery } from '@mysten/dapp-kit'

// import useNetworkConfig from "~~/hooks/useNetworkConfig";
// import { CONTRACT_CHARACTERISTIC_PACKAGE_VARIABLE_NAME, OBJECT_MINT_CONFIG_VARIABLE_NAME } from "~~/config/network";

const useMintFee = (mintConfigId : any) => {

  const query = useSuiClientQuery('getObject', {
    id: mintConfigId,
    options: {
      showContent: true,
    },
  })

  // console.log(mintConfigId);
  // console.log(query);

  const fee = query.data?.data?.content?.dataType === 'moveObject'
    ? Number((query.data.data.content.fields as { fee: number }).fee)
    : null

  return {
    ...query,
    fee,
  }
}

export default useMintFee