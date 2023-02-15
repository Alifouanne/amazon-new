import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img src="/images/carousel-1.jpg" alt="carousel-1" loading="lazy" />
        </div>
        <div>
          <img src="/images/carousel-2.jpg" alt="carousel-2" loading="lazy" />
        </div>
        <div>
          <img src="/images/carousel-3.jpg" alt="carousel-3" loading="lazy" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
