const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getCryptoPrice = async (slug: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/crypto/price?slug=${slug}`);
    const data = await response.json();
    return data.priceEur ?? 0;
  } catch (err) {
    console.error("[getCryptoPrice] Erreur récupération :", err);
    return 0;
  }
};

export default getCryptoPrice;
