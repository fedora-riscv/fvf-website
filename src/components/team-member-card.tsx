import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { TeamMember } from "@/lib/types"
import { Github, Linkedin, Building2 } from "lucide-react"
import Link from "next/link"

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
}

export function TeamMemberCard(member: TeamMember) {
  return (
    <Card className="w-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <CardContent className="flex flex-col items-center p-6">
        <Avatar className="w-20 h-20 mb-4 ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300">
          <AvatarImage src={member.avatarSrc} alt={member.name} />
          <AvatarFallback className="text-lg bg-primary/10 text-primary">
            {member.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-base font-semibold mb-1 text-center">{member.name}</h3>
        {member.company && (
          <div className="flex items-center text-xs text-muted-foreground mb-1">
            <Building2 className="w-3 h-3 mr-1" />
            <span>{member.company}</span>
          </div>
        )}
        {member.title && (
          <p className="text-xs text-muted-foreground mb-3 text-center">{member.title}</p>
        )}
        <div className="flex flex-col items-center gap-1.5">
          {member.links &&
            Object.entries(member.links).map(([key, link]) => {
              const Icon = iconMap[key] || Github
              return (
                <Link
                  key={key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
        </div>
      </CardContent>
    </Card>
  )
}
