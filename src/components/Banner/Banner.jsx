// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Banner({images = []}) {
    
    return (
      <section id="banner" className="w-full bg-white">
        <div className="">
      <Swiper
        zoom={true}
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        slidesPerView={3}
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={images.length >= 7}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          0: {
      slidesPerView: 1,
    },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
      >
        {images.slice(0, 12).map((img, i) => (
          <SwiperSlide key={i} className="flex justify-center items-center cursor-pointer">
            <div className="w-full h-64 overflow-hidden">
              <img
                src={img.webformatURL}
                alt={img.tags}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      </section>
    
    );
}

export default Banner;