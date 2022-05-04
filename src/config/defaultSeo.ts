const defaultSeo = {
  defaultTitle: 'Foxlottery',
  description:
    'Decentralized web3 lottery building service using blockchain-based crypto currency and smart contracts for municipalities.',
  openGraph: {
    type: 'website',
    url: `https://${process.env.DOMAIN}`,
    site_name: 'Foxlottery',
  },
  twitter: {
    handle: '@Foxlottery',
    site: '@Foxlottery',
    cardType: 'summary_large_image',
    image: '/images/header.png',
  },
}

export default defaultSeo
