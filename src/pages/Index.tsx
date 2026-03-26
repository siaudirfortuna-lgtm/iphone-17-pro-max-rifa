import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gift, ChevronRight, Shield, Clock, Smartphone, MapPin, Users, Timer, Volume2, VolumeX, CreditCard } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

const RAFFLE_URL = "https://123rifas.com/acao/iphone-17-pro-max-23";
const DRAW_DATE = new Date("2025-08-15T20:00:00-03:00");

const FAKE_NAMES = [
  "Maria S.", "João P.", "Ana L.", "Carlos M.", "Fernanda R.",
  "Lucas G.", "Bruna T.", "Pedro H.", "Juliana F.", "Rafael A.",
  "Camila O.", "Diego N.", "Patrícia B.", "Thiago C.", "Aline D.",
  "Roberto V.", "Larissa K.", "Marcos E.", "Vanessa W.", "Felipe J.",
];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  return timeLeft;
}

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const Index = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const [showNotif, setShowNotif] = useState(false);
  const [viewerCount] = useState(() => Math.floor(Math.random() * 30) + 45);
  const [isMuted, setIsMuted] = useState(false);
  const countdown = useCountdown(DRAW_DATE);
  const creativeRef = useRef<HTMLVideoElement>(null);

  const toggleMute = useCallback(() => {
    if (creativeRef.current) {
      creativeRef.current.muted = !creativeRef.current.muted;
      setIsMuted(creativeRef.current.muted);
    }
  }, []);

  useEffect(() => {
    if (creativeRef.current) {
      creativeRef.current.muted = false;
      creativeRef.current.play().catch(() => {
        // Browser blocked unmuted autoplay — fallback to muted
        if (creativeRef.current) {
          creativeRef.current.muted = true;
          setIsMuted(true);
          creativeRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  useEffect(() => {
    const showNext = () => {
      const name = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
      const qty = Math.floor(Math.random() * 10) + 1;
      setNotification(`${name} acabou de comprar ${qty} cota${qty > 1 ? "s" : ""}!`);
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3500);
    };
    showNext();
    const interval = setInterval(showNext, Math.random() * 4000 + 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ═══ HERO BANNER — background video with gradient ═══ */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/bg.mp4" type="video/mp4" />
        </video>

        {/* Gradient fade to black at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background" />

        {/* Hero content over banner */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 bg-primary/15 border border-primary/40 rounded-full px-4 py-1.5 mb-4"
          >
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-semibold tracking-wide">RIFA EXCLUSIVA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight mb-2"
          >
            iPhone 17{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Pro Max
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-1.5 text-foreground/70 mb-3"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">Exclusivo para Barcarena - PA</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-foreground/60 text-base md:text-lg max-w-md mb-5"
          >
            Garanta já o seu número da sorte e concorra ao smartphone mais desejado do mundo!
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-1 text-primary mr-1">
              <Timer className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Sorteio em</span>
            </div>
            <CountdownUnit value={countdown.days} label="dias" />
            <span className="text-primary font-bold text-lg">:</span>
            <CountdownUnit value={countdown.hours} label="hrs" />
            <span className="text-primary font-bold text-lg">:</span>
            <CountdownUnit value={countdown.minutes} label="min" />
            <span className="text-primary font-bold text-lg">:</span>
            <CountdownUnit value={countdown.seconds} label="seg" />
          </motion.div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="relative z-10 flex flex-col items-center px-4 -mt-16 sm:-mt-24">
        {/* Creative video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative w-full max-w-sm mb-8 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.3)] z-20"
        >
          <video
            ref={creativeRef}
            autoPlay
            playsInline
            preload="auto"
            className="w-full aspect-[9/16] object-cover"
          >
            <source src="/video/criativo.mp4" type="video/mp4" />
          </video>

          {/* Mute/unmute toggle */}
          <button
            onClick={toggleMute}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-background/60 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background/80 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mb-8"
        >
          <a href={RAFFLE_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg" className="text-base md:text-lg px-10 py-7 rounded-xl shadow-lg">
              Participar Agora
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6"
        >
          <TrustItem icon={<Shield className="w-5 h-5" />} label="100% Seguro" />
          <TrustItem icon={<CreditCard className="w-5 h-5" />} label="Pix Aprovado na Hora" />
          <TrustItem icon={<Smartphone className="w-5 h-5" />} label="Produto Original" />
        </motion.div>

        {/* How it works mini-section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="w-full max-w-sm bg-card/60 border border-border/50 rounded-2xl p-4 mb-8 backdrop-blur-md shadow-sm"
        >
          <h3 className="text-center text-xs font-bold text-foreground/80 mb-3 uppercase tracking-wider">Como Funciona</h3>
          <div className="flex justify-between items-start gap-1">
            <StepItem number="1" text="Escolha a cota" />
            <div className="flex-1 h-[1px] bg-border mt-4 opacity-50 mx-1" />
            <StepItem number="2" text="Pague via Pix" />
            <div className="flex-1 h-[1px] bg-border mt-4 opacity-50 mx-1" />
            <StepItem number="3" text="Aguarde o sorteio" />
          </div>
        </motion.div>

        {/* Price */}
        <p className="text-muted-foreground text-sm text-center pb-10">
          Números a partir de <span className="text-primary font-bold">R$ 0,80</span> • Quanto mais números, mais chances!
        </p>
      </section>

      {/* ═══ FLOATING UI ═══ */}
      {/* Live viewer count */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-card/90 border border-border backdrop-blur-md rounded-full px-3 py-1.5">
        <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
        <Users className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs text-foreground font-medium">{viewerCount} online</span>
      </div>

      {/* Purchase notification */}
      <AnimatePresence>
        {showNotif && notification && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 left-4 z-50 flex items-center gap-3 bg-card/95 border border-primary/30 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg max-w-xs"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Gift className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-foreground">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-card/80 border border-primary/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[48px]">
    <span className="text-lg font-black text-foreground tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
  </div>
);

const TrustItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2 text-muted-foreground">
    <span className="text-primary">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const StepItem = ({ number, text }: { number: string; text: string }) => (
  <div className="flex flex-col items-center gap-2 w-20">
    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm border border-primary/20">
      {number}
    </div>
    <span className="text-[11px] text-muted-foreground text-center leading-tight font-medium">
      {text}
    </span>
  </div>
);

export default Index;
