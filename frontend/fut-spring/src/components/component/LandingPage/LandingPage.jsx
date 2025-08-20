import LandingPageHeader from "./LandingPageHeader";
import LandingPageContent from "./LandingPageContent";
import { Linkedin, Mail, MessageSquare, Users, Target, TrendingUp } from "lucide-react";

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 text-center flex flex-col items-center">
      <div className="bg-green-100 text-green-600 rounded-full p-4 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-600">{description}</p>
    </div>
  );

  const AboutSection = () => (
    <section id="about" className="py-20 bg-gray-50 scroll-mt-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Futspring
          </h2>
          <div className="mt-4 mb-10 h-1 w-16 bg-green-500 mx-auto rounded"></div>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            This project was built to connect people who love playing pickup games, 
            putting an end to the chaos of group chats and organizational headaches. 
            Our platform centralizes everything: from lineups and attendance tracking to player stats, 
            ensuring your only focus is the game itself.
          </p>
        </div>
 
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users size={32} />}
            title="Connect Players"
            description="Bring together pickup game enthusiasts in one centralized platform."
          />
          <FeatureCard
            icon={<Target size={32} />}
            title="Organize Games"
            description="Streamline lineup management and attendance tracking effortlessly."
          />
          <FeatureCard
            icon={<TrendingUp size={32} />}
            title="Track Progress"
            description="Monitor player statistics and game performance with detailed insights."
          />
        </div>
      </div>
    </section>
  );
  
  const ContactSection = () => (
    <section id="contact" className="py-20 bg-gray-50 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="text-3xl font-extrabold text-green-600 sm:text-4xl">Contact</h2>
        <div className="mt-4 mb-12 h-1 w-16 bg-green-500 mx-auto rounded"></div>
  
        <div className="bg-green-50/70 rounded-2xl p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 flex flex-col items-center gap-6">

            <div className="bg-green-500 text-white rounded-full p-4">
              <MessageSquare size={32} />
            </div>
  
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800">Get in Touch</h3>
              <p className="mt-2 text-md text-gray-600">
                Find a bug or have a suggestion? We'd love to hear from you!
              </p>
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-sm">

              <a 
                href="https://www.linkedin.com/in/luisgustavosampaio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
              >
                <Linkedin size={20} className="mr-3" />
                via LinkedIn
              </a>

              <a 
                href="mailto:luisgosampaio@gmail.com" 
                className="flex-1 inline-flex items-center justify-center px-5 py-3 border border-green-600 text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50 transition-colors shadow-sm"
              >
                <Mail size={20} className="mr-3" />
                Send Email
              </a>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          We typically respond within 24 hours during business days.
        </p>
      </div>
    </section>
  );

export default function LandingPage() {
    return(
        <div>

            <div className="bg-cover bg-center bg-no-repeat flex flex-col">
                <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
                    <LandingPageHeader />
                </div>
                
                <main className="flex-grow">
                  <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8">
                      <LandingPageContent />
                  </div>
                  
                  <AboutSection />
                  <ContactSection />
                </main>
            </div>
        </div>
    )
}