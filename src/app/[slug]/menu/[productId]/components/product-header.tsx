"use client"

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductheaderProps {
  product: Pick<Product, "name" | "imageUrl">
}

const Productheader = ({ product }: ProductheaderProps) => {
  const router = useRouter()

  return (
    <>
      <div className="relative w-full min-h-[300px]">

        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-4 z-50 rounded-full"
          onClick={router.back}
        >
          <ChevronLeftIcon />
        </Button>

        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
        />

        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-4 z-50 rounded-full"
        >
          <ScrollTextIcon />
        </Button>
      </div>
    </>
  );
}

export default Productheader;