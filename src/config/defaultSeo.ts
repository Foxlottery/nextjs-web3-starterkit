const defaultSeo = {
  defaultTitle: 'Foxlottery',
  description: 'Blockchain lottery building service for municipalities.',
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
