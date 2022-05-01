import { ChainId } from '@foxlottery/core-sdk'
import { Feature } from 'app/enums'

type FeatureMap = { readonly [chainId in ChainId]?: Feature[] }

const features: FeatureMap = {
  [ChainId.ETHEREUM]: [Feature.LOTTERY],
  [ChainId.ROPSTEN]: [Feature.LOTTERY],
  [ChainId.RINKEBY]: [Feature.LOTTERY],
  [ChainId.GÖRLI]: [Feature.LOTTERY],
  [ChainId.KOVAN]: [Feature.LOTTERY],
  [ChainId.BSC]: [Feature.LOTTERY],
  [ChainId.BSC_TESTNET]: [Feature.LOTTERY],
  [ChainId.FANTOM]: [Feature.LOTTERY],
  [ChainId.FANTOM_TESTNET]: [Feature.LOTTERY],
  [ChainId.MATIC]: [Feature.LOTTERY],
  [ChainId.MATIC_TESTNET]: [Feature.LOTTERY],
  [ChainId.HARMONY]: [Feature.LOTTERY],
  [ChainId.HARMONY_TESTNET]: [Feature.LOTTERY],
  [ChainId.AVALANCHE]: [Feature.LOTTERY],
  [ChainId.AVALANCHE_TESTNET]: [Feature.LOTTERY],
  [ChainId.OKEX]: [Feature.LOTTERY],
  [ChainId.OKEX_TESTNET]: [Feature.LOTTERY],
  [ChainId.XDAI]: [Feature.LOTTERY],
  [ChainId.MOONRIVER]: [Feature.LOTTERY],
  [ChainId.CELO]: [Feature.LOTTERY],
  [ChainId.ARBITRUM]: [Feature.LOTTERY],
  [ChainId.FUSE]: [Feature.LOTTERY],
  [ChainId.MOONBEAM]: [Feature.LOTTERY],
}

export default features
