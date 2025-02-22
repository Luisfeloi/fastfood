
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Productheader from "./components/product-header";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
  params: Promise<{ slug: string, productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {

  const { slug, productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId }, include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true
        }
      }
    }
  });

  if (!product) notFound();

  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) notFound();

  return (
    <div className="flex h-full flex-col">
      <Productheader product={product} />
      <ProductDetails product={product} />
    </div>
  );
}

export default ProductPage;