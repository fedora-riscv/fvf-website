import type { Messages } from "./i18n"

export type TeamMember = {
    name: string
    role?: keyof Messages["team"]["roles"]
    company?: keyof Messages["team"]["companies"]
    avatarSrc: string
    links?: {
        [key: string]: {
            url: string
            label: string
        }
    }
}

export type Website = {
    id: keyof Messages["websites"]["items"]
    image: string
    link: string
}

export type Sponsor = {
    name: string
    logo: string
    link: string
}

export type Partner = {
    name: string
    logo: string
    link: string
}

export type News = {
    title: string
    date: string
    content: string
}

export type ReleaseStats = {
    tag: string
    rawhide: boolean
    updated: string
    total: number
    built: number
    todo: number
    port: number
    hold: number
}
