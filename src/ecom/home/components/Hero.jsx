import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css'; 
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import Card from "../../../components/card/Card";
import EditHero from "../addAndEdit/EditHero";
import { fetchHomeHero } from "../../../action/websiteAction";

const Hero = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHomeHero());
    }, [dispatch]);

    const hero = useSelector((state) => state.websiteState.hero);
    const heroData = hero?.hero ?? [];
    const heroId = heroData._id || null;
    

  

    const datas = [
        {
            image:heroData?.image1
        },
        {
            image:heroData?.image2
        },
         {
            image:heroData?.image3
        },
    ]

    return (
        <div>
            <Card extra="my-5 px-5 py-4 mx-5">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-[23px] font-normal">Hero</h3>
                    </div>
                    <div className="flex gap-3">
                        <EditHero mode="edit" id={heroId} />
                    </div>
                </div>

                <div className="mt-7 w-full">
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
                        {datas.map((da, index) => (
                            <SwiperSlide key={index}>
                                <img src={da.image} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover rounded-[5px] " />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Card>
        </div>
    );
};

export default Hero;

