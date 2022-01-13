import { useEffect } from "react"
import "../../pages/Sweeper/sweeper.css"

const Display = (gottenInfo) => {
    useEffect(() => {
        console.log(gottenInfo)
    }, [])
    return (
        <>
            <h3>Heyyy</h3>
            {/* {
                gottenInfo.map((info) => {
                    return (
                        <div className='sweeper-data-output-wrapper' key={info.dates}>
                            <h3>Dates: {info.dates}</h3>
                            <h4>Month_Date: {info.month_name}</h4>
                            <h2>Ward: {info.ward}</h2>
                        </div>
                    )
                })
            } */}
        </>
    )
}

export default Display;