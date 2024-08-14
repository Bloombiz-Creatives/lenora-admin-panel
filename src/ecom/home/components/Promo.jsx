import { useEffect } from "react"
import Card from "../../../components/card/Card"
import { useDispatch, useSelector } from "react-redux"
import { fetchPromo } from "../../../action/websiteAction"
import EditPromo from "../addAndEdit/EditPromo"

const Promo = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPromo())
    }, [dispatch])

    const { promo } = useSelector((state) => state.websiteState);
    const promoData = promo?.promo ?? [];
    const promoId = promoData._id || null;

    const datas = [
        {
            image: promoData?.image1
        },
        {
            image: promoData?.image2
        }
    ]

    return (
        <div>
            <Card extra="my-5 px-5 py-4 mx-5">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-[23px] font-normal">Promo</h3>
                    </div>
                    <div className="flex gap-3">
                        <EditPromo mode="edit" id={promoId} />
                    </div>
                </div>

                <div className="flex gap-8 justify-center items-center mt-5 w-full">
                    {datas && datas.map((da, index) => (
                        <div className="overflow-hidden rounded-[5px]" key={index}>
                            <img src={da.image} alt="" className="w-full h-full rounded-[5px] object-fill lg:w-[600px] 2xl:w-[1200px] transition-transform duration-300 hover:scale-110" />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default Promo
