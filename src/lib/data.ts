// Language-independent data. Every visible string lives in src/locales/<lang>.json.
import { TeamMember, Website, News, Partner, Sponsor } from "./types";

export const teamMembers: TeamMember[] = [
    {
        name: "Wei Fu",
        role: "principalEngineer",
        company: "redhat",
        avatarSrc: "/avatars/fuwei.jpg",
        links: {
            github: {
                url: "https://github.com/tekkamanninja/",
                label: "@tekkamanninja",
            },
            linkedin: {
                url: "https://www.linkedin.com/in/wei-fu-tekkamanninja/",
                label: "LinkedIn",
            },
        }
    },
    {
        name: "Yang Liu",
        role: "enthusiast",
        avatarSrc: "/avatars/liuyang.png",
        links: {
            github: {
                url: "https://github.com/liuyangxy/",
                label: "@liuyangxy",
            },
            linkedin: {
                url: "https://www.linkedin.com/in/%E6%B4%8B-%E5%88%98-7a897b36",
                label: "LinkedIn"
            },
        }
    },
    {
        name: "U2FsdGVkX1",
        role: "packager",
        avatarSrc: "/avatars/U2FsdGVkX1.jpg",
        links: {
            github: {
                url: "https://github.com/U2FsdGVkX1",
                label: "@U2FsdGVkX1",
            },
        }
    },
    {
        name: "Guoguo",
        role: "packager",
        avatarSrc: "/avatars/guoguo.ico",
        links: {
            github: {
                url: "https://github.com/imguoguo",
                label: "@imguoguo",
            },
        }
    },
    {
        name: "Milkice",
        avatarSrc: "/avatars/milkice233.jpg",
        links: {
            github: {
                url: "https://github.com/milkice233",
                label: "@milkice233",
            },
        }
    },
]

export const websites: Website[] = [
    {
        id: "images",
        image: "/images-website-screenshot.webp?height=300&width=400",
        link: "https://images.fedoravforce.org/"
    },
    {
        id: "stats",
        image: "/stats-website-screenshot.webp?height=300&width=400",
        link: "https://openkoji.iscas.ac.cn/pub/stats/"
    },
    {
        id: "blog",
        image: "/blog-website-screenshot.webp?height=300&width=400",
        link: "https://blog.fedoravforce.com"
    },
    {
        id: "upstream",
        image: "/upstream-screenshot.webp?height=300&width=400",
        link: "https://upstream.fedoravforce.org/"
    }
]

export const sponsors: Sponsor[][] = [
    [{
        name: "PLCT Lab",
        logo: "/sponsor-logo/PLCT.svg",
        link: "https://plctlab.org/"
    }]
]

// Partners are tiered: each inner array is one row, and rows get smaller down the page.
export const partners: Partner[][] = [
    [
        {
            name: "超睿科技",
            logo: "/partner-logo/ultrarisc.png",
            link: "https://www.ultrarisc.com/"
        },
        {
            name: "九望",
            logo: "/partner-logo/vsai.svg",
            link: "https://vsit.ai"
        },
        {
            name: "HOX",
            logo: "/partner-logo/hox.svg",
            link: "https://hox.org.cn"
        },
    ],
    [
        {
            name: "甲辰计划",
            logo: "/partner-logo/rv2036.png",
            link: "https://rv2036.org/"
        },
        {
            name: "进迭时空",
            logo: "/partner-logo/spacemit.jpg",
            link: "https://www.spacemit.com"
        },
        {
            name: "苦芽科技",
            logo: "/partner-logo/kubuds.png",
            link: "https://kubuds.io/"
        },
        {
            name: "Sipeed",
            logo: "/partner-logo/sipeed.png",
            link: "https://sipeed.com/"
        },
    ],
    [
        {
            name: "milkV",
            logo: "/partner-logo/milkv.png",
            link: "https://milkv.io/"
        },
        {
            name: "Radxa",
            logo: "/partner-logo/radxa.png",
            link: "https://radxa.com/"
        }
    ],
]

export const newsList: News[] = [
    // {
    //   title: "Fedora",
    //   date: "Sep 20, 2024",
    //   content: "Fedora FedoraFedora FedoraFedoraFedoraFedoraFedora FedoraFedoraFedora.",
    // },
]
