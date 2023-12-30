import Link from "next/link"

export default function DashNav() {
    const dashboardMenu = {
        items: [{
            name: 'Analysis',
            link: '/dashboard/analysis'
        },
        {
            name: 'Chart',
            link: '/dashboard/chart'
        },
        {
            name:'Stats',
            link:'/dashboard/stats'

        },
        {
            name: 'Transction History',
            link: '/dashboard/transction'
        },
        {
            name: 'User',
            link: '/account'
        }]
    };
    return (
        // Dashboard left navbar
        <div>
            { dashboardMenu.items.map((item, index) => {
                return (
                    <div>
                        <Link href={item.link} key={index}><span>{item.name}</span></Link>
                    </div>
                )
            })}
        </div>
    )
}