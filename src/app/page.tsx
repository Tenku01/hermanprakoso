"use client";

import { About } from "@/components/sections/about";
import { CtaBand } from "@/components/sections/cta-band";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <TechStack />
      <Experience />
      <CtaBand />
    </>
  );
}