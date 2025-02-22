"use client"
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        }
      }
    }
  }>
}

const ProductDetails = ({ product }: ProductDetailsProps) => {

  const [quantity, setQuantity] = useState<number>(1);
  const handleDecreaseQuantity = () => setQuantity((prev) => prev - 1);
  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl p-5 flex-auto flex flex-col">

      <div className="flex-auto">
        {/* RESTAURANTE */}

        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-xs text-muted-foreground space-x-1">
            {product.restaurant.name}
          </p>
        </div>
        <h2 className="mt-1 text-xl font-semibold">
          {product.name}
        </h2>

        {/* NOME DO PRODUTO */}

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>

          {/* QUANTIDADE PRODUTO */}

          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="w-8 h-8 rounded-xl"
              onClick={handleDecreaseQuantity}
              disabled={quantity === 0}>
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              className="w-8 h-8 rounded-xl"
              onClick={handleIncreaseQuantity}
              disabled={quantity === Infinity}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* DESCRIÇÃO DO PRODUTO */}
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Sobre</h4>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        {/* INGREDIENTES */}

        <div className="mt-6 space-y-3">
          <div className="5 flex items-center gap-1">
            <ChefHatIcon size={18} />
            <h4 className="font-semibold">Ingredientes</h4>
          </div>
          <p className="text-sm text-muted-foreground">{product.ingredients}</p>
        </div>
      </div>

      <Button className="rounded-full w-full mt-6">Adicionar à sacola</Button>

    </div>
  );
}

export default ProductDetails;