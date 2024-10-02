import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { TeamMember } from "@/lib/types";
import { Github, Linkedin, Building2 } from "lucide-react"
import Link from "next/link"

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary flex items-center">
    <Icon className="w-5 h-5 mr-2" />
    <span>{label}</span>
  </Link>
);

export function TeamMemberCard(
  member: TeamMember
) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="flex flex-col items-center p-6">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={member.avatarSrc} alt={member.name} />
          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
        {member.company && <div className="flex items-center text-muted-foreground mb-1">
          <Building2 className="w-4 h-4 mr-1" />
          <span>{member.company}</span>
        </div>}
        {member.title && <p className="text-muted-foreground mb-2">{member.title}</p>}
        <div className="flex flex-col items-center space-y-2">
          {member.links?.github && <SocialLink href={member.links.github.url} icon={Github} label={member.links.github.label} />}
          {member.links?.linkedin && <SocialLink href={member.links.linkedin.url} icon={Linkedin} label={member.links.linkedin.label} />}
          {/* Add other links here */}
        </div>
      </CardContent>
    </Card>
  )
}