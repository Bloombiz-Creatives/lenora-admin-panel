import Card from "../../../components/card/Card";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css'
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import EditHero from "../addAndEdit/EditHero";

const Hero = () => {
    const datas = [
        { image: 'https://gifting.bloombizsuite.com/images/banner1.jpg' },
        { image: 'https://gifting.bloombizsuite.com/images/banner2.jpg' },
        { image: 'https://gifting.bloombizsuite.com/images/banner3.jpg' },
    ];

    return (
        <div>
            <Card extra={`my-5 px-5 py-4 mx-5`}>
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-[23px] font-normal">Hero</h3>
                    </div>
                    <div className="flex gap-3">
                        <EditHero mode="edit" />
                    </div>
                </div>

                <div className="mt-6">
                    <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                        className="mySwiper"


                    >
                        {datas && datas.map((da, index) => (
                            <SwiperSlide key={index}>
                                <img src={da.image} alt="" className="w-full" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </Card>
        </div>
    );
};

export default Hero;