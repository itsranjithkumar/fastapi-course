import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        
        <div className="relative z-20 text-center space-y-8 px-6 max-w-5xl mx-auto">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Connect. Share.
            <br />
            Engage.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience a new way of social interaction with our innovative platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <Button
              asChild
              size="lg"
              className="text-lg h-14 px-8 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg h-14 px-8 rounded-full border-primary/20 hover:bg-primary/5 transition-colors"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Designed for the way you connect
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Beautiful, intuitive, and powerful features that make sharing your thoughts effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-2xl p-6 transition-shadow hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl" />
                <div className="relative space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    title: "Seamless Sharing",
    description: "Share your thoughts and ideas with just a few clicks. Our platform makes it effortless to connect.",
    icon: (
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Real-time Engagement",
    description: "Engage with your community in real-time through likes, comments, and meaningful discussions.",
    icon: (
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
  },
  {
    title: "Smart Analytics",
    description: "Understand your impact with detailed analytics and insights about your content performance.",
    icon: (
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
]