'use server';

import { db } from "@/lib/prisma";
import { ConsumptionMethod } from "@prisma/client";
import { removeCpfPunctuation } from "../helpers/cps";
import { redirect } from "next/navigation";

interface createOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;

  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: createOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug: input.slug }
  })
  if (!restaurant) {
    throw new Error("Restaurante not found")
  }
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map(product => product.id)
      }
    }
  });

  const productsWithPricesAndsQuantities = input.products.map(product => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find(p => p.id === product.id)!.price
  }));
  await db.order.create({
    data: {
      status: 'PENDING',
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndsQuantities
        }
      },
      total: productsWithPricesAndsQuantities.reduce((acc, product) => acc + product.price * product.quantity, 0),
      comsumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  });
  redirect(`/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`);
};