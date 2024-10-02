import { TeamMember, Website, News } from "./types";

export const teamMembers: TeamMember[] = [
    {
        name: "Wei Fu",
        title: "Principal Software Engineer",
        company: "Red Hat",
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
        name: "U2FsdGVkX1",
        company: "PLCT Lab",
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
        avatarSrc: "/avatars/guoguo.ico",
        company: "PLCT Lab",
        links: {
            github: {
                url: "https://github.com/imguoguo",
                label: "@imguoguo",
            },
        }
    },
    {
        name: "Placeholder",
        avatarSrc: "/avatar-placeholder.png?height=150&width=150",
    },
    {
        name: "Ahei",
        avatarSrc: "/avatars/ahei.jpg",
        links: {
            github: {
                url: "https://github.com/aahei/",
                label: "@aahei",
            },
        }
    },
    {
        name: "catme0w",
        avatarSrc: "/avatars/catme0w.jpg",
        company: "PLCT Lab",
        links: {
            github: {
                url: "https://github.com/CatMe0w",
                label: "@CatMe0w",
            },
        }
    },
    {
        name: "Tianyi Wei",
        avatarSrc: "/avatars/weitianyi.jpg",
        company: "USYD",
        links: {
            linkedin: {
                url: "https://www.linkedin.com/in/tianyi-wei-02132b304/",
                label: "LinkedIn",
            },
        }
    },
]

export const websites: Website[] = [
    {
        name: "images.fedoravforce.com",
        description: "Download Fedora images for your RISC-V hardware.",
        image: "/images-website-screenshot.png?height=300&width=400",
        link: "https://images.fedoravforce.com/"
    },
    {
        name: "Fedora RISC-V Packaging Stats",
        description: "Our progress on Fedora RISC-V packaging.",
        image: "/stats-website-screenshot.png?height=300&width=400",
        link: "https://openkoji.iscas.ac.cn/pub/stats/"
    },
    {
        name: "Our Blog",
        description: "Documentation related to Fedora RISC-V.",
        image: "/blog-website-screenshot.png?height=300&width=400",
        link: "https://blog.fedoravforce.com/zh/"
    },
    {
        name: "Upstream Status",
        description: "Fedora on RISC-V Upstream Status",
        image: "/upstream-screenshot.png?height=300&width=400",
        link: "https://upstream.fedoravforce.com/"
    }
]

export const newsList: News[] = [
    // {
    //   title: "Fedora",
    //   date: "Sep 20, 2024",
    //   content: "Fedora FedoraFedora FedoraFedoraFedoraFedora FedoraFedoraFedora.",
    // },
  ]

export const teamIntro = "The Fedora-V Force (FVF, 多啦V盟) is a technical team focused on porting and building the Linux kernel and Fedora distribution based on the RISC-V architecture, as well as firmware development. The team is dedicated to creating a more perfect Fedora distribution and promoting the Linux open-source software ecosystem on RISC-V. Members of the team come from the Fedora community and RISC-V open-source enthusiasts. They have years of technical expertise in firmware, U-Boot, the Linux kernel, Fedora, and other foundational software domains. They are also highly engaged in the RISC-V open architecture and its open-source ecosystem. Under the guidance of RISC-V ambassador Wei Fu, the team maintains the largest Fedora on RISC-V compilation system in China, independently compiling multiple versions from Fedora 36 to rawhide, and adapting all mainstream RISC-V development boards on the market, significantly advancing the process of making RISC-V a major architecture for Fedora. Additionally, the team actively participates in upstreaming open source code, practicing Fedora's \"upstream first\" policy."