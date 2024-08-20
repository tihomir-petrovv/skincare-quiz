export default async function fetchProductRecommendation(userInput) {
  try {
    const result = await fetch(
      "https://jeval.com.au/collections/hair-care/products.json?page=1"
    );

    if (!result.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await result.json();
    const filteredProducts = data.products.reduce((acc, product) => {
      const matches =
        product.tags.some((tag) =>
          userInput.some((word) =>
            tag.toLowerCase().includes(word.toLowerCase())
          )
        ) ||
        userInput.some((word) =>
          product.title.toLowerCase().includes(word.toLowerCase())
        ) ||
        userInput.some((word) =>
          product.body_html.toLowerCase().includes(word.toLowerCase())
        );

      if (matches) {
        acc.push(product);
      }

      return acc;
    }, []);

    return filteredProducts;
  } catch (error) {
    console.log("Error fetching data", error);
  }
}
