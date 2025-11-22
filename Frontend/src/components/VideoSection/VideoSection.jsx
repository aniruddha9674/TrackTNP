import { Play } from "lucide-react";
import demo from "../../assets/demo.mp4";

const VideoSection = ({ themeStyles }) => {
  return (
    <section id="demo" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeStyles.textPrimary}`}
          >
            See TRACKTNP in Action
          </h2>
          <p
            className={`text-lg md:text-xl ${themeStyles.textSecondary} max-w-2xl mx-auto`}
          >
            Watch how colleges streamline their placement processes with our
            comprehensive platform
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div
            className={`relative rounded-2xl overflow-hidden ${themeStyles.cardBg} ${themeStyles.cardBorder} border-2 shadow-2xl hover-lift`}
          >
            {/* Video aspect ratio container */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              {/* Placeholder with play button - replace src with your video */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play
                      className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>

              {/* Uncomment and add your video URL */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src={demo}
                title="Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
