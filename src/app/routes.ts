import { BadgeComponent } from "./components/badge/badge.component";
import { BadgesComponent } from "./components/badges/badges.component";
import { AddPointComponent } from "./components/employee-dashboard/add-point/add-point.component";
import { AddSegmentComponent } from "./components/employee-dashboard/add-segment/add-segment.component";
import { EditPointComponent } from "./components/employee-dashboard/edit-point/edit-point.component";
import { EditSegmentComponent } from "./components/employee-dashboard/edit-segment/edit-segment.component";
import { EmployeeDashboardComponent } from "./components/employee-dashboard/employee-dashboard.component";
import { MainPageComponent } from "./components/main-page/main-page.component";

export default [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'badges',
        component: BadgesComponent
    },
    {
        path: 'badges/:name',
        component: BadgeComponent
    },
    {
        path: 'dashboard',
        component: EmployeeDashboardComponent
    },
    {
        path: 'dashboard/addSegment',
        component: AddSegmentComponent
    },
    {
        path : 'dashboard/editSegment',
        component : EditSegmentComponent
    },
    {
        path : 'dashboard/addPoint',
        component: AddPointComponent
    },
    {
        path : 'dasboard/editPoint',
        component: EditPointComponent
    }
]