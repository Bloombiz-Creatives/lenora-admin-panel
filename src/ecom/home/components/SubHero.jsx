
import Card from "../../../components/card/Card"
import EditSubHero from "../addAndEdit/EditSubHero"

const SubHero = () => {

    const datas = [
        {
            image: 'https://gifting.bloombizsuite.com/images/promo/home/banner.jpg'
        },
        {
            image: 'https://gifting.bloombizsuite.com/images/promo/home/banner2.jpg'
        },
        {
            image: 'https://gifting.bloombizsuite.com/images/promo/home/banner3.jpg'
        },
    ]

    return (
        <div>
            <Card extra="my-5 px-5 py-4 mx-5">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-[23px] font-normal">SubHero</h3>
                    </div>
                    <div className="flex gap-3">
                        <EditSubHero mode="edit" />
                    </div>
                </div>

                <div className="flex gap-8 justify-center items-center mt-5 w-full">
                    {datas && datas.map((da, index) => (
                        <div className="overflow-hidden rounded-[5px]" key={index}>
                            <img src={da.image} alt="" className="w-full h-full rounded-[5px] object-fill lg:w-[500px] 2xl:w-[800px] transition-transform duration-300 hover:scale-110" />
                        </div>
                    ))}
                </div>

            </Card>
        </div>
    )
}

export default SubHero