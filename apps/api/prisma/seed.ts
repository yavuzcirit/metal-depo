import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'steel-flat' },
      update: {},
      create: { name: 'Flat Steel Products', slug: 'steel-flat', description: 'Hot rolled and cold rolled flat steel products including sheets, plates and coils.', order: 1 },
    }),
    prisma.category.upsert({
      where: { slug: 'steel-long' },
      update: {},
      create: { name: 'Long Steel Products', slug: 'steel-long', description: 'Structural steel including beams, angles, channels, and bars.', order: 2 },
    }),
    prisma.category.upsert({
      where: { slug: 'steel-tubes' },
      update: {},
      create: { name: 'Steel Tubes & Pipes', slug: 'steel-tubes', description: 'Seamless and welded steel tubes and pipes for industrial use.', order: 3 },
    }),
    prisma.category.upsert({
      where: { slug: 'aluminum' },
      update: {},
      create: { name: 'Aluminum Products', slug: 'aluminum', description: 'Aluminum sheets, profiles, tubes and alloys.', order: 4 },
    }),
    prisma.category.upsert({
      where: { slug: 'stainless' },
      update: {},
      create: { name: 'Stainless Steel', slug: 'stainless', description: 'Corrosion-resistant stainless steel products in various grades.', order: 5 },
    }),
    prisma.category.upsert({
      where: { slug: 'special-alloys' },
      update: {},
      create: { name: 'Special Alloys', slug: 'special-alloys', description: 'High-performance alloys for demanding applications.', order: 6 },
    }),
  ])

  console.log(`✓ Created ${categories.length} categories`)

  // Products
  const products = [
    { code: 'HRS-001', name: 'Hot Rolled Steel Sheet S235JR', slug: 'hot-rolled-steel-sheet-s235jr', categoryId: categories[0].id, description: 'Standard quality hot rolled steel sheet for structural applications.', price: 580, unit: 'ton', featured: true, order: 1 },
    { code: 'HRS-002', name: 'Hot Rolled Steel Plate S355J2', slug: 'hot-rolled-steel-plate-s355j2', categoryId: categories[0].id, description: 'High strength structural steel plate for heavy construction.', price: 640, unit: 'ton', featured: true, order: 2 },
    { code: 'CRS-001', name: 'Cold Rolled Steel Coil DC01', slug: 'cold-rolled-steel-coil-dc01', categoryId: categories[0].id, description: 'Cold rolled steel coil for automotive and manufacturing sectors.', price: 720, unit: 'ton', order: 3 },
    { code: 'HEA-001', name: 'HEA 100 Wide Flange Beam', slug: 'hea-100-wide-flange-beam', categoryId: categories[1].id, description: 'European wide flange H-beam for structural steel construction.', price: 610, unit: 'ton', featured: true, order: 1 },
    { code: 'IPE-001', name: 'IPE 200 I-Beam', slug: 'ipe-200-i-beam', categoryId: categories[1].id, description: 'European standard I-beam for building structures.', price: 595, unit: 'ton', order: 2 },
    { code: 'ANG-001', name: 'Angle Iron L 60x60x6', slug: 'angle-iron-l-60x60x6', categoryId: categories[1].id, description: 'Equal leg steel angle for construction and manufacturing.', price: 580, unit: 'ton', order: 3 },
    { code: 'SQT-001', name: 'Square Hollow Section 50x50x3', slug: 'square-hollow-section-50x50x3', categoryId: categories[2].id, description: 'Cold-formed square hollow section for frames and structures.', price: 750, unit: 'ton', featured: true, order: 1 },
    { code: 'RHS-001', name: 'Rectangular Hollow Section 80x40x3', slug: 'rectangular-hollow-section-80x40x3', categoryId: categories[2].id, description: 'ERW rectangular hollow section for construction.', price: 740, unit: 'ton', order: 2 },
    { code: 'ALU-001', name: 'Aluminum Sheet 5083', slug: 'aluminum-sheet-5083', categoryId: categories[3].id, description: 'Marine grade aluminum alloy sheet for harsh environments.', price: 2800, unit: 'ton', featured: true, order: 1 },
    { code: 'ALU-002', name: 'Aluminum Profile T-Slot 30x30', slug: 'aluminum-profile-t-slot-30x30', categoryId: categories[3].id, description: 'Extruded aluminum T-slot profile for automation systems.', price: null, unit: 'piece', order: 2 },
    { code: 'SS-001', name: 'Stainless Steel Sheet 304 2B', slug: 'stainless-steel-sheet-304-2b', categoryId: categories[4].id, description: 'Food-grade stainless steel sheet, 2B finish.', price: 2100, unit: 'ton', featured: true, order: 1 },
    { code: 'SS-002', name: 'Stainless Steel Tube 316L', slug: 'stainless-steel-tube-316l', categoryId: categories[4].id, description: 'Seamless stainless steel tube in grade 316L for chemical processing.', price: 4500, unit: 'ton', order: 2 },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { code: p.code },
      update: {},
      create: {
        ...p,
        images: [],
        active: true,
        details: `Grade: Premium\nOrigin: Certified Mill\nCertification: EN 10025 / ASTM\nMinimum Order: 1 ton\nLead Time: 7-14 business days`,
      },
    })
  }

  console.log(`✓ Created ${products.length} products`)

  // Banners
  await prisma.banner.upsert({
    where: { id: 'banner-home-1' },
    update: {},
    create: {
      id: 'banner-home-1',
      title: 'Premium Metal Products',
      subtitle: 'Industrial Grade Quality',
      description: 'Trusted by manufacturers in 50+ countries. Steel, aluminum, and specialty alloys — delivered globally.',
      image: '',
      link: '/products',
      page: 'home',
      order: 1,
      active: true,
    },
  })

  // Page content
  await Promise.all([
    prisma.pageContent.upsert({
      where: { key: 'home_about_title' },
      update: {},
      create: { key: 'home_about_title', title: 'About Us', content: 'Your Global Metal Supply Partner' },
    }),
    prisma.pageContent.upsert({
      where: { key: 'contact_email' },
      update: {},
      create: { key: 'contact_email', title: 'Email', content: 'info@metaldepo.com' },
    }),
    prisma.pageContent.upsert({
      where: { key: 'contact_phone' },
      update: {},
      create: { key: 'contact_phone', title: 'Phone', content: '+90 500 123 45 67' },
    }),
  ])

  console.log('✓ Created page content and banners')
  console.log('✅ Seed complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
