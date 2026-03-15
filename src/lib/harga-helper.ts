/**
 * Harga Helper - Calculate & fill missing commodity prices for Papua regions
 * Strategy: Use base prices + regional multipliers based on accessibility
 */

export const baseHargaNew = {
  "Jagung": 8000,
  "Singkong": 6000,
  "Pisang": 10000,
  "Papaya": 8000,
  "Mangga": 12000,
  "Jeruk": 15000,
  "Nanas": 20000,
  "Kelapa": 8000,
  "Ayam Potong": 55000,
  "Daging Babi": 80000,
  "Daging Kambing": 95000,
  "Cumi-Cumi": 70000,
  "Tiram/Kerang": 50000,
  "Kepiting": 85000,
  "Lobster": 180000,
  "Tahu": 8000,
  "Tempe": 6000,
  "Sosis": 35000,
  "Bakso": 45000,
  "Keju": 65000,
  "Yogurt": 18000,
  "Mentega": 55000,
  "Roti Putih": 22000,
  "Roti Tawar": 28000,
  "Singkong Goreng": 30000,
  "Keripik Singkong": 25000,
  "Gurami": 40000,
  "Nila": 35000,
  "Patin": 32000,
  "Lele": 28000,
  "Seledri": 12000,
  "Daun Bawang": 8000,
  "Ketumbar": 25000,
  "Kunyit": 15000,
  "Jahe": 18000,
  "Lengkuas": 20000,
  "Laos": 18000,
  "Santan Kelapa": 15000,
  "Kecap Manis": 12000,
  "Kecap Asin": 11000,
  "Saus Sambal": 18000,
  "Vinegar": 10000,
  "Minyak Kelapa": 35000,
  "Tepung Maizena": 18000,
  "Gula Merah": 20000,
  "Madu": 45000,
  "Teh Hitam": 55000,
  "Teh Hijau": 60000,
  "Coklat Bubuk": 40000,
  "Susu Bubuk": 65000,
  "Kental Manis": 12000,
  "Minyak Biji Bunga Matahari": 40000,
  "Minyak Zaitun": 95000,
};

/**
 * Regional multipliers based on accessibility & supply chain
 * Urban/Coastal: 1.0x (cheapest)
 * Sub-urban: 1.2x
 * Rural: 1.5x
 * Mountain/Very Remote: 2.5x-3.5x
 */
export const regionMultipliers: Record<string, number> = {
  // Coastal/Urban (easiest access)
  "Kota Jayapura": 1.0,
  "Kota Sorong": 1.0,
  
  // Sub-coastal
  "Kabupaten Jayapura": 1.15,
  "Merauke": 1.1,
  "Biak Numfor": 1.15,
  "Nabire": 1.2,
  "Manokwari": 1.15,
  "Fakfak": 1.25,
  "Raja Ampat": 1.3,
  
  // Mountain/Very Remote (hardest access)
  "Jayawijaya (Wamena)": 2.8,
  "Puncak Jaya": 3.0,
  "Asmat": 2.5,
  "Mimika (Timika)": 1.5,
  "Papua Pegunungan": 2.8,
};

/**
 * Generate harga for new komoditas in all kabupaten
 * @param kabupaten - Nama kabupaten
 * @returns Object with {komoditas: price}
 */
export function generateNewHargaForKabupaten(kabupaten: string): Record<string, number> {
  const multiplier = regionMultipliers[kabupaten] || 1.2;
  const result: Record<string, number> = {};
  
  Object.entries(baseHargaNew).forEach(([komoditas, basePrice]) => {
    // Apply multiplier and round to nearest 500
    const adjustedPrice = Math.round((basePrice * multiplier) / 500) * 500;
    result[komoditas] = adjustedPrice;
  });
  
  return result;
}

/**
 * Get all harga values for a specific kabupaten with new items included
 * @param kabupaten - Nama kabupaten
 * @param existingHarga - Existing harga object dari database
 * @returns Merged harga object
 */
export function mergeHargaWithNewItems(
  kabupaten: string,
  existingHarga: Record<string, number>
): Record<string, number> {
  const newItems = generateNewHargaForKabupaten(kabupaten);
  return { ...existingHarga, ...newItems };
}

/**
 * Export harga data as SQL INSERT (untuk bulk update database jika diperlukan)
 */
export function exportHargaAsSQL(kabupaten: string, lastUpdate: string): string {
  const harga = generateNewHargaForKabupaten(kabupaten);
  const lines: string[] = [];
  
  Object.entries(harga).forEach(([item, price]) => {
    lines.push(`('${kabupaten}', '${item}', ${price}, '${lastUpdate}'),`);
  });
  
  return `INSERT INTO harga_komoditas (kabupaten, komoditas, harga, last_update) VALUES\n${lines.join("\n")}`;
}

/**
 * Bulk generate for Papua market analysis/reporting
 */
export function bulkGenerateAllHarga(): Record<string, Record<string, Record<string, number>>> {
  const allKabupaten = Object.keys(regionMultipliers);
  const result: Record<string, Record<string, Record<string, number>>> = {};
  
  allKabupaten.forEach((kabupaten) => {
    result[kabupaten] = {
      existing: {}, // would be populated from actual database
      new: generateNewHargaForKabupaten(kabupaten),
    };
  });
  
  return result;
}

/**
 * Get price comparison across regions for a specific commodity
 */
export function getPriceComparison(komoditas: string): Record<string, number> {
  const basePrice = baseHargaNew[komoditas as keyof typeof baseHargaNew];
  
  if (!basePrice) {
    return {};
  }
  
  const result: Record<string, number> = {};
  
  Object.entries(regionMultipliers).forEach(([region, multiplier]) => {
    result[region] = Math.round((basePrice * multiplier) / 500) * 500;
  });
  
  return result;
}

export default {
  baseHargaNew,
  regionMultipliers,
  generateNewHargaForKabupaten,
  mergeHargaWithNewItems,
  exportHargaAsSQL,
  bulkGenerateAllHarga,
  getPriceComparison,
};
