import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, Users, Mail } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: January 15, 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">
                    We collect information you provide directly to us, such as when you create an account, update your
                    profile, upload a resume, or contact us for support.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Usage Information</h3>
                  <p className="text-sm text-muted-foreground">
                    We collect information about how you use our platform, including pages visited, features used, and
                    interactions with job listings and other users.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Blockchain Data</h3>
                  <p className="text-sm text-muted-foreground">
                    When you connect a Web3 wallet, we may collect your wallet address and transaction history related
                    to our platform for verification and security purposes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Provide and improve our career platform services</li>
                  <li>• Match you with relevant job opportunities using AI</li>
                  <li>• Process payments and verify blockchain transactions</li>
                  <li>• Send you notifications about job matches and platform updates</li>
                  <li>• Analyze usage patterns to enhance user experience</li>
                  <li>• Prevent fraud and ensure platform security</li>
                  <li>• Comply with legal obligations and enforce our terms</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Information Sharing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">With Employers</h3>
                  <p className="text-sm text-muted-foreground">
                    When you apply for jobs, we share your profile information and application materials with the
                    relevant employers.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Service Providers</h3>
                  <p className="text-sm text-muted-foreground">
                    We work with third-party service providers for AI processing, blockchain services, and platform
                    infrastructure. These providers are bound by confidentiality agreements.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Legal Requirements</h3>
                  <p className="text-sm text-muted-foreground">
                    We may disclose information when required by law or to protect our rights, users, or the public.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We implement industry-standard security measures to protect your information, including:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Encryption of data in transit and at rest</li>
                  <li>• Regular security audits and vulnerability assessments</li>
                  <li>• Access controls and authentication mechanisms</li>
                  <li>• Secure blockchain integration protocols</li>
                  <li>• Regular backup and disaster recovery procedures</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Access and review your personal information</li>
                  <li>• Update or correct inaccurate information</li>
                  <li>• Delete your account and associated data</li>
                  <li>• Export your data in a portable format</li>
                  <li>• Opt out of marketing communications</li>
                  <li>• Restrict certain processing activities</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> privacy@rizeos.com
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
