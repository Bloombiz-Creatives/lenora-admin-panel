import { useEffect } from "react"
import Card from "../../../components/card/Card"
import EditPageContent from "../addAndEdit/EditPageContent"
import { useDispatch, useSelector } from "react-redux"
import { fetchHomePageContent } from "../../../action/websiteAction"

const PageContent = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHomePageContent())
    },[dispatch])

    const { pageContent } = useSelector((state) => state.websiteState)
    const datas = pageContent?.pageContent[0]

    return (
        <div>
            <Card extra="my-5 px-5 py-4 mx-5">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-[23px] font-normal">PageContent</h3>
                    </div>
                    <div className="flex gap-3">
                        <EditPageContent mode="edit" data={datas}/>
                    </div>
                </div>

                <div className='flex flex-col gap-8 my-10 bg-white '>
                    <div className='bg-[#F7F7F7] flex justify-center rounded-[15px] '>
                        <h3 className='lg:text-[40px] text-[30px] font-bold text-black uppercase p-4'>{datas?.heading}</h3>
                    </div>
                    <div className='bg-[#F7F7F7] flex justify-center item-center text-center rounded-[15px]'>
                        <p className='2xl:text-[24px] text-[18px] p-10  text-black flex flex-col 2xl:w-[1115px] md:w-[400px]  '>{datas?.text}</p>
                    </div>
                   
                </div>
            </Card>
        </div>
    )
}

export default PageContent
