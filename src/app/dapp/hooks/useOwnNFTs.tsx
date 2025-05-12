import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit'
import { CONTRACT_CHARACTERISTIC_PACKAGE_VARIABLE_NAME } from '~~/config/network'
import { fullStructName } from '~~/helpers/network'
import useNetworkConfig from '~~/hooks/useNetworkConfig'

const useOwnNfts = () => {
  const currentAccount = useCurrentAccount()
  const { useNetworkVariable } = useNetworkConfig()
  const packageId = useNetworkVariable(CONTRACT_CHARACTERISTIC_PACKAGE_VARIABLE_NAME)

  return useSuiClientQuery('getOwnedObjects', {
    owner: currentAccount?.address as string,
    filter: {
      StructType: fullStructName(packageId, 'CharacteristicNFT'),
    },
    options: {
      showContent: true,
      showDisplay: true,
    },
  })
}

export default useOwnNfts
