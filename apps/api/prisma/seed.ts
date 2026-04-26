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
    // Flat Steel Products
    { code: 'HRS-001', name: 'Hot Rolled Steel Sheet S235JR', slug: 'hot-rolled-steel-sheet-s235jr', categoryId: categories[0].id, description: 'Standard quality hot rolled steel sheet for structural applications.', price: 580, unit: 'ton', featured: true, order: 1 },
    { code: 'HRS-002', name: 'Hot Rolled Steel Plate S355J2', slug: 'hot-rolled-steel-plate-s355j2', categoryId: categories[0].id, description: 'High strength structural steel plate for heavy construction.', price: 640, unit: 'ton', featured: true, order: 2 },
    { code: 'CRS-001', name: 'Cold Rolled Steel Coil DC01', slug: 'cold-rolled-steel-coil-dc01', categoryId: categories[0].id, description: 'Cold rolled steel coil for automotive and manufacturing sectors.', price: 720, unit: 'ton', order: 3 },
    { code: 'HRS-003', name: 'Galvanized Steel Sheet DX51D', slug: 'galvanized-steel-sheet-dx51d', categoryId: categories[0].id, description: 'Hot-dip galvanized steel sheet with Z275 coating for corrosion resistance.', price: 810, unit: 'ton', order: 4 },
    { code: 'HRS-004', name: 'Checkered Steel Plate S235JR', slug: 'checkered-steel-plate-s235jr', categoryId: categories[0].id, description: 'Anti-slip checkered pattern steel plate for flooring and platforms.', price: 650, unit: 'ton', order: 5 },
    { code: 'CRS-002', name: 'Cold Rolled Steel Sheet DC04', slug: 'cold-rolled-steel-sheet-dc04', categoryId: categories[0].id, description: 'Extra deep drawing quality cold rolled steel for automotive panels.', price: 790, unit: 'ton', order: 6 },

    // Long Steel Products
    { code: 'HEA-001', name: 'HEA 100 Wide Flange Beam', slug: 'hea-100-wide-flange-beam', categoryId: categories[1].id, description: 'European wide flange H-beam for structural steel construction.', price: 610, unit: 'ton', featured: true, order: 1 },
    { code: 'IPE-001', name: 'IPE 200 I-Beam', slug: 'ipe-200-i-beam', categoryId: categories[1].id, description: 'European standard I-beam for building structures.', price: 595, unit: 'ton', order: 2 },
    { code: 'ANG-001', name: 'Angle Iron L 60x60x6', slug: 'angle-iron-l-60x60x6', categoryId: categories[1].id, description: 'Equal leg steel angle for construction and manufacturing.', price: 580, unit: 'ton', order: 3 },
    { code: 'UPN-001', name: 'UPN 120 Channel Steel', slug: 'upn-120-channel-steel', categoryId: categories[1].id, description: 'European standard U-channel for structural framing and supports.', price: 600, unit: 'ton', order: 4 },
    { code: 'REB-001', name: 'Rebar B500C 12mm', slug: 'rebar-b500c-12mm', categoryId: categories[1].id, description: 'High ductility reinforcing steel bar for concrete reinforcement.', price: 520, unit: 'ton', featured: true, order: 5 },
    { code: 'FLT-001', name: 'Flat Bar S235JR 50x10', slug: 'flat-bar-s235jr-50x10', categoryId: categories[1].id, description: 'Hot rolled flat steel bar for fabrication and general use.', price: 560, unit: 'ton', order: 6 },
    { code: 'RND-001', name: 'Round Bar S355J2 30mm', slug: 'round-bar-s355j2-30mm', categoryId: categories[1].id, description: 'Hot rolled round steel bar for machining and shafts.', price: 620, unit: 'ton', order: 7 },

    // Steel Tubes & Pipes
    { code: 'SQT-001', name: 'Square Hollow Section 50x50x3', slug: 'square-hollow-section-50x50x3', categoryId: categories[2].id, description: 'Cold-formed square hollow section for frames and structures.', price: 750, unit: 'ton', featured: true, order: 1 },
    { code: 'RHS-001', name: 'Rectangular Hollow Section 80x40x3', slug: 'rectangular-hollow-section-80x40x3', categoryId: categories[2].id, description: 'ERW rectangular hollow section for construction.', price: 740, unit: 'ton', order: 2 },
    { code: 'CHS-001', name: 'Circular Hollow Section 60.3x3.2', slug: 'circular-hollow-section-60x3', categoryId: categories[2].id, description: 'Welded circular hollow section pipe for structural and mechanical use.', price: 760, unit: 'ton', order: 3 },
    { code: 'SMP-001', name: 'Seamless Steel Pipe API 5L Gr.B', slug: 'seamless-steel-pipe-api-5l-grb', categoryId: categories[2].id, description: 'Seamless carbon steel pipe for oil & gas pipeline applications.', price: 950, unit: 'ton', featured: true, order: 4 },
    { code: 'GIP-001', name: 'Galvanized Steel Pipe 1.5"', slug: 'galvanized-steel-pipe-1-5-inch', categoryId: categories[2].id, description: 'Hot-dip galvanized steel pipe for water and gas installations.', price: 820, unit: 'ton', order: 5 },

    // Aluminum Products
    { code: 'ALU-001', name: 'Aluminum Sheet 5083', slug: 'aluminum-sheet-5083', categoryId: categories[3].id, description: 'Marine grade aluminum alloy sheet for harsh environments.', price: 2800, unit: 'ton', featured: true, order: 1 },
    { code: 'ALU-002', name: 'Aluminum Profile T-Slot 30x30', slug: 'aluminum-profile-t-slot-30x30', categoryId: categories[3].id, description: 'Extruded aluminum T-slot profile for automation systems.', price: 45, unit: 'piece', order: 2 },
    { code: 'ALU-003', name: 'Aluminum Coil 1050 H14', slug: 'aluminum-coil-1050-h14', categoryId: categories[3].id, description: 'Pure aluminum coil for insulation, packaging and general fabrication.', price: 2400, unit: 'ton', order: 3 },
    { code: 'ALU-004', name: 'Aluminum Round Bar 6082 T6', slug: 'aluminum-round-bar-6082-t6', categoryId: categories[3].id, description: 'High strength aluminum round bar for CNC machining.', price: 3200, unit: 'ton', order: 4 },
    { code: 'ALU-005', name: 'Aluminum Tube 6063 T5 40x2', slug: 'aluminum-tube-6063-t5-40x2', categoryId: categories[3].id, description: 'Extruded aluminum tube for furniture, railing and structural frames.', price: 3000, unit: 'ton', featured: true, order: 5 },

    // Stainless Steel
    { code: 'SS-001', name: 'Stainless Steel Sheet 304 2B', slug: 'stainless-steel-sheet-304-2b', categoryId: categories[4].id, description: 'Food-grade stainless steel sheet, 2B finish.', price: 2100, unit: 'ton', featured: true, order: 1 },
    { code: 'SS-002', name: 'Stainless Steel Tube 316L', slug: 'stainless-steel-tube-316l', categoryId: categories[4].id, description: 'Seamless stainless steel tube in grade 316L for chemical processing.', price: 4500, unit: 'ton', order: 2 },
    { code: 'SS-003', name: 'Stainless Steel Round Bar 304', slug: 'stainless-steel-round-bar-304', categoryId: categories[4].id, description: 'Austenitic stainless steel round bar for food and pharmaceutical equipment.', price: 2800, unit: 'ton', order: 3 },
    { code: 'SS-004', name: 'Stainless Steel Plate 316 No.1', slug: 'stainless-steel-plate-316-no1', categoryId: categories[4].id, description: 'Heavy duty stainless steel plate for marine and chemical plants.', price: 4200, unit: 'ton', featured: true, order: 4 },
    { code: 'SS-005', name: 'Stainless Steel Angle 304 40x40x4', slug: 'stainless-steel-angle-304-40x40x4', categoryId: categories[4].id, description: 'Stainless steel equal angle for food processing and architectural use.', price: 3100, unit: 'ton', order: 5 },

    // Special Alloys
    { code: 'SA-001', name: 'Inconel 625 Sheet', slug: 'inconel-625-sheet', categoryId: categories[5].id, description: 'Nickel-chromium superalloy sheet for extreme temperature and corrosion resistance.', price: 28000, unit: 'ton', featured: true, order: 1 },
    { code: 'SA-002', name: 'Monel 400 Round Bar', slug: 'monel-400-round-bar', categoryId: categories[5].id, description: 'Nickel-copper alloy bar for marine engineering and chemical processing.', price: 18000, unit: 'ton', order: 2 },
    { code: 'SA-003', name: 'Titanium Grade 5 Sheet (Ti-6Al-4V)', slug: 'titanium-grade-5-sheet', categoryId: categories[5].id, description: 'Aerospace grade titanium alloy sheet with excellent strength-to-weight ratio.', price: 35000, unit: 'ton', featured: true, order: 3 },
    { code: 'SA-004', name: 'Hastelloy C276 Plate', slug: 'hastelloy-c276-plate', categoryId: categories[5].id, description: 'Nickel-molybdenum-chromium alloy plate for severe corrosive environments.', price: 32000, unit: 'ton', order: 4 },
    { code: 'SA-005', name: 'Duplex 2205 Stainless Steel Pipe', slug: 'duplex-2205-stainless-steel-pipe', categoryId: categories[5].id, description: 'Duplex stainless steel pipe combining high strength with corrosion resistance.', price: 8500, unit: 'ton', order: 5 },
    { code: 'SA-006', name: 'Copper Sheet C11000 (ETP)', slug: 'copper-sheet-c11000-etp', categoryId: categories[5].id, description: 'Electrolytic tough pitch copper sheet for electrical and thermal applications.', price: 8200, unit: 'ton', order: 6 },
    { code: 'SA-007', name: 'Brass Rod C36000', slug: 'brass-rod-c36000', categoryId: categories[5].id, description: 'Free-cutting brass rod for precision machined components and fittings.', price: 6800, unit: 'ton', order: 7 },
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
  await Promise.all([
    prisma.banner.upsert({
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
    }),
    prisma.banner.upsert({
      where: { id: 'banner-home-2' },
      update: {},
      create: {
        id: 'banner-home-2',
        title: 'Special Alloys Collection',
        subtitle: 'Inconel, Titanium, Hastelloy & More',
        description: 'High-performance alloys for aerospace, marine, and chemical industries. Certified quality with full traceability.',
        image: '',
        link: '/categories/special-alloys',
        page: 'home',
        order: 2,
        active: true,
      },
    }),
    prisma.banner.upsert({
      where: { id: 'banner-home-3' },
      update: {},
      create: {
        id: 'banner-home-3',
        title: 'Fast Global Delivery',
        subtitle: 'From Stock to Your Door',
        description: 'Over 10,000 tons in stock. Express delivery across Europe and Middle East within 5-7 business days.',
        image: '',
        link: '/contact',
        page: 'home',
        order: 3,
        active: true,
      },
    }),
  ])

  // Page content
  await Promise.all([
    prisma.pageContent.upsert({
      where: { key: 'home_about_title' },
      update: {},
      create: { key: 'home_about_title', title: 'About Us', content: 'Your Global Metal Supply Partner' },
    }),
    prisma.pageContent.upsert({
      where: { key: 'home_about_description' },
      update: {},
      create: { key: 'home_about_description', title: 'About Description', content: 'MetalDepo has been serving the metal industry for over 15 years. We provide certified steel, aluminum, and specialty alloy products to manufacturers, construction companies, and fabricators worldwide. Our commitment to quality and reliability makes us the preferred partner for industrial metal supply.' },
    }),
    prisma.pageContent.upsert({
      where: { key: 'home_stats_products' },
      update: {},
      create: { key: 'home_stats_products', title: '500+', content: 'Products in catalog' },
    }),
    prisma.pageContent.upsert({
      where: { key: 'home_stats_countries' },
      update: {},
      create: { key: 'home_stats_countries', title: '50+', content: 'Countries served' },
    }),
    prisma.pageContent.upsert({
      where: { key: 'home_stats_stock' },
      update: {},
      create: { key: 'home_stats_stock', title: '10,000+', content: 'Tons in stock' },
    }),
    prisma.pageContent.upsert({
      where: { key: 'home_stats_years' },
      update: {},
      create: { key: 'home_stats_years', title: '15+', content: 'Years of experience' },
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
    prisma.pageContent.upsert({
      where: { key: 'contact_address' },
      update: {},
      create: { key: 'contact_address', title: 'Address', content: 'Ikitelli Organized Industrial Zone, Metal Plaza No:42, Basaksehir, Istanbul, Turkey' },
    }),
    prisma.pageContent.upsert({
      where: { key: 'footer_description' },
      update: {},
      create: { key: 'footer_description', title: 'Footer', content: 'MetalDepo is a leading global supplier of steel, aluminum, and specialty metal products. We deliver quality materials with certified traceability to manufacturers and builders worldwide.' },
    }),
  ])

  console.log('✓ Created page content and banners')
  console.log('✅ Seed complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
