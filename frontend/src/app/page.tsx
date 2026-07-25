import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Architecture from "@/components/landing/Architecture";
import TechStack from "@/components/landing/TechStack";
import Demo from "@/components/landing/Demo";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Architecture />
      <TechStack />
      <Demo />
      <CTA />
      <Footer />
    </>
  );
}