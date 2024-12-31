import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MailIcon } from "lucide-react"
import { teamMembers, websites, newsList, teamIntro, partners } from "@/lib/data"
import { TeamMemberCard } from "@/components/team-member-card"

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-1 fixed w-full z-10">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/white-logo.png"
                alt="Fedora-V Force"
                width={150}
                height={40}
                className="h-16 w-auto"
                priority
              />
            </Link>
            <div className="space-x-4">
              <Link href="#websites" className="hover:underline">Websites</Link>
              {/* <Link href="#news" className="hover:underline">News</Link> */}
              <Link href="#team" className="hover:underline">Team</Link>
              <Link href="#contact" className="hover:underline">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative h-[50vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero2.jpg?height=1080&width=1920"
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Fedora-V Force</h2>
              <Button asChild size="lg" className="text-lg">
                <Link href="https://images.fedoravforce.com/">Download Fedora Images</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="team" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-md text-gray-700">
              <p className="font-serif">{teamIntro}</p>
            </div>
          </div>
        </section>

        <section id="websites" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Websites</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {websites.map((website) => (
                <Card key={website.name}>
                  <CardHeader className="p-0">
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={website.image}
                        alt={website.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardTitle className="mb-2">{website.name}</CardTitle>
                    <CardDescription className="mb-4">{website.description}</CardDescription>
                    <Button asChild>
                      <Link href={website.link}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Our Partners</h2>
            <div className="flex flex-wrap justify-center items-center gap-24 max-w-4xl mx-auto">
              {partners.map((partner) => (
                <div key={partner.name} className="flex-shrink-0 w-full sm:w-auto">
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-opacity hover:opacity-80 focus:opacity-80"
                    aria-label={`${partner.name} Website`}
                  >
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={240}
                      height={80}
                      className="max-w-full h-auto mx-auto"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* News Section */}
        {/* <section id="news" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {newsList.length > 0 ? (
                newsList.map((news, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{news.title}</CardTitle>
                      <CardDescription>{news.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{news.content}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground">No news.</p>
              )}
            </div>
          </div>
        </section> */}

        <section id="team" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Team Members</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {teamMembers.map(member => (
                <TeamMemberCard key={member.name} {...member} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <div className="flex items-center justify-center">
              <MailIcon className="mr-2" />
              <Image
                src="/email.png"
                alt="Email Address"
                width={200}
                height={30}
                className="inline-block"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Fedora-V Force. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}