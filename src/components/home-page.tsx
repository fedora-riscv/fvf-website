"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { MailIcon, ArrowRight, ExternalLink, ChevronDown, Github } from "lucide-react"
import { teamMembers, websites, partners, teamIntro } from "@/lib/data"
import { TeamMemberCard } from "@/components/team-member-card"
import { FadeInSection, StaggerChildren, StaggerItem } from "@/components/section-animate"
import { MobileNav } from "@/components/mobile-nav"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#websites", label: "Websites" },
  { href: "#partners", label: "Partners" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
]

function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/hero2.jpg"
          alt="Hero Background"
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </motion.div>

      <motion.div
        className="container mx-auto px-6 relative z-10 text-white"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Fedora-V Force
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Building the future of Fedora on RISC-V architecture
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              <Link href="https://images.fedoravforce.org/">
                Download Images
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full backdrop-blur-sm transition-all"
            >
              <Link href="https://github.com/fedora-riscv">
                <Github className="mr-2 w-5 h-5" />
                GitHub
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-white/50" />
      </motion.div>
    </section>
  )
}

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed w-full z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-[#ffffff10]">
        <div className="container mx-auto px-6">
          <nav className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/white-logo.png"
                alt="Fedora-V Force"
                width={160}
                height={44}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#ffffffb3] hover:text-[#ffffff] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <MobileNav />
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <HeroSection />

        {/* About / Team Intro */}
        <section id="about" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <FadeInSection>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">About Us</h2>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  {teamIntro}
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Websites */}
        <section id="websites" className="py-24 bg-muted/50">
          <div className="container mx-auto px-6">
            <FadeInSection>
              <div className="text-center mb-16">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Resources</h2>
                <p className="text-3xl md:text-4xl font-bold">Our Websites</p>
              </div>
            </FadeInSection>

            <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {websites.map((website) => (
                <StaggerItem key={website.name}>
                  <Link href={website.link} target="_blank" rel="noopener noreferrer" className="group block h-full">
                    <Card className="h-full overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      <div className="h-44 overflow-hidden bg-muted">
                        <Image
                          src={website.image}
                          alt={website.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="pt-5 pb-6">
                        <CardTitle className="text-base mb-2 flex items-center gap-2">
                          {website.name}
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardTitle>
                        <CardDescription className="text-sm">{website.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Partners */}
        <section id="partners" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <FadeInSection>
              <div className="text-center mb-16">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Ecosystem</h2>
                <p className="text-3xl md:text-4xl font-bold">Our Partners</p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="flex flex-col gap-12 max-w-4xl mx-auto">
                {partners.map((partnerList, index) => (
                  <div key={index} className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
                    {partnerList.map((partner) => (
                      <a
                        key={partner.name}
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-shrink-0"
                        aria-label={`${partner.name} Website`}
                      >
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={160}
                          height={56}
                          className="max-w-full h-auto mx-auto opacity-80 hover:opacity-100 transition-all duration-300"
                        />
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Team Members */}
        <section id="team" className="py-24 bg-muted/50">
          <div className="container mx-auto px-6">
            <FadeInSection>
              <div className="text-center mb-16">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">People</h2>
                <p className="text-3xl md:text-4xl font-bold">Team Members</p>
              </div>
            </FadeInSection>

            <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {teamMembers.map((member) => (
                <StaggerItem key={member.name}>
                  <TeamMemberCard {...member} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
            <FadeInSection>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Get in Touch</h2>
              <p className="text-3xl md:text-4xl font-bold mb-8">Contact Us</p>
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <MailIcon className="w-5 h-5" />
                <Image
                  src="/email.png"
                  alt="Email Address"
                  width={200}
                  height={30}
                  className="inline-block"
                />
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-[#ffffff99] py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm mb-6">
            <Image
              src="/white-logo.png"
              alt="Fedora-V Force"
              width={120}
              height={34}
              className="h-10 w-auto opacity-60"
            />
            <Link href="https://github.com/fedora-riscv" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffffff] transition-colors">
              GitHub
            </Link>
            <Link href="https://blog.fedoravforce.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffffff] transition-colors">
              Blog
            </Link>
            <Link href="https://images.fedoravforce.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffffff] transition-colors">
              Downloads
            </Link>
          </div>
          <p className="text-sm">&copy; 2026 Fedora-V Force. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
