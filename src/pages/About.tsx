
import { useState, useEffect } from "react";
import { Users, Heart, Sparkles, Award } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

const About = () => {
  const [activeTab, setActiveTab] = useState("story");
  const [imageLoaded, setImageLoaded] = useState(false);

  // Values and mission statements
  const coreValues = [
    {
      icon: Heart,
      title: "Customer First",
      description: "We prioritize our customers' needs in everything we do, ensuring exceptional experiences."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We constantly seek new ways to improve our products and services."
    },
    {
      icon: Award,
      title: "Quality",
      description: "We're committed to providing only the highest quality products to our customers."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in building strong relationships with our customers and partners."
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      bio: "Sarah founded Cartopolis with a vision to create a seamless shopping experience for everyone."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      bio: "Michael leads our technology team, ensuring our platform is fast, secure, and intuitive."
    },
    {
      name: "Priya Patel",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      bio: "Priya oversees all aspects of product design, from aesthetics to user experience."
    },
    {
      name: "James Wilson",
      role: "Head of Customer Relations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      bio: "James ensures that our customers always receive the best possible service and support."
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Cartopolis</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to revolutionize online shopping with quality products and exceptional service.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["story", "mission", "team"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                activeTab === tab
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary hover:bg-secondary/80"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mb-16">
          {/* Our Story */}
          {activeTab === "story" && (
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-100">
                <div
                  className={cn(
                    "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")' }}
                />
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Our team working together"
                  className="hidden"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Cartopolis was founded in 2018 with a simple but powerful idea: to create an online shopping experience that truly puts the customer first. Our founder, Sarah Johnson, had grown frustrated with the impersonal nature of online shopping and was determined to build something better.
                  </p>
                  <p>
                    What started as a small operation with just five employees has now grown into a thriving marketplace with over 200 team members across three continents. Despite our growth, we've stayed true to our founding principles: exceptional quality, transparent business practices, and genuine care for our customers.
                  </p>
                  <p>
                    Today, we serve millions of customers worldwide and partner with hundreds of premium brands to offer a curated selection of the best products available. We're proud of how far we've come, but even more excited about where we're going.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Our Mission */}
          {activeTab === "mission" && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-xl mb-8">
                  To provide a seamless, enjoyable shopping experience with high-quality products that enhance our customers' lives.
                </p>
                <h3 className="text-2xl font-semibold mb-2">Our Values</h3>
                <p className="text-muted-foreground">
                  These core principles guide everything we do at Cartopolis.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border"
                  >
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-secondary p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-center">Our Commitment to Sustainability</h3>
                <p className="text-muted-foreground max-w-3xl mx-auto text-center">
                  We're committed to reducing our environmental impact. From eco-friendly packaging to carbon-neutral shipping options, we're constantly seeking ways to make our operations more sustainable. We believe that great commerce and environmental responsibility can go hand in hand.
                </p>
              </div>
            </div>
          )}

          {/* Our Team */}
          {activeTab === "team" && (
            <div className="space-y-10">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Our Team</h2>
                <p className="text-muted-foreground">
                  Meet the passionate people behind Cartopolis. Our diverse team brings together expertise from retail, technology, design, and customer service to create an exceptional shopping experience.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-border group"
                  >
                    <div className="mb-4 overflow-hidden rounded-full w-24 h-24 mx-auto relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
                    <p className="text-primary text-sm text-center mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-center">{member.bio}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">Join Our Team</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  We're always looking for talented, passionate people to join our growing team. If you're excited about creating exceptional shopping experiences, we'd love to hear from you.
                </p>
                <a
                  href="/careers"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  View Open Positions
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
