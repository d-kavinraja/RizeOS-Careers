"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Briefcase, GraduationCap, Award, Edit, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Full-stack developer with 5+ years of experience in React, Node.js, and Web3 technologies. Passionate about building scalable applications and exploring blockchain innovations.",
    skills: ["React", "Node.js", "TypeScript", "Web3", "Solidity", "Python", "AWS", "Docker"],
    experience: [
      {
        title: "Senior Full-Stack Developer",
        company: "TechCorp Inc.",
        duration: "2022 - Present",
        description: "Lead development of Web3 applications and mentor junior developers.",
      },
      {
        title: "Frontend Developer",
        company: "StartupXYZ",
        duration: "2020 - 2022",
        description: "Built responsive web applications using React and modern JavaScript.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        year: "2020",
      },
    ],
    certifications: ["AWS Certified Developer", "Certified Ethereum Developer"],
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile changes have been saved successfully.",
    })
    console.log("Profile saved:", profile)
  }

  const handleAccountAction = (action: string) => {
    switch (action) {
      case "configure":
        toast({
          title: "Email Notifications",
          description: "Opening notification settings...",
        })
        break
      case "manage":
        toast({
          title: "Privacy Settings",
          description: "Opening privacy management...",
        })
        break
      case "delete":
        toast({
          title: "Delete Account",
          description: "This action requires additional confirmation.",
          variant: "destructive",
        })
        break
      default:
        break
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground">Manage your professional information</p>
            </div>
            <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))} className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      {isEditing ? (
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">{profile.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      {isEditing ? (
                        <Input
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">{profile.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      {isEditing ? (
                        <Input
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">{profile.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Location</label>
                      {isEditing ? (
                        <Input
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">{profile.location}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Bio</label>
                    {isEditing ? (
                      <Textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{profile.bio}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h3 className="font-semibold">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} • {exp.duration}
                      </p>
                      <p className="text-sm mt-2">{exp.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution} • {edu.year}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {profile.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive job alerts and updates</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleAccountAction("configure")}>
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Privacy Settings</h4>
                      <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleAccountAction("manage")}>
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">Permanently delete your account</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => handleAccountAction("delete")}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
