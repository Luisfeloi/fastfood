
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantHeader from "./components/header"
import RestaurantCategories from "./components/categories";


interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toLocaleUpperCase())
}

const RestaurantMenuPage = async ({ params, searchParams }: RestaurantPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(consumptionMethod)) {
    notFound()
  };

  const restaurant = await db.restaurant.findUnique({
    where: { slug }, include: {
      menuCategory: {
        include: {
          products: true
        }
      }
    }
  })
  if (!restaurant) {
    notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
}

export default RestaurantMenuPage;