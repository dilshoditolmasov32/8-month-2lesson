import { LuLayoutDashboard } from "react-icons/lu";
import { GrServices } from "react-icons/gr";
import { AiOutlineCustomerService } from "react-icons/ai";

const routes=[
    {
        path:"/main",
        content:"Cleints",
        icon:<LuLayoutDashboard />
    },
    {
        path:"/main/service",
        content:"Services",
        icon:<GrServices />
    },
    {
        path:"/main/order",
        content:"Order",
        icon:<AiOutlineCustomerService />
    },
]

export  default routes