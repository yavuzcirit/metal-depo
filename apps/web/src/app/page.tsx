import { getBanners, getCategories, getFeaturedProducts } from '@/lib/api'
import { HeroSlider } from '@/components/home/HeroSlider'
import { StatsBar } from '@/components/home/StatsBar'
import { CategoryShowcase } from '@/components/home/CategoryShowcase'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { AboutSection } from '@/components/home/AboutSection'
import { WhyUsSection } from '@/components/home/WhyUsSection'
import { CtaSection } from '@/components/home/CtaSection'

export default async function HomePage() {
  const [banners, categories, featured] = await Promise.allSettled([
    getBanners('home', true),
    getCategories(true),
    getFeaturedProducts(8),
  ])

  return (
    <>
      <HeroSlider banners={banners.status === 'fulfilled' ? banners.value : []} />
      <StatsBar />
      <CategoryShowcase categories={categories.status === 'fulfilled' ? categories.value : []} />
      <FeaturedProducts products={featured.status === 'fulfilled' ? featured.value : []} />
      <AboutSection />
      <WhyUsSection />
      <CtaSection />
    </>
  )
}
