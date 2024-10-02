export type TeamMember = {
    name: string
    title?: string
    company?: string
    avatarSrc: string
    links?: {
        [key: string]: {
            url: string
            label: string
        }
    }
}

export type Website = {
    name: string
    description: string
    image: string
    link: string
}

export type News = {
    title: string
    date: string
    content: string
}