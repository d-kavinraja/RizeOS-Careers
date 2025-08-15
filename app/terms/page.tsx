import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Shield, Gavel, AlertTriangle, Mail } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Please read these terms carefully before using the RizeOS platform.
            </p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: January 15, 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  By accessing or using the RizeOS platform, you agree to be bound by these Terms of Service and all
                  applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                  using or accessing this platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Accounts and Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Account Creation</h3>
                  <p className="text-sm text-muted-foreground">
                    You must provide accurate and complete information when creating an account. You are responsible for
                    maintaining the confidentiality of your account credentials.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">User Conduct</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Provide truthful information in your profile and applications</li>
                    <li>• Respect other users and maintain professional conduct</li>
                    <li>• Do not post spam, offensive, or inappropriate content</li>
                    <li>• Do not attempt to circumvent platform security measures</li>
                    <li>• Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Platform Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Job Matching and AI Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI-powered job matching is provided for informational purposes. While we strive for accuracy, we
                    do not guarantee the completeness or accuracy of job matches or AI-generated insights.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Web3 and Blockchain Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Blockchain transactions are irreversible. You are responsible for understanding the risks associated
                    with cryptocurrency transactions and Web3 technologies.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Platform fees for job postings are non-refundable once the transaction is confirmed on the
                    blockchain. All payments are processed in cryptocurrency.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Platform Content</h3>
                  <p className="text-sm text-muted-foreground">
                    The RizeOS platform, including its design, features, and underlying technology, is protected by
                    intellectual property laws. You may not copy, modify, or distribute our platform without permission.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">User Content</h3>
                  <p className="text-sm text-muted-foreground">
                    You retain ownership of content you submit to the platform. By submitting content, you grant us a
                    license to use, display, and process your content for platform operations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Disclaimers and Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Service Availability</h3>
                  <p className="text-sm text-muted-foreground">
                    We strive to maintain platform availability but do not guarantee uninterrupted service. We may
                    temporarily suspend services for maintenance or updates.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Third-Party Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Our platform integrates with third-party services including AI providers and blockchain networks. We
                    are not responsible for the availability or performance of these services.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                  <p className="text-sm text-muted-foreground">
                    RizeOS shall not be liable for any indirect, incidental, special, or consequential damages arising
                    from your use of the platform.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> legal@rizeos.com
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
