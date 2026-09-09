import { Link } from "wouter";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import {
  ChevronRight,
  Zap,
  Coins,
  Gamepad2,
  CheckCircle2,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  { value: "$5.2M+", label: "Total Paid Out" },
  { value: "150K+", label: "Active Users" },
  { value: "8+", label: "Earning Methods" },
  { value: "< 2 Hours", label: "Avg Withdrawal" },
];

const steps = [
  { num: "01", icon: Gamepad2, title: "Choose Your Task", desc: "Pick from games, surveys, videos, and offers that interest you. Each task shows how much you'll earn upfront." },
  { num: "02", icon: Zap, title: "Complete & Earn Instantly", desc: "Play, watch, or complete tasks. Your earnings are credited instantly to your Foxe Earn wallet." },
  { num: "03", icon: Coins, title: "Cash Out Anytime", desc: "Withdraw to your crypto wallet or bank account. Processed in minutes with zero fees." },
];

const partners = ["OfferToro", "CPX Research", "Lootably", "Adgate Media", "BitLabs"];

/* ─────────────── 3D tilt wrapper ─────────────── */
function Tilt({
  children,
  className = "",
  strength = 10,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [strength, -strength]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-strength, strength]), { stiffness: 180, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className={`scene-3d ${className}`}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
        className="layer-3d h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────── Floating 3D payout card ─────────────── */
function PayoutCard() {
  return (
    <Tilt strength={14} className="w-full max-w-sm">
      <div className="relative animate-float">
        <div className="absolute -inset-6 brand-gradient rounded-[2.5rem] blur-3xl opacity-40" aria-hidden />
        <div className="relative rounded-[2rem] glass-dark p-6 shadow-brand-lg layer-3d">
          <div className="flex items-center justify-between depth-1">
            <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-[0.18em]">
              <Wallet className="h-4 w-4" /> Balance
            </div>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white">
              USDT
            </span>
          </div>
          <div className="mt-5 depth-2">
            <div className="text-5xl font-black tracking-tighter text-white drop-shadow">$1,284.60</div>
            <div className="mt-2 flex items-center gap-1.5 text-sm font-bold text-white/85">
              <ArrowUpRight className="h-4 w-4" /> +$46.20 today
            </div>
          </div>
          <div className="mt-6 space-y-2.5 depth-1">
            {[
              { label: "CPX Research", amount: "+$12.40" },
              { label: "Lootably", amount: "+$21.80" },
              { label: "BitLabs", amount: "+$12.00" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-xl bg-white/10 px-3.5 py-2.5 text-sm text-white/90 ring-1 ring-white/10"
              >
                <span className="font-semibold">{row.label}</span>
                <span className="font-black">{row.amount}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 depth-3">
            <div className="rounded-xl bg-white px-4 py-3 text-center text-sm font-black text-primary shadow-lg">
              Withdrawal approved · 18 min
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ─────────── Navbar ─────────── */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <BrandLogo size="sm" />
          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#how-it-works" className="transition-colors hover:text-primary">How It Works</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-semibold text-foreground hover:text-primary">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="brand-gradient text-sm font-bold text-white shadow-brand transition-transform hover:-translate-y-0.5">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ─────────── Hero ─────────── */}
      <section className="hero-section relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="hero-background absolute inset-0" aria-hidden />
        <div className="hero-overlay absolute inset-0" aria-hidden />
        <div className="absolute inset-0 grid-overlay-light opacity-30" aria-hidden />
        <div className="pointer-events-none absolute -top-32 -right-24 h-[30rem] w-[30rem] rounded-full brand-gradient opacity-40 blur-[110px] animate-aurora" aria-hidden />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full bg-primary-glow/40 blur-[120px] animate-float-slow" aria-hidden />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-7 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-sm font-bold text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-glow" />
              $5.2M+ Paid Out to Real Users
            </div>

            <h1 className="text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-6xl md:text-7xl">
              Earn Real Money{" "}
              <span className="relative inline-block">
                <span className="brand-text">Fast & Easy</span>
                <span className="absolute -inset-x-2 bottom-1 -z-10 h-3 brand-gradient opacity-30 blur-md" aria-hidden />
              </span>
              <br />
              Right From Home
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/70 lg:mx-0 md:text-xl">
              Play games, complete surveys, watch videos and earn real cash. Join 150K+ users earning daily. No investment needed, no hidden fees, instant payouts.
            </p>

            <div className="flex flex-col items-center gap-4 pt-1 sm:flex-row lg:justify-start justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="group h-14 w-full border-0 brand-gradient px-10 text-lg font-black text-white shadow-brand-lg transition-transform hover:-translate-y-1 sm:w-auto"
                >
                  Start Earning Free
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 w-full glass-dark px-8 font-bold text-white hover:bg-white/20 sm:w-auto"
                >
                  I Have an Account
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 pt-1 text-sm text-white/70 lg:justify-start">
              {["Free to join", "No credit card", "Instant withdrawals"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary-glow" /> {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateY: 18 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <PayoutCard />
          </motion.div>
        </div>
      </section>

      {/* ─────────── Partners marquee ─────────── */}
      <section className="overflow-hidden border-y border-border bg-accent py-3.5">
        <div className="flex items-center gap-12 whitespace-nowrap px-4 animate-marquee">
          {[...partners, ...partners, ...partners].map((p, i) => (
            <span key={i} className="flex-shrink-0 text-xs font-black uppercase tracking-[0.2em] text-accent-foreground/70">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ─────────── Stats ─────────── */}
      <section className="border-b border-border bg-background px-4 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="text-3xl font-black brand-text md:text-4xl">{s.value}</div>
              <div className="mt-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────── How it works ─────────── */}
      <section id="how-it-works" className="relative bg-background px-4 py-24">
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="mb-14 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.24em] text-primary">Simple Process</span>
            <h2 className="mb-3 text-3xl font-black tracking-tight text-foreground md:text-5xl">How It Works</h2>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">Three simple steps to get crypto in your wallet.</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <Tilt strength={8} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-3xl glass-card p-8 transition-shadow duration-300 hover:shadow-brand">
                    <div className="pointer-events-none absolute right-5 top-3 select-none text-7xl font-black text-primary/10 transition-colors group-hover:text-primary/20">
                      {step.num}
                    </div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient shadow-brand depth-1">
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-foreground depth-1">{step.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Gallery Section ─────────── */}
      <section className="border-b border-border bg-background px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-16 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.24em] text-primary">Visual Features</span>
            <h2 className="mb-3 text-3xl font-black tracking-tight text-foreground md:text-5xl">See How It Works</h2>
            <p className="text-lg text-muted-foreground">Beautiful UI with smooth animations and powerful earning tools.</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { img: "/images/02_play_games_upscaled.png", title: "Play Games", desc: "Enjoy premium games and earn rewards" },
              { img: "/images/03_complete_surveys_upscaled.png", title: "Complete Surveys", desc: "Share opinions and get paid instantly" },
              { img: "/images/04_watch_and_earn_upscaled.png", title: "Watch Videos", desc: "Watch content and accumulate earnings" },
              { img: "/images/05_gift_cards_upscaled.png", title: "Gift Cards", desc: "Redeem for popular gift cards" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <Tilt strength={6} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:shadow-brand">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-white text-lg">{item.title}</h3>
                      <p className="text-sm text-white/80">{item.desc}</p>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="relative overflow-hidden px-4 py-24">
        <div className="hero-background absolute inset-0" aria-hidden />
        <div className="hero-overlay absolute inset-0" aria-hidden />
        <div className="absolute inset-0 grid-overlay-light opacity-30" aria-hidden />
        <div className="pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full brand-gradient opacity-40 blur-[120px] animate-aurora" aria-hidden />

        <Reveal className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
          <h2 className="text-4xl font-black tracking-tighter text-white md:text-6xl">
            Start Earning
            <br />
            Today — <span className="brand-text">It's Free</span>
          </h2>
          <p className="mx-auto max-w-xl text-xl text-white/70">
            Join 85,000+ users already earning USDT. No investment required.
          </p>
          <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
            <Link href="/register">
              <Button
                size="lg"
                className="h-14 w-full border-0 brand-gradient px-12 text-lg font-black text-white shadow-brand-lg transition-transform hover:-translate-y-1 sm:w-auto"
              >
                Create Free Account
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" className="h-14 w-full glass-dark px-10 font-bold text-white hover:bg-white/20 sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
          <p className="text-sm text-white/60">
            Minimum withdrawal: $1 USDT · BEP20, TRC20, Sham Cash, Syriatel Cash &amp; Coenex supported
          </p>
        </Reveal>
      </section>

      {/* ─────────── Footer ─────────── */}
      <footer className="border-t border-border bg-background px-4 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <BrandLogo size="sm" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Foxe Earn. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/register"><span className="cursor-pointer transition-colors hover:text-primary">Sign Up</span></Link>
            <Link href="/login"><span className="cursor-pointer transition-colors hover:text-primary">Login</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
