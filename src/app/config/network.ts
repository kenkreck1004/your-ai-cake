// We automatically create/update .env.local with the deployed package ID after deployment.
export const CONTRACT_PACKAGE_ID_NOT_DEFINED = '0x806cb03998f7743e5b3fee01b6e8d5ce00ad737a8048bc3e0a441ac448021d2d'
export const LOCALNET_CONTRACT_PACKAGE_ID =
  process.env.NEXT_PUBLIC_LOCALNET_CONTRACT_PACKAGE_ID ||
  CONTRACT_PACKAGE_ID_NOT_DEFINED
export const DEVNET_CONTRACT_PACKAGE_ID =
  process.env.NEXT_PUBLIC_DEVNET_CONTRACT_PACKAGE_ID ||
  CONTRACT_PACKAGE_ID_NOT_DEFINED
export const TESTNET_CONTRACT_PACKAGE_ID =
  process.env.NEXT_PUBLIC_TESTNET_CONTRACT_PACKAGE_ID ||
  CONTRACT_PACKAGE_ID_NOT_DEFINED
export const MAINNET_CONTRACT_PACKAGE_ID =
  process.env.NEXT_PUBLIC_MAINNET_CONTRACT_PACKAGE_ID ||
  CONTRACT_PACKAGE_ID_NOT_DEFINED

export const LOCALNET_EXPLORER_URL = 'http://localhost:9001'
export const DEVNET_EXPLORER_URL = 'https://devnet.suivision.xyz'
export const TESTNET_EXPLORER_URL = 'https://testnet.suivision.xyz'
export const MAINNET_EXPLORER_URL = 'https://suivision.xyz'

export const CONTRACT_PACKAGE_VARIABLE_NAME = 'contractPackageId'

export const EXPLORER_URL_VARIABLE_NAME = 'explorerUrl'

export const NETWORKS_WITH_FAUCET = ['localnet', 'devnet', 'testnet']

export const CONTRACT_CHARACTERISTIC_PACKAGE_VARIABLE_NAME = 'contractCharacteristicPackageId'
export const OBJECT_MINT_CONFIG_VARIABLE_NAME = 'objectMintConfigId'
