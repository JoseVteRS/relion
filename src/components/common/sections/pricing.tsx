"use client";

import { Button } from "@/components/ui/button";
import config from "../../../../config/config";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const formatPrice = (price: string | number) => {
  if (typeof price === "number") {
    return (price / 100).toFixed(2);
  }
  return price;
};

interface PricingItemProps {
  name: string;
  price: string | number;
  priceAnchor?: number;
  description: string;
  features: { name: string }[];
  isFeatured?: boolean;
  monthly?: boolean;
}

interface PricingToggleProps {
  isAnnual: boolean;
  setIsAnnual: (isAnnual: boolean) => void;
}

const PricingToggle = ({ isAnnual, setIsAnnual }: PricingToggleProps) => {
  const annualSavings = 15;

  return (
    <div className="flex flex-col items-center mb-12">
      <div className="relative flex gap-5 bg-black py-2 rounded-full w-[300px] border-4 border-black">
        <div
          className={cn(
            "absolute z-10 text-neutral-800 bg-primary w-1/2 rounded-full inset-0 left-0 transition-transform duration-300",
            isAnnual && "translate-x-full"
          )}
        ></div>
        <button
          className={cn(
            "w-full z-20 text-sm text-neutral-800 font-bold transition-colors",
            isAnnual && "text-primary"
          )}
          onClick={() => setIsAnnual(false)}
        >
          Mensual
        </button>
        <button
          className={cn(
            "w-full z-20 text-sm text-neutral-100 font-bold transition-colors",
            isAnnual && "text-neutral-800"
          )}
          onClick={() => setIsAnnual(true)}
        >
          Anual{" "}
          <span
            className={cn(
              "text-primary  transition-colors",
              isAnnual && "text-neutral-100 "
            )}
          >
            -{annualSavings}%
          </span>
        </button>
      </div>
    </div>
  );
};

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <section className="py-20 bg-background" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Planes de precios flexibles
            <span className="text-primary"> para ti</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Elige el plan perfecto para tus necesidades. Desde proyectos
            personales hasta grandes empresas, tenemos la solución ideal para
            ti.
          </p>
        </div>
        <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {config.stripe.plans.map((plan, index) => (
            <PricingItem
              key={index}
              name={plan.name}
              price={plan.price}
              priceAnchor={plan.priceAnchor}
              description={plan.description || ""}
              features={plan.features}
              isFeatured={plan.isFeatured}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const PricingItem = ({
  name,
  price,
  priceAnchor,
  description,
  features,
  isFeatured,
  monthly,
}: PricingItemProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const card = cardRef.current;
    card?.addEventListener("mousemove", handleMouseMove);

    return () => {
      card?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const formatPrice = (price: string | number) => {
    if (typeof price === "number") {
      return (price / 100).toFixed(2);
    }
    return price;
  };

  const formattedPrice = formatPrice(price);
  const formattedPriceAnchor = priceAnchor ? formatPrice(priceAnchor) : null;

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col p-6 bg-card text-card-foreground rounded-lg shadow-md border border-border transition-all hover:shadow-lg  ${
        isFeatured ? "ring-2 ring-primary" : ""
      }`}
    >
      {isFeatured && (
        <div className="uppercase px-2 py-1 rounded bg-primary absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold text-neutral-800">
          Popular
        </div>
      )}
      {/* <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                }}
            /> */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 120px 120px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      {/* El resto del contenido de la tarjeta permanece igual */}
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex items-end mb-6">
        <span className="text-4xl font-bold text-primary">
          {formattedPrice === "0.00" ? "Gratis" : `${formattedPrice}€`}
        </span>
        {formattedPrice !== "Gratis" && (
          <span className="text-lg text-muted-foreground ml-2">
            {monthly && "/mes"}
          </span>
        )}
      </div>
      {formattedPriceAnchor && (
        <div className="mb-4">
          <span className="text-lg text-muted-foreground line-through">
            {formattedPriceAnchor}€
          </span>
          <span className="ml-2 text-sm text-accent-foreground font-semibold">
            {Math.round(
              (1 - Number(formattedPrice) / Number(formattedPriceAnchor)) * 100
            )}
            % descuento
          </span>
        </div>
      )}
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-foreground">
            <svg
              className="w-5 h-5 text-primary mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {feature.name}
          </li>
        ))}
      </ul>

      <Button
        size="lg"
        variant={price === 0 ? "outline" : "default"}
        className={cn(
          "mt-auto text-sm font-semibold",
          price === 0
            ? "text-muted-foreground hover:text-foreground"
            : "text-neutral-800"
        )}
      >
        {price === 0 ? "Empezar gratis" : "Mejorar"}
      </Button>
    </div>
  );
};
