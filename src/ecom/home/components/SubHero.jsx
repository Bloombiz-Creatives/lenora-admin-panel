
import { useEffect } from "react"
import Card from "../../../components/card/Card"
import EditSubHero from "../addAndEdit/EditSubHero"
import { useDispatch, useSelector } from "react-redux"
import { fetchSubHero } from "../../../action/websiteAction"

const SubHero = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubHero())
    },[dispatch])

    const {subhero} = useSelector((state) => state.websiteState);
    const subHeroData = subhero?.subhero ?? [];
    const subHeroId = subHeroData._id || null;


    const datas = [
        {
            image: subHeroData?.image1
        },
        {
            image: subHeroData?.image2
        },
        {
            image: subHeroData?.image3
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
                        <EditSubHero mode="edit" id={subHeroId} />
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