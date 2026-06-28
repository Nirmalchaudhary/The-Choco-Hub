"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  defaultTransition,
  ease,
  fadeUp,
  scaleIn,
  slideLeft,
  staggerContainer,
  staggerFast,
} from "@/lib/motion";

const PHONE = "+919099143365";
const PHONE_DISPLAY = "+91 9099143365";
const WHATSAPP_NUMBER = "919099143365";
const EMAIL = "info.thechocohub@gmail.com";
const INSTAGRAM =
  "https://www.instagram.com/thechocohub_ahmedabad?igsh=MWx3bzc5c2YzeXRjMg==";
const INSTAGRAM_HANDLE = "@thechocohub_ahmedabad";

const contactChannels = [
  {
    href: `tel:${PHONE}`,
    label: "Call us",
    Icon: PhoneIcon,
  },
  {
    href: `mailto:${EMAIL}`,
    label: "Email us",
    Icon: MailIcon,
  },
  {
    href: INSTAGRAM,
    label: "Follow on Instagram",
    Icon: InstagramIcon,
    external: true,
  },
  {
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    label: "Chat on WhatsApp",
    Icon: WhatsAppIcon,
    external: true,
  },
] as const;

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function ContactIconLink({
  href,
  label,
  Icon,
  external = false,
  variant = "light",
}: {
  href: string;
  label: string;
  Icon: typeof PhoneIcon;
  external?: boolean;
  variant?: "light" | "dark";
}) {
  const lightStyles =
    "border-chocolate/15 bg-cream text-chocolate shadow-sm hover:border-gold/60 hover:bg-chocolate hover:text-cream hover:shadow-md";
  const darkStyles =
    "border-gold/25 bg-chocolate-light/40 text-cream shadow-sm hover:border-gold hover:bg-gold/20 hover:text-gold";

  return (
    <motion.a
      href={href}
      aria-label={label}
      title={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ${
        variant === "dark" ? darkStyles : lightStyles
      }`}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  );
}

function ContactIconRow({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {contactChannels.map((channel) => (
        <ContactIconLink
          key={channel.label}
          href={channel.href}
          label={channel.label}
          Icon={channel.Icon}
          external={"external" in channel ? channel.external : false}
          variant={variant}
        />
      ))}
    </div>
  );
}

const products = [
  {
    icon: "🌿",
    image: "/products/vegan-brownie.png",
    title: "Vegan Gluten Free Healthy Brownie",
    tags: ["Vegan", "Gluten Free", "No Sugar", "No Maida", "No Dairy"],
    description:
      "Indulge without the guilt. Dense, fudgy brownie squares sweetened naturally — no refined sugar, no maida, and completely dairy-free. Healthy, guilt-free chocolate bliss.",
  },
  {
    icon: "🍪",
    image: "/products/chocochip-brownie.png",
    title: "Chocochip Brownie",
    description:
      "Classic comfort in every bite. Moist, rich chocolate brownie loaded with melty chocochips — crisp edges, gooey centre, and pure chocolate happiness.",
  },
  {
    icon: "☕",
    image: "/products/irish-cream-coffee.png",
    title: "Irish Cream Coffee Fudge",
    description:
      "A grown-up treat with a luxurious twist. Silky fudge infused with smooth Irish cream and bold coffee notes — creamy, aromatic, and utterly irresistible.",
  },
  {
    icon: "🌹",
    image: "/products/rose-pistachio.png",
    title: "Rose Pistachio Fudge",
    description:
      "Floral elegance meets nutty crunch. Delicate rose essence swirled through velvety fudge, finished with crushed pistachios for a fragrant, exotic indulgence.",
  },
  {
    icon: "🥜",
    image: "/products/chocolate-walnut.png",
    title: "Chocolate Walnut Fudge",
    description:
      "Timeless and hearty. Deep, dark chocolate fudge studded with buttery walnut pieces — rich, nutty, and satisfyingly fudgy in every square.",
  },
];

type Product = (typeof products)[number];

function buildWhatsAppOrderUrl(productTitle: string) {
  const message = `Hi! I'd like to order: ${productTitle}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function OrderModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close order popup"
            className="absolute inset-0 bg-chocolate/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-chocolate/10 bg-background shadow-2xl shadow-chocolate/20"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease }}
          >
            <div className="border-b border-chocolate/10 bg-cream px-6 py-5">
              <div className="relative mx-auto mb-4 h-28 w-28 overflow-hidden rounded-xl shadow-md ring-1 ring-chocolate/10">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Place Your Order
              </p>
              <h3
                id="order-modal-title"
                className="mt-2 font-serif text-xl font-semibold text-chocolate"
              >
                {product.title}
              </h3>
            </div>

            <div className="px-6 py-6">
              <p className="text-center text-sm leading-relaxed text-chocolate/70">
                Order fresh from The Choco Hub — send us a message on WhatsApp
                and we&apos;ll confirm your order.
              </p>

              <motion.a
                href={buildWhatsAppOrderUrl(product.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-chocolate px-6 py-3.5 text-sm font-medium text-cream"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Order via WhatsApp
              </motion.a>

              <p className="mt-4 text-center text-sm text-chocolate/50">
                {PHONE_DISPLAY}
              </p>
            </div>

            <div className="border-t border-chocolate/10 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full border border-chocolate/15 py-2.5 text-sm font-medium text-chocolate transition hover:bg-cream"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const usps = [
  {
    icon: "♥",
    title: "Homemade with Love",
    description: "Every batch is crafted by hand with care, just for you.",
  },
  {
    icon: "🍫",
    title: "Rich, Gooey & Delicious",
    description: "Premium ingredients for that perfect fudgy, chocolatey bite.",
  },
  {
    icon: "🎁",
    title: "Perfect for Every Occasion",
    description: "Birthdays, celebrations, gifting — we’ve got you covered.",
  },
];

const marqueeItems = [
  "Homemade with Love",
  "Premium Ingredients",
  "Fudgee & Brownies",
  "Made in Ahmedabad",
  "Rich & Gooey",
  "Order Fresh",
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function RevealOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ChocolateDrip() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 chocolate-drip md:h-20" />
  );
}

function BrandLogo({
  size = 44,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/logo.png"
      alt="The Choco Hub"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  );
}

function AnimatedHeader({ scrolled }: { scrolled: boolean }) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-chocolate/10 bg-background/90 py-3 shadow-sm backdrop-blur-xl"
          : "bg-background/60 py-4 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 md:gap-3"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <BrandLogo
            size={44}
            className="h-10 w-10 shadow-sm ring-1 ring-chocolate/10 md:h-11 md:w-11"
          />
          <span className="font-serif text-xl font-bold text-chocolate md:text-2xl">
            The Choco Hub
          </span>
        </motion.a>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {["About", "Products", "Contact"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.toLowerCase());
              }}
              className="relative text-chocolate/70 transition hover:text-chocolate"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease }}
              whileHover={{ y: -2 }}
            >
              {item}
              <motion.span
                className="absolute -bottom-1 left-0 h-px w-full origin-left bg-gold"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>
        <motion.a
          href={`tel:${PHONE}`}
          className="relative overflow-hidden rounded-full bg-chocolate px-5 py-2 text-sm font-medium text-cream"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 30px rgba(61,35,20,0.35)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.span
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
          />
          <span className="relative">Order Now</span>
        </motion.a>
      </div>
    </motion.header>
  );
}

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-chocolate/8 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-chocolate/10 bg-chocolate py-4">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map(
          (item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-8 flex items-center gap-8 text-sm font-medium uppercase tracking-[0.25em] text-cream/90"
            >
              {item}
              <span className="text-heart">♥</span>
            </span>
          ),
        )}
      </motion.div>
    </div>
  );
}

function RibbonIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10"
      aria-hidden="true"
    >
      <path
        d="M8 14C8 14 12 8 18 8C22 8 24 12 24 16C24 12 26 8 30 8C36 8 40 14 40 14L24 28L8 14Z"
        fill="#d9a066"
        stroke="#3d2314"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 28V40M18 32L24 40L30 32"
        stroke="#3d2314"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 pt-24 pb-12 md:flex md:min-h-screen md:items-center md:pt-28 md:pb-16"
    >
      <ChocolateDrip />
      <FloatingOrbs />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-7xl items-center gap-6 md:grid-cols-[1fr_1.15fr] md:gap-12 lg:gap-16"
      >
        <motion.div
          className="order-2 md:order-1"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            transition={defaultTransition}
            className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-chocolate/80"
          >
            <span className="text-heart">♥</span>
            Homemade with Love, Made for You
            <span className="text-heart">♥</span>
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={defaultTransition}
            className="font-serif text-5xl font-bold leading-tight text-chocolate md:text-6xl"
          >
            The Choco Hub
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="font-script mt-2 text-4xl text-chocolate md:text-5xl"
          >
            Fudgee, Brownie & Desserts
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.35 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-chocolate/70"
          >
            Rich, gooey, and made with premium ingredients — every bite feels
            like a warm hug from home. Freshly baked in Ahmedabad, just for you.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-chocolate px-8 py-3.5 font-medium text-cream"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 40px rgba(61,35,20,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Order on WhatsApp
            </motion.a>
            <motion.a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("products");
              }}
              className="rounded-full border border-chocolate/20 px-8 py-3.5 font-medium text-chocolate"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(61,35,20,0.5)",
                backgroundColor: "rgba(245,239,230,0.8)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              View Menu
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.65 }}
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-dashed border-gold/50 bg-cream/80 px-5 py-3"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-sm text-heart">
              ♥
            </span>
            <span className="text-sm font-medium uppercase tracking-wide text-chocolate">
              Made with Premium Ingredients
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 md:order-2 relative flex w-full items-center justify-center p-1 sm:p-2 md:p-4"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.1 }}
        >
          <motion.div
            className="absolute h-[90%] w-[90%] rounded-full bg-gold/10 blur-3xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative w-full border-2 border-chocolate p-3 sm:p-4 md:p-5"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -left-3 -top-3 z-10 rounded-full bg-background p-1 shadow-sm">
              <RibbonIcon />
            </div>
            <Image
              src="/hero-desserts.png"
              alt="Assortment of fudgee, brownies and desserts on glass plates"
              width={1024}
              height={512}
              priority
              className="relative h-auto w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);

  const closeOrderModal = () => setOrderProduct(null);

  return (
    <section id="products" className="bg-cream px-6 py-28">
      <OrderModal product={orderProduct} onClose={closeOrderModal} />
      <div className="mx-auto max-w-6xl" ref={ref}>
        <RevealOnScroll className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Our Specialties
          </p>
          <h2 className="mt-3 font-script text-5xl text-chocolate md:text-6xl">
            Our Menu
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-chocolate/70">
            Five signature fudges and brownies, handmade fresh with premium
            ingredients.
          </p>
        </RevealOnScroll>

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerFast}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {products.map((item) => (
            <motion.article
              key={item.title}
              variants={scaleIn}
              transition={defaultTransition}
              whileHover={{
                y: -12,
                boxShadow: "0 25px 50px rgba(61,35,20,0.12)",
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-background p-6 shadow-sm"
            >
              <div className="relative mx-auto w-full max-w-[220px]">
                <div className="relative h-36 overflow-hidden rounded-xl bg-cream ring-1 ring-chocolate/10">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="220px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <motion.span
                  className="absolute -left-2 -top-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-background text-3xl shadow-sm"
                  aria-hidden="true"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.span>
              </div>
              <div className="mt-4 flex flex-1 flex-col">
                <h3 className="font-serif text-xl font-semibold text-chocolate">
                  {item.title}
                </h3>
              {item.tags && item.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-gold/30 bg-cream px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-chocolate/75"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-3 flex-1 leading-relaxed text-chocolate/70">
                {item.description}
              </p>
              <div className="mt-5 border-t border-chocolate/10 pt-5">
                <motion.button
                  type="button"
                  onClick={() => setOrderProduct(item)}
                  className="w-full rounded-full bg-chocolate px-5 py-2.5 text-sm font-medium text-cream"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Order
                </motion.button>
              </div>
              <motion.div
                className="mt-4 h-px w-0 bg-gold group-hover:w-full"
                transition={{ duration: 0.5 }}
              />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="px-6 py-28">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2"
      >
        <motion.div
          variants={slideLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ ...defaultTransition, duration: 0.9 }}
          className="relative overflow-hidden rounded-2xl shadow-xl shadow-chocolate/10"
        >
          <Image
            src="/why-choose-us.png"
            alt="The Choco Hub — homemade fudgee, brownies and desserts made with premium ingredients"
            width={840}
            height={1024}
            className="h-auto w-full object-cover"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUp}
            transition={defaultTransition}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-gold"
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={defaultTransition}
            className="mt-3 font-serif text-4xl font-bold text-chocolate md:text-5xl"
          >
            Homemade with Love
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={defaultTransition}
            className="mt-6 leading-relaxed text-chocolate/70"
          >
            The Choco Hub is a small home bakery in Ahmedabad, dedicated to
            creating rich, gooey fudgee, brownies, and desserts that taste as
            good as they look.
          </motion.p>
          <motion.p
            variants={fadeUp}
            transition={defaultTransition}
            className="mt-4 leading-relaxed text-chocolate/70"
          >
            We use only premium ingredients — no shortcuts, no compromises.
            Whether it&apos;s a birthday, a gift, or a personal treat, every
            order is made fresh with love.
          </motion.p>

          <motion.div
            variants={staggerFast}
            className="mt-10 grid gap-6 sm:grid-cols-1"
          >
            {usps.map((usp) => (
              <motion.div
                key={usp.title}
                variants={fadeUp}
                transition={defaultTransition}
                className="flex items-start gap-4 rounded-xl border border-chocolate/10 bg-cream/50 p-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-background text-xl">
                  {usp.icon}
                </span>
                <div>
                  <h3 className="font-serif font-semibold text-chocolate">
                    {usp.title}
                  </h3>
                  <p className="mt-1 text-sm text-chocolate/65">
                    {usp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      id="contact"
      className="border-y border-chocolate/10 bg-background px-6 py-10 md:py-12"
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 md:flex-row md:gap-10"
      >
        <motion.div
          variants={fadeUp}
          transition={defaultTransition}
          className="text-center md:text-left"
        >
          <h2 className="font-serif text-2xl font-bold text-chocolate md:text-3xl">
            Ready to Order?
          </h2>
          <p className="mt-1 text-sm text-chocolate/60">
            Fresh fudgee, brownies & desserts · Ahmedabad
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={defaultTransition}
          className="flex items-center justify-center md:justify-end"
        >
          <ContactIconRow />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const footerLinks = [
    { label: "About", id: "about" },
    { label: "Products", id: "products" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-chocolate text-cream"
    >
      <div className="absolute inset-0 bg-linear-to-br from-chocolate via-chocolate-light/30 to-chocolate" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-gold blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-heart blur-3xl" />
      </div>

      <div className="relative h-px w-full bg-linear-to-r from-transparent via-gold/60 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={fadeUp} transition={defaultTransition}>
            <BrandLogo
              size={80}
              className="h-20 w-20 shadow-md ring-2 ring-gold/30"
            />
            <p className="font-script mt-3 text-2xl text-gold">
              Fudgee, Brownie & Desserts
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/65">
              Homemade with love, made for you. Premium ingredients, rich
              flavours, and treats baked fresh in Ahmedabad.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} transition={defaultTransition}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.id);
                    }}
                    className="group inline-flex items-center gap-2 text-sm text-cream/75 transition hover:text-cream"
                  >
                    <span className="h-px w-0 bg-gold transition-all group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} transition={defaultTransition}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Contact
            </p>
            <ContactIconRow variant="dark" className="mt-5" />
            <ul className="mt-5 space-y-3 text-sm text-cream/75">
              <li>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center gap-2 transition hover:text-gold"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-gold/80" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 transition hover:text-gold"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-gold/80" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-gold"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0 text-gold/80" />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold" aria-hidden="true">
                  ◆
                </span>
                Ahmedabad, Gujarat
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} transition={defaultTransition}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Order Now
            </p>
            <p className="mt-5 text-sm leading-relaxed text-cream/65">
              Ready for something sweet? Place your order on WhatsApp.
            </p>
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-2.5 text-sm font-medium text-cream transition hover:border-gold hover:bg-gold/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ ...defaultTransition, delay: 0.3 }}
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 md:flex-row"
        >
          <p className="text-xs tracking-wide text-cream/45">
            © {new Date().getFullYear()} The Choco Hub. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-xs tracking-[0.2em] text-cream/50 uppercase">
            <span className="text-heart">♥</span>
            Made with Premium Ingredients
            <span className="text-heart">♥</span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default function LandingPage() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <AnimatedHeader scrolled={scrolled} />
      <HeroSection />
      <Marquee />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
