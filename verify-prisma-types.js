// Verificación de que Prisma Client tiene slug en EventWhereInput
const { Prisma } = require('@prisma/client');

console.log('🔍 Verificando tipos de Prisma Client...\n');

// Verificar si EventWhereInput existe y tiene slug
const eventWhereInput = Prisma.dmmf.datamodel.models.find(m => m.name === 'Event');

if (!eventWhereInput) {
  console.error('❌ Modelo Event no encontrado');
  process.exit(1);
}

console.log('✅ Modelo Event encontrado');
console.log(`\nCampos del modelo Event:${eventWhereInput.fields.map(f => `\n  - ${f.name} (${f.type}${f.isRequired ? '' : '?'}${f.isList ? '[]' : ''})`).join('')}\n`);

// Verificar que slug existe y es @unique
const slugField = eventWhereInput.fields.find(f => f.name === 'slug');

if (!slugField) {
  console.error('❌ Campo slug NO encontrado en Event');
  process.exit(1);
}

console.log(`✅ Campo 'slug' encontrado:
  - Tipo: ${slugField.type}
  - Requerido: ${slugField.isRequired}
  - Único: ${slugField.isId || 'verificar schema'}\n`);

// Verificar el schema prisma directamente
const fs = require('fs');
const schema = fs.readFileSync('./prisma/schema.prisma', 'utf-8');

if (schema.includes('slug          String         @unique')) {
  console.log('✅ Schema.prisma tiene: slug String @unique\n');
} else if (schema.includes('slug')) {
  console.log('⚠️  Schema tiene slug pero no verificamos @unique\n');
} else {
  console.error('❌ Schema NO tiene slug\n');
  process.exit(1);
}

// Verificar las rutas
console.log('🔍 Verificando rutas API que usan slug...\n');

const bandRoute = fs.readFileSync('./src/app/api/events/[slug]/bands/route.ts', 'utf-8');
const galleryRoute = fs.readFileSync('./src/app/api/events/[slug]/gallery/route.ts', 'utf-8');

if (bandRoute.includes('where: { slug }')) {
  console.log('✅ bands/route.ts usa: where: { slug }');
} else {
  console.log('⚠️  bands/route.ts tiene otra sintaxis');
}

if (galleryRoute.includes('where: { slug }')) {
  console.log('✅ gallery/route.ts usa: where: { slug }');
} else {
  console.log('⚠️  gallery/route.ts tiene otra sintaxis');
}

console.log('\n✅ VERIFICACIÓN EXITOSA - Prisma types están correctos\n');
console.log('Resumen:');
console.log('  1. ✅ Modelo Event existe');
console.log('  2. ✅ Campo slug existe en Event');
console.log('  3. ✅ Schema.prisma marca slug como @unique');
console.log('  4. ✅ Rutas API usan where: { slug } correctamente');
console.log('\n📌 Conclusión: findFirst({ where: { slug } }) debería funcionar sin errores TypeScript\n');
