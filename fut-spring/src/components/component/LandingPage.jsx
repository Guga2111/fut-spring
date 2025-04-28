import LandingPageHeader from "./LandingPageHeader";
import LandingPageContent from "./LandingPageContent";

export default function LandingPage() {
    return(
        <div >
            <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col gap-4"  >
                <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
                    <LandingPageHeader></LandingPageHeader>
                </div>
                <div >
                    <LandingPageContent></LandingPageContent>
                </div>
            </div>
        </div>
    )
}